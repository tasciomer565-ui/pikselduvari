"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

function OdemeSonuc() {
  const params = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [pixelId, setPixelId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) { setStatus("error"); return; }
    axios.post(`/api/payment/callback`, { token })
      .then((r) => { setStatus("success"); setPixelId(r.data.pixel_id); })
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {status === "loading" && (
          <>
            <div className="text-4xl mb-4">⏳</div>
            <h1 className="text-xl font-bold">Ödeme kontrol ediliyor...</h1>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold mb-3">Ödeme Başarılı!</h1>
            <p className="text-gray-400 mb-6">
              Piksel alanınız rezerve edildi. Şimdi logonuzu yükleyin,
              admin onayının ardından duvarınızda yerini alacak.
            </p>
            {pixelId && (
              <a
                href={`/gorsel-yukle/${pixelId}`}
                className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-lg font-semibold inline-block"
              >
                Logo Yükle →
              </a>
            )}
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold mb-3">Ödeme Başarısız</h1>
            <p className="text-gray-400 mb-6">Bir sorun oluştu. Lütfen tekrar deneyin.</p>
            <a href="/" className="bg-gray-700 hover:bg-gray-600 transition px-6 py-3 rounded-lg font-semibold inline-block">
              Ana Sayfaya Dön
            </a>
          </>
        )}
      </div>
    </main>
  );
}

export default function OdemeSonucPage() {
  return <Suspense><OdemeSonuc /></Suspense>;
}
