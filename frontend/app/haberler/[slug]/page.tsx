import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "../posts";
import Breadcrumb from "@/components/Breadcrumb";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Yazı Bulunamadı" };
  return {
    title: `${post.title} — Piksel Duvarı Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    alternates: { canonical: `https://pikselduvari.com/haberler/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.isoDate,
      url: `https://pikselduvari.com/haberler/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);
  const others = posts.filter((p) => p.slug !== slug && p.category !== post.category).slice(0, 2 - related.length);
  const relatedPosts = [...related, ...others].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: { "@type": "Organization", name: "Piksel Duvarı", url: "https://pikselduvari.com" },
    publisher: { "@type": "Organization", name: "Piksel Duvarı", url: "https://pikselduvari.com" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://pikselduvari.com/haberler/${post.slug}` },
    keywords: post.tags.join(", "),
  };

  const paragraphs = post.content.split("\n\n");

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold">PD</div>
          <span className="font-bold">Piksel Duvarı</span>
        </Link>
        <Link href="/haberler" className="text-gray-400 hover:text-white text-sm transition">← Blog</Link>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: "Haberler", href: "/haberler" }, { label: post.title }]} />

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${post.categoryColor}`}>{post.category}</span>
            <time className="text-gray-500 text-sm" dateTime={post.isoDate}>{post.date}</time>
            <span className="text-gray-700">·</span>
            <span className="text-gray-500 text-sm">{post.readTime} okuma</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">{post.title}</h1>
          <p className="text-gray-400 text-lg leading-relaxed">{post.excerpt}</p>
        </header>

        {/* Content */}
        <article className="prose prose-invert max-w-none">
          {paragraphs.map((para, i) => {
            if (para.startsWith("## ")) {
              return <h2 key={i} className="text-xl font-bold mt-8 mb-3 text-white">{para.replace("## ", "")}</h2>;
            }
            if (para.startsWith("### ")) {
              return <h3 key={i} className="text-lg font-semibold mt-6 mb-2 text-indigo-300">{para.replace("### ", "")}</h3>;
            }
            if (para.startsWith("- ")) {
              const items = para.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i} className="space-y-1 my-4 pl-4">
                  {items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-gray-300 text-sm leading-relaxed">
                      <span className="text-indigo-400 shrink-0">•</span>
                      <span>{item.replace("- ", "")}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (para.startsWith("`")) {
              return <code key={i} className="block bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-sm text-indigo-300 my-4 font-mono">{para.replace(/`/g, "")}</code>;
            }
            if (para.trim()) {
              return <p key={i} className="text-gray-300 leading-relaxed mb-4">{para}</p>;
            }
            return null;
          })}
        </article>

        {/* Tags */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full">#{tag}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-700/40 rounded-2xl p-6 text-center">
          <div className="text-2xl mb-2">🗺️</div>
          <h3 className="font-bold text-lg mb-2">Türkiye haritasında yerinizi alın</h3>
          <p className="text-gray-400 text-sm mb-4">1 piksel = 1₺. Tek seferlik ödeme, sonsuza kadar görünürlük.</p>
          <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold text-sm">
            Hemen Alan Seç →
          </Link>
        </div>

        {/* Şehir Linkleri */}
        <div className="mt-10 bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Şehrine Göre Alan Seç</p>
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
            ].map((c) => (
              <Link key={c.slug} href={`/sehir/${c.slug}`} className="text-xs bg-gray-800 hover:bg-indigo-900/50 hover:text-indigo-300 text-gray-400 px-3 py-1.5 rounded-full transition">
                {c.name} Piksel Reklam
              </Link>
            ))}
          </div>
        </div>

        {/* Related */}
        {relatedPosts.length > 0 && (
          <div className="mt-10">
            <h2 className="font-bold text-lg mb-5">İlgili Yazılar</h2>
            <div className="grid gap-4">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/haberler/${rp.slug}`} className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl p-4 flex gap-4 group transition">
                  <span className="text-2xl shrink-0">{rp.emoji}</span>
                  <div>
                    <p className="font-semibold text-sm group-hover:text-indigo-300 transition">{rp.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{rp.date} · {rp.readTime} okuma</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
