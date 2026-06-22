from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional
import os, uuid, hashlib, hmac, json, httpx
from datetime import datetime, timedelta
from supabase import create_client
from PIL import Image
import io
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Piksel Duvarı API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

supabase = create_client(os.getenv("SUPABASE_URL", ""), os.getenv("SUPABASE_KEY", ""))

PIXEL_PRICE = 1.0  # TL per pixel
BLOCK_SIZE = 10    # 10x10 blocks
GRID_WIDTH = 1000
GRID_HEIGHT = 1000


class PixelReserveRequest(BaseModel):
    x: int
    y: int
    width: int
    height: int
    owner_name: str
    website_url: str
    tooltip: str


class PaymentCallbackRequest(BaseModel):
    token: str


def calculate_price(width: int, height: int) -> float:
    pixels = width * height
    return round(pixels * PIXEL_PRICE, 2)


def is_valid_block(x, y, w, h):
    if x % BLOCK_SIZE != 0 or y % BLOCK_SIZE != 0:
        return False
    if w % BLOCK_SIZE != 0 or h % BLOCK_SIZE != 0:
        return False
    if x + w > GRID_WIDTH or y + h > GRID_HEIGHT:
        return False
    if w < BLOCK_SIZE or h < BLOCK_SIZE:
        return False
    return True


@app.get("/api/pixels")
async def get_pixels():
    """Tüm satılmış/onaylı pikselleri döner."""
    result = supabase.table("pixels").select("*").eq("status", "approved").execute()
    return result.data


@app.get("/api/pixels/grid")
async def get_grid():
    """Dolu koordinatları döner (çakışma kontrolü için)."""
    result = supabase.table("pixels").select("x,y,width,height").in_("status", ["pending_payment", "pending_approval", "approved"]).execute()
    return result.data


@app.post("/api/pixels/reserve")
async def reserve_pixels(req: PixelReserveRequest):
    """Pikselleri rezerve eder ve ödeme linki oluşturur."""
    if not is_valid_block(req.x, req.y, req.width, req.height):
        raise HTTPException(400, "Geçersiz blok boyutu veya koordinat. 10'un katı olmalı.")

    # Çakışma kontrolü
    grid = await get_grid()
    for p in grid:
        if (req.x < p["x"] + p["width"] and req.x + req.width > p["x"] and
                req.y < p["y"] + p["height"] and req.y + req.height > p["y"]):
            raise HTTPException(409, "Bu alan zaten alınmış.")

    price = calculate_price(req.width, req.height)
    reservation_id = str(uuid.uuid4())

    supabase.table("pixels").insert({
        "id": reservation_id,
        "x": req.x,
        "y": req.y,
        "width": req.width,
        "height": req.height,
        "owner_name": req.owner_name,
        "website_url": req.website_url,
        "tooltip": req.tooltip,
        "price": price,
        "status": "pending_payment",
        "reserved_until": (datetime.utcnow() + timedelta(minutes=15)).isoformat(),
    }).execute()

    payment_url = await create_iyzico_payment(reservation_id, price, req.owner_name)

    return {"reservation_id": reservation_id, "price": price, "payment_url": payment_url}


@app.post("/api/pixels/{pixel_id}/upload")
async def upload_image(pixel_id: str, file: UploadFile = File(...)):
    """Görsel yükler (ödeme sonrası çağrılır)."""
    result = supabase.table("pixels").select("*").eq("id", pixel_id).execute()
    if not result.data:
        raise HTTPException(404, "Piksel bulunamadı.")

    pixel = result.data[0]
    if pixel["status"] not in ["pending_approval", "approved"]:
        raise HTTPException(400, "Bu piksel için görsel yüklenemez.")

    contents = await file.read()
    img = Image.open(io.BytesIO(contents))
    img = img.resize((pixel["width"], pixel["height"]), Image.LANCZOS)

    filename = f"{pixel_id}.png"
    filepath = f"uploads/{filename}"
    img.save(filepath, "PNG", optimize=True)

    supabase.table("pixels").update({"image_url": f"/uploads/{filename}"}).eq("id", pixel_id).execute()

    return {"image_url": f"/uploads/{filename}"}


@app.post("/api/payment/callback")
async def payment_callback(req: PaymentCallbackRequest):
    """Iyzico ödeme callback."""
    result = await verify_iyzico_payment(req.token)

    if result["status"] == "success":
        pixel_id = result["conversationId"]
        supabase.table("pixels").update({
            "status": "pending_approval",
            "paid_at": datetime.utcnow().isoformat(),
        }).eq("id", pixel_id).execute()
        return {"success": True, "message": "Ödeme alındı, admin onayı bekleniyor."}
    else:
        supabase.table("pixels").update({"status": "payment_failed"}).eq("id", result["conversationId"]).execute()
        raise HTTPException(400, "Ödeme başarısız.")


