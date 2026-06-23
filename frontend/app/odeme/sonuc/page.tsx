"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

// ─── Confetti (CSS animated squares) ─────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 24 }, (_, i) => i);
  const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#f97316"];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map((i) => {
        const color = colors[i % colors.length];
        const left = `${(i * 4.2 + Math.sin(i) * 8) % 100}%`;
        const delay = `${(i * 0.17) % 2}s`;
        const size = `${8 + (i % 5) * 4}px`;
        const duration = `${2.5 + (i % 4) * 0.4}s`;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left,
              top: "-20px",
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: i % 3 === 0 ? "50%" : "2px",
              animation: `confettiFall ${duration} ${delay} ease-in forwards`,
              opacity: 0.85,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0.85; }
          80%  { opacity: 0.7; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Green Checkmark Animation ────────────────────────────────────────────────
function CheckmarkAnim() {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          <circle
            cx="50" cy="50" r="46"
            fill="none"
            stroke="#10b981"
            strokeWidth="6"
            strokeDasharray="289"
            strokeDashoffset="289"
            style={{ animation: "drawCircle 0.6s ease forwards" }}
          />
          <polyline
            points="28,52 44,66 72,36"
            fill="none"
            stroke="#10b981"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="60"
            strokeDashoffset="60"
            style={{ animation: "drawCheck 0.4s 0.5s ease forwards" }}
          />
        </svg>
      </div>
      <style>{`
        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

function OdemeSonuc() {
  const params = useSearchParams();
  const token = params.get("token");
  const mockParam = params.get("mock");
  const idParam = params.get("id");
  const successParam = params.get("success");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [pixelId, setPixelId] = useState<string | null>(null);
  const [pixelInfo, setPixelInfo] = useState<{ x: number; y: number; width: number; height: number; price: number } | null>(null);

  // Image upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Mock mode: already processed by GET redirect, or direct mock link
    if (mockParam === "true" && idParam) {
      if (successParam === "true") {
        // Already processed by GET handler
        setPixelId(idParam);
        setStatus("success");
        fetchPixelInfo(idParam);
      } else {
        // Process mock payment now via POST
        axios.post(`/api/payment/callback`, { mock: true, id: idParam })
          .then((r) => {
            setStatus("success");
            setPixelId(r.data.pixel_id || idParam);
            fetchPixelInfo(r.data.pixel_id || idParam);
          })
          .catch(() => {
            // Fallback: still show success for mock
            setPixelId(idParam);
            setStatus("success");
            fetchPixelInfo(idParam);
          });
      }
      return;
    }

    if (!token) { setStatus("error"); return; }
    axios.post(`/api/payment/callback`, { token })
      .then((r) => {
        setStatus("success");
        const pid = r.data.pixel_id;
        setPixelId(pid);
        fetchPixelInfo(pid);
      })
      .catch(() => setStatus("error"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, mockParam, idParam, successParam]);

  const fetchPixelInfo = async (pid: string) => {
    try {
      const res = await fetch(`/api/pixels/${pid}`);
      if (res.ok) {
        const data = await res.json();
        setPixelInfo({ x: data.x, y: data.y, width: data.width, height: data.height, price: data.price });
      }
    } catch {
      // not critical
    }
  };

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

  const shareText = "Türkiye'nin dijital piksel duvarında yerim var! 🎯 pikselduvari.com";
  const shareUrl = "https://pikselduvari.com";

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4 relative">
      {status === "success" && <Confetti />}

      <div className="text-center max-w-lg w-full relative z-10">
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
              <CheckmarkAnim />
              <h1 className="text-3xl font-bold mb-2 text-green-400">Ödeme Başarılı!</h1>
              <p className="text-gray-400">
                Piksel alanınız rezerve edildi. Logonuzu yükleyin, admin onayının ardından duvarınızda yerini alacak.
              </p>
            </div>

            {/* Order summary */}
            {pixelInfo && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-left">
                <h2 className="font-semibold text-sm text-gray-400 uppercase tracking-wider mb-3">Sipariş Özeti</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Konum</span>
                    <span className="text-white font-mono">({pixelInfo.x}, {pixelInfo.y})</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Boyut</span>
                    <span className="text-white">{pixelInfo.width}×{pixelInfo.height} px</span>
                  </div>
                  <div className="flex justify-between text-gray-400 border-t border-gray-800 pt-2 mt-2">
                    <span className="font-semibold text-white">Ödenen Tutar</span>
                    <span className="text-green-400 font-bold">{pixelInfo.price.toLocaleString("tr-TR")} ₺</span>
                  </div>
                </div>
              </div>
            )}

            {/* Image upload section */}
            {pixelId && uploadStatus !== "success" && (
              <div className="bg-gray-900 rounded-2xl border border-indigo-800/50 p-6 text-left">
                <h2 className="font-semibold text-lg mb-1">📸 Logo Yükle</h2>
                <p className="text-gray-500 text-xs mb-4">Admin onayı için logonuzu yükleyin.</p>

                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer ${
                    dragOver ? "border-indigo-500 bg-indigo-950/20" : "border-gray-700 hover:border-indigo-600/50"
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
                    {uploadStatus === "loading" ? "Yükleniyor..." : "Logo Yükle ↑"}
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
              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-black hover:bg-gray-900 border border-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
                >
                  𝕏 Twitter&apos;da paylaş
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
                >
                  WhatsApp&apos;ta paylaş
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
