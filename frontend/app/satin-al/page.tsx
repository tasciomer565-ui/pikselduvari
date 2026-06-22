"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import axios from "axios";

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
      const { data } = await axios.post(`/api/pixels/reserve`, {
        x, y, width, height, ...form,
      });
      window.location.href = data.payment_url;
    } catch (err: any) {
      setError(err.response?.data?.detail ?? "Bir hata oluştu.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-white mb-6 text-sm">
          ← Geri
        </button>

        <h1 className="text-2xl font-bold mb-2">Piksel Alanı Satın Al</h1>
        <p className="text-gray-400 text-sm mb-6">
          {width}×{height} piksel · Konum ({x}, {y}) · <span className="text-indigo-400 font-semibold">{price.toLocaleString("tr-TR")} ₺</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Adınız / Marka Adı *</label>
            <input
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Örn: Kahve Dünyası"
              value={form.owner_name}
              onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Website URL *</label>
            <input
              required
              type="url"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              placeholder="https://siteniz.com"
              value={form.website_url}
              onChange={(e) => setForm({ ...form, website_url: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Üzerine gelince görünen metin *</label>
            <input
              required
              maxLength={100}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Örn: En iyi kahve burada!"
              value={form.tooltip}
              onChange={(e) => setForm({ ...form, tooltip: e.target.value })}
            />
          </div>

          {error && (
            <div className="bg-red-900/40 border border-red-700 rounded-lg px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition py-3 rounded-lg font-semibold"
          >
            {loading ? "Ödeme sayfasına yönlendiriliyorsunuz..." : `Ödemeye Geç → ${price.toLocaleString("tr-TR")} ₺`}
          </button>

          <p className="text-xs text-center text-gray-600">
            Ödeme tamamlandıktan sonra logonuzu yükleyebileceksiniz.
            Görseliniz admin onayının ardından yayına girer.
          </p>
        </form>
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
