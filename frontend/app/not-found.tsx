import Link from "next/link";

// Fun pixel art decoration grid
function PixelArt() {
  const colors = [
    "#6366f1","#818cf8","#4f46e5","#6366f1","#a5b4fc","#4f46e5","#818cf8","#6366f1",
    "#818cf8","#1e1b4b","#6366f1","#1e1b4b","#6366f1","#1e1b4b","#818cf8","#1e1b4b",
    "#4f46e5","#6366f1","#1e1b4b","#4f46e5","#1e1b4b","#4f46e5","#6366f1","#4f46e5",
    "#6366f1","#1e1b4b","#4f46e5","#6366f1","#4f46e5","#6366f1","#1e1b4b","#6366f1",
    "#818cf8","#6366f1","#1e1b4b","#818cf8","#1e1b4b","#818cf8","#6366f1","#818cf8",
    "#4f46e5","#1e1b4b","#6366f1","#1e1b4b","#6366f1","#1e1b4b","#4f46e5","#1e1b4b",
    "#6366f1","#818cf8","#4f46e5","#6366f1","#4f46e5","#6366f1","#818cf8","#6366f1",
    "#1e1b4b","#6366f1","#818cf8","#4f46e5","#818cf8","#4f46e5","#6366f1","#1e1b4b",
  ];
  return (
    <div
      className="grid mx-auto mb-8 opacity-60"
      style={{ gridTemplateColumns: "repeat(8, 1fr)", width: 128, gap: 2 }}
    >
      {colors.map((c, i) => (
        <div key={i} style={{ width: 12, height: 12, backgroundColor: c, borderRadius: 1 }} />
      ))}
    </div>
  );
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Pixel grid icon */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded bg-indigo-600 flex items-center justify-center text-lg font-bold text-white">PD</div>
        </div>

        <PixelArt />

        <div className="text-7xl font-extrabold text-indigo-600/20 mb-2 leading-none">404</div>
        <h1 className="text-2xl font-bold mb-3">Bu piksel alanı boş!</h1>
        <p className="text-gray-400 mb-8">
          Aradığınız sayfa bulunamadı. Ana sayfaya dönün.
        </p>
        <Link
          href="/"
          className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold inline-block"
        >
          🏠 Ana Sayfaya Dön
        </Link>
        <p className="mt-6 text-gray-600 text-xs">
          Piksel Duvarı &mdash; Türkiye&apos;nin dijital reklam duvarı
        </p>
      </div>
    </main>
  );
}
