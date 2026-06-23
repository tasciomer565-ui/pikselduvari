import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import { purchaseConfirmationEmail, pixelApprovedEmail } from "@/lib/emails";

const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");

export async function POST(req: NextRequest) {
  const body = await req.text();
  const params = new URLSearchParams(body);

  const merchant_oid = params.get("merchant_oid") ?? "";
  const status = params.get("status") ?? "";
  const total_amount = params.get("total_amount") ?? "";
  const hash = params.get("hash") ?? "";

  // PayTR hash doğrulama
  const PAYTR_KEY = process.env.PAYTR_MERCHANT_KEY ?? "";
  const PAYTR_SALT = process.env.PAYTR_MERCHANT_SALT ?? "";
  const expected = createHmac("sha256", PAYTR_KEY + PAYTR_SALT)
    .update(merchant_oid + PAYTR_SALT + status + total_amount)
    .digest("base64");

  if (hash !== expected) {
    return new NextResponse("PAYTR_HASH_INVALID", { status: 400 });
  }

  if (status !== "success") {
    // Başarısız ödeme — piksel durumunu failed yap
    await supabase
      .from("pixels")
      .update({ status: "payment_failed" })
      .eq("merchant_oid", merchant_oid);
    return new NextResponse("OK");
  }

  // Piksel bul
  const { data: pixel } = await supabase
    .from("pixels")
    .select("*")
    .eq("merchant_oid", merchant_oid)
    .single();

  if (!pixel) return new NextResponse("OK");

  // Ödendi olarak işaretle + otomatik onaya al
  await supabase
    .from("pixels")
    .update({
      status: "pending",
      paid_at: new Date().toISOString(),
      price: Number(total_amount) / 100, // PayTR kuruş gönderir
    })
    .eq("merchant_oid", merchant_oid);

  // Satın alma onay maili gönder
  if (pixel.owner_email && process.env.RESEND_API_KEY) {
    const { subject, html } = purchaseConfirmationEmail({
      ownerName: pixel.owner_name ?? "Değerli Müşterimiz",
      x: pixel.x,
      y: pixel.y,
      width: pixel.width,
      height: pixel.height,
      price: Number(total_amount) / 100,
      url: `https://pikselduvari.com/piksel/${pixel.id}`,
    });

    await resend.emails.send({
      from: "Piksel Duvarı <info@pikselduvari.com>",
      to: pixel.owner_email,
      subject,
      html,
    }).catch(() => {});
  }

  return new NextResponse("OK");
}
