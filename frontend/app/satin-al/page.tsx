"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import axios from "axios";
import { ArrowLeft, ShoppingCart, Lock, CheckCircle, Shield, Globe } from "lucide-react";
import { getRegionAt } from "@/lib/regions";

// ─── Progress Steps ───────────────────────────────────────────────────────────
function ProgressSteps({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { num: 1, label: "Bilgiler" },
    { num: 2, label: "Ödeme" },
    { num: 3, label: "Logo Yükle" },
  ];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition ${
                s.num < step
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : s.num === step
                  ? "border-indigo-500 text-indigo-400"
                  : "border-gray-700 text-gray-700"
              }`}
            >
              {s.num < step ? "✓" : s.num}
            </div>
            <span
              className={`text-xs mt-1 ${
                s.num === step ? "text-indigo-400 font-semibold" : "text-gray-600"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-12 h-0.5 mx-1 mb-4 transition ${
                s.num < step ? "bg-indigo-600" : "bg-gray-800"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────
function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
      {[
        { icon: <Lock size={12} />, text: "SSL Güvenli" },
        { icon: <Shield size={12} />, text: "256-bit Şifreleme" },
        { icon: <CheckCircle size={12} />, text: "Güvenli Ödeme" },
        { icon: <Globe size={12} />, text: "KVKK Uyumlu" },
      ].map((b) => (
        <div key={b.text} className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="text-green-600">{b.icon}</span>
          {b.text}
        </div>
      ))}
    </div>
  );
}

// ─── Form Validation ──────────────────────────────────────────────────────────
function validateUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!["http:", "https:"].includes(u.protocol)) return "URL http:// veya https:// ile başlamalı";
    return null;
  } catch {
    return "Geçerli bir URL girin (örn: https://siteniz.com)";
  }
}

