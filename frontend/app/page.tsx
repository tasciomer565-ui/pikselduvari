"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PixelGrid from "@/components/PixelGrid";
import SelectionPanel from "@/components/SelectionPanel";
import Minimap from "@/components/Minimap";
import MobileSelectionSheet from "@/components/MobileSelectionSheet";
import { REGIONS } from "@/lib/regions";
import { createClient } from "@supabase/supabase-js";
import { useToast } from "@/components/Toast";
import TikTokPopup from "@/components/TikTokPopup";

const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

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

// ─── Live purchase ticker ───────────────────────────────────────────────────
const FAKE_PURCHASES = [
  "⚡ Az önce: İstanbul'dan 50×50 alan alındı · 2.500₺",
  "⚡ Az önce: Ankara'dan 20×20 alan · 400₺",
  "⚡ Az önce: İzmir'den 30×30 alan alındı · 900₺",
  "⚡ Az önce: Antalya'dan 100×50 alan · 5.000₺",
  "⚡ Az önce: Gaziantep'ten 40×40 alan · 1.600₺",
  "⚡ Az önce: Bursa'dan 10×10 alan · 100₺",
  "⚡ Az önce: Trabzon'dan 20×30 alan · 600₺",
];

function LiveTicker() {
  const [offset, setOffset] = useState(0);
  const text = FAKE_PURCHASES.join("   ·   ");
  useEffect(() => {
    const t = setInterval(() => setOffset((o) => (o + 1) % (text.length * 8)), 50);
    return () => clearInterval(t);
  }, [text.length]);
  return (
    <div className="bg-indigo-950/50 border-y border-indigo-900/40 py-2 overflow-hidden">
      <div
        className="whitespace-nowrap text-xs text-indigo-300 inline-block"
        style={{ transform: `translateX(-${offset}px)`, transition: "none" }}
      >
        {text} &nbsp;&nbsp;&nbsp; {text}
      </div>
    </div>
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", className = "" }: { target: number; suffix?: string; className?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const steps = 40;
          const step = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setCount(Math.floor(current));
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className={className}>
      {count.toLocaleString("tr-TR")}{suffix}
    </div>
  );
}

// ─── Live visitor counter ────────────────────────────────────────────────────
function LiveVisitorCounter() {
  const [count, setCount] = useState(() => Math.floor(Math.random() * 10) + 3);
  useEffect(() => {
    const t = setInterval(() => setCount(Math.floor(Math.random() * 10) + 3), 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
      Şu an <strong className="text-gray-300 mx-1">{count}</strong> kişi siteyi görüntülüyor
    </span>
  );
}

// ─── Onboarding Modal ────────────────────────────────────────────────────────
function OnboardingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: "🗺️", title: "Haritayı Keşfet", desc: "Türkiye şehirlerine bölünmüş renk kodlu piksel haritamızı inceleyin. Şehrinizin bölgesini bulun." },
    { icon: "🖱️", title: "Alanınızı Seçin", desc: "Haritada sürükleyerek ya da hazır boyutları kullanarak istediğiniz alanı seçin." },
    { icon: "✅", title: "Ödeyin & Görünün", desc: "Güvenli ödeme yapın, logonuzu yükleyin. Admin onayından sonra alanınız sonsuza kadar duvarda yer alır!" },
  ];
  const current = steps[step];
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
        <div className="text-5xl text-center mb-4">{current.icon}</div>
        <div className="flex justify-center gap-1.5 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "bg-indigo-500 w-8" : "bg-gray-700 w-4"}`} />
          ))}
        </div>
        <h3 className="text-xl font-bold text-center mb-3">{current.title}</h3>
        <p className="text-gray-400 text-sm text-center leading-relaxed mb-8">{current.desc}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white py-2.5 rounded-xl text-sm transition">
            Atla
          </button>
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(step + 1)} className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-2.5 rounded-xl text-sm font-semibold transition">
              İleri →
            </button>
          ) : (
            <button onClick={onClose} className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-2.5 rounded-xl text-sm font-semibold transition">
              Başla! 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── WhatsApp Chat Widget ─────────────────────────────────────────────────────
function CampaignBanner() {
  const CAMPAIGN_LIMIT = 50;
  const [remaining, setRemaining] = useState(43);
  const pct = Math.round(((CAMPAIGN_LIMIT - remaining) / CAMPAIGN_LIMIT) * 100);
  return (
    <div className="w-full max-w-xl mx-auto mb-6 bg-gradient-to-r from-orange-950/60 to-red-950/60 border border-orange-500/30 rounded-2xl px-5 py-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-orange-400 text-lg">🔥</span>
          <span className="text-white font-bold text-sm">İlk 50 Alana %20 İndirim</span>
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">CANLI</span>
        </div>
        <span className="text-orange-300 font-bold text-sm">{remaining} alan kaldı</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
        <div
          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-gray-400 text-xs text-center">Kampanya bittiğinde normal fiyata döner · Kod otomatik uygulanır</p>
    </div>
  );
}

function EmailCapture() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "landing" }),
    });
    setSent(true);
    setLoading(false);
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-indigo-950/40 border border-indigo-800/30 rounded-3xl p-8 text-center">
        <div className="text-4xl mb-3">🎁</div>
        <h3 className="text-2xl font-bold mb-2">Ücretsiz 10×10 Alan Kazan</h3>
        <p className="text-gray-400 text-sm mb-6">
          E-posta listemize katıl, PayTR entegrasyonu aktif olduğunda <strong className="text-white">100₺ değerinde ücretsiz alan</strong> sana özel gönderilsin.
        </p>
        {sent ? (
          <div className="bg-green-900/30 border border-green-700/40 rounded-xl px-6 py-4">
            <p className="text-green-400 font-semibold">✅ Kaydedildi! Ödeme aktif olduğunda seni haberdar edeceğiz.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@örnek.com"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 transition px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap"
            >
              {loading ? "..." : "Ücretsiz Alanımı Al 🎯"}
            </button>
          </form>
        )}
        <p className="text-gray-600 text-xs mt-3">Spam yok. İstediğin zaman çıkabilirsin.</p>
      </div>
    </section>
  );
}

