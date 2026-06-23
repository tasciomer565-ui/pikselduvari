// Ortak e-posta HTML şablonları — Resend ile kullanılır

const BASE_STYLE = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #030712;
  color: #f9fafb;
  margin: 0; padding: 0;
`;

const WRAPPER = `max-width:600px;margin:0 auto;padding:24px 16px;`;

const HEADER = `
  background: linear-gradient(135deg, #312e81 0%, #4c1d95 100%);
  border-radius: 16px 16px 0 0;
  padding: 32px 36px;
  text-align: center;
`;

const BODY = `
  background: #111827;
  border: 1px solid #1f2937;
  border-top: none;
  border-radius: 0 0 16px 16px;
  padding: 36px;
`;

const FOOTER_STYLE = `
  text-align: center;
  color: #4b5563;
  font-size: 12px;
  margin-top: 24px;
  line-height: 1.6;
`;

const BTN = `
  display: inline-block;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #ffffff !important;
  text-decoration: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 15px;
  margin: 20px 0;
`;

const CODE_BOX = `
  background: #0f172a;
  border: 2px solid #4f46e5;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  margin: 24px 0;
`;

function footer() {
  return `
    <div style="${FOOTER_STYLE}">
      <p>Bu e-postayı almak istemiyorsanız <a href="https://pikselduvari.com/iletisim" style="color:#6366f1">buraya tıklayın</a>.</p>
      <p>© 2025 Piksel Duvarı · <a href="https://pikselduvari.com" style="color:#6366f1">pikselduvari.com</a></p>
      <p style="margin-top:8px">📍 Türkiye'nin Dijital Reklam Duvarı</p>
    </div>
  `;
}

// ─── 1. Satın Alma Onay Maili ────────────────────────────────────────────────
export function purchaseConfirmationEmail({
  ownerName,
  x,
  y,
  width,
  height,
  price,
  url,
}: {
  ownerName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  price: number;
  url?: string;
}): { subject: string; html: string } {
  const pixels = width * height;
  const subject = `✅ Pikseliniz Alındı — Piksel Duvarı`;

  const html = `
  <!DOCTYPE html>
  <html lang="tr">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="${BASE_STYLE}">
    <div style="${WRAPPER}">
      <div style="${HEADER}">
        <div style="font-size:48px;margin-bottom:12px">🎉</div>
        <h1 style="color:#fff;margin:0;font-size:24px;font-weight:800">Satın Alma Başarılı!</h1>
        <p style="color:#c4b5fd;margin:8px 0 0;font-size:15px">Pikseliniz incelemeye alındı</p>
      </div>
      <div style="${BODY}">
        <p style="color:#d1d5db;margin-top:0">Merhaba <strong style="color:#fff">${ownerName}</strong>,</p>
        <p style="color:#9ca3af;line-height:1.7">
          Piksel Duvarı'na hoş geldiniz! Ödemeniz başarıyla alındı. Pikseliniz 24 saat içinde incelenerek Türkiye haritasına eklenecektir.
        </p>

        <div style="${CODE_BOX}">
          <p style="color:#6366f1;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px">Piksel Bilgileriniz</p>
          <table style="width:100%;border-collapse:collapse;color:#e5e7eb;font-size:14px">
            <tr><td style="padding:6px 0;color:#9ca3af">Konum</td><td style="text-align:right;font-weight:600">X:${x}, Y:${y}</td></tr>
            <tr><td style="padding:6px 0;color:#9ca3af">Boyut</td><td style="text-align:right;font-weight:600">${width} × ${height} piksel</td></tr>
            <tr><td style="padding:6px 0;color:#9ca3af">Toplam alan</td><td style="text-align:right;font-weight:600">${pixels.toLocaleString("tr-TR")} piksel</td></tr>
            <tr><td style="padding:6px 0;color:#9ca3af">Tutar</td><td style="text-align:right;font-weight:600;color:#a78bfa">${price.toLocaleString("tr-TR")}₺</td></tr>
          </table>
        </div>

        <h3 style="color:#f3f4f6;font-size:15px;margin-bottom:12px">📋 Sonraki Adımlar</h3>
        <ol style="color:#9ca3af;line-height:2;padding-left:20px;margin:0 0 24px">
          <li>Ekibimiz pikselinizi <strong style="color:#fff">24 saat içinde</strong> inceleyecek</li>
          <li>Onaylandığında Türkiye haritasında görünmeye başlayacak</li>
          <li>Görselinizi dilediğiniz zaman güncelleyebilirsiniz</li>
          <li>Pikseliniz sonsuza kadar sizin</li>
        </ol>

        <div style="text-align:center">
          <a href="${url ?? "https://pikselduvari.com"}" style="${BTN}">🗺️ Haritada Görüntüle</a>
        </div>

        <div style="background:#0f172a;border-radius:10px;padding:16px;margin-top:8px">
          <p style="color:#6b7280;font-size:13px;margin:0">
            💬 Herhangi bir sorunuz için <a href="mailto:info@pikselduvari.com" style="color:#6366f1">info@pikselduvari.com</a> adresine yazın veya <a href="https://wa.me/905551663380" style="color:#22c55e">WhatsApp</a>'tan ulaşın.
          </p>
        </div>
      </div>
      ${footer()}
    </div>
  </body>
  </html>`;

  return { subject, html };
}

// ─── 2. Piksel Onay Maili (Admin onayladı) ──────────────────────────────────
export function pixelApprovedEmail({
  ownerName,
  websiteUrl,
  x,
  y,
  width,
  height,
}: {
  ownerName: string;
  websiteUrl?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}): { subject: string; html: string } {
  const subject = `🚀 Pikseliniz Yayında! — Piksel Duvarı`;

  const html = `
  <!DOCTYPE html>
  <html lang="tr">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="${BASE_STYLE}">
    <div style="${WRAPPER}">
      <div style="${HEADER}">
        <div style="font-size:48px;margin-bottom:12px">🚀</div>
        <h1 style="color:#fff;margin:0;font-size:24px;font-weight:800">Pikseliniz Yayında!</h1>
        <p style="color:#c4b5fd;margin:8px 0 0;font-size:15px">Türkiye haritasında artık görünüyorsunuz</p>
      </div>
      <div style="${BODY}">
        <p style="color:#d1d5db;margin-top:0">Merhaba <strong style="color:#fff">${ownerName}</strong>,</p>
        <p style="color:#9ca3af;line-height:1.7">
          Harika haber! Pikseliniz incelendi ve <strong style="color:#a78bfa">Türkiye haritasına eklendi</strong>.
          Artık pikselduvari.com'u ziyaret eden herkes markanızı görüyor.
        </p>

        <div style="background:linear-gradient(135deg,#14532d20,#16a34a20);border:1px solid #16a34a60;border-radius:12px;padding:20px;text-align:center;margin:24px 0">
          <div style="font-size:36px;margin-bottom:8px">✅</div>
          <p style="color:#4ade80;font-weight:700;font-size:18px;margin:0">Pikseliniz aktif</p>
          <p style="color:#6b7280;font-size:13px;margin:8px 0 0">X:${x}, Y:${y} · ${width}×${height} piksel</p>
        </div>

        <div style="text-align:center;margin:24px 0">
          <a href="https://pikselduvari.com" style="${BTN}">🗺️ Haritada Kendinizi Görün</a>
        </div>

        <h3 style="color:#f3f4f6;font-size:15px;margin-bottom:12px">💡 Pikselinizden Daha Fazla Verim Alın</h3>
        <ul style="color:#9ca3af;line-height:2.2;padding-left:20px;margin:0 0 20px">
          <li>Sosyal medyada paylaşın: <strong style="color:#fff">"Türkiye haritasındayız!"</strong></li>
          <li>Web sitenize "Piksel Duvarı'nda biz de varız" rozeti ekleyin</li>
          <li>Arkadaşlarınızı referans edin, <strong style="color:#a78bfa">her satıştan %10 komisyon</strong> alın</li>
          <li>Görselinizi <a href="https://pikselduvari.com" style="color:#6366f1">istediğiniz zaman güncelleyin</a></li>
        </ul>

        <div style="background:#0f172a;border-radius:10px;padding:16px">
          <p style="color:#6b7280;font-size:13px;margin:0">
            🎁 Referans programımıza katılmak için <a href="https://pikselduvari.com/referans" style="color:#6366f1">pikselduvari.com/referans</a> adresini ziyaret edin.
          </p>
        </div>
      </div>
      ${footer()}
    </div>
  </body>
  </html>`;

  return { subject, html };
}

// ─── 3. Bülten / E-posta Listesi Hoş Geldiniz Maili ────────────────────────
export function welcomeNewsletterEmail({
  email,
}: {
  email: string;
}): { subject: string; html: string } {
  const subject = `👋 Piksel Duvarı'na Hoş Geldiniz!`;

  const html = `
  <!DOCTYPE html>
  <html lang="tr">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="${BASE_STYLE}">
    <div style="${WRAPPER}">
      <div style="${HEADER}">
        <div style="font-size:48px;margin-bottom:12px">🇹🇷</div>
        <h1 style="color:#fff;margin:0;font-size:24px;font-weight:800">Piksel Duvarı'na Hoş Geldiniz</h1>
        <p style="color:#c4b5fd;margin:8px 0 0;font-size:15px">Türkiye'nin dijital reklam duvarı</p>
      </div>
      <div style="${BODY}">
        <p style="color:#d1d5db;margin-top:0">Merhaba,</p>
        <p style="color:#9ca3af;line-height:1.7">
          Piksel Duvarı bültenine kaydolduğunuz için teşekkürler. Artık platform güncellemeleri, özel kampanyalar ve indirim kodlarından ilk siz haberdar olacaksınız.
        </p>

        <div style="${CODE_BOX}">
          <p style="color:#6366f1;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px">Ne yapabilirsiniz?</p>
          <table style="width:100%;color:#e5e7eb;font-size:14px">
            <tr><td style="padding:8px 0">🗺️</td><td style="padding:8px 0">Türkiye haritasında piksel satın alın</td></tr>
            <tr><td style="padding:8px 0">💰</td><td style="padding:8px 0">Referans programıyla komisyon kazanın</td></tr>
            <tr><td style="padding:8px 0">🎁</td><td style="padding:8px 0">Kampanya indirimlerini kaçırmayın</td></tr>
            <tr><td style="padding:8px 0">📍</td><td style="padding:8px 0">81 ilde kalıcı dijital varlık kurun</td></tr>
          </table>
        </div>

        <div style="text-align:center">
          <a href="https://pikselduvari.com" style="${BTN}">🗺️ Haritayı İncele</a>
        </div>

        <div style="background:#0f172a;border-radius:10px;padding:16px;margin-top:8px">
          <p style="color:#6b7280;font-size:13px;margin:0 0 8px">
            💡 <strong style="color:#9ca3af">İpucu:</strong> İlk alışverişinizde %10 indirim için TikTok'ta <a href="https://www.tiktok.com/@pikselduvari" style="color:#6366f1">@pikselduvari</a>'ı takip edin.
          </p>
          <p style="color:#6b7280;font-size:13px;margin:0">
            📞 Sorularınız için: <a href="https://wa.me/905551663380" style="color:#22c55e">WhatsApp</a> veya <a href="mailto:info@pikselduvari.com" style="color:#6366f1">info@pikselduvari.com</a>
          </p>
        </div>
      </div>
      ${footer()}
    </div>
  </body>
  </html>`;

  return { subject, html };
}
