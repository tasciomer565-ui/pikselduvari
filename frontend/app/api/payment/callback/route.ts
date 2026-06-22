import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token, mock, id } = body;

  // Mock mod (Iyzico olmadan test)
  if (mock && id) {
    await supabase.from("pixels").update({
      status: "pending_approval",
      paid_at: new Date().toISOString(),
    }).eq("id", id);
    return NextResponse.json({ success: true, pixel_id: id });
  }

  if (!token) return NextResponse.json({ error: "Token gerekli" }, { status: 400 });

  const baseUrl = process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com";
  const apiKey = process.env.IYZICO_API_KEY || "";
  const secret = process.env.IYZICO_SECRET_KEY || "";

  const { randomUUID } = require("crypto");
  const { createHash } = require("crypto");
  const random = randomUUID().replace(/-/g, "").slice(0, 8);
  const pki = `[locale=tr,token=${token}]`;
  const hash = createHash("sha1").update(apiKey + random + secret + pki).digest("hex");
  const b64 = Buffer.from(hash).toString("base64");
  const auth = `IYZWS ${apiKey}:${b64}`;

  const resp = await fetch(`${baseUrl}/payment/iyzipos/checkoutform/auth/ecom/detail`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify({ locale: "tr", token }),
  });

  const data = await resp.json();

  if (data.status === "success") {
    const pixelId = data.conversationId;
    await supabase.from("pixels").update({
      status: "pending_approval",
      paid_at: new Date().toISOString(),
    }).eq("id", pixelId);
    return NextResponse.json({ success: true, pixel_id: pixelId });
  }

  return NextResponse.json({ error: "Ödeme başarısız" }, { status: 400 });
}