// ─── Preview Box ─────────────────────────────────────────────────────────────
function PreviewBox({ x, y, width, height, region }: {
  x: number; y: number; width: number; height: number;
  region: { name: string; color: string } | null;
}) {
  const aspectRatio = width / height;
  const previewH = Math.min(80, Math.max(30, 80 / Math.max(aspectRatio, 1)));
  const previewW = Math.min(200, previewH * aspectRatio);

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
      <p className="text-xs text-gray-500 mb-3">Alan Önizlemesi</p>
      <div className="flex items-center gap-4">
        <div
          className="rounded border-2 border-yellow-400/60 shrink-0"
          style={{
            width: Math.max(previewW, 20),
            height: Math.max(previewH, 20),
            backgroundColor: region?.color ?? "#4f46e5",
            opacity: 0.8,
          }}
        />
        <div className="text-xs text-gray-400 space-y-0.5">
          <p><span className="text-gray-500">Bölge:</span> <strong className="text-white">{region?.name ?? "Harita dışı"}</strong></p>
          <p><span className="text-gray-500">Boyut:</span> <strong className="text-white">{width}×{height} px</strong></p>
          <p><span className="text-gray-500">Konum:</span> <span className="font-mono text-white text-[10px]">({x}, {y})</span></p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Form ─────────────────────────────────────────────────────────────────
function SatinAlForm() {
  const params = useSearchParams();
  const router = useRouter();

  const x = Number(params.get("x") ?? 0);
  const y = Number(params.get("y") ?? 0);
  const width = Number(params.get("w") ?? 10);
  const height = Number(params.get("h") ?? 10);
  const price = width * height;

  const region = getRegionAt(x, y);

  const [form, setForm] = useState({
    owner_name: "",
    website_url: "",
    tooltip: "",
    referral_code: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = (field: string, value: string): string => {
    if (field === "owner_name") {
      if (!value) return "Ad/marka adı zorunlu";
      if (value.length < 2) return "En az 2 karakter olmalı";
    }
    if (field === "website_url") {
      const urlErr = validateUrl(value);
      if (urlErr) return urlErr;
    }
    if (field === "tooltip") {
      if (!value) return "Kısa açıklama zorunlu";
      if (value.length > 100) return "En fazla 100 karakter";
    }
    return "";
  };

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    const err = validate(field, value);
    setErrors((e) => ({ ...e, [field]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Final validation
    const newErrors: Record<string, string> = {};
    for (const [k, v] of Object.entries(form)) {
      if (k === "referral_code") continue;
      const err = validate(k, v);
      if (err) newErrors[k] = err;
    }
    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(`/api/pixels/reserve`, {
        x, y, width, height,
        owner_name: form.owner_name,
        website_url: form.website_url,
        tooltip: form.tooltip,
      });
      window.location.href = data.payment_url;
    } catch (err: any) {
      setError(err.response?.data?.detail ?? "Bir hata oluştu. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-start justify-center p-6 pt-12">
      <div className="w-full max-w-lg">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 text-sm transition"
        >
          <ArrowLeft size={16} />
          Geri dön
        </button>

        {/* Progress Steps */}
        <ProgressSteps step={1} />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Piksel Alanı Satın Al</h1>
          <p className="text-gray-400">Bilgilerini doldur, ödemeyi yap, logonu yükle.</p>
        </div>

        {/* Preview */}
        <div className="mb-4">
          <PreviewBox x={x} y={y} width={width} height={height} region={region} />
        </div>

        {/* Sipariş özeti */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Sipariş Özeti</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Alan</span>
              <span className="text-white font-mono">{width}×{height} piksel</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Konum</span>
              <span className="text-white font-mono">({x}, {y})</span>
            </div>
            {region && (
              <div className="flex justify-between text-gray-400">
                <span>Bölge</span>
                <span className="text-indigo-300">{region.name}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-400">
              <span>Blok sayısı</span>
              <span className="text-white">{(width / 10) * (height / 10)} blok</span>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-4 pt-4 flex justify-between items-center">
            <span className="font-semibold">Toplam</span>
            <span className="text-2xl font-bold text-indigo-400">{price.toLocaleString("tr-TR")} ₺</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Owner Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Adınız / Marka Adı
              <span className="text-red-400 ml-1">*</span>
            </label>
            <input
              required
              minLength={2}
              className={`w-full bg-gray-900 border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition ${
                errors.owner_name ? "border-red-600 focus:border-red-500" : "border-gray-800 focus:border-indigo-500"
              }`}
              placeholder="Örn: Kahve Dünyası"
              value={form.owner_name}
              onChange={(e) => handleChange("owner_name", e.target.value)}
            />
            {errors.owner_name && (
              <p className="text-red-400 text-xs mt-1">{errors.owner_name}</p>
            )}
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Website URL
              <span className="text-red-400 ml-1">*</span>
            </label>
            <input
              required
              type="url"
              className={`w-full bg-gray-900 border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition ${
                errors.website_url ? "border-red-600 focus:border-red-500" : "border-gray-800 focus:border-indigo-500"
              }`}
              placeholder="https://siteniz.com"
              value={form.website_url}
              onChange={(e) => handleChange("website_url", e.target.value)}
            />
            {errors.website_url && (
              <p className="text-red-400 text-xs mt-1">{errors.website_url}</p>
            )}
          </div>

          {/* Tooltip */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-300">
                Kısa açıklama
                <span className="text-red-400 ml-1">*</span>
              </label>
              <span className={`text-xs ${form.tooltip.length > 90 ? "text-orange-400" : "text-gray-600"}`}>
                {form.tooltip.length}/100
              </span>
            </div>
            <input
              required
              maxLength={100}
              className={`w-full bg-gray-900 border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition ${
                errors.tooltip ? "border-red-600 focus:border-red-500" : "border-gray-800 focus:border-indigo-500"
              }`}
              placeholder="Örn: En iyi kahve burada!"
              value={form.tooltip}
              onChange={(e) => handleChange("tooltip", e.target.value)}
            />
            {errors.tooltip && (
              <p className="text-red-400 text-xs mt-1">{errors.tooltip}</p>
            )}
            <p className="text-gray-600 text-xs mt-1">Piksel üzerine gelindiğinde görünür</p>
          </div>

          {/* Referral Code */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Referans Kodu
              <span className="text-gray-600 ml-2 text-xs font-normal">(isteğe bağlı)</span>
            </label>
            <input
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
              placeholder="Referans kodunuz varsa girin"
              value={form.referral_code}
              onChange={(e) => setForm({ ...form, referral_code: e.target.value })}
            />
          </div>

          {error && (
            <div className="bg-red-950/50 border border-red-800 rounded-xl px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || Object.values(errors).some(Boolean)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Yönlendiriliyor...
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                Ödemeye Geç — {price.toLocaleString("tr-TR")} ₺
              </>
            )}
          </button>

          {/* Trust Badges */}
          <TrustBadges />
        </form>

        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle size={12} />
            Ödeme sonrası logonuzu yükleyebilirsiniz
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle size={12} />
            Admin onayı sonrası alanınız yayına girer
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle size={12} />
            30 gün içinde memnun kalmazsan ücret iadesi
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SatinAlPage() {
  return (
    <Suspense>
      <SatinAlForm />
    </Suspense>
  );
}
