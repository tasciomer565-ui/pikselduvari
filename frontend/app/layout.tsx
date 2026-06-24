import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import { ToastProvider } from "@/components/Toast";
import PageViewTracker from "@/components/PageViewTracker";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ExitIntent from "@/components/ExitIntent";
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

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Piksel Duvarı nedir?", acceptedAnswer: { "@type": "Answer", text: "Piksel Duvarı, Türkiye haritası üzerinde piksel tabanlı kalıcı dijital reklam platformudur. 1 piksel = 1₺ fiyatıyla alan satın alınır ve marka sonsuza kadar haritada görünür." } },
    { "@type": "Question", name: "Piksel reklam ne kadar süre yayında kalır?", acceptedAnswer: { "@type": "Answer", text: "Sonsuza kadar. Tek seferlik ödeme yapılır, süre sınırı yoktur. Ödeme yapıldıktan sonra alan size aittir." } },
    { "@type": "Question", name: "Minimum kaç piksel satın alınabilir?", acceptedAnswer: { "@type": "Answer", text: "Minimum 10×10 piksel (100₺) satın alınabilir. Daha büyük alanlar için 20×20, 50×50, 100×100 seçenekleri mevcuttur." } },
    { "@type": "Question", name: "Ödeme yaptıktan sonra ne zaman yayına girer?", acceptedAnswer: { "@type": "Answer", text: "Ödeme onaylandıktan sonra 24 saat içinde logonuz haritada yayına girer." } },
    { "@type": "Question", name: "Görselimi sonradan değiştirebilir miyim?", acceptedAnswer: { "@type": "Answer", text: "Evet, alan size ait olduğu sürece görselinizi istediğiniz zaman güncelleyebilirsiniz." } },
  ],
};

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Piksel Reklam Hizmeti",
  provider: { "@type": "Organization", name: "Piksel Duvarı", url: "https://pikselduvari.com" },
  description: "Türkiye haritası üzerinde kalıcı piksel reklam alanı kiralama hizmeti. Bir kez öde, sonsuza kadar görün.",
  areaServed: { "@type": "Country", name: "Türkiye" },
  serviceType: "Dijital Reklam",
  offers: { "@type": "Offer", price: "100", priceCurrency: "TRY", description: "10×10 piksel alan — başlangıç fiyatı" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="h-full">
      <head>
        <link rel="alternate" hrefLang="tr" href="https://pikselduvari.com" />
        <link rel="alternate" hrefLang="tr-TR" href="https://pikselduvari.com" />
        <link rel="alternate" hrefLang="x-default" href="https://pikselduvari.com" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
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
          <WhatsAppFloat />
          <ExitIntent />
        </ToastProvider>
      </body>
    </html>
  );
}
