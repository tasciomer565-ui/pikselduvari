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

interface MetricDay {
  date: string;
  count: number;
  revenue: number;
}

type Tab = "dashboard" | "pending" | "all" | "analytics";

// ─── Revenue Chart (inline SVG) ───────────────────────────────────────────────
function RevenueChart({ days }: { days: MetricDay[] }) {
  const last6 = days.slice(-6);
  if (last6.length === 0) return null;
  const maxRevenue = Math.max(...last6.map((d) => d.revenue), 1);
  const chartH = 120;
  const chartW = 400;
  const barW = Math.floor((chartW - last6.length * 4) / last6.length);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mt-6">
      <h3 className="font-semibold text-sm mb-4 text-gray-300">Son 6 Günlük Gelir</h3>
      <div className="overflow-x-auto">
        <svg width={chartW} height={chartH + 30} viewBox={`0 0 ${chartW} ${chartH + 30}`}>
          {last6.map((d, i) => {
            const barH = Math.max((d.revenue / maxRevenue) * chartH, 2);
            const bx = i * (barW + 4);
            const by = chartH - barH;
            const label = d.date.slice(5); // MM-DD
            return (
              <g key={d.date}>
                <rect
                  x={bx} y={by} width={barW} height={barH}
                  rx={4} fill={d.revenue > 0 ? "#4f46e5" : "#1e293b"}
                  opacity={0.9}
                >
                  <title>{d.date}: {d.revenue.toLocaleString("tr-TR")}₺</title>
                </rect>
                {d.revenue > 0 && (
                  <text x={bx + barW / 2} y={by - 4} textAnchor="middle" fill="#818cf8" fontSize={9}>
                    {d.revenue >= 1000 ? `${(d.revenue / 1000).toFixed(1)}k` : d.revenue}₺
                  </text>
                )}
                <text x={bx + barW / 2} y={chartH + 18} textAnchor="middle" fill="#475569" fontSize={9}>
                  {label}
                </text>
              </g>
            );
          })}
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((r) => (
            <line
              key={r}
              x1={0} y1={chartH - chartH * r}
              x2={chartW} y2={chartH - chartH * r}
              stroke="#1e293b" strokeWidth={0.5} strokeDasharray="4,4"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

// ─── Reject Modal ─────────────────────────────────────────────────────────────
function RejectModal({
  pixel,
  onConfirm,
  onCancel,
}: {
  pixel: Pixel;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full">
        <h3 className="font-bold text-lg mb-1">Reddetme Sebebi</h3>
        <p className="text-gray-500 text-sm mb-4">
          <strong>{pixel.owner_name}</strong> — {pixel.width}×{pixel.height}px
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reddetme sebebini girin (isteğe bağlı)..."
          rows={3}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 text-sm resize-none mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-700 hover:border-gray-500 text-gray-400 py-2.5 rounded-xl text-sm transition"
          >
            İptal
          </button>
          <button
            onClick={() => onConfirm(reason)}
            className="flex-1 bg-red-800 hover:bg-red-700 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            Reddet
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");

  const [pending, setPending] = useState<Pixel[]>([]);
  const [allPixels, setAllPixels] = useState<Pixel[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [metrics, setMetrics] = useState<MetricDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pendingSearch, setPendingSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedPending, setSelectedPending] = useState<Set<string>>(new Set());
  const [analyticsData, setAnalyticsData] = useState<{ totalViews: number; topPages: { page: string; count: number }[] } | null>(null);
  const [rejectModal, setRejectModal] = useState<Pixel | null>(null);

  const headers = { "x-admin-secret": secret };

  const login = async () => {
    try {
      const { data } = await axios.get(`/api/admin/pending`, { headers });
      setPending(data);
      setAuthed(true);
      loadStats();
      loadMetrics();
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

  const loadMetrics = async () => {
    try {
      const { data } = await axios.get("/api/admin/metrics", { headers });
      setMetrics(data.days ?? []);
    } catch {
      console.error("Metrics yüklenemedi");
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

  const loadAnalytics = async () => {
    try {
      const { createClient } = require("@supabase/supabase-js");
      const sb = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!
      );
      const { data } = await sb
        .from("page_views")
        .select("page")
        .gte("created_at", new Date(Date.now() - 86400000).toISOString());
      const counts: Record<string, number> = {};
      for (const row of data ?? []) {
        counts[row.page] = (counts[row.page] ?? 0) + 1;
      }
      const topPages = Object.entries(counts)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
      setAnalyticsData({ totalViews: (data ?? []).length, topPages });
    } catch {
      console.error("Analytics yüklenemedi");
    }
  };

  useEffect(() => {
    if (authed && tab === "all") loadAll();
    if (authed && tab === "analytics") loadAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, tab, statusFilter]);

  const approve = async (id: string) => {
    await axios.post(`/api/admin/approve/${id}`, {}, { headers });
    setPending((prev) => prev.filter((p) => p.id !== id));
    loadStats();
  };

  const rejectWithReason = async (pixel: Pixel) => {
    setRejectModal(pixel);
  };

  const confirmReject = async (reason: string) => {
    if (!rejectModal) return;
    await axios.post(`/api/admin/reject/${rejectModal.id}`, { rejection_reason: reason }, { headers });
    setPending((prev) => prev.filter((p) => p.id !== rejectModal.id));
    setRejectModal(null);
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

  const bulkReject = async () => {
    const selected = pending.filter((p) => selectedPending.has(p.id));
    if (selected.length === 0) return;
    if (!confirm(`${selected.length} piksel reddedilecek. Emin misiniz?`)) return;
    for (const p of selected) {
      await axios.post(`/api/admin/reject/${p.id}`, { rejection_reason: "Toplu red" }, { headers });
    }
    setPending((prev) => prev.filter((p) => !selectedPending.has(p.id)));
    setSelectedPending(new Set());
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

  const filteredAll = allPixels.filter(
    (p) =>
      !search ||
      p.owner_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.website_url?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPending = pending.filter(
    (p) =>
      !pendingSearch ||
      p.owner_name?.toLowerCase().includes(pendingSearch.toLowerCase()) ||
      p.website_url?.toLowerCase().includes(pendingSearch.toLowerCase())
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
          <p className="text-center text-xs text-gray-600">
            <a href="/admin/login" className="hover:text-gray-400">Tam giriş sayfasına git →</a>
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {rejectModal && (
        <RejectModal
          pixel={rejectModal}
          onConfirm={confirmReject}
          onCancel={() => setRejectModal(null)}
        />
      )}

      {/* Sidebar */}
      <aside className="w-52 bg-gray-900 border-r border-gray-800 flex flex-col p-4 gap-1 shrink-0">
        <div className="flex items-center gap-2 mb-6 px-2 pt-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold">PD</div>
          <span className="font-semibold text-sm">Admin</span>
        </div>
        {(["dashboard", "pending", "all", "analytics"] as Tab[]).map((t) => (
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
            {t === "analytics" && "Analitik"}
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

            {/* Revenue Chart */}
            {metrics.length > 0 && <RevenueChart days={metrics} />}

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mt-6">
              <h2 className="font-semibold mb-3">Hızlı İşlemler</h2>
              <div className="flex gap-3 flex-wrap">
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
                  Tüm Pikseller
                </button>
                <button
                  onClick={async () => {
                    if (!confirm("Demo pikseller eklenecek. Devam?")) return;
                    try {
                      const res = await axios.post("/api/admin/seed", {}, { headers });
                      alert(`✅ ${res.data.count} demo piksel eklendi!`);
                      loadStats();
                    } catch (e: unknown) {
                      const err = e as { response?: { data?: { error?: string } } };
                      alert("Hata: " + (err.response?.data?.error || "Bilinmeyen hata"));
                    }
                  }}
                  className="bg-indigo-800 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  🎯 Toplu Demo Piksel Ekle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pending */}
        {tab === "pending" && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h1 className="text-2xl font-bold">Onay Bekleyenler ({filteredPending.length})</h1>
              <div className="flex gap-2 flex-wrap">
                {selectedPending.size > 0 && (
                  <button
                    onClick={bulkReject}
                    className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Seçilenleri Reddet ({selectedPending.size})
                  </button>
                )}
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

            {/* Search in pending */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="İsim veya URL ile ara..."
                value={pendingSearch}
                onChange={(e) => setPendingSearch(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white w-full max-w-sm"
              />
            </div>

            {filteredPending.length === 0 && (
              <p className="text-gray-500">{pendingSearch ? "Sonuç bulunamadı." : "Onay bekleyen piksel yok."}</p>
            )}

            <div className="grid gap-4">
              {filteredPending.map((p) => (
                <div key={p.id} className={`bg-gray-900 border rounded-xl p-5 flex gap-4 items-start transition ${selectedPending.has(p.id) ? "border-indigo-600" : "border-gray-800"}`}>
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedPending.has(p.id)}
                    onChange={(e) => {
                      const s = new Set(selectedPending);
                      if (e.target.checked) s.add(p.id); else s.delete(p.id);
                      setSelectedPending(s);
                    }}
                    className="mt-1 w-4 h-4 rounded"
                  />
                  {/* Image preview */}
                  <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image_url} alt={p.owner_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs text-center p-1">Görsel yok</div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1 text-sm">
                    <p className="font-semibold text-white">{p.owner_name}</p>
                    <p className="text-gray-400">{p.website_url}</p>
                    <p className="text-gray-500 text-xs">{p.tooltip}</p>
                    <p className="text-gray-600 text-xs">
                      {p.width}×{p.height}px · ({p.x},{p.y}) · {p.price} ₺ · {new Date(p.paid_at).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => approve(p.id)} className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold">
                      Onayla
                    </button>
                    <button onClick={() => rejectWithReason(p)} className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-lg text-sm font-semibold">
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
        {/* Analytics */}
        {tab === "analytics" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Analitik</h1>
            {analyticsData ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                    <div className="text-2xl font-bold text-indigo-400">{analyticsData.totalViews}</div>
                    <div className="text-gray-500 text-xs mt-1">Bugünkü Sayfa Görüntüleme</div>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                    <div className="text-2xl font-bold text-green-400">{analyticsData.topPages.length}</div>
                    <div className="text-gray-500 text-xs mt-1">Benzersiz Sayfa</div>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                    <div className="text-2xl font-bold text-yellow-400">
                      {analyticsData.topPages[0]?.page ?? "-"}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">En Çok Ziyaret Edilen</div>
                  </div>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <h2 className="font-semibold mb-4 text-sm">En Çok Ziyaret Edilen Sayfalar (Bugün)</h2>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 border-b border-gray-800 text-left">
                        <th className="pb-2 pr-4">Sayfa</th>
                        <th className="pb-2">Görüntüleme</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.topPages.map((p) => (
                        <tr key={p.page} className="border-b border-gray-900">
                          <td className="py-2 pr-4 text-gray-300 font-mono text-xs">{p.page}</td>
                          <td className="py-2 text-indigo-400 font-semibold">{p.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="text-gray-600">Analitik veriler yükleniyor...</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
