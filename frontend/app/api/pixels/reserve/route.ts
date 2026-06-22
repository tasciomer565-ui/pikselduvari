import { NextRequest, NextResponse } from "next/server";
import { supabase, isValidBlock, PIXEL_PRICE } from "@/lib/supabase";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { x, y, width, height, owner_name, website_url, tooltip } = body;

  if (!isValidBlock(x, y, width, height)) {
    return NextResponse.json({ detail: "Geçersiz blok boyutu. 10'un katı olmalı." }, { status: 400 });
  }

  // Çakışma kontrolü
  const { data: grid } = await supabase
    .from("pixels")
    .select("x,y,width,height")
    .in("status", ["pending_payment", "pending_approval", "approved"]);

  for (const p of grid || []) {
    if (x < p.x + p.width && x + width > p.x && y < p.y + p.height && y + height > p.y) {
      return NextResponse.json({ detail: "Bu alan zaten alınmış." }, { status: 409 });
    }
  }

  const price = width * height * PIXEL_PRICE;
  const id = randomUUID();
  const reservedUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  await supabase.from("pixels").insert({
    id, x, y, width, height, owner_name, website_url, tooltip,
    price, status: "pending_payment", reserved_until: reservedUntil,
  });

  // Iyzico ödeme linki oluştur
  const paymentUrl = await createIyzicoPayment(id, price, owner_name);

  return NextResponse.json({ reservation_id: id, price, payment_url: paymentUrl });
}

async function createIyzicoPayment(conversationId: string, price: number, buyerName: string): Promise<string> {
  const apiKey = process.env.IYZICO_API_KEY || "";
  const secret = process.env.IYZICO_SECRET_KEY || "";
  const baseUrl = process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com";
  const frontendUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pikselduvari.vercel.app";

  const nameParts = buyerName.trim().split(" ");
  const firstName = nameParts[0] || "Alici";
  const lastName = nameParts.slice(1).join(" ") || "Soyadi";

  const payload: any = {
    locale: "tr",
    conversationId,
    price: String(price),
    paidPrice: String(price),
    currency: "TRY",
    basketId: conversationId,
    paymentGroup: "PRODUCT",
    callbackUrl: `${frontendUrl}/odeme/sonuc`,
    enabledInstallments: [1, 2, 3],
    buyer: {
      id: conversationId, name: firstName, surname: lastName,
      email: "alici@pikselduvari.com", identityNumber: "74300864791",
      registrationAddress: "Türkiye", city: "Istanbul", country: "Turkey", ip: "85.34.78.112",
    },
    shippingAddress: { contactName: buyerName, city: "Istanbul", country: "Turkey", address: "Türkiye" },
    billingAddress: { contactName: buyerName, city: "Istanbul", country: "Turkey", address: "Türkiye" },
    basketItems: [{
      id: conversationId, name: "Piksel Alanı", category1: "Reklam",
      itemType: "VIRTUAL", price: String(price),
    }],
  };

  const pki = buildPki(payload);
  const auth = generateAuth(apiKey, secret, pki);

  const resp = await fetch(`${baseUrl}/payment/iyzipos/checkoutform/initialize/auth/ecom`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await resp.json();
  if (data.status === "success") return data.paymentPageUrl;

  // Iyzico yoksa direkt ödeme sayfasına yönlendir
  return `${frontendUrl}/odeme/sonuc?mock=true&id=${conversationId}`;
}

function buildPki(d: any): string {
  return Object.entries(d).map(([k, v]) => {
    if (Array.isArray(v)) return `${k}=[${v.map((i: any) => typeof i === "object" ? `[${buildPki(i)}]` : i).join(",")}]`;
    if (typeof v === "object") return `${k}={${buildPki(v)}}`;
    return `${k}=${v}`;
  }).join(",");
}

function generateAuth(apiKey: string, secret: string, pki: string): string {
  const { createHash } = require("crypto");
  const random = randomUUID().replace(/-/g, "").slice(0, 8);
  const hash = createHash("sha1").update(apiKey + random + secret + pki).digest("hex");
  const b64 = Buffer.from(hash).toString("base64");
  return `IYZWS ${apiKey}:${b64}`;
}
