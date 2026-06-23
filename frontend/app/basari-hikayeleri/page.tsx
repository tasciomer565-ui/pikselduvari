import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Başarı Hikayeleri — Piksel Duvarı",
  description: "Türk işletmelerinin Piksel Duvarı deneyimleri ve başarı hikayeleri.",
  alternates: { canonical: "https://pikselduvari.com/basari-hikayeleri" },
};

const testimonials = [
  {
    name: "Ahmet Yılmaz",
    company: "Kahve Dünyası Franchise",
    role: "Kurucu & CEO",
    avatar: "AY",
    color: "#7c3aed",
    rating: 5,
    region: "İstanbul",
    size: "50×50",
    text: "Piksel Duvarı'nda 50×50'lik bir alan aldık. Aylarca billboard kiralayıp sonra kaldırmak yerine, bir kez ödeyip sonsuza kadar görünmek harika bir fikir. Site trafiğimiz ilk ay %23 arttı!",
    tag: "E-ticaret & Perakende",
  },
  {
    name: "Zeynep Kaya",
    company: "TechStart Yazılım",
    role: "Pazarlama Direktörü",
    avatar: "ZK",
    color: "#0ea5e9",
    rating: 5,
    region: "Ankara",
    size: "30×30",
    text: "Startup olarak büyük reklam bütçemiz yok. Piksel Duvarı ile çok uygun fiyata kalıcı bir görünürlük elde ettik. Özellikle startup ekosisteminde çok konuşuluyoruz artık.",
    tag: "Teknoloji & SaaS",
  },
  {
    name: "Mehmet Demir",
    company: "Anadolu Organik Gıda",
    role: "Genel Müdür",
    avatar: "MD",
    color: "#16a34a",
    rating: 5,
    region: "İzmir",
    size: "20×40",
    text: "Organik ürünlerimizi dijital dünyada da kalıcı kılmak istedik. Piksel Duvarı tam da bunu sağladı. Admin ekibi çok yardımcı oldu, görsel onayı çok hızlı gerçekleşti.",
    tag: "Gıda & Tarım",
  },
  {
    name: "Fatma Şahin",
    company: "Moda Evim Dekorasyon",
    role: "Ortak & Tasarımcı",
    avatar: "FŞ",
    color: "#dc2626",
    rating: 5,
    region: "Antalya",
    size: "40×20",
    text: "Reklam ajansına ayda binlerce lira ödemek yerine, Piksel Duvarı'nda tek seferlik bir ödeme yaptım. ROI hesabı yapıldığında rekabet edilemez bir değer sunuyor. Çok tavsiye ederim!",
    tag: "Mobilya & Dekorasyon",
  },
];

export default function BasariHikayeleriPage() {
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
        <Breadcrumb items={[{ label: "Başarı Hikayeleri" }]} />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-3">Başarı Hikayeleri</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Türkiye'nin farklı sektörlerinden işletmeler Piksel Duvarı ile nasıl sonuçlar elde etti?
          </p>
          <div className="flex items-center justify-center gap-1 mt-4 text-yellow-400">
            {"★★★★★".split("").map((s, i) => <span key={i} className="text-xl">{s}</span>)}
            <span className="text-gray-400 text-sm ml-2">50+ memnun müşteri</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4 hover:border-gray-600 transition"
            >
              {/* Quote */}
              <div className="text-3xl text-gray-700">"</div>
              <p className="text-gray-300 text-sm leading-relaxed -mt-4">{t.text}</p>

              {/* Stats */}
              <div className="flex gap-2 flex-wrap">
                <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">📍 {t.region}</span>
                <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">📐 {t.size} alan</span>
                <span className="bg-indigo-950/50 text-indigo-400 text-xs px-2 py-1 rounded-full">{t.tag}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role} · {t.company}</p>
                </div>
                <div className="ml-auto text-yellow-400 text-sm">{"★".repeat(t.rating)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-gradient-to-br from-indigo-950 to-purple-950 rounded-3xl border border-indigo-800/50 p-10">
          <h2 className="text-2xl font-bold mb-3">Siz de başarı hikayenizi yazın</h2>
          <p className="text-gray-400 text-sm mb-6">Türkiye haritasında yerinizi alın, markanızı kalıcı kılın.</p>
          <Link
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 transition px-8 py-3 rounded-xl font-semibold"
          >
            🗺️ Alan Seç & Başla
          </Link>
        </div>
      </main>
    </div>
  );
}
