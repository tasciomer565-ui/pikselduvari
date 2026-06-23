"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function TikTokPopup() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<"intro" | "waiting" | "email" | "done" | "error">("intro");
  const [countdown, setCountdown] = useState(5);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    // Daha önce kod aldıysa gösterme
    if (localStorage.getItem("tiktok_discount_claimed")) return;
    // 15 saniye sonra göster
    const t = setTimeout(() => setShow(true), 15000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step !== "waiting") return;
    if (countdown <= 0) { setStep("email"); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [step, countdown]);

  const handleFollow = () => {
    window.open("https://www.tiktok.com/@pikselduvari", "_blank");
    setStep("waiting");
  };

  const handleSubmit = async () => {
    if (!email.includes("@")) { setErrorMsg("Geçerli bir e-posta girin"); return; }
    setLoading(true);
    setErrorMsg("");
    try {
      const { data } = await axios.post("/api/tiktok-discount", { email });
      setCode(data.code);
      setStep("done");
      localStorage.setItem("tiktok_discount_claimed", "1");
    } catch (e: unknown) {
      const err = e as { response?: { data?: { error?: string } } };
      setErrorMsg(err.response?.data?.error ?? "Bir hata oluştu, tekrar deneyin");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">

        {/* Üst gradient bar */}
        <div style={{ background: "linear-gradient(90deg,#4f46e5,#7c3aed,#ec4899)", height: 4 }} />

        <div className="p-6">
          {/* Kapat */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition text-lg leading-none"
          >✕</button>

          {step === "intro" && (
            <>
              <div className="text-center mb-5">
                <div className="text-4xl mb-3">🎵</div>
                <h3 className="text-xl font-extrabold text-white mb-2">TikTok&apos;u takip et, %10 kazan!</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <strong className="text-white">@pikselduvari</strong> hesabını takip et, sana özel indirim kodu e-postana gelsin.
                </p>
              </div>

              <div className="bg-gray-800/60 rounded-xl p-4 mb-5 space-y-2">
                {[
                  { emoji: "1️⃣", text: "TikTok'ta @pikselduvari'yi takip et" },
                  { emoji: "2️⃣", text: "Geri dön ve e-postanı gir" },
                  { emoji: "3️⃣", text: "%10 indirim kodu anında mailinde!" },
                ].map((s) => (
                  <div key={s.emoji} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="text-base">{s.emoji}</span>
                    <span>{s.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleFollow}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg,#1a1a1a,#000)" }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
                TikTok&apos;ta Takip Et
              </button>

              <button
                onClick={() => setShow(false)}
                className="w-full mt-2 text-gray-600 hover:text-gray-400 text-xs transition py-2"
              >
                Şimdi değil
              </button>
            </>
          )}

          {step === "waiting" && (
            <div className="text-center py-4">
              <div className="text-4xl mb-4 animate-bounce">🎵</div>
              <h3 className="text-lg font-bold text-white mb-2">TikTok&apos;ta takip et...</h3>
              <p className="text-gray-400 text-sm mb-6">@pikselduvari hesabını takip ettikten sonra geri dön.</p>
              <div className="w-16 h-16 rounded-full border-4 border-indigo-800 border-t-indigo-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-500 text-sm">
                {countdown > 0
                  ? <>{countdown} saniye sonra devam edebilirsin</>
                  : <span className="text-green-400 font-semibold">✓ Hazır! Aşağıya tıkla</span>
                }
              </p>
              {countdown === 0 && (
                <button
                  onClick={() => setStep("email")}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-500 transition px-6 py-2.5 rounded-xl text-sm font-bold text-white"
                >
                  Takip Ettim →
                </button>
              )}
            </div>
          )}

          {step === "email" && (
            <>
              <div className="text-center mb-5">
                <div className="text-4xl mb-3">📧</div>
                <h3 className="text-xl font-extrabold text-white mb-2">Son adım!</h3>
                <p className="text-gray-400 text-sm">İndirim kodunu hangi adrese gönderelim?</p>
              </div>

              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrorMsg(""); }}
                placeholder="e-posta adresin"
                autoFocus
                className="w-full bg-gray-800 border border-gray-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none mb-3"
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />

              {errorMsg && <p className="text-red-400 text-xs mb-3">{errorMsg}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading || !email}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 transition py-3 rounded-xl font-bold text-sm text-white"
              >
                {loading ? "Gönderiliyor..." : "Kodu Gönder 🎁"}
              </button>

              <p className="text-center text-gray-600 text-xs mt-3">
                Spam göndermiyoruz. Yalnızca bu e-postayı alacaksın.
              </p>
            </>
          )}

          {step === "done" && (
            <div className="text-center py-2">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-extrabold text-white mb-2">Kodun yolda!</h3>
              <p className="text-gray-400 text-sm mb-5">İndirim kodunu içeren güzel bir e-posta az sonra gelen kutuna düşecek.</p>

              <div className="bg-indigo-950/60 border border-indigo-700/40 rounded-xl p-4 mb-5">
                <p className="text-gray-500 text-xs mb-2">Kodun</p>
                <p className="text-indigo-300 font-mono font-extrabold text-2xl tracking-widest">{code}</p>
                <button
                  onClick={() => { navigator.clipboard.writeText(code); }}
                  className="text-xs text-gray-500 hover:text-gray-300 transition mt-2"
                >
                  Kopyala
                </button>
              </div>

              <button
                onClick={() => setShow(false)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 transition py-3 rounded-xl font-bold text-sm text-white"
              >
                🗺️ Haritaya Git, Kodu Kullan!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
