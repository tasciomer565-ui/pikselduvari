import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import { welcomeNewsletterEmail } from "@/lib/emails";

const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");

export async function POST(req: NextRequest) {
  const { email, source = "landing" } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Geçersiz email" }, { status: 400 });
  }

  const { error } = await supabase
    .from("email_subscribers")
    .insert({ email, source });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ success: true, existing: true });
    }
    return NextResponse.json({ error: "Kayıt başarısız" }, { status: 500 });
  }

  // Hoş geldiniz maili gönder
  if (process.env.RESEND_API_KEY) {
    const { subject, html } = welcomeNewsletterEmail({ email });
    await resend.emails.send({
      from: "Piksel Duvarı <info@pikselduvari.com>",
      to: email,
      subject,
      html,
    }).catch(() => {}); // mail hatası kayıtı engellemez
  }

  return NextResponse.json({ success: true });
}
