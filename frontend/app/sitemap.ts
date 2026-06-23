import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pikselduvari.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/satin-al`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/nasil-calisir`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/fiyatlandirma`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sss`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/haberler`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/basari-hikayeleri`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/hakkimizda`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/kvkk`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/kullanim-sartlari`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cerez-politikasi`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
