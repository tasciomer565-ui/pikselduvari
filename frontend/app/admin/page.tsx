"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Pixel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  owner_name: string;
  website_url: string;
  tooltip: string;
  image_url: string | null;
  price: number;
  paid_at: string;
}

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  const login = async () => {
    try {
      const { data } = await axios.get(`${API}/api/admin/pending`, {
        headers: { "x-admin-secret": secret },
      });
      setPixels(data);
      setAuthed(true);
    } catch {
      alert("Hatalı şifre.");
    }
  };

  const approve = async (id: string) => {
    await axios.post(`${API}/api/admin/approve/${id}`, {}, { headers: { "x-admin-secret": secret } });
    setPixels((prev) => prev.filter((p) => p.id !== id));
  };

  const reject = async (id: string) => {
    await axios.post(`${API}/api/admin/reject/${id}`, {}, { headers: { "x-admin-secret": secret } });
    setPixels((prev) => prev.filter((p) => p.id !== id));
  };

  if (!authed) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="w-80 space-y-4">
          <h1 className="text-xl font-bold text-center">Admin Paneli</h1>
          <input
            type="password"
            placeholder="Admin şifresi"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          <button onClick={login} className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg font-semibold">
            Giriş
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Onay Bekleyen Pikseller ({pixels.length})</h1>

      {pixels.length === 0 && (
        <p className="text-gray-500">Onay bekleyen piksel yok.</p>
      )}

      <div className="grid gap-4">
        {pixels.map((p) => (
          <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex gap-4 items-start">
            <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
              {p.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`${API}${p.image_url}`} alt={p.tooltip} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">Görsel yok</div>
              )}
            </div>

            <div className="flex-1 space-y-1 text-sm">
              <p className="font-semibold text-white">{p.owner_name}</p>
              <p className="text-gray-400">{p.website_url}</p>
              <p className="text-gray-500">{p.tooltip}</p>
              <p className="text-gray-600">
                {p.width}×{p.height}px · ({p.x},{p.y}) · {p.price} ₺ · {new Date(p.paid_at).toLocaleDateString("tr-TR")}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => approve(p.id)}
                className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Onayla
              </button>
              <button
                onClick={() => reject(p.id)}
                className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Reddet
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
