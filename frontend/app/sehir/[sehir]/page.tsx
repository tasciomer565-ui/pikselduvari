import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sehirler, sehirMap } from "../sehirler";

export async function generateStaticParams() {
  return sehirler.map((s) => ({ sehir: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ sehir: string }> }): Promise<Metadata> {
  const { sehir } = await params;
  const data = sehirMap[sehir];
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
  const data = sehirMap[sehir];
  if (!data) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${data.name} Piksel Reklam`,
    description: data.description,
    url: `https://pikselduvari.com/sehir/${data.slug}`,
    publisher: { "@type": "Organization", name: "Piksel Duvarı", url: "https://pikselduvari.com" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://pikselduvari.com" },
      { "@type": "ListItem", position: 2, name: "Tüm Şehirler", item: "https://pikselduvari.com/sehirler" },
      { "@type": "ListItem", position: 3, name: `${data.name} Piksel Reklam`, item: `https://pikselduvari.com/sehir/${data.slug}` },
    ],
  };

  const otherCities = sehirler.filter((s) => s.slug !== data.slug).sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold">PD</div>
          <span className="font-bold">Piksel Duvarı</span>
        </Link>
        <Link href="/sehirler" className="text-gray-400 hover:text-white text-sm transition">← Tüm Şehirler</Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">{data.region} Bölgesi</span>
            <span className="text-gray-700">·</span>
            <span className="text-xs text-gray-500">Plaka: {data.plate.toString().padStart(2, "0")}</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-4">{data.name}&apos;da Piksel Reklam</h1>
          <p className="text-gray-400 text-lg leading-relaxed">{data.description}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/" className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold text-sm">
              🗺️ {data.name} Bölgesinde Alan Seç
            </Link>
            <a href="https://wa.me/905551663380" target="_blank" rel="noopener noreferrer" className="border border-gray-700 hover:border-gray-500 text-gray-300 px-6 py-3 rounded-xl font-semibold transition text-sm">
              WhatsApp ile Bilgi Al
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: "Nüfus", value: data.population },
            { label: "Bölge", value: data.region },
            { label: "1 Piksel", value: "1₺" },
          ].map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-bold text-sm text-white">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-4">🏢 {data.name}&apos;da Hangi Sektörler Öne Çıkar?</h2>
          <div className="flex flex-wrap gap-2">
            {data.industries.map((ind) => (
              <span key={ind} className="bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-sm px-3 py-1.5 rounded-full">{ind}</span>
            ))}
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-4">✅ {data.name} Bölgesinin Avantajları</h2>
          <ul className="space-y-3">
            {data.benefits.map((b) => (
              <li key={b} className="flex gap-3 text-gray-300 text-sm">
                <span className="text-green-400 shrink-0">✓</span>{b}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="font-bold text-xl mb-6">{data.name}&apos;da Piksel Reklam Nasıl Çalışır?</h2>
          <div className="grid gap-4">
            {[
              { step: "1", title: "Bölgeyi Seçin", desc: `Türkiye haritasında ${data.name} bölgesini bulun ve piksel alanınızı seçin.` },
              { step: "2", title: "Ödeme Yapın", desc: "1 piksel = 1₺. Tek seferlik ödeme, sonsuza kadar sahiplik." },
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

        <div className="mb-10">
          <h2 className="font-bold text-xl mb-4">{data.name} Piksel Reklam — Sık Sorulan Sorular</h2>
          <div className="space-y-3">
            {[
              { q: `${data.name}'da piksel reklam fiyatı nedir?`, a: `1 piksel = 1₺. ${data.name} bölgesinde 20×20 alan için 400₺, 50×50 için 2.500₺, 100×100 için 10.000₺. Tek seferlik ödeme, sonsuza kadar sahiplik.` },
              { q: `${data.name} bölgesinde alan kaldı mı?`, a: "Henüz erken dönemdeyiz, çoğu alan boş. Tercih ettiğiniz konumu bugün alın — harita dolduğunda yeni satış durur." },
              { q: "Görselimi sonradan değiştirebilir miyim?", a: "Evet, alan size ait olduğu sürece görselinizi istediğiniz zaman güncelleyebilirsiniz." },
              { q: `${data.name} dışındaki işletmeler de bu bölgeden alan alabilir mi?`, a: `Evet! ${data.name}'da müşteri hedefleyen her işletme bu bölgeden alan alabilir. Konum şartı yok.` },
            ].map((faq, i) => (
              <details key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <summary className="px-5 py-4 font-semibold text-sm cursor-pointer hover:bg-gray-800/50 transition">{faq.q}</summary>
                <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-3">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>

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

        <div className="mb-8">
          <h2 className="font-bold text-lg mb-4">Diğer Şehirlerde de Alan Alın</h2>
          <div className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <Link key={c.slug} href={`/sehir/${c.slug}`} className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-3 py-1.5 rounded-full transition">
                {c.name}
              </Link>
            ))}
            <Link href="/sehirler" className="bg-indigo-900/40 hover:bg-indigo-900/60 text-indigo-300 text-xs px-3 py-1.5 rounded-full transition">
              Tüm şehirler →
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-800/40 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">{data.name}&apos;da Yerinizi Ayırtın</h3>
          <p className="text-gray-400 text-sm mb-6">1 piksel = 1₺ · Tek seferlik ödeme · Sonsuza kadar görünürlük</p>
          <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-500 transition px-8 py-3 rounded-xl font-bold">
            🗺️ Hemen Alan Seç
          </Link>
        </div>
      </main>
    </div>
  );
}
