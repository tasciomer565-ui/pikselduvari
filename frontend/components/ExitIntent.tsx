"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("exit_intent_shown")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !dismissed) {
        setShow(true);
        sessionStorage.setItem("exit_intent_shown", "1");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [dismissed]);

  const close = () => { setShow(false); setDismissed(true); };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={close}>
      <div
        className="bg-gray-900 border border-indigo-700/50 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={close} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl leading-none">×</button>
        <div className="text-5xl mb-4">🎁</div>
        <h2 className="text-2xl font-extrabold mb-2">Dur, bir saniye!</h2>
        <p className="text-gray-400 mb-1">Gitmeden önce özel indirim kodunuzu alın.</p>
        <div className="my-5 bg-indigo-950/60 border border-indigo-700/40 rounded-2xl px-6 py-4">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">İndirim Kodunuz</p>
          <p className="text-3xl font-extrabold text-indigo-300 tracking-widest">HOSGELDIN20</p>
          <p className="text-xs text-gray-500 mt-1">İlk alımda %20 indirim</p>
        </div>
        <Link
          href="/"
          onClick={close}
          className="block w-full bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-bold text-white mb-3"
        >
          🗺️ Hemen Alan Seç
        </Link>
        <button onClick={close} className="text-gray-600 text-sm hover:text-gray-400 transition">
          Hayır teşekkürler
        </button>
      </div>
    </div>
  );
}
