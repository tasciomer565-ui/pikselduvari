import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Haberler & Blog — Piksel Duvarı",
  description: "Piksel Duvarı'nın en son haberleri, reklamverenler için ipuçları ve piksel sanat örnekleri.",
  alternates: { canonical: "https://pikselduvari.com/haberler" },
};

const posts = [
  {
    slug: "piksel-duvari-acilis",
    date: "15 Ocak 2025",
    category: "Duyuru",
    categoryColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
    title: "Türkiye'nin İlk Piksel Reklam Duvarı Açıldı!",
    excerpt:
      "Piksel Duvarı, 1.000.000 piksellik Türkiye haritasıyla yayına girdi. Şehir bazlı bölümleriyle markaların kalıcı dijital alan edinebileceği bu platform, reklam dünyasına yeni bir soluk getiriyor.",
    emoji: "🚀",
    readTime: "3 dk",
  },
  {
    slug: "reklamverenler-icin-ipuclari",
    date: "22 Şubat 2025",
    category: "İpuçları",
    categoryColor: "bg-green-950 text-green-300 border-green-800",
    title: "Piksel Reklamınızdan Maksimum Verim Almanın 7 Yolu",
    excerpt:
      "Piksel alanınızı doğru konumlandırmak, doğru görseli seçmek ve hedef kitlenizle örtüşen bir bölge seçmek — bunların hepsi başarılı bir piksel reklam kampanyası için kritik öneme sahip.",
    emoji: "💡",
    readTime: "5 dk",
  },
  {
    slug: "piksel-sanat-ornekleri",
    date: "10 Mart 2025",
    category: "İlham",
    categoryColor: "bg-purple-950 text-purple-300 border-purple-800",
    title: "Piksel Sanatıyla Markanızı Ölümsüzleştirin",
    excerpt:
      "Dünyaca ünlü Million Dollar Homepage'den ilham alan Piksel Duvarı, Türk işletmelerinin dijital varlıklarını sonsuza taşımasına olanak tanıyor. İşte en yaratıcı piksel reklam örnekleri.",
    emoji: "🎨",
    readTime: "4 dk",
  },
];

export default function HaberlerPage() {
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
        <Breadcrumb items={[{ label: "Haberler" }]} />

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-3">Haberler & Blog</h1>
          <p className="text-gray-400">Piksel Duvarı hakkında son gelişmeler, ipuçları ve ilham verici içerikler.</p>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition group"
            >
              <div className="flex items-start gap-5">
                <div className="text-4xl shrink-0 mt-1">{post.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${post.categoryColor}`}>
                      {post.category}
                    </span>
                    <span className="text-gray-600 text-xs">{post.date}</span>
                    <span className="text-gray-700 text-xs">·</span>
                    <span className="text-gray-600 text-xs">{post.readTime} okuma</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-indigo-300 transition">{post.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="mt-4">
                    <span className="text-indigo-400 text-sm hover:text-indigo-300 transition cursor-pointer">
                      Devamını oku →
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-indigo-950/30 border border-indigo-900/40 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Yeni içeriklerden haberdar olun</h3>
          <p className="text-gray-400 text-sm mb-4">Her yeni yazıda ilk siz bilinin.</p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="e-posta adresiniz"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2.5 rounded-xl text-sm font-semibold">
              Abone Ol
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
