interface Props {
  totalSold: number;
  totalPixels: number;
}

export default function StatsBar({ totalSold, totalPixels }: Props) {
  const pct = Math.round((totalSold / totalPixels) * 100);
  const remaining = totalPixels - totalSold;
  const earned = totalSold; // 1₺/piksel

  return (
    <div className="bg-gray-900/50 border-b border-gray-800/60 px-6 py-3 flex items-center gap-6 text-sm flex-wrap">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full" />
        <span className="text-gray-400">Satılan:</span>
        <span className="text-white font-bold">{totalSold.toLocaleString("tr-TR")}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-gray-400">Kalan:</span>
        <span className="text-green-400 font-bold">{remaining.toLocaleString("tr-TR")}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">Kazanılan:</span>
        <span className="text-indigo-400 font-bold">{earned.toLocaleString("tr-TR")} ₺</span>
      </div>
      <div className="flex-1 flex items-center gap-3 min-w-32">
        <div className="flex-1 bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-1.5 rounded-full transition-all duration-1000"
            style={{ width: `${Math.max(pct, 0.2)}%` }}
          />
        </div>
        <span className="text-gray-500 text-xs whitespace-nowrap">%{pct} dolu</span>
      </div>
    </div>
  );
}
