"use client";

import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PixelGrid from "@/components/PixelGrid";
import SelectionPanel from "@/components/SelectionPanel";
import StatsBar from "@/components/StatsBar";

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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pixels`)
      .then((r) => r.json())
      .then((data) => { setPixels(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const totalSold = pixels.reduce((acc, p) => acc + p.width * p.height, 0);
  const totalPixels = 1_000_000;

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Piksel Duvarı</h1>
          <p className="text-gray-400 text-sm">Türkiye&apos;nin dijital reklam duvarı</p>
        </div>
        <a
          href="/satin-al"
          className="bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2 rounded-lg font-semibold text-sm"
        >
          Alan Satın Al
        </a>
      </header>

      <StatsBar totalSold={totalSold} totalPixels={totalPixels} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative bg-black" style={{ height: "calc(100vh - 140px)" }}>
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Yükleniyor...
            </div>
          ) : (
            <TransformWrapper minScale={0.1} maxScale={8} initialScale={0.5} centerOnInit>
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{ width: 1000, height: 1000 }}
              >
                <PixelGrid pixels={pixels} selection={selection} onSelect={setSelection} />
              </TransformComponent>
            </TransformWrapper>
          )}
        </div>

        {selection && (
          <SelectionPanel selection={selection} onClose={() => setSelection(null)} />
        )}
      </div>

      <footer className="border-t border-gray-800 text-center text-gray-600 text-xs py-3">
        © 2024 Piksel Duvarı — Her piksel sonsuza kadar senin.
      </footer>
    </main>
  );
}
