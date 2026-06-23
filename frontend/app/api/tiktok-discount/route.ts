import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "TIKTOK-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function emailHtml(code: string, email: string): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Piksel Duvarı — İndirim Kodun Hazır!</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e1b4b 100%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px;">
                <tr>
                  <td style="background:#4f46e5;border-radius:10px;width:40px;height:40px;text-align:center;vertical-align:middle;">
                    <span style="color:#fff;font-weight:900;font-size:16px;line-height:40px;">PD</span>
                  </td>
                  <td style="padding-left:10px;vertical-align:middle;">
                    <span style="color:#fff;font-weight:800;font-size:20px;letter-spacing:-0.3px;">Piksel Duvarı</span>
                  </td>
                </tr>
              </table>
              <p style="color:#a5b4fc;font-size:13px;margin:0;">Türkiye'nin Dijital Reklam Duvarı</p>
            </td>
          </tr>

          <!-- Confetti bar -->
          <tr>
            <td style="background:linear-gradient(90deg,#4f46e5,#7c3aed,#4f46e5);height:4px;"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#111118;padding:40px;border-radius:0 0 16px 16px;">

              <!-- Emoji + Başlık -->
              <div style="text-align:center;margin-bottom:28px;">
                <div style="font-size:48px;margin-bottom:12px;">🎉</div>
                <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0 0 8px;letter-spacing:-0.5px;">
                  TikTok takipçisi olduğun için teşekkürler!
                </h1>
                <p style="color:#9ca3af;font-size:15px;margin:0;line-height:1.6;">
                  Söz verdiğimiz gibi — sana özel <strong style="color:#a5b4fc;">%10 indirim kodun</strong> hazır.
                </p>
              </div>

              <!-- Kod kutusu -->
              <div style="background:linear-gradient(135deg,#1e1b4b,#1a1a2e);border:2px dashed #4f46e5;border-radius:12px;padding:24px;text-align:center;margin-bottom:28px;">
                <p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;">Özel İndirim Kodun</p>
                <div style="background:#0a0a0f;border:1px solid #312e81;border-radius:8px;padding:14px 20px;display:inline-block;">
                  <span style="color:#818cf8;font-size:28px;font-weight:900;letter-spacing:4px;font-family:monospace;">${code}</span>
                </div>
                <p style="color:#6b7280;font-size:12px;margin:12px 0 0;">Bu kod yalnızca <strong style="color:#f59e0b;">${email}</strong> adresine özeldir · Tek kullanımlık</p>
              </div>

              <!-- Nasıl kullanılır -->
              <div style="margin-bottom:28px;">
                <p style="color:#e5e7eb;font-size:14px;font-weight:700;margin:0 0 14px;">📋 Nasıl Kullanılır?</p>
                <table cellpadding="0" cellspacing="0" width="100%">
                  ${["Pikselduvari.com'a git ve haritadan istediğin alanı seç", "Seçim panelinde <strong>\"İndirim Kodu\"</strong> alanına kodunu yaz", "<strong>\"Uygula\"</strong> butonuna tıkla — indirim anında uygulanır", "Ödemeyi tamamla ve alanın kalıcı olarak senin olsun! 🎯"].map((step, i) => `
                  <tr>
                    <td style="padding:6px 0;vertical-align:top;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:28px;height:28px;background:#1e1b4b;border-radius:6px;text-align:center;vertical-align:middle;color:#818cf8;font-weight:800;font-size:13px;">${i + 1}</td>
                          <td style="padding-left:10px;color:#d1d5db;font-size:14px;line-height:1.5;">${step}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>`).join("")}
                </table>
              </div>

              <!-- Info box -->
              <div style="background:#0f172a;border-left:3px solid #4f46e5;border-radius:0 8px 8px 0;padding:14px 16px;margin-bottom:28px;">
                <p style="color:#94a3b8;font-size:13px;margin:0;line-height:1.6;">
                  💡 <strong style="color:#e2e8f0;">Hatırlatma:</strong> Bu kod bir kez kullanılabilir ve yalnızca sana aittir. Başkasıyla paylaşırsan kod geçersiz hale gelir.
                </p>
              </div>

              <!-- CTA Butonu -->
              <div style="text-align:center;margin-bottom:32px;">
                <a href="https://pikselduvari.com" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:16px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;letter-spacing:-0.2px;">
                  🗺️ Haritaya Git &amp; Alan Seç
                </a>
              </div>

              <!-- Bölge önerileri -->
              <div style="background:#0f0f1a;border-radius:10px;padding:18px;margin-bottom:28px;">
                <p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">🏙️ Popüler Bölgeler</p>
                <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    ${[["İstanbul", "4.000₺/px"], ["Ankara", "1₺/px"], ["İzmir", "1₺/px"]].map(([city, price]) => `
                    <td style="text-align:center;padding:0 6px;">
                      <div style="background:#1a1a2e;border-radius:8px;padding:10px 6px;">
                        <div style="color:#e2e8f0;font-weight:700;font-size:13px;">${city}</div>
                        <div style="color:#6b7280;font-size:11px;margin-top:2px;">1 piksel = ${price}</div>
                      </div>
                    </td>`).join("")}
                  </tr>
                </table>
              </div>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #1f2937;margin:0 0 24px;" />

              <!-- Footer -->
              <div style="text-align:center;">
                <p style="color:#374151;font-size:12px;margin:0 0 8px;">
                  Bu e-postayı <strong>${email}</strong> adresi için aldınız.
                </p>
                <p style="color:#374151;font-size:12px;margin:0;">
                  © 2025 Piksel Duvarı · <a href="https://pikselduvari.com" style="color:#4f46e5;text-decoration:none;">pikselduvari.com</a>
                </p>
              </div>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Geçerli bir e-posta adresi girin" }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Daha önce bu e-posta ile kod alınmış mı?
  const { data: existing } = await supabase
    .from("tiktok_discounts")
    .select("id")
    .eq("email", normalizedEmail)
    .single();

  if (existing) {
    return NextResponse.json({ error: "Bu e-posta adresiyle daha önce kod alınmış" }, { status: 409 });
  }

  const code = generateCode();

  // Supabase'e kaydet
  const { error: dbError } = await supabase.from("tiktok_discounts").insert({ email: normalizedEmail, code });
  if (dbError) return NextResponse.json({ error: "Kayıt hatası" }, { status: 500 });

  // discount_codes tablosuna da ekle (ödeme sisteminde kullanılabilsin)
  await supabase.from("discount_codes").insert({
    code,
    discount_percent: 10,
    max_uses: 1,
    active: true,
  });

  // Mail gönder
  const { error: mailError } = await resend.emails.send({
    from: "Piksel Duvarı <noreply@pikselduvari.com>",
    to: normalizedEmail,
    subject: "🎉 %10 İndirim Kodun Hazır — Piksel Duvarı",
    html: emailHtml(code, normalizedEmail),
  });

  if (mailError) {
    // Mail gönderilemedi ama kodu döndür
    return NextResponse.json({ success: true, code, mailSent: false });
  }

  return NextResponse.json({ success: true, mailSent: true });
}
