interface Props {
  totalSold: number;
  totalPixels: number;
}

export default function StatsBar({ totalSold, totalPixels }: Props) {
  const pct = Math.round((totalSold / totalPixels) * 100);
  const remaining = totalPixels - totalSold;

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center gap-6 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-gray-400">Satılan:</span>
        <span className="text-white font-semibold">{totalSold.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">Kalan:</span>
        <span className="text-green-400 font-semibold">{remaining.toLocaleString()}</span>
      </div>
      <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-gray-400 text-xs">%{pct} dolu</span>
    </div>
  );
}
