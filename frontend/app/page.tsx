"use client";

import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PixelGrid from "@/components/PixelGrid";
import SelectionPanel from "@/components/SelectionPanel";
import StatsBar from "@/components/StatsBar";
import { Zap, MousePointer, Globe } from "lucide-react";

export interface Pixel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  owner_name: string;
  website_url: string;
  tooltip: string;
  image_url: string | null;
}

export interface Selection {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function Home() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [loading, setLoading] = useState(true);
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    fetch(`/api/pixels`)
      .then((r) => r.json())
      .then((data) => { setPixels(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const totalSold = pixels.reduce((acc, p) => acc + p.width * p.height, 0);
  const totalPixels = 1_000_000;

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800/60 px-6 py-4 flex items-center justify-between backdrop-blur-sm bg-gray-950/80 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-bold">
            PD
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">Piksel Duvarı</h1>
            <p className="text-gray-500 text-xs">Türkiye&apos;nin dijital reklam duvarı</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/admin" className="text-gray-500 hover:text-gray-300 text-sm transition">
            Admin
          </a>
          <a
            href="#grid"
            onClick={() => setShowHero(false)}
            className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2"
          >
            <Zap size={14} />
            Alan Satın Al
          </a>
        </div>
      </header>

      {/* Hero Section */}
      {showHero && (
        <section className="border-b border-gray-800/60 px-6 py-12 text-center bg-gradient-to-b from-indigo-950/30 to-transparent">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-950/50 border border-indigo-800/50 rounded-full px-4 py-1.5 text-indigo-300 text-xs mb-6">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Türkiye&apos;nin ilk piksel reklam duvarı
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Dijital duvarda{" "}
              <span className="text-indigo-400">kalıcı yerinizi</span>{" "}
              alın
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              1.000.000 piksellik devasa dijital duvarda logonuzu sergileyin.
              Reklam bütçesi bitmez, alanınız sonsuza kadar orada kalır.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MousePointer size={16} className="text-indigo-400" />
                Kolay piksel seçimi
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Globe size={16} className="text-indigo-400" />
                Sitenize trafik çekin
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Zap size={16} className="text-indigo-400" />
                Anında yayın
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setShowHero(false)}
                className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
              >
                <Zap size={16} />
                Hemen Alan Seç
              </button>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>10×10 blok</span>
                <span className="text-indigo-400 font-bold">= 100₺</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <StatsBar totalSold={totalSold} totalPixels={totalPixels} />

      {/* Grid */}
      <div id="grid" className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative bg-gray-950" style={{ height: showHero ? "calc(100vh - 320px)" : "calc(100vh - 120px)" }}>
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-3">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Piksel haritası yükleniyor...</span>
            </div>
          ) : (
            <TransformWrapper minScale={0.1} maxScale={10} initialScale={0.45} centerOnInit>
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{ width: 1000, height: 1000 }}
              >
                <PixelGrid pixels={pixels} selection={selection} onSelect={setSelection} />
              </TransformComponent>
            </TransformWrapper>
          )}

          {/* Zoom hint */}
          {!loading && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2 text-xs text-gray-400 pointer-events-none">
              Kaydır • Yakınlaştır • Alan seçmek için sürükle
            </div>
          )}
        </div>

        {selection && (
          <SelectionPanel selection={selection} onClose={() => setSelection(null)} />
        )}
      </div>

      <footer className="border-t border-gray-800/60 px-6 py-4 flex items-center justify-between text-xs text-gray-600">
        <span>© 2024 Piksel Duvarı</span>
        <span>Her piksel sonsuza kadar senin.</span>
      </footer>
    </main>
  );
}
