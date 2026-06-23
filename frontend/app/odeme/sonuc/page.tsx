"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

function OdemeSonuc() {
  const params = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [pixelId, setPixelId] = useState<string | null>(null);

  // Image upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!token) { setStatus("error"); return; }
    axios.post(`/api/payment/callback`, { token })
      .then((r) => { setStatus("success"); setPixelId(r.data.pixel_id); })
      .catch(() => setStatus("error"));
  }, [token]);

  const handleFileSelect = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      alert("Dosya 2MB'dan büyük olamaz.");
      return;
    }
    const allowed = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      alert("Sadece PNG, JPG, WebP veya SVG dosyası yükleyebilirsiniz.");
      return;
    }
    setUploadFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setUploadPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!uploadFile || !pixelId) return;
    setUploadStatus("loading");
    try {
      const fd = new FormData();
      fd.append("file", uploadFile);
      fd.append("pixel_id", pixelId);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUploadedUrl(data.url);
      setUploadStatus("success");
    } catch (err) {
      console.error(err);
      setUploadStatus("error");
    }
  };

  const shareText = "Piksel Duvarı'nda yer aldım! Türkiye'nin dijital reklam duvarında ben de varım. pikselduvari.com";
  const shareUrl = "https://pikselduvari.com";

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="text-center max-w-lg w-full">
        {status === "loading" && (
          <>
            <div className="text-4xl mb-4">⏳</div>
            <h1 className="text-xl font-bold">Ödeme kontrol ediliyor...</h1>
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

        {status === "success" && (
          <div className="space-y-6">
            <div>
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-2xl font-bold mb-2">Ödeme Başarılı!</h1>
              <p className="text-gray-400">
                Piksel alanınız rezerve edildi. Logonuzu yükleyin, admin onayının ardından duvarınızda yerini alacak.
              </p>
            </div>

            {/* Image upload section */}
            {pixelId && uploadStatus !== "success" && (
              <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 text-left">
                <h2 className="font-semibold text-lg mb-4">Logonuzu Yükleyin</h2>

                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer ${
                    dragOver ? "border-indigo-500 bg-indigo-950/20" : "border-gray-700 hover:border-gray-600"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const f = e.dataTransfer.files[0];
                    if (f) handleFileSelect(f);
                  }}
                >
                  {uploadPreview ? (
                    <div className="flex flex-col items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={uploadPreview} alt="Önizleme" className="max-h-32 max-w-full rounded-lg object-contain" />
                      <p className="text-sm text-gray-400">{uploadFile?.name}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <div className="text-3xl">🖼️</div>
                      <p className="text-sm">Sürükle bırak veya tıkla</p>
                      <p className="text-xs">PNG, JPG, WebP, SVG · Max 2MB</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFileSelect(f);
                    }}
                  />
                </div>

                {uploadFile && (
                  <button
                    onClick={handleUpload}
                    disabled={uploadStatus === "loading"}
                    className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 transition py-3 rounded-xl font-semibold"
                  >
                    {uploadStatus === "loading" ? "Yükleniyor..." : "Logo Yükle"}
                  </button>
                )}

                {uploadStatus === "error" && (
                  <p className="text-red-400 text-sm mt-2 text-center">
                    Yükleme başarısız. Lütfen tekrar deneyin.
                  </p>
                )}
              </div>
            )}

            {uploadStatus === "success" && uploadedUrl && (
              <div className="bg-green-950/40 border border-green-800 rounded-2xl p-6">
                <div className="text-3xl mb-2">✅</div>
                <p className="font-semibold">Logo başarıyla yüklendi!</p>
                <p className="text-gray-400 text-sm mt-1">
                  Admin onayının ardından piksel duvarında görünecek.
                </p>
              </div>
            )}

            {/* Social sharing */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <p className="text-sm text-gray-400 mb-3">Bunu arkadaşlarınla paylaş!</p>
              <div className="flex gap-3 justify-center">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-black hover:bg-gray-900 border border-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
                >
                  𝕏 Twitter&apos;da Paylaş
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <a href="/" className="text-indigo-400 hover:text-indigo-300 text-sm inline-block">
              Ana Sayfaya Dön →
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

export default function OdemeSonucPage() {
  return <Suspense><OdemeSonuc /></Suspense>;
}
