import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type SehirData = {
  slug: string;
  name: string;
  description: string;
  population: string;
  region: string;
  keywords: string[];
  industries: string[];
  benefits: string[];
  avgPrice: string;
  recommendedSize: string;
};

const sehirler: Record<string, SehirData> = {
  istanbul: {
    slug: "istanbul",
    name: "İstanbul",
    description: "Türkiye'nin ekonomi ve ticaret merkezi İstanbul'da piksel reklam alanı satın alın. 15 milyondan fazla nüfusuyla en yüksek trafikli bölge.",
    population: "15+ milyon",
    region: "Marmara",
    keywords: ["istanbul dijital reklam", "istanbul piksel reklam", "istanbul online reklam", "istanbul marka görünürlüğü"],
    industries: ["E-ticaret", "Fintech", "Teknoloji", "Moda", "Lojistik", "Medya"],
    benefits: ["En yüksek trafik alan bölge", "Türkiye'nin ekonomi merkezi", "E-ticaret ve startup odağı", "Yüksek satın alma gücü"],
    avgPrice: "400₺ - 40.000₺",
    recommendedSize: "50×50 veya 100×100",
  },
  ankara: {
    slug: "ankara",
    name: "Ankara",
    description: "Türkiye'nin başkenti Ankara'da kalıcı dijital reklam alanı. Kamu kurumları ve B2B sektöründe güçlü marka bilinirliği için ideal.",
    population: "5+ milyon",
    region: "İç Anadolu",
    keywords: ["ankara dijital reklam", "ankara piksel reklam", "ankara online reklam", "ankara kurumsal reklam"],
    industries: ["Kamu & B2B", "Savunma Sanayi", "Eğitim", "Hukuk & Danışmanlık", "Sağlık"],
    benefits: ["Başkent etkisi — kurumsal güven", "Kamu ihalesi odaklı firmalar için ideal", "Eğitim ve araştırma merkezi", "Yüksek eğitim seviyesi kitlesi"],
    avgPrice: "400₺ - 10.000₺",
    recommendedSize: "20×20 veya 50×50",
  },
  izmir: {
    slug: "izmir",
    name: "İzmir",
    description: "Ege'nin incisi İzmir'de piksel reklam alanı. Turizm, ihracat ve tarım sektöründeki işletmeler için kalıcı dijital görünürlük.",
    population: "4+ milyon",
    region: "Ege",
    keywords: ["izmir dijital reklam", "izmir piksel reklam", "izmir online reklam", "izmir turizm reklam"],
    industries: ["Turizm & Otel", "İhracat", "Tarım & Gıda", "Organik Ürünler", "Denizcilik"],
    benefits: ["Turizm sezonunda yoğun trafik", "İhracat odaklı firmalar için global görünürlük", "Organik ve doğal ürün pazarı", "Yüksek yaşam kalitesi kitlesi"],
    avgPrice: "400₺ - 10.000₺",
    recommendedSize: "20×20 veya 50×50",
  },
  antalya: {
    slug: "antalya",
    name: "Antalya",
    description: "Türkiye'nin turizm başkenti Antalya'da piksel reklam. Yılda 15 milyondan fazla turist çeken bölgede marka görünürlüğü.",
    population: "2.5+ milyon",
    region: "Akdeniz",
    keywords: ["antalya dijital reklam", "antalya piksel reklam", "antalya turizm reklam", "antalya otel reklam"],
    industries: ["Turizm & Otel", "Yat & Marina", "Emlak", "Restoran & Eğlence", "Sağlık Turizmi"],
    benefits: ["15M+ yıllık turist hedef kitle", "Sağlık turizmi odağı büyüyor", "Emlak sektörü hareketli", "Sezonluk yoğun trafik"],
    avgPrice: "400₺ - 10.000₺",
    recommendedSize: "20×20 veya 50×50",
  },
  bursa: {
    slug: "bursa",
    name: "Bursa",
    description: "Türkiye'nin sanayi kenti Bursa'da piksel reklam. Otomotiv, tekstil ve gıda sektöründeki işletmeler için güçlü dijital konum.",
    population: "3+ milyon",
    region: "Marmara",
    keywords: ["bursa dijital reklam", "bursa piksel reklam", "bursa sanayi reklam", "bursa online reklam"],
    industries: ["Otomotiv", "Tekstil", "Gıda Sanayi", "Turizm", "İnşaat"],
    benefits: ["Sanayi ağırlıklı güçlü ekonomi", "İstanbul'a yakınlık avantajı", "Tekstil ve otomotiv merkezi", "Güçlü ihracat potansiyeli"],
    avgPrice: "400₺ - 10.000₺",
    recommendedSize: "20×20 veya 50×50",
  },
  gaziantep: {
    slug: "gaziantep",
    name: "Gaziantep",
    description: "Güneydoğu'nun ekonomi merkezi Gaziantep'te piksel reklam. Tekstil, gıda ve ihracat sektörü için kalıcı dijital görünürlük.",
    population: "2+ milyon",
    region: "Güneydoğu Anadolu",
    keywords: ["gaziantep dijital reklam", "gaziantep piksel reklam", "gaziantep ticaret reklam"],
    industries: ["Tekstil", "Gıda & Baharat", "İhracat", "Plastik Sanayi", "Makine"],
    benefits: ["Güneydoğu'nun ticaret merkezi", "Güçlü ihracat ekosistemi", "Büyüyen orta ölçekli işletme pazarı", "Rekabeti düşük erken fırsat"],
    avgPrice: "400₺ - 2.500₺",
    recommendedSize: "20×20 veya 50×50",
  },
  konya: {
    slug: "konya",
    name: "Konya",
    description: "İç Anadolu'nun merkezi Konya'da piksel reklam. Tarım, makine ve turizm sektöründe güçlü marka konumlanması.",
    population: "2+ milyon",
    region: "İç Anadolu",
    keywords: ["konya dijital reklam", "konya piksel reklam", "konya online reklam"],
    industries: ["Tarım & Hayvancılık", "Makine Sanayi", "Gıda", "Turizm", "Lojistik"],
    benefits: ["Türkiye'nin tahıl ambarı — tarım merkezi", "Büyüyen makine sanayi", "Hz. Mevlana turizm etkisi", "Merkezi konum avantajı"],
    avgPrice: "400₺ - 2.500₺",
    recommendedSize: "20×20",
  },
  adana: {
    slug: "adana",
    name: "Adana",
    description: "Çukurova'nın merkezi Adana'da piksel reklam. Tarım, tekstil ve enerji sektöründeki işletmeler için kalıcı dijital konum.",
    population: "2+ milyon",
    region: "Akdeniz",
    keywords: ["adana dijital reklam", "adana piksel reklam", "adana online reklam"],
    industries: ["Tarım", "Tekstil", "Enerji", "Lojistik", "Gıda"],
    benefits: ["Verimli Çukurova tarım merkezi", "Tekstil ihracat potansiyeli", "Mersin Limanı lojistik avantajı", "Büyüyen kentsel pazar"],
    avgPrice: "400₺ - 2.500₺",
    recommendedSize: "20×20",
  },
};

