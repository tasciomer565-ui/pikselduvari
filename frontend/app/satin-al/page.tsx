"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import axios from "axios";
import { ArrowLeft, ShoppingCart, Lock, CheckCircle } from "lucide-react";

function SatinAlForm() {
  const params = useSearchParams();
  const router = useRouter();

  const x = Number(params.get("x") ?? 0);
  const y = Number(params.get("y") ?? 0);
  const width = Number(params.get("w") ?? 10);
  const height = Number(params.get("h") ?? 10);
  const price = width * height;

  const [form, setForm] = useState({ owner_name: "", website_url: "", tooltip: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(`/api/pixels/reserve`, { x, y, width, height, ...form });
      window.location.href = data.payment_url;
    } catch (err: any) {
      setError(err.response?.data?.detail ?? "Bir hata oluştu.");
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Piksel Alanı Satın Al</h1>
          <p className="text-gray-400">Bilgilerini doldur, ödemeyi yap, logonu yükle.</p>
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
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Adınız / Marka Adı</label>
            <input
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
              placeholder="Örn: Kahve Dünyası"
              value={form.owner_name}
              onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Website URL</label>
            <input
              required
              type="url"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
              placeholder="https://siteniz.com"
              value={form.website_url}
              onChange={(e) => setForm({ ...form, website_url: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Kısa açıklama (üzerine gelince görünür)</label>
            <input
              required
              maxLength={100}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
              placeholder="Örn: En iyi kahve burada!"
              value={form.tooltip}
              onChange={(e) => setForm({ ...form, tooltip: e.target.value })}
            />
          </div>

          {error && (
            <div className="bg-red-950/50 border border-red-800 rounded-xl px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
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
        </form>

        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Lock size={12} />
            Güvenli ödeme
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle size={12} />
            Ödeme sonrası logonuzu yükleyebilirsiniz
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle size={12} />
            Admin onayı sonrası alanınız yayına girer
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
