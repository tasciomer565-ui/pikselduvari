"use client";

import { useEffect, useState } from "react";

interface Pixel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  owner_name: string;
  price: number;
  created_at: string;
}

interface Stats {
  totalPixels: number;
  totalRevenue: number;
  topRegions: { name: string; color: string; sold: number; total: number }[];
  recentActivity: { name: string; area: string; time: string }[];
}

const REGIONS = [
  { id: "istanbul", name: "İstanbul", color: "#7c3aed", x: 100, y: 0, w: 300, h: 200 },
  { id: "ankara", name: "Ankara", color: "#dc2626", x: 200, y: 200, w: 300, h: 300 },
  { id: "izmir", name: "İzmir", color: "#3b82f6", x: 0, y: 200, w: 200, h: 300 },
  { id: "antalya", name: "Antalya", color: "#0284c7", x: 0, y: 700, w: 300, h: 300 },
  { id: "karadeniz", name: "Karadeniz", color: "#16a34a", x: 600, y: 0, w: 250, h: 200 },
  { id: "gaziantep", name: "Gaziantep & Şanlıurfa", color: "#6d28d9", x: 500, y: 700, w: 500, h: 300 },
];

export default function IstatistiklerPage() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pixels")
      .then((r) => r.json())
      .then((data) => {
        setPixels(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalPixelsSold = pixels.reduce((acc, p) => acc + p.width * p.height, 0);
  const totalRevenue = pixels.reduce((acc, p) => acc + (p.price || p.width * p.height), 0);

  const regionStats = REGIONS.map((r) => {
    const sold = pixels.filter(p =>
      p.x >= r.x && p.y >= r.y &&
      p.x + p.width <= r.x + r.w &&
      p.y + p.height <= r.y + r.h
    ).reduce((acc, p) => acc + p.width * p.height, 0);
    return { ...r, sold, total: r.w * r.h, pct: Math.min(100, Math.round((sold / (r.w * r.h)) * 100)) };
  }).sort((a, b) => b.sold - a.sold);

  const recent = [...pixels]
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950/90 backdrop-blur-md z-50">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">PD</div>
          <span className="font-bold text-lg">Piksel Duvarı</span>
        </a>
        <a href="/" className="text-gray-400 hover:text-white text-sm transition">← Ana Sayfa</a>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">📊 Canlı İstatistikler</h1>
        <p className="text-gray-400 mb-10">Piksel Duvarı&apos;nın gerçek zamanlı verileri</p>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Key metrics */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-extrabold text-indigo-400">{totalPixelsSold.toLocaleString("tr-TR")}</div>
                <div className="text-sm text-gray-400 mt-1">Toplam Piksel Satıldı</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-extrabold text-green-400">{totalRevenue.toLocaleString("tr-TR")}₺</div>
                <div className="text-sm text-gray-400 mt-1">Toplam Gelir</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-extrabold text-white">{(1000000 - totalPixelsSold).toLocaleString("tr-TR")}</div>
                <div className="text-sm text-gray-400 mt-1">Kalan Piksel</div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 mt-3">
                  <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${Math.max((totalPixelsSold / 1000000) * 100, 0.2)}%` }} />
                </div>
              </div>
            </div>

            {/* Region chart */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
              <h2 className="font-bold text-lg mb-6">🗺️ Bölge Doluluk Oranları</h2>
              <div className="space-y-4">
                {regionStats.map((r) => (
                  <div key={r.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: r.color }} />
                        <span className="font-medium">{r.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{r.sold.toLocaleString("tr-TR")} px satıldı</span>
                        <span className="font-bold" style={{ color: r.color }}>%{r.pct}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{ width: `${Math.max(r.pct, 0.3)}%`, backgroundColor: r.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            {recent.length > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
                <h2 className="font-bold text-lg mb-4">⚡ Son Aktivite</h2>
                <div className="space-y-3">
                  {recent.map((p, i) => (
                    <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-indigo-950 border border-indigo-900 rounded-lg flex items-center justify-center text-xs font-bold text-indigo-400">
                          {i + 1}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{p.owner_name}</div>
                          <div className="text-xs text-gray-500">{p.width}×{p.height} px alan</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-400">{(p.width * p.height).toLocaleString("tr-TR")}₺</div>
                        <div className="text-xs text-gray-500">
                          {p.created_at ? new Date(p.created_at).toLocaleDateString("tr-TR") : "—"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="text-center py-8 bg-gradient-to-br from-indigo-950 to-purple-950 rounded-2xl border border-indigo-800/40">
              <h3 className="text-xl font-bold mb-2">Siz de katılın!</h3>
              <p className="text-gray-400 text-sm mb-4">Türkiye&apos;nin dijital piksel duvarında yerinizi alın.</p>
              <a href="/" className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold text-sm inline-block">
                Alan Seç &amp; Satın Al →
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
