import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Piksel Duvarı — Türkiye'nin Dijital Reklam Duvarı",
  description: "1.000.000 piksellik dijital reklam duvarında yerinizi alın. Logonuzu yükleyin, sitenize trafik çekin, sonsuza kadar kalsın.",
  openGraph: {
    title: "Piksel Duvarı",
    description: "Türkiye'nin dijital reklam duvarında yerinizi alın.",
    url: "https://pikselduvari.vercel.app",
    siteName: "Piksel Duvarı",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-gray-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
