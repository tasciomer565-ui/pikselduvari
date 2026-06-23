import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Şartları — Piksel Duvarı",
  description: "Piksel Duvarı kullanım şartları ve hizmet koşulları.",
};

export default function KullanimSartlariPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-indigo-400 hover:text-indigo-300 text-sm mb-8 inline-block">
          ← Ana Sayfaya Dön
        </a>
        <h1 className="text-3xl font-bold mb-8">Kullanım Şartları</h1>
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            <strong>Son güncellenme:</strong> Ocak 2025
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Hizmet Tanımı</h2>
            <p>
              Piksel Duvarı, kullanıcıların 1.000.000 piksellik dijital reklam alanında piksel satın
              almasına imkân tanıyan bir platformdur. Satın alınan piksel alanları kalıcı nitelikte olup
              tek seferlik ödeme modeline dayanmaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Kabul Edilen Kullanım Koşulları</h2>
            <p>
              Piksel Duvarı&apos;nı kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Yüklenen görseller yasalara aykırı, müstehcen veya hakaret içeren içerik barındıramaz.</li>
              <li>Başkasının telif hakkına konu olan görseller izinsiz kullanılamaz.</li>
              <li>Platformun işleyişini engelleyici faaliyetlerde bulunulamaz.</li>
              <li>Yanıltıcı veya sahte bilgi verilemez.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Ödeme ve İade Politikası</h2>
            <p>
              Piksel satın alma işlemleri tek seferlik ödemeye tabidir. Onaylanan pikseller için iade
              yapılmamaktadır. Ödeme başarısız olduğunda rezervasyon otomatik olarak iptal edilir.
              Admin onayı reddedilen durumlarda iade değerlendirmesi yapılabilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. İçerik Moderasyonu</h2>
            <p>
              Yüklenen tüm görseller admin onayına tabidir. Piksel Duvarı, uygunsuz gördüğü içerikleri
              reddetme veya kaldırma hakkını saklı tutar. İçerik moderasyonu sonrası bildirim yapılmaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Hizmet Sürekliliği</h2>
            <p>
              Piksel Duvarı, platformun kesintisiz çalışması için gerekli önlemleri alır. Ancak teknik
              arızalar veya mücbir sebepler nedeniyle kesinti yaşanabilir. Bu durumlarda sorumluluk
              kabul edilmemektedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Değişiklik Hakkı</h2>
            <p>
              Piksel Duvarı, bu kullanım şartlarını önceden bildirmeksizin değiştirme hakkını saklı
              tutar. Değişiklikler sitede yayınlandığı tarihte yürürlüğe girer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. İletişim</h2>
            <p>
              Kullanım şartlarına ilişkin sorularınız için{" "}
              <a href="/iletisim" className="text-indigo-400 underline">
                iletişim sayfamızı
              </a>{" "}
              ziyaret edebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