# ── Admin endpoints ──────────────────────────────────────────────────────────

def verify_admin(secret: str):
    if secret != os.getenv("ADMIN_SECRET"):
        raise HTTPException(403, "Yetkisiz erişim.")


@app.get("/api/admin/pending")
async def admin_pending(x_admin_secret: str = Header(...)):
    verify_admin(x_admin_secret)
    result = supabase.table("pixels").select("*").eq("status", "pending_approval").execute()
    return result.data


@app.post("/api/admin/approve/{pixel_id}")
async def admin_approve(pixel_id: str, x_admin_secret: str = Header(...)):
    verify_admin(x_admin_secret)
    supabase.table("pixels").update({
        "status": "approved",
        "approved_at": datetime.utcnow().isoformat(),
    }).eq("id", pixel_id).execute()
    return {"success": True}


@app.post("/api/admin/reject/{pixel_id}")
async def admin_reject(pixel_id: str, x_admin_secret: str = Header(...)):
    verify_admin(x_admin_secret)
    supabase.table("pixels").update({"status": "rejected"}).eq("id", pixel_id).execute()
    return {"success": True}


# ── Iyzico helpers ───────────────────────────────────────────────────────────

async def create_iyzico_payment(conversation_id: str, price: float, buyer_name: str) -> str:
    api_key = os.getenv("IYZICO_API_KEY", "")
    secret = os.getenv("IYZICO_SECRET_KEY", "")
    base_url = os.getenv("IYZICO_BASE_URL", "https://sandbox-api.iyzipay.com")
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")

    payload = {
        "locale": "tr",
        "conversationId": conversation_id,
        "price": str(price),
        "paidPrice": str(price),
        "currency": "TRY",
        "basketId": conversation_id,
        "paymentGroup": "PRODUCT",
        "callbackUrl": f"{frontend_url}/odeme/sonuc",
        "enabledInstallments": [1, 2, 3],
        "buyer": {
            "id": conversation_id,
            "name": buyer_name.split()[0] if buyer_name else "Alici",
            "surname": buyer_name.split()[-1] if len(buyer_name.split()) > 1 else "Soyadi",
            "email": "alici@pikselduvari.com",
            "identityNumber": "74300864791",
            "registrationAddress": "Türkiye",
            "city": "Istanbul",
            "country": "Turkey",
            "ip": "85.34.78.112",
        },
        "shippingAddress": {"contactName": buyer_name, "city": "Istanbul", "country": "Turkey", "address": "Türkiye"},
        "billingAddress": {"contactName": buyer_name, "city": "Istanbul", "country": "Turkey", "address": "Türkiye"},
        "basketItems": [{
            "id": conversation_id,
            "name": "Piksel Alanı",
            "category1": "Reklam",
            "itemType": "VIRTUAL",
            "price": str(price),
        }],
    }

    pki = _build_pki(payload)
    auth = _generate_auth_header(api_key, secret, pki)

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{base_url}/payment/iyzipos/checkoutform/initialize/auth/ecom",
            json=payload,
            headers={"Authorization": auth, "Content-Type": "application/json"},
        )
        data = resp.json()

    if data.get("status") == "success":
        return data.get("paymentPageUrl", "")
    raise HTTPException(500, f"Iyzico hatası: {data.get('errorMessage')}")


async def verify_iyzico_payment(token: str) -> dict:
    api_key = os.getenv("IYZICO_API_KEY", "")
    secret = os.getenv("IYZICO_SECRET_KEY", "")
    base_url = os.getenv("IYZICO_BASE_URL", "https://sandbox-api.iyzipay.com")

    payload = {"locale": "tr", "token": token}
    pki = f"[locale=tr,token={token}]"
    auth = _generate_auth_header(api_key, secret, pki)

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{base_url}/payment/iyzipos/checkoutform/auth/ecom/detail",
            json=payload,
            headers={"Authorization": auth, "Content-Type": "application/json"},
        )
    return resp.json()


def _build_pki(d: dict, indent=0) -> str:
    parts = []
    for k, v in d.items():
        if isinstance(v, dict):
            parts.append(f"{k}={{{_build_pki(v)}}}")
        elif isinstance(v, list):
            items = ",".join(f"[{_build_pki(i)}]" if isinstance(i, dict) else str(i) for i in v)
            parts.append(f"{k}=[{items}]")
        else:
            parts.append(f"{k}={v}")
    return ",".join(parts)


def _generate_auth_header(api_key: str, secret: str, pki: str) -> str:
    random_str = str(uuid.uuid4()).replace("-", "")[:8]
    hash_str = api_key + random_str + secret + pki
    hashed = hashlib.sha1(hash_str.encode()).hexdigest()
    import base64
    b64 = base64.b64encode(hashed.encode()).decode()
    return f"IYZWS {api_key}:{b64}"
