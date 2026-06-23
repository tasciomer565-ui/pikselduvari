"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function PixelRain() {
  const [pixels, setPixels] = useState<{ x: number; y: number; color: string; delay: number }[]>([]);
  useEffect(() => {
    const colors = ["#6366f1", "#818cf8", "#4f46e5", "#a5b4fc", "#7c3aed", "#8b5cf6"];
    setPixels(Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3,
    })));
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pixels.map((p, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-sm opacity-30 animate-bounce"
          style={{ left: `${p.x}%`, top: `${p.y}%`, backgroundColor: p.color, animationDelay: `${p.delay}s`, animationDuration: `${2 + p.delay}s` }}
        />
      ))}
    </div>
  );
}

export default function NotFound() {
  const [count, setCount] = useState(10);
  useEffect(() => {
    if (count <= 0) { window.location.href = "/"; return; }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
      <PixelRain />
      <div className="text-center max-w-lg relative z-10">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-bold">PD</div>
          <span className="font-bold text-lg">Piksel Duvarı</span>
        </Link>

        {/* Büyük 404 */}
        <div className="relative mb-6">
          <div className="text-[120px] font-extrabold leading-none select-none" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid" style={{ gridTemplateColumns: "repeat(6, 1fr)", gap: 3 }}>
              {["#6366f1","#818cf8","#4f46e5","#6366f1","#818cf8","#4f46e5",
                "#1e1b4b","#6366f1","#1e1b4b","#818cf8","#1e1b4b","#6366f1",
                "#4f46e5","#1e1b4b","#6366f1","#1e1b4b","#4f46e5","#1e1b4b"].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, backgroundColor: c, borderRadius: 2, opacity: 0.3 }} />
              ))}
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-3">Bu piksel alanı boş!</h1>
        <p className="text-gray-400 mb-2 leading-relaxed">
          Aradığınız sayfa bulunamadı. Ama sen buraya kadar geldin, belki bir piksel alanı almak istersin? 😄
        </p>
        <p className="text-gray-600 text-sm mb-8">
          <span className="text-indigo-400 font-bold">{count}</span> saniye içinde ana sayfaya yönlendiriliyorsunuz.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Link href="/" className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            🏠 Ana Sayfaya Dön
          </Link>
          <Link href="/satin-al" className="border border-indigo-500/40 hover:border-indigo-500 text-indigo-300 hover:text-white transition px-6 py-3 rounded-xl font-semibold">
            🎯 Alan Satın Al
          </Link>
          <Link href="/sss" className="border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white transition px-6 py-3 rounded-xl font-semibold">
            ❓ SSS
          </Link>
        </div>

        {/* Hızlı linkler */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
          <p className="text-gray-500 text-xs mb-3">Sık ziyaret edilen sayfalar</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { href: "/fiyatlandirma", label: "Fiyatlar" },
              { href: "/nasil-calisir", label: "Nasıl Çalışır?" },
              { href: "/haberler", label: "Blog" },
              { href: "/referans", label: "Referans Programı" },
              { href: "/iletisim", label: "İletişim" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white px-3 py-1.5 rounded-full transition">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 text-gray-700 text-xs">Piksel Duvarı — Türkiye&apos;nin dijital reklam duvarı</p>
      </div>
    </main>
  );
}
