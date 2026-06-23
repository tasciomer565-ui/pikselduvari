import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni — Piksel Duvarı",
  description: "Piksel Duvarı KVKK Kişisel Verilerin Korunması Kanunu aydınlatma metni.",
};

export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-indigo-400 hover:text-indigo-300 text-sm mb-8 inline-block">
          ← Ana Sayfaya Dön
        </a>
        <h1 className="text-3xl font-bold mb-8">KVKK Aydınlatma Metni</h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-gray-300 leading-relaxed">
          <p>
            <strong>Son güncellenme:</strong> Ocak 2025
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Veri Sorumlusu</h2>
            <p>
              Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında
              Piksel Duvarı ("Şirket") tarafından hazırlanmıştır. Kişisel verileriniz, veri sorumlusu
              sıfatıyla Piksel Duvarı tarafından işlenecektir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. İşlenen Kişisel Veriler</h2>
            <p>Piksel Duvarı olarak aşağıdaki kişisel verilerinizi işlemekteyiz:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ad ve soyad bilgisi</li>
              <li>E-posta adresi</li>
              <li>Web sitesi URL adresi</li>
              <li>Ödeme bilgileri (kredi kartı bilgileri güvenli ödeme altyapısı tarafından işlenmektedir)</li>
              <li>IP adresi ve tarayıcı bilgileri</li>
              <li>Yüklenen görseller</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Kişisel Verilerin İşlenme Amacı</h2>
            <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Piksel satın alma işlemlerinin gerçekleştirilmesi</li>
              <li>Ödeme işlemlerinin takibi ve doğrulanması</li>
              <li>Reklam alanlarının yönetimi ve yayına alınması</li>
              <li>Müşteri hizmetleri ve destek sağlanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Kişisel Verilerin Aktarılması</h2>
            <p>
              Kişisel verileriniz; ödeme altyapısı sağlayıcıları, bulut depolama hizmetleri ve yasal
              zorunluluk halinde kamu kurumlarıyla paylaşılabilir. Yurt dışı aktarım söz konusu
              olduğunda KVKK&apos;nın 9. maddesi çerçevesinde gerekli güvenceler sağlanmaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Kişisel Veri Sahibinin Hakları</h2>
            <p>KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>Silinmesini veya yok edilmesini isteme</li>
              <li>Zararın giderilmesini talep etme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. İletişim</h2>
            <p>
              KVKK kapsamındaki haklarınızı kullanmak için{" "}
              <a href="/iletisim" className="text-indigo-400 underline">
                iletişim sayfamız
              </a>{" "}
              üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
