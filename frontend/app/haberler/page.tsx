import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Haberler & Blog — Piksel Duvarı",
  description: "Piksel reklam, dijital marka görünürlüğü, SEO ve Türkiye'nin ilk piksel duvarı hakkında güncel içerikler.",
  alternates: { canonical: "https://pikselduvari.com/haberler" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://pikselduvari.com" },
    { "@type": "ListItem", position: 2, name: "Haberler & Blog", item: "https://pikselduvari.com/haberler" },
  ],
};

export default function HaberlerPage() {
  const sorted = [...posts].reverse();
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
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
          <p className="text-gray-400">Piksel reklam, dijital pazarlama ve marka görünürlüğü hakkında {posts.length} içerik.</p>
        </div>

        {/* Öne çıkan yazı */}
        <Link href={`/haberler/${sorted[0].slug}`}>
          <article className="bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-700/40 rounded-2xl p-8 mb-8 hover:border-indigo-600/60 transition group cursor-pointer">
            <div className="flex items-start gap-5">
              <div className="text-5xl shrink-0">{sorted[0].emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${sorted[0].categoryColor}`}>{sorted[0].category}</span>
                  <span className="text-gray-500 text-xs">{sorted[0].date}</span>
                  <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Yeni</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-indigo-300 transition">{sorted[0].title}</h2>
                <p className="text-gray-400 leading-relaxed">{sorted[0].excerpt}</p>
                <div className="mt-4 text-indigo-400 text-sm">Devamını oku →</div>
              </div>
            </div>
          </article>
        </Link>

        <div className="grid gap-5">
          {sorted.slice(1).map((post) => (
            <Link key={post.slug} href={`/haberler/${post.slug}`}>
              <article className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition group cursor-pointer">
                <div className="flex items-start gap-5">
                  <div className="text-3xl shrink-0 mt-1">{post.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${post.categoryColor}`}>{post.category}</span>
                      <span className="text-gray-600 text-xs">{post.date}</span>
                      <span className="text-gray-700">·</span>
                      <span className="text-gray-600 text-xs">{post.readTime} okuma</span>
                    </div>
                    <h2 className="text-lg font-bold mb-2 group-hover:text-indigo-300 transition">{post.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
                    <div className="mt-3 text-indigo-400 text-sm">Devamını oku →</div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Şehir linkleri — iç SEO */}
        <div className="mt-10 bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Şehrine Göre Piksel Reklam</p>
          <div className="flex flex-wrap gap-2">
            {[
              { slug: "istanbul", name: "İstanbul" },
              { slug: "ankara", name: "Ankara" },
              { slug: "izmir", name: "İzmir" },
              { slug: "antalya", name: "Antalya" },
              { slug: "bursa", name: "Bursa" },
              { slug: "gaziantep", name: "Gaziantep" },
              { slug: "konya", name: "Konya" },
              { slug: "adana", name: "Adana" },
              { slug: "kayseri", name: "Kayseri" },
              { slug: "mersin", name: "Mersin" },
            ].map((c) => (
              <Link key={c.slug} href={`/sehir/${c.slug}`} className="text-xs bg-gray-800 hover:bg-indigo-900/50 hover:text-indigo-300 text-gray-400 px-3 py-1.5 rounded-full transition">
                {c.name} Piksel Reklam
              </Link>
            ))}
            <Link href="/sehirler" className="text-xs bg-indigo-900/30 hover:bg-indigo-900/60 text-indigo-400 px-3 py-1.5 rounded-full transition">
              Tüm 81 İl →
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-indigo-950/30 border border-indigo-900/40 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Yeni içeriklerden haberdar olun</h3>
          <p className="text-gray-400 text-sm mb-6">Her yeni yazıda ilk siz bilinin. Üstelik ücretsiz 10×10 piksel alanı kazanın.</p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="e-posta adresiniz" className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500" />
            <button className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2.5 rounded-xl text-sm font-semibold">Abone Ol</button>
          </div>
        </div>
      </main>
    </div>
  );
}
