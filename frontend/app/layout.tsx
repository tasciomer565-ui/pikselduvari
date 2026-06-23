import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Piksel Duvarı — Türkiye'nin Dijital Reklam Duvarı",
  description:
    "1.000.000 piksellik Türkiye haritasında logonuzu sergileyin. Bir kez öde, sonsuza kadar görün. Şehir bazlı piksel reklam duvarında yerinizi alın.",
  keywords: [
    "piksel reklam",
    "dijital reklam duvarı",
    "Türkiye reklam",
    "piksel satın al",
    "logo reklam",
    "marka görünürlüğü",
    "pikselduvari",
  ],
  metadataBase: new URL("https://pikselduvari.com"),
  alternates: {
    canonical: "https://pikselduvari.com",
  },
  openGraph: {
    title: "Piksel Duvarı — Türkiye'nin Dijital Reklam Duvarı",
    description:
      "1.000.000 piksellik Türkiye haritasında logonuzu sergileyin. Bir kez öde, sonsuza kadar görün.",
    url: "https://pikselduvari.com",
    siteName: "Piksel Duvarı",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piksel Duvarı — Türkiye'nin Dijital Reklam Duvarı",
    description:
      "1.000.000 piksellik Türkiye haritasında logonuzu sergileyin. Bir kez öde, sonsuza kadar görün.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="h-full">
      <head>
        {/* Google Analytics 4 — GA_MEASUREMENT_ID ile değiştirin */}
        {/*
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}} />
        */}
      </head>
      <body
        className={`${inter.className} min-h-full flex flex-col bg-gray-950 text-white antialiased`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