export async function generateStaticParams() {
  return Object.keys(sehirler).map((s) => ({ sehir: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ sehir: string }> }): Promise<Metadata> {
  const { sehir } = await params;
  const data = sehirler[sehir];
  if (!data) return { title: "Şehir Bulunamadı" };
  return {
    title: `${data.name} Piksel Reklam — Kalıcı Dijital Görünürlük | Piksel Duvarı`,
    description: data.description,
    keywords: data.keywords.join(", "),
    alternates: { canonical: `https://pikselduvari.com/sehir/${data.slug}` },
    openGraph: {
      title: `${data.name} Piksel Reklam — Piksel Duvarı`,
      description: data.description,
      url: `https://pikselduvari.com/sehir/${data.slug}`,
    },
  };
}

export default async function SehirPage({ params }: { params: Promise<{ sehir: string }> }) {
  const { sehir } = await params;
  const data = sehirler[sehir];
  if (!data) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${data.name} Piksel Reklam`,
    description: data.description,
    url: `https://pikselduvari.com/sehir/${data.slug}`,
    publisher: { "@type": "Organization", name: "Piksel Duvarı", url: "https://pikselduvari.com" },
  };

  const otherCities = Object.values(sehirler).filter((s) => s.slug !== data.slug).slice(0, 5);

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

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-3">{data.region} Bölgesi</div>
          <h1 className="text-4xl font-extrabold mb-4">{data.name}&apos;da Piksel Reklam</h1>
          <p className="text-gray-400 text-lg leading-relaxed">{data.description}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/" className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold">
              🗺️ {data.name} Bölgesinde Alan Seç
            </Link>
            <a href="https://wa.me/905551663380" target="_blank" rel="noopener noreferrer" className="border border-gray-700 hover:border-gray-500 text-gray-300 px-6 py-3 rounded-xl font-semibold transition">
              WhatsApp ile Bilgi Al
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: "Nüfus", value: data.population },
            { label: "Önerilen Boyut", value: data.recommendedSize },
            { label: "Fiyat Aralığı", value: data.avgPrice },
          ].map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-bold text-sm text-white">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Hangi sektörler */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-4">🏢 {data.name}&apos;da Hangi Sektörler Öne Çıkar?</h2>
          <div className="flex flex-wrap gap-2">
            {data.industries.map((ind) => (
              <span key={ind} className="bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-sm px-3 py-1.5 rounded-full">{ind}</span>
            ))}
          </div>
        </div>

        {/* Avantajlar */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-4">✅ {data.name} Bölgesinin Avantajları</h2>
          <ul className="space-y-3">
            {data.benefits.map((b) => (
              <li key={b} className="flex gap-3 text-gray-300 text-sm">
                <span className="text-green-400 shrink-0">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Nasıl çalışır */}
        <div className="mb-10">
          <h2 className="font-bold text-xl mb-6">{data.name}&apos;da Piksel Reklam Nasıl Çalışır?</h2>
          <div className="grid gap-4">
            {[
              { step: "1", title: "Bölgeyi Seçin", desc: `Türkiye haritasında ${data.name} bölgesini bulun ve piksel alanınızı seçin.` },
              { step: "2", title: "Ödeme Yapın", desc: "Seçtiğiniz alana göre tek seferlik ödeme yapın. 1 piksel = 1₺." },
              { step: "3", title: "Görsel Yükleyin", desc: "Logo veya marka görselinizi yükleyin. 24 saat içinde yayına girer." },
              { step: "4", title: "Sonsuza Kalın", desc: `${data.name}'dan ve Türkiye'nin her yerinden ziyaretçiler markanızı görür.` },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                <div>
                  <div className="font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-gray-400 text-sm">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SSS */}
        <div className="mb-10">
          <h2 className="font-bold text-xl mb-4">{data.name} Piksel Reklam — Sık Sorulan Sorular</h2>
          <div className="space-y-3">
            {[
              { q: `${data.name} bölgesinde kaç piksel var?`, a: "Piksel Duvarı 1.000.000 piksellik bir harita. Her bölge haritadaki coğrafi konumuna göre alan kaplar. İstanbul gibi büyük şehirler daha büyük alan kaplar." },
              { q: `${data.name}'da alan kaldı mı?`, a: "Henüz erken dönemdeyiz, çoğu alan boş. Tercih ettiğiniz konumu bugün alın, harita dolduğunda yeni satış durur." },
              { q: "Görselimi sonradan değiştirebilir miyim?", a: "Evet, alan size ait olduğu sürece görselinizi istediğiniz zaman güncelleyebilirsiniz. Her güncelleme 24 saat içinde yayına girer." },
              { q: "Ödeme güvenli mi?", a: "Tüm ödemeler PayTR 3D Secure altyapısıyla işlenir. Kart bilgileriniz bizimle paylaşılmaz." },
            ].map((faq, i) => (
              <details key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <summary className="px-5 py-4 font-semibold text-sm cursor-pointer hover:bg-gray-800/50 transition">{faq.q}</summary>
                <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-3">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Diğer şehirler */}
        <div className="mb-10">
          <h2 className="font-bold text-lg mb-4">Diğer Şehirlerde de Alan Alın</h2>
          <div className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <Link key={c.slug} href={`/sehir/${c.slug}`} className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm px-4 py-2 rounded-full transition">
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Blog linkleri */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 mb-8">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Faydalı Yazılar</p>
          <div className="flex flex-col gap-2">
            {[
              { href: "/haberler/seo-icin-piksel-reklam", label: "Piksel Reklam SEO'nuzu Nasıl Güçlendirir?" },
              { href: "/haberler/kucuk-isletmeler-icin-dijital-reklam", label: "En Uygun Dijital Reklam: Piksel mi, Sosyal Medya mı?" },
              { href: "/haberler/piksel-duvari-vs-billboard", label: "Piksel Reklam vs. Billboard: Hangisi Daha Karlı?" },
              { href: "/haberler/marka-gorunurlugu-neden-onemli", label: "Marka Görünürlüğü Neden Bu Kadar Önemli?" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-gray-400 hover:text-indigo-300 transition flex items-center gap-2">
                <span className="text-indigo-600">→</span> {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-800/40 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">{data.name}&apos;da Yerinizi Ayırtın</h3>
          <p className="text-gray-400 text-sm mb-6">1 piksel = 1₺. Tek seferlik ödeme, sonsuza kadar görünürlük.</p>
          <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-500 transition px-8 py-3 rounded-xl font-bold">
            🗺️ Hemen Alan Seç
          </Link>
        </div>
      </main>
    </div>
  );
}
