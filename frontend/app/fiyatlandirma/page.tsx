import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fiyatlandırma — Piksel Duvarı",
  description: "Piksel Duvarı fiyatlandırma planları. 1 piksel = 1₺. Tek seferlik ödeme, sonsuza kadar görünürlük.",
  alternates: { canonical: "https://pikselduvari.com/fiyatlandirma" },
};

const plans = [
  {
    name: "Başlangıç",
    size: "10×10",
    pixels: 100,
    price: 100,
    highlight: false,
    features: ["100 piksel alan", "Logo/görsel yükleme", "Admin onayı", "Kalıcı görünürlük", "Tooltip desteği"],
    tag: null,
  },
  {
    name: "Popüler",
    size: "50×50",
    pixels: 2500,
    price: 2500,
    highlight: true,
    features: ["2.500 piksel alan", "Logo/görsel yükleme", "Admin onayı", "Kalıcı görünürlük", "Tooltip desteği", "Öncelikli onay"],
    tag: "En Çok Tercih Edilen",
  },
  {
    name: "Premium",
    size: "100×100",
    pixels: 10000,
    price: 10000,
    highlight: false,
    features: ["10.000 piksel alan", "Logo/görsel yükleme", "Admin onayı", "Kalıcı görünürlük", "Tooltip desteği", "Öncelikli onay", "Özel destek hattı"],
    tag: null,
  },
];

const comparisonRows = [
  { feature: "Aylık maliyet", traditional: "2.500₺ - 50.000₺", piksel: "0₺ (tek seferlik)" },
  { feature: "Toplam maliyet (5 yıl)", traditional: "150.000₺+", piksel: "Satın alım fiyatı" },
  { feature: "Süre", traditional: "Ödeme duruncaya kadar", piksel: "Sonsuza kadar" },
  { feature: "Minimum bütçe", traditional: "5.000₺+", piksel: "100₺" },
  { feature: "Hedefleme", traditional: "Geniş kitleye zorunlu", piksel: "Türkiye haritası üzerinde" },
  { feature: "Kurulum süresi", traditional: "1-4 hafta", piksel: "24 saat içinde" },
];

export default function FiyatlandirmaPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold">PD</div>
          <span className="font-bold">Piksel Duvarı</span>
        </Link>
        <Link href="/" className="text-gray-400 hover:text-white text-sm transition">← Ana Sayfa</Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: "Fiyatlandırma" }]} />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-3">Şeffaf Fiyatlandırma</h1>
          <p className="text-gray-400 text-lg">Gizli ücret yok. Bir kez öde, sonsuza kadar kal.</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-green-950/40 border border-green-800/40 rounded-full px-4 py-1.5 text-green-300 text-sm">
            ✓ 1 piksel = 1₺ · Kendi boyutunu seç
          </div>
        </div>

        {/* Plans */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-6 border flex flex-col ${
                p.highlight
                  ? "border-indigo-500 bg-indigo-950/40 relative"
                  : "border-gray-800 bg-gray-900"
              }`}
            >
              {p.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  ⭐ {p.tag}
                </div>
              )}
              <div className="mb-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{p.name}</p>
                <div className="text-3xl font-extrabold mb-1">{p.size}</div>
                <div className="text-gray-500 text-sm">{p.pixels.toLocaleString("tr-TR")} piksel</div>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-indigo-400">{p.price.toLocaleString("tr-TR")}₺</span>
                <span className="text-gray-600 text-sm ml-2">tek seferlik</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/"
                className={`w-full py-3 rounded-xl text-sm font-semibold text-center transition block ${
                  p.highlight
                    ? "bg-indigo-600 hover:bg-indigo-500"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Bu Planı Seç
              </Link>
            </div>
          ))}
        </div>

        {/* Custom size */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-16 text-center">
          <h2 className="text-xl font-bold mb-2">Özel Boyut</h2>
          <p className="text-gray-400 text-sm mb-4">
            1 piksel = 1₺ hesabıyla istediğiniz boyutta alan seçebilirsiniz. <br />
            20×30 = 600₺, 150×100 = 15.000₺... Sınır yok.
          </p>
          <Link
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl text-sm font-semibold"
          >
            Haritada Özel Alan Seç →
          </Link>
        </div>

        {/* Bulk discount */}
        <div className="bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-800/50 rounded-2xl p-6 mb-16">
          <h2 className="text-xl font-bold mb-3">💰 Toplu Alım İndirimi</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {[
              { min: "10.000+", discount: "%5 indirim", note: "100×100 ve üzeri" },
              { min: "50.000+", discount: "%10 indirim", note: "224×224 ve üzeri" },
              { min: "100.000+", discount: "%15 indirim", note: "316×316 ve üzeri" },
            ].map((d) => (
              <div key={d.min} className="bg-white/5 rounded-xl p-4">
                <div className="text-indigo-300 font-bold text-lg">{d.discount}</div>
                <div className="text-gray-400 text-xs mt-1">{d.min} piksel · {d.note}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-4">
            Toplu alım için{" "}
            <a href="mailto:info@pikselduvari.com" className="text-indigo-400 hover:underline">
              info@pikselduvari.com
            </a>{" "}
            adresine yazın.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Geleneksel Reklam ile Karşılaştırma</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left pb-3 pr-6 text-gray-500 font-medium">Özellik</th>
                  <th className="text-left pb-3 pr-6 text-gray-500 font-medium">Geleneksel Reklam</th>
                  <th className="text-left pb-3 text-indigo-400 font-medium">Piksel Duvarı</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-900">
                    <td className="py-3 pr-6 text-gray-300 font-medium">{row.feature}</td>
                    <td className="py-3 pr-6 text-gray-500">{row.traditional}</td>
                    <td className="py-3 text-green-400 font-semibold">{row.piksel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 transition px-10 py-4 rounded-xl font-bold text-lg"
          >
            🗺️ Hemen Alan Seç
          </Link>
          <p className="text-gray-600 text-xs mt-4">30 gün içinde memnun kalmazsan ücret iadesi</p>
        </div>
      </main>
    </div>
  );
}
