"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/pending", {
        headers: { "x-admin-secret": password },
      });
      if (res.ok) {
        // Store secret in sessionStorage for this session
        sessionStorage.setItem("admin_secret", password);
        document.cookie = `admin_secret=${password}; path=/; max-age=86400; SameSite=Strict`;
        router.push("/admin");
      } else {
        setError("Hatalı şifre. Lütfen tekrar deneyin.");
      }
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto mb-4">PD</div>
          <h1 className="text-2xl font-bold">Admin Girişi</h1>
          <p className="text-gray-500 text-sm mt-1">Piksel Duvarı Yönetim Paneli</p>
        </div>

        <form onSubmit={handleLogin} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Admin Şifresi</label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
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
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition py-3 rounded-xl font-semibold"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-gray-600 hover:text-gray-400 text-xs transition">← Siteye Dön</a>
        </div>
      </div>
    </main>
  );
}
