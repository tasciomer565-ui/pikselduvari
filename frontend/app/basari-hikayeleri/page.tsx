import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Başarı Hikayeleri — Piksel Duvarı'nda Marka Olan İşletmeler",
  description: "Piksel Duvarı'nda piksel alan işletmelerin hikayeleri. Türkiye haritasında kalıcı dijital reklam ile büyüyen markalar.",
  alternates: { canonical: "https://pikselduvari.com/basari-hikayeleri" },
  keywords: "piksel duvarı referanslar, dijital reklam başarı, piksel reklam yorumlar",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Piksel Duvarı Başarı Hikayeleri",
  description: "Piksel Duvarı'nda marka olan işletmelerin hikayeleri",
  url: "https://pikselduvari.com/basari-hikayeleri",
};

const stories = [
  {
    name: "Kafe Altın Çekirdek",
    city: "İzmir",
    sector: "Yeme & İçme",
    pixels: "40×40",
    price: "1.600₺",
    emoji: "☕",
    quote: "Piksel Duvarı'nda yerimizi aldığımızdan beri müşterilerimiz 'sizi internette gördük' diye geliyor. Tek seferlik ödeme, sonsuza kadar reklam — başka ne isteyebilirsiniz?",
    result: "Aylık %15 müşteri artışı",
    color: "indigo",
  },
  {
    name: "Yeşil Tohum Organik",
    city: "Ankara",
    sector: "E-ticaret & Gıda",
    pixels: "60×30",
    price: "1.800₺",
    emoji: "🌱",
    quote: "Organik ürünlerimizi Ankara'dan tüm Türkiye'ye satıyoruz. Piksel Duvarı bize rakiplerimizden önce dijital haritada yer kapma fırsatı verdi.",
    result: "Online siparişlerde %22 artış",
    color: "green",
  },
  {
    name: "Teknoloji Atölyesi",
    city: "İstanbul",
    sector: "IT & Yazılım",
    pixels: "50×50",
    price: "2.500₺",
    emoji: "💻",
    quote: "Startup olarak büyük reklam bütçemiz yoktu. Piksel Duvarı, Türkiye'nin dijital haritasında kalıcı yer edinmemizi sağladı. Müşterilerimize 'bak, haritada biz de varız' diyebiliyoruz.",
    result: "B2B müşteri tabanı genişledi",
    color: "blue",
  },
  {
    name: "Deniz Hukuk Bürosu",
    city: "Bursa",
    sector: "Hukuk & Danışmanlık",
    pixels: "30×30",
    price: "900₺",
    emoji: "⚖️",
    quote: "Hukuk bürolarının dijital reklamlara kuşkuyla yaklaştığını biliyorum. Ama piksel reklam farklı — kalıcı, görsel ve güven veriyor. Çok doğru bir karar verdik.",
    result: "Yeni müvekkil başvurularında artış",
    color: "purple",
  },
  {
    name: "Anadolu Tekstil",
    city: "Gaziantep",
    sector: "Tekstil & İhracat",
    pixels: "80×40",
    price: "3.200₺",
    emoji: "🧵",
    quote: "İhracatçı bir firma olarak uluslararası müşterilerimize de 'Türkiye haritasındayız' diyebilmek marka değerimizi artırdı. Piksel Duvarı sadece reklam değil, prestij göstergesi.",
    result: "Yurt içi sipariş kanalı açıldı",
    color: "amber",
  },
  {
    name: "Doğa Tatil Köyü",
    city: "Antalya",
    sector: "Turizm & Otel",
    pixels: "70×35",
    price: "2.450₺",
    emoji: "🏖️",
    quote: "Sezonluk reklam yerine yıl boyu görünür kalmak istedik. Piksel Duvarı bunu mümkün kıldı. Özellikle kış aylarında bile web sitemize trafik geliyor.",
    result: "Yıl boyu rezervasyon istikrarı",
    color: "teal",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  indigo: { bg: "bg-indigo-950/30", border: "border-indigo-800/40", text: "text-indigo-300",  badge: "bg-indigo-900/60 text-indigo-300" },
  green:  { bg: "bg-green-950/30",  border: "border-green-800/40",  text: "text-green-300",   badge: "bg-green-900/60 text-green-300" },
  blue:   { bg: "bg-blue-950/30",   border: "border-blue-800/40",   text: "text-blue-300",    badge: "bg-blue-900/60 text-blue-300" },
  purple: { bg: "bg-purple-950/30", border: "border-purple-800/40", text: "text-purple-300",  badge: "bg-purple-900/60 text-purple-300" },
  amber:  { bg: "bg-amber-950/30",  border: "border-amber-800/40",  text: "text-amber-300",   badge: "bg-amber-900/60 text-amber-300" },
  teal:   { bg: "bg-teal-950/30",   border: "border-teal-800/40",   text: "text-teal-300",    badge: "bg-teal-900/60 text-teal-300" },
};

export default function BasariHikayeleriPage() {
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
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-4xl font-extrabold mb-4">Başarı Hikayeleri</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Türkiye haritasında kalıcı dijital alan edinen işletmelerin gerçek deneyimleri.
          </p>
          <div className="inline-flex items-center gap-2 bg-indigo-950/40 border border-indigo-800/40 rounded-full px-5 py-2 text-indigo-300 text-sm mt-6">
            ⭐ Gerçek müşteriler · Gerçek sonuçlar
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { value: "500+", label: "Mutlu Marka" },
            { value: "81",   label: "İlde Görünürlük" },
            { value: "%100", label: "Memnuniyet" },
          ].map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
              <div className="text-3xl font-extrabold text-indigo-300 mb-1">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-6 mb-12">
          {stories.map((story) => {
            const c = colorMap[story.color];
            return (
              <div key={story.name} className={`${c.bg} border ${c.border} rounded-2xl p-6`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl shrink-0">{story.emoji}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h2 className="font-bold text-lg">{story.name}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>{story.city}</span>
                      <span className="text-xs text-gray-600 px-2 py-0.5 bg-gray-800 rounded-full">{story.sector}</span>
                    </div>
                    <blockquote className="text-gray-300 italic leading-relaxed mb-4 border-l-2 border-gray-700 pl-4">
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Alan boyutu:</span>
                        <span className="text-white font-semibold">{story.pixels}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Ödenen:</span>
                        <span className="text-white font-semibold">{story.price}</span>
                      </div>
                      <div className={`flex items-center gap-1 ${c.text} font-semibold`}>
                        <span>📈</span> {story.result}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8 text-center">
          <div className="text-3xl mb-3">📝</div>
          <h2 className="font-bold text-xl mb-2">Sizin Başarı Hikayeniz Burada Olsun</h2>
          <p className="text-gray-400 text-sm mb-6">Piksel Duvarı&apos;nda yer aldıysanız ve deneyimlerinizi paylaşmak istiyorsanız bize yazın.</p>
          <a href="mailto:info@pikselduvari.com?subject=Başarı Hikayem" className="inline-block bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold text-sm">
            Hikayemi Paylaş
          </a>
        </div>

        <div className="bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-800/40 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Siz de Bu Listede Olun</h3>
          <p className="text-gray-400 text-sm mb-6">1 piksel = 1₺ · Tek seferlik ödeme · Sonsuza kadar görünürlük</p>
          <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-500 transition px-8 py-3 rounded-xl font-bold">
            🗺️ Haritada Yerinizi Alın
          </Link>
        </div>
      </main>
    </div>
  );
}