function SponsorBanner() {
  const [visible, setVisible] = useState(true);
  const waMsg = encodeURIComponent("Merhaba! Piksel Duvarı'nda sponsorlu reklam alanı almak istiyorum. Fiyat bilgisi alabilir miyim?");
  if (!visible) return null;
  return (
    <div className="fixed top-20 right-6 z-40 max-w-xs">
      <div className="bg-gray-900 border border-indigo-500/40 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 px-4 py-2 flex items-center justify-between border-b border-indigo-500/20">
          <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Sponsorlu Alan</span>
          <button onClick={() => setVisible(false)} className="text-gray-600 hover:text-gray-400 text-lg leading-none">×</button>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl flex-shrink-0">
              📢
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Bu Alan Satılık</p>
              <p className="text-gray-400 text-xs">Markanı burada sergile</p>
            </div>
          </div>
          <p className="text-gray-400 text-xs mb-3 leading-relaxed">
            Türkiye'nin piksel reklam duvarında ziyaretçilere doğrudan ulaş. Aylık sabit ücret.
          </p>
          <a
            href={`https://wa.me/905551663380?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 transition text-white text-xs font-semibold py-2.5 rounded-xl"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp ile İletişim
          </a>
        </div>
      </div>
    </div>
  );
}

function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const msg = encodeURIComponent("Merhaba! Piksel Duvarı'nda reklam alanı almak istiyorum. Bilgi alabilir miyim? 🎯");
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 w-72 shadow-2xl animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold">Piksel Duvarı Destek</div>
              <div className="flex items-center gap-1 text-xs text-green-400">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Çevrimiçi
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-gray-500 hover:text-white text-lg leading-none">×</button>
          </div>
          <div className="bg-gray-800 rounded-xl p-3 mb-3 text-sm text-gray-300">
            Merhaba! Piksel Duvarı&apos;nda reklam alanı almak istiyorum. Bilgi alabilir miyim? 🎯
          </div>
          <a
            href={`https://wa.me/905551663380?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-500 hover:bg-green-400 transition text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp&apos;ta Yaz
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-2 bg-green-500 hover:bg-green-400 transition shadow-lg rounded-full px-4 py-3 text-white font-semibold text-sm"
        style={{ boxShadow: "0 4px 20px rgba(34,197,94,0.5)" }}
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full animate-ping" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Destek
      </button>
    </div>
  );
}

// ─── Pixel Calculator ─────────────────────────────────────────────────────────
function PixelCalculator({ onGoToGrid }: { onGoToGrid: () => void }) {
  const [w, setW] = useState(50);
  const [h, setH] = useState(50);
  const pixels = w * h;
  const price = pixels;
  const billboardEq = Math.max(1, Math.round(pixels / 100000));

  return (
    <section className="px-6 py-16 bg-gray-900/40">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">🧮 Piksel Hesaplayıcı</h2>
        <p className="text-gray-400 text-sm text-center mb-8">Kaç piksel almak istiyorsunuz? Fiyatınızı hesaplayın.</p>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Genişlik: <strong className="text-white">{w} px</strong></span>
              <span className="text-gray-600 text-xs">(10–500)</span>
            </div>
            <input type="range" min={10} max={500} step={10} value={w} onChange={(e) => setW(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Yükseklik: <strong className="text-white">{h} px</strong></span>
              <span className="text-gray-600 text-xs">(10–500)</span>
            </div>
            <input type="range" min={10} max={500} step={10} value={h} onChange={(e) => setH(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer" />
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-indigo-950/50 border border-indigo-900/50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-indigo-400">{pixels.toLocaleString("tr-TR")}</div>
              <div className="text-xs text-gray-500 mt-1">Toplam Piksel</div>
            </div>
            <div className="bg-green-950/50 border border-green-900/50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-green-400">{price.toLocaleString("tr-TR")}₺</div>
              <div className="text-xs text-gray-500 mt-1">Toplam Fiyat</div>
            </div>
            <div className="bg-purple-950/50 border border-purple-900/50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-purple-400">{billboardEq}x</div>
              <div className="text-xs text-gray-500 mt-1">Billboard eşdeğeri</div>
            </div>
          </div>
          <div className="bg-orange-950/30 border border-orange-900/30 rounded-xl p-3 text-xs text-orange-300 text-center">
            Tahmini günlük görüntülenme: <strong>{Math.round(pixels * 0.05).toLocaleString("tr-TR")}+</strong> kişi
          </div>
          <button
            onClick={onGoToGrid}
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition py-3 rounded-xl font-bold text-sm"
          >
            Bu Alanı Rezerve Et →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Region Fill Indicators ───────────────────────────────────────────────────
function RegionFillIndicators({ pixels, onGoToGrid }: { pixels: Pixel[]; onGoToGrid: () => void }) {
  const featured = REGIONS.slice(0, 8);
  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">🗺️ Bölge Doluluk Göstergesi</h2>
      <p className="text-gray-400 text-sm text-center mb-8">Popüler bölgeler hızla dolmaktadır — şimdi yerinizi alın!</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {featured.map((r) => {
          const totalPx = r.w * r.h;
          const soldPx = pixels.filter(p =>
            p.x >= r.x && p.y >= r.y && p.x + p.width <= r.x + r.w && p.y + p.height <= r.y + r.h
          ).reduce((acc, p) => acc + p.width * p.height, 0);
          const pct = Math.min(100, Math.round((soldPx / totalPx) * 100));
          const remaining = totalPx - soldPx;
          const urgency = pct >= 20 ? "text-orange-400" : pct >= 10 ? "text-yellow-400" : "text-green-400";
          return (
            <button
              key={r.id}
              onClick={onGoToGrid}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-left hover:border-gray-600 transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: r.color }} />
                  <span className="font-semibold text-sm">{r.name}</span>
                </div>
                <span className={`text-xs font-bold ${urgency}`}>%{pct} dolu</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{ width: `${Math.max(pct, 0.5)}%`, backgroundColor: r.color }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{remaining.toLocaleString("tr-TR")} piksel kaldı</span>
                <span className="text-indigo-400 group-hover:text-indigo-300">Alan seç →</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
function ComparisonTable() {
  const rows = [
    { feature: "Aylık maliyet", piksel: "Yok ✅", billboard: "5.000₺+ ❌", google: "1.000₺+ ❌", social: "500₺+ ❌" },
    { feature: "Kalıcılık", piksel: "Sonsuza kadar ✅", billboard: "Kontrat biter ❌", google: "Durdurunca biter ❌", social: "Silinir ❌" },
    { feature: "Hedefleme", piksel: "Şehir bazlı ✅", billboard: "Sabit konum ⚠️", google: "Gelişmiş ✅", social: "Gelişmiş ✅" },
    { feature: "Minimum bütçe", piksel: "100₺ ✅", billboard: "5.000₺ ❌", google: "500₺ ❌", social: "50₺ ✅" },
    { feature: "Kurulum süresi", piksel: "Dakikalar ✅", billboard: "Haftalar ❌", google: "Saatler ⚠️", social: "Saatler ⚠️" },
  ];
  return (
    <section className="px-6 py-16 bg-gray-900/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">⚖️ Rakiplerle Karşılaştırma</h2>
        <p className="text-gray-400 text-sm text-center mb-8">Neden Piksel Duvarı en akıllı yatırım?</p>
        <div className="overflow-x-auto rounded-2xl border border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-800">
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Özellik</th>
                <th className="px-4 py-3 text-center font-bold text-indigo-400 bg-indigo-950/30">Piksel Duvarı</th>
                <th className="px-4 py-3 text-center text-gray-400 font-medium">Billboard</th>
                <th className="px-4 py-3 text-center text-gray-400 font-medium">Google Ads</th>
                <th className="px-4 py-3 text-center text-gray-400 font-medium">Sosyal Medya</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={`border-b border-gray-800/50 ${i % 2 === 0 ? "bg-gray-900/20" : ""}`}>
                  <td className="px-4 py-3 text-gray-300">{row.feature}</td>
                  <td className="px-4 py-3 text-center font-semibold bg-indigo-950/20">{row.piksel}</td>
                  <td className="px-4 py-3 text-center text-gray-400">{row.billboard}</td>
                  <td className="px-4 py-3 text-center text-gray-400">{row.google}</td>
                  <td className="px-4 py-3 text-center text-gray-400">{row.social}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Why Piksel Duvarı ────────────────────────────────────────────────────────
function WhySection() {
  const cards = [
    { icon: "🏆", title: "Tek seferlik ödeme", desc: "Billboard gibi aylık fatura ödemezsiniz. Bir kez ödeyin, sonsuza kadar görünün." },
    { icon: "🗺️", title: "Şehir bazlı hedefleme", desc: "Hedef kitlenizin yaşadığı şehrin piksel bölgesinde yer alın. Doğru kitleye doğru mesaj." },
    { icon: "⚡", title: "Anında yayın", desc: "Ödeme ve onay sonrası dakikalar içinde alanınız canlıya alınır." },
    { icon: "📱", title: "Mobil uyumlu", desc: "Her cihazdan — telefon, tablet, masaüstü — görünür ve erişilebilir." },
    { icon: "🔒", title: "Güvenli ödeme", desc: "SSL şifreleme ve PayTR güvencesiyle güvenli ödeme altyapısı." },
    { icon: "♾️", title: "Kalıcı alan", desc: "Site var olduğu sürece reklamınız orada. Kontrat bitmez, süre dolmaz." },
  ];
  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Neden Piksel Duvarı?</h2>
      <p className="text-gray-400 text-sm text-center mb-10">Türkiye&apos;nin en akıllı reklam yatırımı</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-600 transition hover:scale-[1.02]">
            <div className="text-3xl mb-3">{c.icon}</div>
            <h3 className="font-bold mb-2">{c.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const items = [
    { name: "Ahmet Y.", company: "İstanbul Yazılım A.Ş.", text: "Kurulumu çok kolaydı. 5 dakikada logom duvarda. Rakip sitelerde aylık ödeme istiyorlardı, burada tek seferlik — mükemmel!", rating: 5 },
    { name: "Fatma K.", company: "Ege Turizm", text: "İzmir bölgesinde 50x50 alan aldım. Müşterilerimin &quot;sizi piksel duvarda gördüm&quot; demesi çok güzel bir his.", rating: 5 },
    { name: "Mehmet D.", company: "Ankara Tech", text: "Dijital pazarlamada yenilikçi bir yaklaşım. Kalıcı reklam için en makul fiyat. Kesinlikle tavsiye ederim.", rating: 5 },
    { name: "Zeynep A.", company: "Antalya Otel", text: "Sezon başında aldım. Artık logomuz Antalya bölgesinin tam merkezinde. Görünürlüğümüz arttı.", rating: 5 },
    { name: "Can Ö.", company: "Gaziantep Mutfak", text: "Tek seferlik 100₺ ile reklam bu kadar ucuz olmaz. İlk deneyimde memnun kaldım, daha büyük alan almayı düşünüyorum.", rating: 5 },
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(t);
  }, [items.length]);

  const item = items[idx];
  return (
    <section className="px-6 py-16 bg-indigo-950/20 border-y border-indigo-900/20">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">Müşterilerimiz Ne Diyor?</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 min-h-[160px] transition-all">
          <div className="text-yellow-400 text-lg mb-3">{"★".repeat(item.rating)}</div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">&ldquo;{item.text}&rdquo;</p>
          <div className="font-semibold text-sm">{item.name}</div>
          <div className="text-gray-500 text-xs">{item.company}</div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-indigo-500 w-6" : "bg-gray-700"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter Section ───────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    showToast("Haberdar edileceksiniz!", "success");
  };
  return (
    <section className="px-6 py-16 bg-indigo-950/30 border-y border-indigo-900/30">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-2xl mb-3">📬</div>
        <h2 className="text-2xl font-bold mb-2">Yeni Alan Açıldığında Haberdar Ol</h2>
        <p className="text-gray-400 text-sm mb-6">En iyi bölgeler dolmadan önce sizi bilgilendirelim.</p>
        {submitted ? (
          <div className="bg-green-950/50 border border-green-800 rounded-xl px-6 py-4 text-green-300 text-sm font-medium">
            ✓ Teşekkürler! Yeni alanlar açıldığında sizi bilgilendireceğiz.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="e-posta adresiniz"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 text-sm transition"
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 transition px-5 py-3 rounded-xl text-sm font-semibold shrink-0">
              Abone Ol
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBarLanding({ pixels }: { pixels: Pixel[] }) {
  const totalSold = pixels.reduce((acc, p) => acc + p.width * p.height, 0);
  const stats = [
    { label: "Toplam Piksel", value: "1.000.000", suffix: "", color: "text-white" },
    { label: "Şehir Bölgesi", value: "16", suffix: "", color: "text-indigo-400" },
    { label: "Kalıcılık", value: "Sonsuza", suffix: " Kadar", color: "text-green-400" },
    { label: "Başlangıç fiyatı", value: "1", suffix: "₺/piksel", color: "text-yellow-400" },
  ];
  return (
    <div className="bg-gray-900 border-y border-gray-800 px-6 py-5">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}<span className="text-base font-medium">{s.suffix}</span></div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      {totalSold > 0 && (
        <div className="max-w-5xl mx-auto mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>{totalSold.toLocaleString("tr-TR")} piksel satıldı</span>
            <span>{(1000000 - totalSold).toLocaleString("tr-TR")} piksel kaldı</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${Math.max((totalSold / 1000000) * 100, 0.2)}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────
function TrustBadges() {
  const badges = [
    { icon: "🔒", label: "SSL/TLS Güvenli" },
    { icon: "🛡️", label: "KVKK Uyumlu" },
    { icon: "✅", label: "PayTR Güvenli Ödeme" },
    { icon: "💯", label: "30 Gün İade Garantisi" },
    { icon: "🇹🇷", label: "Türk Girişimi" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-8 px-6 border-y border-gray-800/50">
      {badges.map((b) => (
        <div key={b.label} className="flex items-center gap-2 text-xs text-gray-500">
          <span>{b.icon}</span><span>{b.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Region Cards ─────────────────────────────────────────────────────────────
function RegionCards({ onRegionSelect }: { onRegionSelect: (id: string) => void }) {
  const featured = REGIONS.slice(0, 6);
  return (
    <section className="px-6 py-16 bg-gray-900/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">Bölgeler</h2>
        <p className="text-gray-500 text-sm text-center mb-10">Türkiye&apos;nin her şehrinde yerinizi alın</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((r) => {
            const totalPixels = r.w * r.h;
            return (
              <button key={r.id} onClick={() => onRegionSelect(r.id)}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-left hover:border-gray-600 transition group"
              >
                <div className="w-10 h-10 rounded-lg mb-3 opacity-80" style={{ backgroundColor: r.color }} />
                <h3 className="font-semibold mb-0.5">{r.name}</h3>
                <p className="text-gray-500 text-xs mb-3">{r.subtitle}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{totalPixels.toLocaleString("tr-TR")} piksel</span>
                  <span className="text-indigo-400 font-medium group-hover:text-indigo-300">Alan Seç →</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Partner Logos ────────────────────────────────────────────────────────────
function PartnerLogos() {
  const partners = ["Turhost", "PayTR", "Cloudflare", "Vercel", "Supabase"];
  return (
    <section className="px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-600 text-xs uppercase tracking-widest mb-6">Teknoloji Ortaklarımız</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {partners.map((p) => (
            <div key={p} className="bg-gray-900 border border-gray-800 rounded-lg px-5 py-2.5 text-gray-500 text-sm font-medium hover:text-gray-300 transition">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Easter Egg Confetti ──────────────────────────────────────────────────────
function EasterEggConfetti({ active, onDone }: { active: boolean; onDone: () => void }) {
  useEffect(() => {
    if (active) {
      const t = setTimeout(onDone, 3000);
      return () => clearTimeout(t);
    }
  }, [active, onDone]);

  if (!active) return null;
  const squares = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: ["#6366f1", "#a855f7", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"][Math.floor(Math.random() * 6)],
    size: `${Math.random() * 16 + 8}px`,
    delay: `${Math.random() * 0.5}s`,
    duration: `${Math.random() * 1.5 + 1}s`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {squares.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-sm opacity-90"
          style={{
            left: s.left,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            top: "-20px",
            animation: `confettiFall ${s.duration} ${s.delay} ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [view, setView] = useState<"landing" | "grid">("landing");

  const goToGrid = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click_haritayi_ac", { event_category: "conversion" });
    }
    setView("grid");
  };
  const [liveCount, setLiveCount] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [panTarget, setPanTarget] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [coordInput, setCoordInput] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [showSoldOverlay, setShowSoldOverlay] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [easterEgg, setEasterEgg] = useState(false);
  const [easterBuffer, setEasterBuffer] = useState("");
  const transformRef = useRef<any>(null);
  const { showToast } = useToast();

  const [viewport, setViewport] = useState({ x: 0, y: 0, w: 1000, h: 1000 });
  const [zoomScale, setZoomScale] = useState(0.5);
  const [transformState, setTransformState] = useState({ x: 0, y: 0, scale: 0.5 });

  useEffect(() => {
    fetch("/api/pixels")
      .then((r) => r.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setPixels(arr);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    if (!localStorage.getItem("pd_visited")) {
      setShowOnboarding(true);
      localStorage.setItem("pd_visited", "1");
    }

    const channel = supabasePublic
      .channel("pixels-live")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "pixels", filter: "status=eq.approved" },
        (payload) => {
          const np = payload.new as Pixel;
          setPixels((prev) => {
            const exists = prev.find((p) => p.id === np.id);
            if (exists) return prev.map((p) => (p.id === np.id ? np : p));
            return [...prev, np];
          });
          setLiveCount((c) => c + 1);
        }
      )
      .subscribe();

    return () => { supabasePublic.removeChannel(channel); };
  }, []);

  // Easter egg: type "piksel" anywhere on landing
  useEffect(() => {
    if (view !== "landing") return;
    const handler = (e: KeyboardEvent) => {
      const buf = (easterBuffer + e.key).slice(-6);
      setEasterBuffer(buf);
      if (buf === "piksel") {
        setEasterEgg(true);
        setEasterBuffer("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [view, easterBuffer]);

  // Grid keyboard shortcuts
  useEffect(() => {
    if (view !== "grid") return;
    const BLOCK = 10;
    const GRID = 1000;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSelection(null); return; }
      if ((e.ctrlKey || e.metaKey) && e.key === "z") { e.preventDefault(); setSelection(null); return; }
      if (e.key === "Enter" && selection) {
        const params = new URLSearchParams({ x: String(selection.x), y: String(selection.y), w: String(selection.width), h: String(selection.height) });
        window.location.href = `/satin-al?${params}`;
        return;
      }
      // Yön tuşları ile seçimi kaydır
      if (selection && ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? BLOCK * 5 : BLOCK; // Shift ile 5x hızlı
        setSelection(prev => {
          if (!prev) return prev;
          let nx = prev.x, ny = prev.y;
          if (e.key === "ArrowLeft")  nx = Math.max(0, prev.x - step);
          if (e.key === "ArrowRight") nx = Math.min(GRID - prev.width, prev.x + step);
          if (e.key === "ArrowUp")    ny = Math.max(0, prev.y - step);
          if (e.key === "ArrowDown")  ny = Math.min(GRID - prev.height, prev.y + step);
          return { ...prev, x: nx, y: ny };
        });
        return;
      }
      // + / - ile seçim boyutunu değiştir
      if (selection && (e.key === "+" || e.key === "=")) {
        e.preventDefault();
        setSelection(prev => prev ? {
          ...prev,
          width:  Math.min(GRID - prev.x, prev.width + BLOCK),
          height: Math.min(GRID - prev.y, prev.height + BLOCK),
        } : prev);
        return;
      }
      if (selection && e.key === "-") {
        e.preventDefault();
        setSelection(prev => prev ? {
          ...prev,
          width:  Math.max(BLOCK, prev.width - BLOCK),
          height: Math.max(BLOCK, prev.height - BLOCK),
        } : prev);
        return;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [view, selection]);

  const totalSold = pixels.reduce((acc, p) => acc + p.width * p.height, 0);
  const totalPixels = 1_000_000;
  const pct = ((totalSold / totalPixels) * 100).toFixed(1);

  const handlePreset = useCallback((w: number, h: number) => {
    setSelection((prev) => prev ? { x: prev.x, y: prev.y, width: w, height: h } : { x: 0, y: 0, width: w, height: h });
  }, []);

  const handleShareSelection = () => {
    if (!selection) return;
    const url = `https://pikselduvari.com/?x=${selection.x}&y=${selection.y}&w=${selection.width}&h=${selection.height}`;
    navigator.clipboard.writeText(url).then(() => showToast("Bağlantı kopyalandı!", "success"));
  };

  const handleCoordGo = () => {
    const parts = coordInput.split(",").map((s) => parseInt(s.trim(), 10));
    if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const [x, y] = parts;
      const scale = 1.5;
      const posX = -x * scale + window.innerWidth / 2;
      const posY = -y * scale + window.innerHeight / 2;
      transformRef.current?.setTransform(posX, posY, scale, 400);
      setCoordInput("");
    } else {
      showToast("Geçersiz koordinat. Örnek: 200, 300", "error");
    }
  };

  const handleRegionSelect = (id: string) => {
    setView("grid");
    setTimeout(() => setPanTarget(id), 100);
  };

  // ─── Grid view ──────────────────────────────────────────────────────────────
  if (view === "grid") {
    return (
      <div className={`min-h-screen text-white flex flex-col ${darkMode ? "bg-gray-950" : "bg-white text-gray-900"}`}>
        <header className={`border-b px-5 py-3 flex items-center justify-between z-50 ${darkMode ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
          <button onClick={() => setView("landing")} className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm">
            ← Geri
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold">P</div>
              <span className="font-bold text-sm">Piksel Duvarı</span>
            </div>
            <div className="flex items-center gap-1.5 bg-red-950/60 border border-red-800/50 rounded-full px-2 py-0.5 text-xs text-red-400">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              Canlı{liveCount > 0 && <span className="text-red-300">+{liveCount}</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)}
              className="w-8 h-8 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-400 text-sm flex items-center justify-center"
              title={darkMode ? "Açık mod" : "Koyu mod"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <div className="text-xs text-gray-500 hidden sm:block">
              {hoveredRegion
                ? <span className="text-indigo-400 font-medium">📍 {hoveredRegion}</span>
                : <span>Zoom: <kbd className="bg-gray-700 px-1 rounded">scroll</kbd> · Tıkla: <kbd className="bg-gray-700 px-1 rounded">alan seç</kbd> · Sürükle: <kbd className="bg-gray-700 px-1 rounded">kaydır</kbd></span>
              }
            </div>
          </div>
        </header>

        <div className={`border-b px-5 py-2 flex items-center gap-4 text-xs flex-wrap ${darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
          <span className="text-gray-400">Satılan: <strong className="text-white">{totalSold.toLocaleString("tr-TR")}</strong></span>
          <span className="text-gray-400">Kalan: <strong className="text-green-400">{(totalPixels - totalSold).toLocaleString("tr-TR")}</strong></span>
          <span className="text-gray-400">Doluluk: <strong className="text-indigo-400">%{pct}</strong></span>
          <div className="flex-1 bg-gray-800 rounded-full h-1 min-w-24">
            <div className="bg-indigo-500 h-1 rounded-full" style={{ width: `${Math.max(Number(pct), 0.1)}%` }} />
          </div>
          <div className="flex items-center gap-1">
            <input type="text" placeholder="X, Y koordinatı" value={coordInput}
              onChange={(e) => setCoordInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCoordGo()}
              className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white w-28"
            />
            <button onClick={handleCoordGo} className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs">Git</button>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="text"
              placeholder="🔍 Marka ara..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white w-28 focus:border-indigo-500 focus:outline-none"
            />
            {brandSearch && (
              <button onClick={() => setBrandSearch("")} className="text-gray-500 hover:text-white text-xs">✕</button>
            )}
          </div>
          <button
            onClick={() => setShowSoldOverlay(!showSoldOverlay)}
            className={`px-2 py-1 rounded text-xs border transition ${showSoldOverlay ? "bg-red-900/50 border-red-700 text-red-300" : "bg-gray-800 border-gray-700 text-gray-400"}`}
          >
            {showSoldOverlay ? "Overlay Kapat" : "Satılan/Boş Göster"}
          </button>
          <select
            value={selectedRegion}
            onChange={(e) => { setSelectedRegion(e.target.value); if (e.target.value) setPanTarget(e.target.value); }}
            className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white ml-2"
          >
            <option value="">📍 Bölge Seç</option>
            {REGIONS.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>

        <div className="bg-indigo-950/20 border-b border-indigo-900/20 px-5 py-1 text-xs text-indigo-400/60 hidden sm:flex gap-4">
          <span><kbd className="bg-gray-800 px-1 rounded text-gray-500">ESC</kbd> Seçimi temizle</span>
          <span><kbd className="bg-gray-800 px-1 rounded text-gray-500">Ctrl+Z</kbd> Geri al</span>
          <span><kbd className="bg-gray-800 px-1 rounded text-gray-500">Enter</kbd> Satın al</span>
          {selection && (
            <button onClick={handleShareSelection} className="ml-auto text-indigo-400 hover:text-indigo-300 transition">
              🔗 Bu Alanı Paylaş
            </button>
          )}
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 relative" style={{ height: "calc(100vh - 110px)" }}>
            {loading ? (
              <div className="absolute inset-0 overflow-hidden bg-gray-950">
                {/* Shimmer skeleton grid */}
                <div className="w-full h-full grid grid-cols-6 grid-rows-4 gap-2 p-4 opacity-30">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded bg-gray-800"
                      style={{
                        background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                        backgroundSize: "200% 100%",
                        animation: `shimmer 1.5s ${(i * 0.06).toFixed(2)}s infinite`,
                      }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                  <div className="w-7 h-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-gray-500">Piksel haritası yükleniyor...</span>
                </div>
                <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
              </div>
            ) : (
              <TransformWrapper
                ref={transformRef}
                minScale={0.08}
                maxScale={15}
                initialScale={0.5}
                centerOnInit
                panning={{ disabled: false }}
                wheel={{ step: 0.03 }}
                onTransform={(ref) => {
                  const { positionX, positionY, scale } = ref.state;
                  const containerW = window.innerWidth;
                  const containerH = window.innerHeight;
                  setViewport({
                    x: Math.max(0, -positionX / scale),
                    y: Math.max(0, -positionY / scale),
                    w: containerW / scale,
                    h: containerH / scale,
                  });
                  setZoomScale(scale);
                  setTransformState({ x: positionX, y: positionY, scale });
                }}
              >
                {({ zoomIn, zoomOut, resetTransform, setTransform }) => {
                  if (panTarget) {
                    const region = REGIONS.find((r) => r.id === panTarget);
                    if (region) {
                      const scale = 1.2;
                      const cx = region.x + region.w / 2;
                      const cy = region.y + region.h / 2;
                      const posX = -cx * scale + window.innerWidth / 2;
                      const posY = -cy * scale + window.innerHeight / 2;
                      setTimeout(() => { setTransform(posX, posY, scale, 400); setPanTarget(null); }, 10);
                    }
                  }
                  return (
                    <>
                      <div className="absolute top-3 right-3 z-50 flex flex-col gap-1">
                        <button onClick={() => zoomIn()} className="w-8 h-8 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white font-bold text-lg flex items-center justify-center">+</button>
                        <div className="w-8 h-7 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 text-[10px] flex items-center justify-center font-mono select-none">
                          {Math.round(zoomScale * 100)}%
                        </div>
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
                          showSoldOverlay={showSoldOverlay}
                          brandSearch={brandSearch}
                        />
                      </TransformComponent>
                    </>
                  );
                }}
              </TransformWrapper>
            )}

            {/* Seçim yön ok butonları — TransformComponent dışında, ekran koordinatıyla */}
            {!loading && selection && (() => {
              const { x: tx, y: ty, scale } = transformState;
              const sx = selection.x * scale + tx;
              const sy = selection.y * scale + ty;
              const sw = selection.width * scale;
              const sh = selection.height * scale;
              const cx = sx + sw / 2;
              const cy = sy + sh / 2;
              const B = 32;
              const G = 6;
              const btnCls = "absolute flex items-center justify-center bg-gray-900/95 border border-yellow-400/70 text-yellow-300 font-bold rounded-lg shadow-xl hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition text-sm select-none";
              const move = (dx: number, dy: number) => setSelection(prev => prev ? {
                ...prev,
                x: Math.max(0, Math.min(1000 - prev.width, prev.x + dx)),
                y: Math.max(0, Math.min(1000 - prev.height, prev.y + dy)),
              } : prev);
              return (
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 25 }}>
                  <button className={btnCls} style={{ width: B, height: B, left: cx - B/2, top: sy - B - G, pointerEvents: "auto" }} onClick={() => move(0, -10)}>▲</button>
                  <button className={btnCls} style={{ width: B, height: B, left: cx - B/2, top: sy + sh + G, pointerEvents: "auto" }} onClick={() => move(0, 10)}>▼</button>
                  <button className={btnCls} style={{ width: B, height: B, left: sx - B - G, top: cy - B/2, pointerEvents: "auto" }} onClick={() => move(-10, 0)}>◀</button>
                  <button className={btnCls} style={{ width: B, height: B, left: sx + sw + G, top: cy - B/2, pointerEvents: "auto" }} onClick={() => move(10, 0)}>▶</button>
                </div>
              );
            })()}

            {!loading && (
              <Minimap
                pixels={pixels}
                viewportX={viewport.x}
                viewportY={viewport.y}
                viewportW={viewport.w}
                viewportH={viewport.h}
              />
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-gray-400 text-xs px-4 py-2 rounded-full border border-gray-700 pointer-events-none">
              Scroll / ± → zoom · Sürükle → haritayı kaydır · Tıkla → alan seç · Ok tuşları → seçimi taşı
            </div>
          </div>

          {selection && (
            <div className="hidden md:block">
              <SelectionPanel selection={selection} onClose={() => setSelection(null)} onPreset={handlePreset} />
            </div>
          )}
          {selection && (
            <MobileSelectionSheet selection={selection} onClose={() => setSelection(null)} onPreset={handlePreset} />
          )}
        </div>
        <WhatsAppWidget />
      </div>
    );
  }

  // ─── Landing page ────────────────────────────────────────────────────────────
  const liveMonthCount = Math.max(pixels.length, 12);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      <EasterEggConfetti active={easterEgg} onDone={() => setEasterEgg(false)} />

      {/* Navbar */}
      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">PD</div>
          <span className="font-bold text-lg">Piksel Duvarı</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/nasil-calisir" className="text-gray-400 hover:text-white text-sm transition hidden sm:block">Nasıl Çalışır?</a>
          <a href="/sss" className="text-gray-400 hover:text-white text-sm transition hidden sm:block">SSS</a>
          <a href="/istatistikler" className="text-gray-400 hover:text-white text-sm transition hidden sm:block">İstatistikler</a>
          <button onClick={goToGrid} className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-lg text-sm font-semibold">
            Alan Satın Al
          </button>
        </div>
      </nav>

      {/* Social proof bar */}
      <div className="bg-indigo-950/40 border-b border-indigo-900/30 px-6 py-2 flex items-center justify-center gap-4 flex-wrap">
        <span className="text-indigo-300 text-xs">★★★★★ <strong>50+</strong> memnun müşteri · Türkiye&apos;nin #1 piksel reklam platformu</span>
        <span className="text-indigo-900 hidden sm:inline">|</span>
        <LiveVisitorCounter />
      </div>

      {/* Live ticker */}
      <LiveTicker />

      {/* Hero section */}
      <section className="relative px-6 py-20 text-center max-w-4xl mx-auto overflow-hidden">
        {/* Animated pixel blocks floating */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[
            { left: "5%", color: "#6366f1", size: 14, delay: "0s", duration: "8s" },
            { left: "15%", color: "#a855f7", size: 10, delay: "1.2s", duration: "10s" },
            { left: "30%", color: "#22c55e", size: 8, delay: "0.5s", duration: "7s" },
            { left: "50%", color: "#f59e0b", size: 12, delay: "2s", duration: "9s" },
            { left: "70%", color: "#ef4444", size: 10, delay: "0.8s", duration: "11s" },
            { left: "85%", color: "#06b6d4", size: 14, delay: "1.5s", duration: "8s" },
            { left: "92%", color: "#6366f1", size: 8, delay: "3s", duration: "12s" },
          ].map((sq, i) => (
            <div
              key={i}
              className="absolute rounded-sm opacity-20"
              style={{
                left: sq.left,
                width: sq.size,
                height: sq.size,
                backgroundColor: sq.color,
                bottom: "-20px",
                animation: `floatUp ${sq.duration} ${sq.delay} ease-in-out infinite`,
              }}
            />
          ))}
          <style>{`
            @keyframes floatUp {
              0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
              50% { opacity: 0.4; }
              100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
            }
          `}</style>
        </div>

        {/* Animated gradient bg */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)" }}
        />

        <div className="relative z-10">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-red-950/50 border border-red-800/50 rounded-full px-4 py-1.5 text-red-300 text-xs mb-6">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            🔴 CANLI: <strong className="ml-1">{liveMonthCount} piksel alanı</strong> bu ay satıldı
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

          {/* Kampanya banner */}
          <CampaignBanner />

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={goToGrid}
              className="bg-indigo-600 hover:bg-indigo-500 transition px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-900/40"
            >
              🗺️ Alanını Seç
            </button>
            <a
              href="/nasil-calisir"
              className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white transition px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2"
            >
              ▶ Nasıl Çalışır?
            </a>
          </div>

          <div className="text-gray-500 text-sm mb-4">
            En küçük alan: <span className="text-white font-semibold">10×10 = 100₺</span>
            {" · "}
            <span className="line-through text-gray-700">Billboard: 50.000₺/ay</span>
          </div>

          {/* Animated stats */}
          <div className="mt-8 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
              <AnimatedCounter target={Math.max(totalSold, 250000)} className="text-2xl font-bold text-white" />
              <div className="text-xs text-gray-500 mt-1">Piksel satıldı</div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
              <AnimatedCounter target={Math.min(totalPixels - totalSold, 750000)} className="text-2xl font-bold text-green-400" />
              <div className="text-xs text-gray-500 mt-1">Piksel mevcut</div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
              <div className="text-2xl font-bold text-indigo-400">16</div>
              <div className="text-xs text-gray-500 mt-1">Şehir bölgesi</div>
            </div>
          </div>

          {/* Urgency */}
          <div className="mt-4 inline-flex items-center gap-2 bg-orange-950/40 border border-orange-800/40 rounded-full px-4 py-1.5 text-orange-300 text-xs">
            ⚠️ <strong>Popüler bölgelerde alanlar hızla dolmaktadır!</strong>
          </div>

          {/* Scroll indicator */}
          <div className="mt-10 flex flex-col items-center gap-1 text-gray-600 text-xs animate-bounce">
            <span>Aşağı kaydır</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <StatsBarLanding pixels={pixels} />

      {/* Grid preview */}
      <section className="px-6 mb-10 mt-8">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
            <span className="text-sm text-gray-400">Piksel Duvarı — Canlı Önizleme</span>
            <button onClick={goToGrid} className="text-indigo-400 hover:text-indigo-300 text-sm transition">
              Tam ekran aç →
            </button>
          </div>
          <div className="relative overflow-hidden" style={{ height: 320 }}>
            {loading ? (
              <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <TransformWrapper minScale={0.2} maxScale={3} initialScale={0.28} centerOnInit disabled={false}>
                <TransformComponent wrapperStyle={{ width: "100%", height: "320px" }} contentStyle={{ width: 1000, height: 1000 }}>
                  <PixelGrid pixels={pixels} selection={null} onSelect={() => {}} selectable={false} />
                </TransformComponent>
              </TransformWrapper>
            )}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-gray-900/60" />
            <button
              onClick={goToGrid}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              Bu alanı seç →
            </button>
          </div>
        </div>
      </section>

      <TrustBadges />

      <WhySection />

      <RegionFillIndicators pixels={pixels} onGoToGrid={() => setView("grid")} />

      <ComparisonTable />

      <PixelCalculator onGoToGrid={() => setView("grid")} />

      <Testimonials />

      <RegionCards onRegionSelect={handleRegionSelect} />

      {/* How it works */}
      <section id="nasil-calisir" className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Nasıl Çalışır?</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: "1", icon: "🗺️", title: "Şehrini seç", desc: "Haritada şehrini bul, istediğin boyutta alan seç. Ne kadar büyük, o kadar dikkat çeker." },
            { step: "2", icon: "💳", title: "Öde & Logonu Yükle", desc: "Güvenli ödeme yap, logonu ve site bağlantını ekle. Dakikalar içinde tamamlanır." },
            { step: "3", icon: "♾️", title: "Sonsuza Kadar Görün", desc: "Alanın onaylandıktan sonra duvarda yayına girer. Bir kez öde, sonsuza kadar kal." },
          ].map((item) => (
            <div key={item.step} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center hover:border-gray-600 transition">
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="text-xs text-indigo-400 font-bold mb-2">ADIM {item.step}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
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
              <div key={p.size}
                className={`rounded-2xl p-6 border text-center hover:scale-105 transition ${p.highlight ? "border-indigo-500 bg-indigo-950/40" : "border-gray-800 bg-gray-900"}`}
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
            onClick={goToGrid}
            className="mt-8 bg-indigo-600 hover:bg-indigo-500 transition px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 active:scale-95"
          >
            Hemen Alan Seç
          </button>
        </div>
      </section>

      <NewsletterSection />

      {/* FAQ */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Sık Sorulan Sorular</h2>
        <div className="space-y-4">
          {[
            { q: "Alan gerçekten sonsuza kadar mı kalır?", a: "Evet. Piksel Duvarı silinmediği sürece alanın orada kalır. Bu bir kez öde, sonsuza kadar kal modelidir." },
            { q: "Logo yerine ne yükleyebilirim?", a: "Logonuzu, ürün görselinizi veya marka renginizi yükleyebilirsiniz. Görsel admin onayından geçer." },
            { q: "En küçük alan ne kadar?", a: "En küçük alan 10×10 piksel = 100₺. En büyük alan tüm duvara kadar gidebilir." },
            { q: "Şehrimi nasıl seçerim?", a: "Haritada Türkiye şehirlerine bölünmüş renk kodlu alanlar var. Şehrine ait bölgeden dilediğin alanı seçebilirsin." },
          ].map((item, i) => (
            <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition">
              <h3 className="font-semibold mb-2">{item.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="/sss" className="text-indigo-400 hover:text-indigo-300 text-sm transition">Tüm soruları gör →</a>
        </div>
      </section>

      {/* SEO content block */}
      <section className="px-6 pb-4 max-w-3xl mx-auto">
        <p className="text-gray-700 text-xs leading-relaxed text-center">
          Piksel Duvarı, Türkiye&apos;nin ilk ve tek kalıcı piksel reklam platformudur.
          İstanbul, Ankara, İzmir ve tüm Türkiye şehirlerinde dijital reklam alanı satın alın.
          Tek seferlik ödeme ile sonsuza kadar görünür kalın.
        </p>
      </section>

      <PartnerLogos />

      {/* Email toplama */}
      <EmailCapture />

      {/* Şehir Linkleri — SEO */}
      <section className="px-6 py-16 border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Şehrine Göre Alan Seç</h2>
            <p className="text-gray-500 text-sm">Türkiye&apos;nin her şehrinde kalıcı dijital reklam alanı</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { slug: "istanbul", name: "İstanbul", emoji: "🏙️", desc: "Türkiye'nin ekonomi merkezi" },
              { slug: "ankara", name: "Ankara", emoji: "🏛️", desc: "Başkent & kurumsal" },
              { slug: "izmir", name: "İzmir", emoji: "🌊", desc: "Ege'nin ticaret merkezi" },
              { slug: "antalya", name: "Antalya", emoji: "🌴", desc: "Turizm başkenti" },
              { slug: "bursa", name: "Bursa", emoji: "🏭", desc: "Sanayi & otomotiv" },
              { slug: "gaziantep", name: "Gaziantep", emoji: "🌶️", desc: "Güneydoğu merkezi" },
              { slug: "konya", name: "Konya", emoji: "🌾", desc: "İç Anadolu'nun kalbi" },
              { slug: "adana", name: "Adana", emoji: "☀️", desc: "Çukurova'nın merkezi" },
            ].map((city) => (
              <a
                key={city.slug}
                href={`/sehir/${city.slug}`}
                className="bg-gray-900 border border-gray-800 hover:border-indigo-700/60 hover:bg-indigo-950/20 rounded-xl p-4 transition group"
              >
                <div className="text-2xl mb-2">{city.emoji}</div>
                <div className="font-semibold text-sm group-hover:text-indigo-300 transition">{city.name}</div>
                <div className="text-gray-600 text-xs mt-1">{city.desc}</div>
              </a>
            ))}
          </div>
          <p className="text-center text-gray-600 text-xs mt-6">
            Tüm Türkiye&apos;ye açık · 1 piksel = 1₺ · Tek seferlik ödeme
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-indigo-950 to-purple-950 rounded-3xl border border-indigo-800/50 p-12">
          <h2 className="text-3xl font-bold mb-4">Hemen alanını ayır</h2>
          <p className="text-gray-400 mb-2">sadece <strong className="text-white">100₺&apos;den</strong> başlıyor</p>
          <p className="text-orange-300 text-sm mb-8">⚠️ Popüler bölgelerde alanlar hızla dolmaktadır</p>
          <button
            onClick={goToGrid}
            className="bg-indigo-600 hover:bg-indigo-500 transition px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 active:scale-95"
          >
            🗺️ Haritayı Aç &amp; Alan Seç
          </button>
          <div className="mt-4 text-xs text-gray-600">30 gün içinde memnun kalmazsan ücret iadesi garantisi 💯</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">PD</div>
                <span className="font-bold">Piksel Duvarı</span>
              </div>
              <p className="text-gray-600 text-xs max-w-xs">
                Türkiye&apos;nin dijital piksel reklam duvarı. Bir kez öde, sonsuza kadar kal.
              </p>
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-600">
                <span>🔒 SSL</span>
                <span>🛡️ KVKK</span>
                <span>✅ PayTR</span>
                <span>🇹🇷 Türk Girişimi</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase mb-2">Platform</p>
                <div className="space-y-2">
                  <a href="/nasil-calisir" className="block text-gray-400 hover:text-white transition text-xs">Nasıl Çalışır?</a>
                  <a href="/fiyatlandirma" className="block text-gray-400 hover:text-white transition text-xs">Fiyatlar</a>
                  <a href="/istatistikler" className="block text-gray-400 hover:text-white transition text-xs">İstatistikler</a>
                  <a href="/referans" className="block text-gray-400 hover:text-white transition text-xs">Referans Programı</a>
                  <a href="/hakkimizda" className="block text-gray-400 hover:text-white transition text-xs">Hakkımızda</a>
                  <a href="/haberler" className="block text-gray-400 hover:text-white transition text-xs">Haberler</a>
                  <a href="/sehirler" className="block text-gray-400 hover:text-white transition text-xs">Tüm Şehirler</a>
                  <a href="/basin" className="block text-gray-400 hover:text-white transition text-xs">Basın Odası</a>
                  <a href="/iletisim" className="block text-gray-400 hover:text-white transition text-xs">İletişim</a>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase mb-2">Yasal</p>
                <div className="space-y-2">
                  <a href="/kvkk" className="block text-gray-400 hover:text-white transition text-xs">KVKK</a>
                  <a href="/kullanim-sartlari" className="block text-gray-400 hover:text-white transition text-xs">Kullanım Şartları</a>
                  <a href="/cerez-politikasi" className="block text-gray-400 hover:text-white transition text-xs">Çerez Politikası</a>
                  <a href="/sss" className="block text-gray-400 hover:text-white transition text-xs">SSS</a>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase mb-2">Şehirler</p>
                <div className="space-y-2">
                  <a href="/sehir/istanbul" className="block text-gray-400 hover:text-white transition text-xs">İstanbul</a>
                  <a href="/sehir/ankara" className="block text-gray-400 hover:text-white transition text-xs">Ankara</a>
                  <a href="/sehir/izmir" className="block text-gray-400 hover:text-white transition text-xs">İzmir</a>
                  <a href="/sehir/antalya" className="block text-gray-400 hover:text-white transition text-xs">Antalya</a>
                  <a href="/sehir/bursa" className="block text-gray-400 hover:text-white transition text-xs">Bursa</a>
                  <a href="/sehir/gaziantep" className="block text-gray-400 hover:text-white transition text-xs">Gaziantep</a>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase mb-2">İletişim</p>
                <div className="space-y-2">
                  <a href="https://wa.me/905551663380" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition text-xs">WhatsApp</a>
                  <a href="mailto:info@pikselduvari.com" className="block text-gray-400 hover:text-white transition text-xs">E-posta</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <span>Piksel Duvarı © 2025 — Her piksel sonsuza kadar senin. 🇹🇷</span>
            <span className="text-gray-800">pikselduvari.com</span>
          </div>
        </div>
      </footer>

      <WhatsAppWidget />
      <SponsorBanner />
      <TikTokPopup />
    </div>
  );
}
