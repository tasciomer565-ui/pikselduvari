import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Basın Odası — Piksel Duvarı",
  description: "Piksel Duvarı basın bültenleri, logo ve marka kaynakları, medya iletişim bilgileri. Gazeteciler ve blog yazarları için.",
  alternates: { canonical: "https://pikselduvari.com/basin" },
  keywords: "piksel duvarı basın, medya kiti, piksel reklam türkiye haber, dijital reklam platformu",
};

export default function BasinPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold">PD</div>
          <span className="font-bold">Piksel Duvarı</span>
        </Link>
        <Link href="/" className="text-gray-400 hover:text-white text-sm transition">← Ana Sayfa</Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-3">Medya & Basın</div>
          <h1 className="text-4xl font-extrabold mb-4">Basın Odası</h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            Piksel Duvarı hakkında haber yazmak mı istiyorsunuz? İhtiyaç duyduğunuz her şey burada. Sorularınız için <a href="mailto:info@pikselduvari.com" className="text-indigo-400 hover:underline">info@pikselduvari.com</a> adresine yazın.
          </p>
        </div>

        {/* Hızlı iletişim */}
        <div className="bg-indigo-950/30 border border-indigo-700/40 rounded-2xl p-6 mb-10 flex items-center gap-5">
          <div className="text-4xl shrink-0">📰</div>
          <div>
            <div className="font-bold mb-1">Basın İletişim</div>
            <p className="text-gray-400 text-sm">Röportaj, açıklama ve medya talepleriniz için 24 saat içinde yanıt veriyoruz.</p>
            <div className="flex gap-3 mt-3 flex-wrap">
              <a href="mailto:info@pikselduvari.com" className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-lg text-sm font-semibold">E-posta Gönder</a>
              <a href="https://wa.me/905551663380" target="_blank" rel="noopener noreferrer" className="bg-green-700 hover:bg-green-600 transition px-4 py-2 rounded-lg text-sm font-semibold">WhatsApp</a>
            </div>
          </div>
        </div>

        {/* Platform hakkında kısa bilgi */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-5">📋 Platform Hakkında Kısa Bilgi</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <div><span className="text-gray-500">Platform adı:</span> <span className="text-white font-semibold">Piksel Duvarı</span></div>
              <div><span className="text-gray-500">Web sitesi:</span> <a href="https://pikselduvari.com" className="text-indigo-400">pikselduvari.com</a></div>
              <div><span className="text-gray-500">Kuruluş yılı:</span> <span className="text-white">2025</span></div>
              <div><span className="text-gray-500">Menşei:</span> <span className="text-white">Türkiye 🇹🇷</span></div>
              <div><span className="text-gray-500">Kategori:</span> <span className="text-white">Dijital Reklam Platformu</span></div>
            </div>
            <div className="space-y-3">
              <div><span className="text-gray-500">Toplam piksel:</span> <span className="text-white font-semibold">1.000.000</span></div>
              <div><span className="text-gray-500">Harita kapsamı:</span> <span className="text-white">Türkiye'nin 81 ili</span></div>
              <div><span className="text-gray-500">Fiyat:</span> <span className="text-white">1 piksel = 1₺ (tek seferlik)</span></div>
              <div><span className="text-gray-500">Minimum alan:</span> <span className="text-white">20×20 = 400₺</span></div>
              <div><span className="text-gray-500">İletişim:</span> <a href="mailto:info@pikselduvari.com" className="text-indigo-400">info@pikselduvari.com</a></div>
            </div>
          </div>
        </div>

        {/* Basın bültenleri */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-5">📄 Basın Bültenleri</h2>
          <div className="space-y-3">
            {[
              {
                date: "15 Ocak 2025",
                title: "Türkiye'nin İlk Piksel Reklam Duvarı Açıldı",
                summary: "Piksel Duvarı, 1.000.000 piksellik Türkiye haritası üzerinde kalıcı dijital reklam alanı sunan Türkiye'nin ilk ve tek platformunu hayata geçirdi.",
              },
              {
                date: "18 Mayıs 2025",
                title: "Piksel Duvarı Referans Programını Başlattı",
                summary: "Her başarılı yönlendirmede %10 komisyon kazandıran referans programı, dijital pazarlamacılar ve içerik üreticileri için yeni bir gelir kapısı açtı.",
              },
              {
                date: "1 Haziran 2025",
                title: "Piksel Duvarı Türkiye'nin 81 İlini Kapsıyor",
                summary: "Platform güncellenmesiyle Türkiye'nin tüm illerinde şehir bazlı piksel reklam sayfaları hayata geçirildi.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition">
                <div className="text-xs text-gray-500 mb-2">{item.date}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.summary}</p>
                <button className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition">Tam metni talep edin →</button>
              </div>
            ))}
          </div>
        </div>

        {/* Logo & marka */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-5">🎨 Logo & Marka Kaynakları</h2>
          <p className="text-gray-400 text-sm mb-6">Logo ve marka materyallerini yayınlarınızda kullanmak için lütfen iletişime geçin.</p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { bg: "bg-indigo-600", text: "Birincil Logo (Koyu Arka Plan)" },
              { bg: "bg-white", text: "Birincil Logo (Açık Arka Plan)", textColor: "text-gray-900" },
              { bg: "bg-gray-800", text: "Tek Renk Logo" },
            ].map((logo, i) => (
              <div key={i} className={`${logo.bg} rounded-xl p-6 flex items-center justify-center`}>
                <div className={`text-center ${logo.textColor ?? "text-white"}`}>
                  <div className="text-3xl font-extrabold mb-1">PD</div>
                  <div className="text-xs font-semibold">Piksel Duvarı</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm text-gray-400">
            <p>✅ Haber içeriklerinde kullanıma açık</p>
            <p>✅ Akademik çalışmalarda kullanıma açık</p>
            <p>❌ Ticari amaçla kullanım için onay gereklidir</p>
          </div>

          <div className="mt-4">
            <a href="mailto:info@pikselduvari.com?subject=Logo ve Marka Materyali Talebi" className="bg-gray-700 hover:bg-gray-600 transition px-4 py-2 rounded-lg text-sm font-semibold inline-block">
              Logo Dosyalarını Talep Et
            </a>
          </div>
        </div>

        {/* Medya kiti */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-5">📦 Medya Kiti İçeriği</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Platform tanıtım metni (TR/EN)",
              "Yüksek çözünürlüklü logo dosyaları",
              "Platform ekran görüntüleri",
              "Kurucuların biyografisi",
              "Platform istatistikleri",
              "Kullanım kuralları ve SSS",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-green-400">✓</span> {item}
              </div>
            ))}
          </div>
          <div className="mt-5">
            <a href="mailto:info@pikselduvari.com?subject=Medya Kiti Talebi" className="bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2.5 rounded-xl text-sm font-semibold inline-block">
              Medya Kiti Talep Et
            </a>
          </div>
        </div>

        {/* Haber yazarlarına not */}
        <div className="bg-yellow-950/30 border border-yellow-800/40 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-yellow-300 mb-2">📝 Haber Yazarlarına Not</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Haberlerinizde <strong className="text-white">pikselduvari.com</strong> bağlantısını eklerseniz memnuniyet duyarız.
            Röportaj talebiniz varsa <a href="mailto:info@pikselduvari.com" className="text-indigo-400 hover:underline">info@pikselduvari.com</a> adresine yazın — genellikle 24 saat içinde yanıt veriyoruz.
          </p>
        </div>

        {/* SSS basın için */}
        <div>
          <h2 className="text-xl font-bold mb-5">❓ Basın için SSS</h2>
          <div className="space-y-3">
            {[
              { q: "Piksel Duvarı nasıl çalışır?", a: "Piksel Duvarı, 1.000.000 piksellik bir Türkiye haritası sunar. İşletmeler piksel (alan) satın alır, logo veya görsel yükler. Ziyaretçiler haritayı incelediğinde bu logolar ve markanın web sitesi görünür. 1 piksel = 1₺, tek seferlik ödeme." },
              { q: "Kim kurdu?", a: "Piksel Duvarı, Türk girişimciler tarafından 2025 yılında kuruldu. İletişim için info@pikselduvari.com adresini kullanabilirsiniz." },
              { q: "Yatırım aldınız mı?", a: "Platform şu an öz sermayeyle büyüyor. Yatırım görüşmeleri için info@pikselduvari.com adresini kullanabilirsiniz." },
              { q: "Kaç piksel satıldı?", a: "Güncel istatistikler için info@pikselduvari.com adresine yazın. Veriler talep üzerine paylaşılmaktadır." },
            ].map((faq, i) => (
              <details key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <summary className="px-5 py-4 font-semibold text-sm cursor-pointer hover:bg-gray-800/50 transition">{faq.q}</summary>
                <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-3">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
