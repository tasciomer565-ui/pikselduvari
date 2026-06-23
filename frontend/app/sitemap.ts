import { MetadataRoute } from "next";
import { posts } from "./haberler/posts";
import { sehirler } from "./sehir/sehirler";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pikselduvari.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/satin-al`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/nasil-calisir`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/fiyatlandirma`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sss`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/haberler`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/sehirler`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/referans`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/hakkimizda`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/basin`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/basari-hikayeleri`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/kvkk`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/kullanim-sartlari`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cerez-politikasi`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/haberler/${post.slug}`,
    lastModified: new Date(post.isoDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const sehirPages: MetadataRoute.Sitemap = sehirler.map((s) => ({
    url: `${base}/sehir/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...blogPages, ...sehirPages];
}
