"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Kullanıcı scroll yaparsa veya 8 saniye geçerse otomatik kabul
    const accept = () => {
      localStorage.setItem("cookie-consent", "accepted");
      setVisible(false);
    };
    const timer = setTimeout(accept, 8000);
    window.addEventListener("scroll", accept, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", accept);
    };
  }, [visible]);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-gray-900/95 backdrop-blur border-t border-gray-800 px-4 py-3">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-3 justify-between">
        <p className="text-xs text-gray-400 leading-relaxed">
          Bu site; analitik ve işlevsellik amaçlı çerezler kullanmaktadır. Siteyi kullanmaya devam ederek çerez kullanımını kabul etmiş sayılırsınız.{" "}
          <a href="/cerez-politikasi" className="text-indigo-400 hover:text-indigo-300 underline">
            Çerez Politikası
          </a>
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
        >
          Anladım
        </button>
      </div>
    </div>
  );
}
