import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda — Piksel Duvarı",
  description: "Piksel Duvarı'nın hikayesi, misyonu ve vizyonu. Türkiye'nin ilk piksel reklam platformunu kuran ekip hakkında bilgi edinin.",
  alternates: { canonical: "https://pikselduvari.com/hakkimizda" },
  keywords: "piksel duvarı hakkında, piksel reklam türkiye, dijital reklam platformu, türk girişimi",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Piksel Duvarı",
  url: "https://pikselduvari.com",
  description: "Türkiye'nin ilk ve tek piksel reklam platformu. 1.000.000 piksellik Türkiye haritası üzerinde kalıcı dijital reklam alanı.",
  foundingDate: "2025",
  foundingLocation: { "@type": "Place", name: "Türkiye" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-555-166-33-80",
    contactType: "customer service",
    availableLanguage: "Turkish",
  },
  sameAs: ["https://www.tiktok.com/@pikselduvari"],
};

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold">PD</div>
          <span className="font-bold">Piksel Duvarı</span>
        </Link>
        <Link href="/" className="text-gray-400 hover:text-white text-sm transition">← Ana Sayfa</Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-3xl font-extrabold mx-auto mb-6">PD</div>
          <h1 className="text-4xl font-extrabold mb-4">Piksel Duvarı Hakkında</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Türkiye&apos;nin işletmelerinin dijital dünyada kalıcı iz bırakabilmesi için yola çıktık. Her piksel, bir markanın hikayesinin parçası.
          </p>
        </div>

        {/* Hikaye */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-5">🚀 Hikayemiz</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              2005 yılında İngiliz öğrenci Alex Tew, 1 milyon piksellik web sitesi kurarak internet tarihine geçti. Her piksel 1 dolara satıldı, site 37 günde doldu. Bu fikir bize ilham verdi.
            </p>
            <p>
              <strong className="text-white">Türkiye&apos;nin bu hikayeye kendi versiyonu olmalıydı.</strong> Ve Türkiye haritası üzerinde bir piksel duvarı — hem coğrafi hem kültürel olarak çok daha anlamlı bir konsept olurdu.
            </p>
            <p>
              2025 yılında Piksel Duvarı&apos;nı hayata geçirdik. Amaç basit: Türk işletmelerinin dijital dünyada <strong className="text-white">kalıcı</strong>, <strong className="text-white">ekonomik</strong> ve <strong className="text-white">anlamlı</strong> bir varlık kurmasını sağlamak.
            </p>
          </div>
        </div>

        {/* Misyon & Vizyon */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-2xl p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-lg mb-3">Misyonumuz</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Her büyüklükteki Türk işletmesinin dijital dünyada kalıcı ve uygun maliyetli reklam alanı edinmesini sağlamak. Geleneksel reklam kanallarının dışında, yenilikçi ve sürdürülebilir bir alternatif sunmak.
            </p>
          </div>
          <div className="bg-purple-950/30 border border-purple-800/40 rounded-2xl p-6">
            <div className="text-3xl mb-3">🔭</div>
            <h3 className="font-bold text-lg mb-3">Vizyonumuz</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Piksel Duvarı&apos;nı Türkiye&apos;nin en çok ziyaret edilen dijital reklam platformuna dönüştürmek. Her pikselin bir markanın hikayesini anlattığı, 1.000.000 piksellik canlı bir Türkiye haritası.
            </p>
          </div>
        </div>

        {/* Değerler */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">💎 Değerlerimiz</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: "🔒", title: "Şeffaflık", desc: "Gizli ücret yok. 1 piksel = 1₺. Fiyatlarımız her zaman açık ve net." },
              { icon: "♾️", title: "Kalıcılık", desc: "Bir kez öde, sonsuza kadar kal. Abonelik yok, yenileme yok." },
              { icon: "🇹🇷", title: "Türk Girişimi", desc: "Yerli sermaye, yerli ekip. Türk işletmelerinin başarısı için çalışıyoruz." },
              { icon: "🤝", title: "Güven", desc: "PayTR 3D Secure, SSL ve KVKK uyumluluğuyla güvenli alışveriş." },
              { icon: "⚡", title: "Hız", desc: "Ödeme ve görsel yüklemesinin ardından 24 saat içinde yayına girin." },
              { icon: "🌱", title: "Büyüme", desc: "Platform büyüdükçe sizin pikselinizin değeri de artar. Birlikte büyüyoruz." },
            ].map((v) => (
              <div key={v.title} className="flex gap-4">
                <span className="text-2xl shrink-0">{v.icon}</span>
                <div>
                  <div className="font-semibold mb-1">{v.title}</div>
                  <div className="text-gray-400 text-sm leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rakamlar */}
        <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-700/40 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">📊 Piksel Duvarı Rakamlarla</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "1.000.000", label: "Toplam Piksel" },
              { value: "81", label: "İl Kapsamı" },
              { value: "16", label: "Harita Bölgesi" },
              { value: "1₺", label: "Piksel Başı Fiyat" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-indigo-300 mb-1">{s.value}</div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Zaman çizelgesi */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">📅 Kilometre Taşlarımız</h2>
          <div className="space-y-4">
            {[
              { date: "Ocak 2025", event: "Piksel Duvarı fikri doğdu", desc: "Million Dollar Homepage'den ilham alarak Türkiye versiyonu planlandı." },
              { date: "Mart 2025", event: "Platform geliştirme başladı", desc: "Türkiye haritası, ödeme sistemi ve görsel yükleme altyapısı kuruldu." },
              { date: "Haziran 2025", event: "Beta yayına girdi", desc: "İlk kullanıcılar platforma davet edildi, geri bildirimler alındı." },
              { date: "2025 Devam", event: "Büyüme ve genişleme", desc: "Referans programı, şehir sayfaları ve blog içerikleriyle platform güçleniyor." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1 shrink-0" />
                  {i < 3 && <div className="w-0.5 bg-gray-700 flex-1 mt-1" />}
                </div>
                <div className="pb-4">
                  <div className="text-xs text-indigo-400 font-semibold mb-1">{item.date}</div>
                  <div className="font-semibold mb-1">{item.event}</div>
                  <div className="text-gray-500 text-sm">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* İletişim */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: "📧", label: "E-posta", value: "info@pikselduvari.com", href: "mailto:info@pikselduvari.com" },
            { icon: "📱", label: "WhatsApp", value: "+90 555 166 33 80", href: "https://wa.me/905551663380" },
            { icon: "🎵", label: "TikTok", value: "@pikselduvari", href: "https://www.tiktok.com/@pikselduvari" },
          ].map((c) => (
            <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl p-5 text-center transition group">
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="text-gray-500 text-xs mb-1">{c.label}</div>
              <div className="text-white text-sm font-medium group-hover:text-indigo-300 transition">{c.value}</div>
            </a>
          ))}
        </div>

        {/* Basın linkleri */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm mb-4">Basın ve medya sorularınız için</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/basin" className="bg-gray-700 hover:bg-gray-600 transition px-5 py-2.5 rounded-xl text-sm font-semibold">📰 Basın Odası</Link>
            <a href="mailto:info@pikselduvari.com" className="border border-gray-700 hover:border-gray-500 text-gray-300 transition px-5 py-2.5 rounded-xl text-sm font-semibold">info@pikselduvari.com</a>
          </div>
        </div>
      </main>
    </div>
  );
}
