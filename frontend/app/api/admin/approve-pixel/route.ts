import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import { pixelApprovedEmail } from "@/lib/emails";

const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");

export async function POST(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { pixelId } = await req.json();
  if (!pixelId) {
    return NextResponse.json({ error: "pixelId gerekli" }, { status: 400 });
  }

  // Piksel bilgilerini getir
  const { data: pixel, error: fetchErr } = await supabase
    .from("pixels")
    .select("*")
    .eq("id", pixelId)
    .single();

  if (fetchErr || !pixel) {
    return NextResponse.json({ error: "Piksel bulunamadı" }, { status: 404 });
  }

  // Onayla
  const { error: updateErr } = await supabase
    .from("pixels")
    .update({ status: "approved" })
    .eq("id", pixelId);

  if (updateErr) {
    return NextResponse.json({ error: "Güncelleme hatası" }, { status: 500 });
  }

  // E-posta gönder
  if (pixel.owner_email && process.env.RESEND_API_KEY) {
    const { subject, html } = pixelApprovedEmail({
      ownerName: pixel.owner_name ?? "Değerli Müşterimiz",
      websiteUrl: pixel.website_url,
      x: pixel.x,
      y: pixel.y,
      width: pixel.width,
      height: pixel.height,
    });

    await resend.emails.send({
      from: "Piksel Duvarı <info@pikselduvari.com>",
      to: pixel.owner_email,
      subject,
      html,
    });
  }

  return NextResponse.json({ success: true, pixelId });
}
