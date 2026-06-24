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

        {/* Paylaş */}
        <div className="mt-6 bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Bu yazıyı paylaş</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://pikselduvari.com/haberler/${post.slug}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-4 py-2 rounded-full transition"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X&apos;te Paylaş
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — https://pikselduvari.com/haberler/${post.slug}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-900/40 hover:bg-green-900/60 text-green-400 text-xs px-4 py-2 rounded-full transition"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://pikselduvari.com/haberler/${post.slug}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 text-xs px-4 py-2 rounded-full transition"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
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
