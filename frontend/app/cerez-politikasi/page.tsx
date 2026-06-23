import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası — Piksel Duvarı",
  description: "Piksel Duvarı çerez politikası ve çerez kullanım bilgileri.",
};

export default function CerezPolitikasiPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-indigo-400 hover:text-indigo-300 text-sm mb-8 inline-block">
          ← Ana Sayfaya Dön
        </a>
        <h1 className="text-3xl font-bold mb-8">Çerez Politikası</h1>
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            <strong>Son güncellenme:</strong> Ocak 2025
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Çerez Nedir?</h2>
            <p>
              Çerezler (cookies), web siteleri tarafından tarayıcınıza kaydedilen küçük metin
              dosyalarıdır. Web sitemizi ziyaret ettiğinizde, size daha iyi bir deneyim sunmak
              amacıyla çerezlerden yararlanılmaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Kullandığımız Çerez Türleri</h2>
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <h3 className="font-semibold text-white mb-1">Zorunlu Çerezler</h3>
                <p className="text-sm">
                  Web sitesinin temel işlevleri için gerekli çerezlerdir. Bu çerezler devre dışı
                  bırakılamaz.
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <h3 className="font-semibold text-white mb-1">Tercih Çerezleri</h3>
                <p className="text-sm">
                  Çerez onay tercihleriniz gibi site ayarlarınızı hatırlamak için kullanılır
                  (localStorage).
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <h3 className="font-semibold text-white mb-1">Analitik Çerezler</h3>
                <p className="text-sm">
                  Siteyi nasıl kullandığınızı anlamamıza yardımcı olan çerezlerdir. Bu çerezler
                  onayınıza bağlıdır.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Çerezleri Yönetme</h2>
            <p>
              Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Ancak bu işlem
              sitenin bazı özelliklerinin çalışmamasına neden olabilir. Çerez tercihlerinizi
              sitenin alt kısmındaki çerez banner&apos;ından da yönetebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">İletişim</h2>
            <p>
              Çerez politikamız hakkında sorularınız için{" "}
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
