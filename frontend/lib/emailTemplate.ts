/**
 * Turkish HTML email templates for Piksel Duvarı
 */

export interface PurchaseEmailData {
  ownerName: string;
  websiteUrl: string;
  width: number;
  height: number;
  x: number;
  y: number;
  price: number;
  pixelId: string;
  uploadUrl: string;
}

export function purchaseConfirmationEmail(data: PurchaseEmailData): string {
  const pixelCount = data.width * data.height;
  const regionLabel = `(${data.x}, ${data.y})`;

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Satın Alımınız Onaylandı — Piksel Duvarı</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:Inter,Arial,sans-serif;color:#f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1e293b;border-radius:16px;border:1px solid #334155;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:32px;text-align:center;">
              <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;background:rgba(255,255,255,0.2);border-radius:12px;font-size:20px;font-weight:800;color:#fff;margin-bottom:16px;">PD</div>
              <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;">Ödemeniz Alındı!</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Piksel Duvarı'na hoş geldiniz</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;">Merhaba <strong style="color:#f8fafc;">${data.ownerName}</strong>,</p>
              <p style="margin:0 0 24px;color:#94a3b8;font-size:14px;line-height:1.6;">
                Piksel Duvarı'ndan alan satın aldığınız için teşekkür ederiz. Siparişiniz başarıyla alındı ve inceleme sürecine alındı.
              </p>

              <!-- Order Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:12px;border:1px solid #1e293b;overflow:hidden;margin-bottom:24px;">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #1e293b;">
                    <p style="margin:0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;">Sipariş Özeti</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#94a3b8;font-size:13px;padding-bottom:12px;">Alan Boyutu</td>
                        <td style="color:#f8fafc;font-size:13px;text-align:right;font-family:monospace;padding-bottom:12px;">${data.width}×${data.height} piksel</td>
                      </tr>
                      <tr>
                        <td style="color:#94a3b8;font-size:13px;padding-bottom:12px;">Toplam Piksel</td>
                        <td style="color:#f8fafc;font-size:13px;text-align:right;padding-bottom:12px;">${pixelCount.toLocaleString("tr-TR")} piksel</td>
                      </tr>
                      <tr>
                        <td style="color:#94a3b8;font-size:13px;padding-bottom:12px;">Konum</td>
                        <td style="color:#f8fafc;font-size:13px;text-align:right;font-family:monospace;padding-bottom:12px;">${regionLabel}</td>
                      </tr>
                      <tr>
                        <td style="color:#94a3b8;font-size:13px;padding-bottom:12px;">Website</td>
                        <td style="color:#6366f1;font-size:13px;text-align:right;padding-bottom:12px;">${data.websiteUrl}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-top:1px solid #1e293b;padding-top:12px;"></td>
                      </tr>
                      <tr>
                        <td style="color:#f8fafc;font-size:14px;font-weight:600;">Toplam Ödeme</td>
                        <td style="color:#818cf8;font-size:18px;font-weight:700;text-align:right;">${data.price.toLocaleString("tr-TR")} ₺</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <div style="background:#1e3a5f;border:1px solid #1d4ed8;border-radius:12px;padding:20px;margin-bottom:24px;">
                <p style="margin:0 0 12px;color:#93c5fd;font-size:13px;font-weight:600;">📋 Sonraki Adımlar</p>
                <ol style="margin:0;padding-left:20px;color:#cbd5e1;font-size:13px;line-height:1.8;">
                  <li>Logonuzu/görselinizi yükleyin (aşağıdaki bağlantıya tıklayın)</li>
                  <li>Ekibimiz görselinizi 24 saat içinde inceleyecek</li>
                  <li>Onaylandıktan sonra alanınız canlıya alınacak</li>
                  <li>Alanınız sonsuza kadar duvarda yer alacak!</li>
                </ol>
              </div>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:8px 0 24px;">
                    <a href="${data.uploadUrl}" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-size:15px;font-weight:600;">
                      📁 Logonuzu Yükleyin
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#64748b;font-size:12px;line-height:1.6;text-align:center;">
                Sorularınız için WhatsApp: <a href="https://wa.me/905551663380" style="color:#6366f1;">+90 555 166 33 80</a><br/>
                E-posta: <a href="mailto:info@pikselduvari.com" style="color:#6366f1;">info@pikselduvari.com</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#0f172a;padding:20px;text-align:center;border-top:1px solid #1e293b;">
              <p style="margin:0;color:#475569;font-size:11px;">
                Piksel Duvarı © 2025 — Her piksel sonsuza kadar senin.<br/>
                <a href="https://pikselduvari.com" style="color:#6366f1;">pikselduvari.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function approvalNotificationEmail(data: { ownerName: string; websiteUrl: string }): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8" /><title>Alanınız Onaylandı — Piksel Duvarı</title></head>
<body style="margin:0;padding:40px 16px;background:#0f172a;font-family:Inter,Arial,sans-serif;color:#f8fafc;">
  <div style="max-width:500px;margin:0 auto;background:#1e293b;border-radius:16px;border:1px solid #334155;padding:32px;text-align:center;">
    <div style="font-size:48px;margin-bottom:16px;">🎉</div>
    <h1 style="color:#fff;margin:0 0 8px;">Alanınız Onaylandı!</h1>
    <p style="color:#94a3b8;margin:0 0 24px;">Merhaba <strong style="color:#f8fafc;">${data.ownerName}</strong>, piksel alanınız incelendi ve onaylandı.</p>
    <p style="color:#94a3b8;margin:0 0 24px;">Alanınız artık <strong style="color:#818cf8;">pikselduvari.com</strong> üzerinde canlı olarak görüntülenmektedir!</p>
    <a href="https://pikselduvari.com" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-size:15px;font-weight:600;">Duvara Git →</a>
  </div>
</body>
</html>`;
}
