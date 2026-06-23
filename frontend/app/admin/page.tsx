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
  status: string;
  paid_at: string;
  created_at: string;
}

interface Stats {
  total_pixels_sold: number;
  total_revenue: number;
  pending_count: number;
  approved_count: number;
  rejected_count: number;
}

type Tab = "dashboard" | "pending" | "all";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");

  const [pending, setPending] = useState<Pixel[]>([]);
  const [allPixels, setAllPixels] = useState<Pixel[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const headers = { "x-admin-secret": secret };

  const login = async () => {
    try {
      const { data } = await axios.get(`/api/admin/pending`, { headers });
      setPending(data);
      setAuthed(true);
      loadStats();
    } catch {
      alert("Hatalı şifre.");
    }
  };

  const loadStats = async () => {
    try {
      const { data } = await axios.get("/api/admin/stats", { headers });
      setStats(data);
    } catch {
      console.error("Stats yüklenemedi");
    }
  };

  const loadAll = async () => {
    setLoading(true);
    try {
      const params = statusFilter ? `?status=${statusFilter}` : "";
      const { data } = await axios.get(`/api/admin/all${params}`, { headers });
      setAllPixels(data.data ?? []);
    } catch {
      console.error("All pixels yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed && tab === "all") loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, tab, statusFilter]);

  const approve = async (id: string) => {
    await axios.post(`/api/admin/approve/${id}`, {}, { headers });
    setPending((prev) => prev.filter((p) => p.id !== id));
    loadStats();
  };

  const reject = async (id: string) => {
    await axios.post(`/api/admin/reject/${id}`, {}, { headers });
    setPending((prev) => prev.filter((p) => p.id !== id));
    loadStats();
  };

  const bulkApprove = async () => {
    if (!confirm(`${pending.length} piksel onaylanacak. Emin misiniz?`)) return;
    for (const p of pending) {
      await axios.post(`/api/admin/approve/${p.id}`, {}, { headers });
    }
    setPending([]);
    loadStats();
  };

  const exportCsv = () => {
    const list = tab === "pending" ? pending : allPixels;
    const headers_csv = ["id", "owner_name", "website_url", "tooltip", "x", "y", "width", "height", "price", "status", "paid_at"];
    const rows = list.map((p) =>
      headers_csv.map((k) => JSON.stringify((p as unknown as Record<string, unknown>)[k] ?? "")).join(",")
    );
    const csv = [headers_csv.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pikseller.csv";
    a.click();
  };

  const filteredAll = allPixels.filter((p) =>
    !search ||
    p.owner_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.website_url?.toLowerCase().includes(search.toLowerCase())
  );

  if (!authed) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="w-80 space-y-4">
          <div className="text-center mb-2">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-3">PD</div>
            <h1 className="text-xl font-bold">Admin Paneli</h1>
          </div>
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
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-52 bg-gray-900 border-r border-gray-800 flex flex-col p-4 gap-1 shrink-0">
        <div className="flex items-center gap-2 mb-6 px-2 pt-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold">PD</div>
          <span className="font-semibold text-sm">Admin</span>
        </div>
        {(["dashboard", "pending", "all"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition ${
              tab === t ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {t === "dashboard" && "Dashboard"}
            {t === "pending" && `Onay Bekleyen (${pending.length})`}
            {t === "all" && "Tüm Pikseller"}
          </button>
        ))}
        <div className="mt-auto pt-4 border-t border-gray-800">
          <a href="/" className="text-gray-600 hover:text-gray-400 text-xs px-3">← Siteye Dön</a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Dashboard */}
        {tab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            {stats ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {[
                  { label: "Satılan Piksel", value: stats.total_pixels_sold.toLocaleString("tr-TR"), color: "text-white" },
                  { label: "Toplam Gelir", value: `${stats.total_revenue.toLocaleString("tr-TR")} ₺`, color: "text-green-400" },
                  { label: "Onay Bekleyen", value: stats.pending_count, color: "text-yellow-400" },
                  { label: "Onaylanan", value: stats.approved_count, color: "text-indigo-400" },
                  { label: "Reddedilen", value: stats.rejected_count, color: "text-red-400" },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                    <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-gray-500 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600 mb-8">İstatistikler yükleniyor...</div>
            )}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h2 className="font-semibold mb-3">Hızlı İşlemler</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setTab("pending")}
                  className="bg-yellow-700 hover:bg-yellow-600 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Onay Bekleyenlere Git
                </button>
                <button
                  onClick={() => { setTab("all"); }}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Tüm Pikselller
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pending */}
        {tab === "pending" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Onay Bekleyenler ({pending.length})</h1>
              <div className="flex gap-2">
                {pending.length > 0 && (
                  <button
                    onClick={bulkApprove}
                    className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Tümünü Onayla
                  </button>
                )}
                <button
                  onClick={exportCsv}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  CSV İndir
                </button>
              </div>
            </div>

            {pending.length === 0 && (
              <p className="text-gray-500">Onay bekleyen piksel yok.</p>
            )}

            <div className="grid gap-4">
              {pending.map((p) => (
                <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex gap-4 items-start">
                  <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image_url} alt={p.tooltip} className="w-full h-full object-cover" />
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
                    <button onClick={() => approve(p.id)} className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold">
                      Onayla
                    </button>
                    <button onClick={() => reject(p.id)} className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-lg text-sm font-semibold">
                      Reddet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All pixels */}
        {tab === "all" && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h1 className="text-2xl font-bold">Tüm Pikseller</h1>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white w-40"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="">Tüm Durumlar</option>
                  <option value="approved">Onaylı</option>
                  <option value="paid">Ödendi</option>
                  <option value="rejected">Reddedildi</option>
                  <option value="reserved">Rezerve</option>
                </select>
                <button
                  onClick={exportCsv}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  CSV İndir
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-gray-600">Yükleniyor...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-800 text-left">
                      <th className="pb-3 pr-4">Sahip</th>
                      <th className="pb-3 pr-4">Site</th>
                      <th className="pb-3 pr-4">Boyut</th>
                      <th className="pb-3 pr-4">Fiyat</th>
                      <th className="pb-3 pr-4">Durum</th>
                      <th className="pb-3">Tarih</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAll.map((p) => (
                      <tr key={p.id} className="border-b border-gray-900 hover:bg-gray-900/50 transition">
                        <td className="py-3 pr-4 font-medium">{p.owner_name}</td>
                        <td className="py-3 pr-4 text-gray-400 truncate max-w-32">{p.website_url}</td>
                        <td className="py-3 pr-4 text-gray-400">{p.width}×{p.height}</td>
                        <td className="py-3 pr-4 text-indigo-400">{p.price} ₺</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            p.status === "approved" ? "bg-green-900 text-green-300" :
                            p.status === "paid" ? "bg-yellow-900 text-yellow-300" :
                            p.status === "rejected" ? "bg-red-900 text-red-300" :
                            "bg-gray-800 text-gray-400"
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 text-gray-500">
                          {p.created_at ? new Date(p.created_at).toLocaleDateString("tr-TR") : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredAll.length === 0 && (
                  <p className="text-gray-600 text-center py-8">Sonuç bulunamadı.</p>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
