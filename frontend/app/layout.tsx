import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import { ToastProvider } from "@/components/Toast";
import PageViewTracker from "@/components/PageViewTracker";
import Script from "next/script";

// GA4 Measurement ID — replace G-XXXXXXXXXX with your actual GA4 ID
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-TLT6TW66LY";

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

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Piksel Duvarı",
  url: "https://pikselduvari.com",
  description: "Türkiye'nin dijital piksel reklam duvarı. 1.000.000 piksellik haritada logonuzu sergileyin.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://pikselduvari.com/sss?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const jsonLdProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Piksel Reklam Alanı",
  description: "Türkiye haritasında kalıcı piksel reklam alanı. Bir kez öde, sonsuza kadar görün.",
  brand: { "@type": "Brand", name: "Piksel Duvarı" },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "100",
    highPrice: "1000000",
    priceCurrency: "TRY",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Piksel Duvarı" },
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Piksel Duvarı",
  url: "https://pikselduvari.com",
  logo: "https://pikselduvari.com/icon.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-555-166-33-80",
    contactType: "customer service",
    availableLanguage: "Turkish",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8816248752189045"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      {/* Microsoft Clarity — heatmap & session recording */}
      <Script id="clarity-init" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID || 'CLARITY_ID_BURAYA'}");`}
      </Script>
      {/* Google Analytics 4 — replace GA_ID with your actual measurement ID */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <body
        className={`${inter.className} min-h-full flex flex-col bg-gray-950 text-white antialiased`}
      >
        <ToastProvider>
          <PageViewTracker />
          {children}
          <CookieBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
