"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("cookie-consent");
    if (!choice) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-gray-900 border-t border-gray-700 px-4 py-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-gray-300 leading-relaxed">
          Bu web sitesi deneyiminizi iyileştirmek için çerezler kullanmaktadır.
          Daha fazla bilgi için{" "}
          <a href="/cerez-politikasi" className="text-indigo-400 underline hover:text-indigo-300">
            Çerez Politikamızı
          </a>{" "}
          inceleyebilirsiniz.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 text-sm transition"
          >
            Reddet
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
