"use client";

import { useState } from "react";

export default function IletisimPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <a href="/" className="text-indigo-400 hover:text-indigo-300 text-sm mb-8 inline-block">
          ← Ana Sayfaya Dön
        </a>
        <h1 className="text-3xl font-bold mb-2">İletişim</h1>
        <p className="text-gray-400 mb-8">
          Sorularınız için bize ulaşın. En kısa sürede yanıt vereceğiz.
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-xl shrink-0">📍</div>
          <div>
            <div className="font-semibold text-sm mb-0.5">Adres</div>
            <div className="text-gray-400 text-xs">Eyüpsultan, İstanbul, Türkiye</div>
            <div className="text-gray-500 text-xs mt-1">Ömer Taşcı — Piksel Duvarı</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <a
            href="mailto:info@pikselduvari.com"
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4 hover:border-indigo-600 transition"
          >
            <div className="w-10 h-10 bg-indigo-950 rounded-lg flex items-center justify-center text-xl">
              ✉️
            </div>
            <div>
              <div className="font-semibold text-sm">E-posta</div>
              <div className="text-gray-400 text-xs mt-0.5">info@pikselduvari.com</div>
            </div>
          </a>
          <a
            href="https://wa.me/905551663380"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4 hover:border-green-600 transition"
          >
            <div className="w-10 h-10 bg-green-950 rounded-lg flex items-center justify-center text-xl">
              💬
            </div>
            <div>
              <div className="font-semibold text-sm">WhatsApp</div>
              <div className="text-gray-400 text-xs mt-0.5">+90 555 166 33 80</div>
            </div>
          </a>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <h2 className="font-semibold text-lg mb-5">Mesaj Gönder</h2>

          {status === "success" ? (
            <div className="bg-green-950/50 border border-green-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="font-semibold">Mesajınız alındı!</p>
              <p className="text-gray-400 text-sm mt-1">En kısa sürede yanıt vereceğiz.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-indigo-400 text-sm underline"
              >
                Yeni mesaj gönder
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Adınız</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
                  placeholder="Ad Soyad"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">E-posta</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
                  placeholder="ornek@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Mesajınız</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition resize-none"
                  placeholder="Mesajınızı yazın..."
                />
              </div>
              {status === "error" && (
                <p className="text-red-400 text-sm">Bir hata oluştu, lütfen tekrar deneyin.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 transition py-3 rounded-xl font-semibold"
              >
                {status === "loading" ? "Gönderiliyor..." : "Gönder"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
