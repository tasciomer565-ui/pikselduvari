"use client";

import { useEffect, useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PixelGrid from "@/components/PixelGrid";
import SelectionPanel from "@/components/SelectionPanel";

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
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [view, setView] = useState<"landing" | "grid">("landing");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/pixels")
      .then((r) => r.json())
      .then((data) => { setPixels(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const totalSold = pixels.reduce((acc, p) => acc + p.width * p.height, 0);
  const totalPixels = 1_000_000;
  const pct = ((totalSold / totalPixels) * 100).toFixed(1);

  if (view === "grid") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        {/* Grid header */}
        <header className="border-b border-gray-800 px-5 py-3 flex items-center justify-between bg-gray-950 z-50">
          <button onClick={() => setView("landing")} className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm">
            ← Geri
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold">P</div>
            <span className="font-bold text-sm">Piksel Duvarı</span>
          </div>

          <div className="text-xs text-gray-500 hidden sm:block">
            {hoveredRegion
              ? <span className="text-indigo-400 font-medium">📍 {hoveredRegion}</span>
              : <span>Zoom: <kbd className="bg-gray-700 px-1 rounded">scroll</kbd> · Seçim: <kbd className="bg-gray-700 px-1 rounded">sürükle</kbd></span>
            }
          </div>
        </header>

        {/* Stats şeridi */}
        <div className="bg-gray-900 border-b border-gray-800 px-5 py-2 flex items-center gap-6 text-xs flex-wrap">
          <span className="text-gray-400">Satılan: <strong className="text-white">{totalSold.toLocaleString("tr-TR")}</strong></span>
          <span className="text-gray-400">Kalan: <strong className="text-green-400">{(totalPixels - totalSold).toLocaleString("tr-TR")}</strong></span>
          <span className="text-gray-400">Doluluk: <strong className="text-indigo-400">%{pct}</strong></span>
          <div className="flex-1 bg-gray-800 rounded-full h-1 min-w-24">
            <div className="bg-indigo-500 h-1 rounded-full" style={{ width: `${Math.max(Number(pct), 0.1)}%` }} />
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 relative" style={{ height: "calc(100vh - 80px)" }}>
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center text-gray-600 gap-3 flex-col">
                <div className="w-7 h-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Yükleniyor...</span>
              </div>
            ) : (
              <TransformWrapper
                minScale={0.08}
                maxScale={15}
                initialScale={0.5}
                centerOnInit
                panning={{ disabled: true }}
                wheel={{ step: 0.08 }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    {/* Zoom kontrolleri */}
                    <div className="absolute top-3 right-3 z-50 flex flex-col gap-1">
                      <button onClick={() => zoomIn()} className="w-8 h-8 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white font-bold text-lg flex items-center justify-center">+</button>
                      <button onClick={() => zoomOut()} className="w-8 h-8 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white font-bold text-lg flex items-center justify-center">−</button>
                      <button onClick={() => resetTransform()} className="w-8 h-8 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-400 text-xs flex items-center justify-center" title="Sıfırla">↺</button>
                    </div>
                    <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: 1000, height: 1000 }}>
                      <PixelGrid
                        pixels={pixels}
                        selection={selection}
                        onSelect={setSelection}
                        onRegion={setHoveredRegion}
                        selectable={true}
                      />
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-gray-400 text-xs px-4 py-2 rounded-full border border-gray-700 pointer-events-none">
              Scroll → zoom · Sürükle → alan seç · Sağ tık sürükle → hareket et
            </div>
          </div>
          {selection && <SelectionPanel selection={selection} onClose={() => setSelection(null)} />}
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">PD</div>
          <span className="font-bold text-lg">Piksel Duvarı</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#nasil-calisir" className="text-gray-400 hover:text-white text-sm transition hidden sm:block">Nasıl Çalışır?</a>
          <a href="#fiyat" className="text-gray-400 hover:text-white text-sm transition hidden sm:block">Fiyatlar</a>
          <button
            onClick={() => setView("grid")}
            className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Alan Satın Al
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/50 rounded-full px-4 py-1.5 text-indigo-300 text-xs mb-8">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          Türkiye&apos;nin ilk şehir bazlı piksel reklam duvarı
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
          Reklamın{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            sonsuza kadar
          </span>{" "}
          kalsın
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          1.000.000 piksellik dijital duvarda logonuzu sergileyin. Bir kez öde, sonsuza kadar görün.
          Türkiye genelinde şehrinizi temsil eden alanda yerinizi alın.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setView("grid")}
            className="bg-indigo-600 hover:bg-indigo-500 transition px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2"
          >
            🗺️ Haritayı Gör & Alan Seç
          </button>
          <div className="text-gray-500 text-sm">
            En küçük alan: <span className="text-white font-semibold">10×10 = 100₺</span>
          </div>
        </div>

        {/* Canlı sayaç */}
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
            <div className="text-2xl font-bold text-white">{totalSold.toLocaleString("tr-TR")}</div>
            <div className="text-xs text-gray-500 mt-1">Piksel satıldı</div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
            <div className="text-2xl font-bold text-green-400">{(totalPixels - totalSold).toLocaleString("tr-TR")}</div>
            <div className="text-xs text-gray-500 mt-1">Piksel mevcut</div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
            <div className="text-2xl font-bold text-indigo-400">%{pct}</div>
            <div className="text-xs text-gray-500 mt-1">Doluluk oranı</div>
          </div>
        </div>
      </section>

      {/* Duvar önizlemesi */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
            <span className="text-sm text-gray-400">Piksel Duvarı — Canlı Önizleme</span>
            <button onClick={() => setView("grid")} className="text-indigo-400 hover:text-indigo-300 text-sm transition">
              Tam ekran aç →
            </button>
          </div>
          <div className="relative overflow-hidden" style={{ height: 320 }}>
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <TransformWrapper minScale={0.2} maxScale={3} initialScale={0.28} centerOnInit disabled={false}>
                <TransformComponent wrapperStyle={{ width: "100%", height: "320px" }} contentStyle={{ width: 1000, height: 1000 }}>
                  <PixelGrid pixels={pixels} selection={null} onSelect={() => {}} />
                </TransformComponent>
              </TransformWrapper>
            )}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-gray-900/60" />
            <button
              onClick={() => setView("grid")}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              Alan Seç & Satın Al
            </button>
          </div>
        </div>
      </section>

      {/* Nasıl çalışır */}
      <section id="nasil-calisir" className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Nasıl Çalışır?</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: "1", icon: "🗺️", title: "Şehrini seç", desc: "Haritada şehrini bul, istediğin boyutta alan seç. Ne kadar büyük, o kadar dikkat çeker." },
            { step: "2", icon: "💳", title: "Öde & Logonu Yükle", desc: "Güvenli ödeme yap, logonu ve site bağlantını ekle. Dakikalar içinde tamamlanır." },
            { step: "3", icon: "♾️", title: "Sonsuza Kadar Görün", desc: "Alanın onaylandıktan sonra duvarda yayına girer. Bir kez öde, sonsuza kadar kal." },
          ].map((item) => (
            <div key={item.step} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="text-xs text-indigo-400 font-bold mb-2">ADIM {item.step}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fiyat */}
      <section id="fiyat" className="px-6 py-20 bg-gray-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Şeffaf Fiyatlandırma</h2>
          <p className="text-gray-400 mb-10">Gizli ücret yok. Bir kez öde, sonsuza kadar kal.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { size: "10×10", pixels: "100 piksel", price: "100₺", tag: "Başlangıç" },
              { size: "50×50", pixels: "2.500 piksel", price: "2.500₺", tag: "Popüler", highlight: true },
              { size: "100×100", pixels: "10.000 piksel", price: "10.000₺", tag: "Premium" },
            ].map((p) => (
              <div
                key={p.size}
                className={`rounded-2xl p-6 border text-center ${p.highlight ? "border-indigo-500 bg-indigo-950/40" : "border-gray-800 bg-gray-900"}`}
              >
                {p.highlight && <div className="text-xs text-indigo-400 font-bold mb-2">⭐ {p.tag}</div>}
                {!p.highlight && <div className="text-xs text-gray-500 mb-2">{p.tag}</div>}
                <div className="text-2xl font-bold mb-1">{p.size}</div>
                <div className="text-gray-400 text-sm mb-4">{p.pixels}</div>
                <div className="text-3xl font-extrabold text-indigo-400">{p.price}</div>
                <div className="text-xs text-gray-600 mt-1">tek seferlik</div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-6">1 piksel = 1₺ · Kendi boyutunu seç · Sınır yok</p>
          <button
            onClick={() => setView("grid")}
            className="mt-8 bg-indigo-600 hover:bg-indigo-500 transition px-8 py-4 rounded-xl font-bold text-lg"
          >
            Hemen Alan Seç
          </button>
        </div>
      </section>

      {/* SSS */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          {[
            { q: "Alan gerçekten sonsuza kadar mı kalır?", a: "Evet. Piksel Duvarı silinmediği sürece alanın orada kalır. Bu bir kez öde, sonsuza kadar kal modelidir." },
            { q: "Logo yerine ne yükleyebilirim?", a: "Logonuzu, ürün görselinizi veya marka renginizi yükleyebilirsiniz. Görsel admin onayından geçer." },
            { q: "En küçük alan ne kadar?", a: "En küçük alan 10×10 piksel = 100₺. En büyük alan tüm duvara kadar gidebilir." },
            { q: "Şehrimi nasıl seçerim?", a: "Haritada Türkiye şehirlerine bölünmüş renk kodlu alanlar var. Şehrine ait bölgeden dilediğin alanı seçebilirsin." },
          ].map((item, i) => (
            <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 p-5">
              <h3 className="font-semibold mb-2">{item.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-indigo-950 to-purple-950 rounded-3xl border border-indigo-800/50 p-12">
          <h2 className="text-3xl font-bold mb-4">Yerinizi şimdi alın</h2>
          <p className="text-gray-400 mb-8">Her geçen gün daha az alan kalıyor. En iyi konumlar dolmadan önce harekete geçin.</p>
          <button
            onClick={() => setView("grid")}
            className="bg-indigo-600 hover:bg-indigo-500 transition px-8 py-4 rounded-xl font-bold text-lg"
          >
            🗺️ Haritayı Aç & Alan Seç
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">PD</div>
          <span>Piksel Duvarı © 2024</span>
        </div>
        <span>Her piksel sonsuza kadar senin.</span>
        <a href="/admin" className="hover:text-gray-400 transition">Admin</a>
      </footer>
    </div>
  );
}
