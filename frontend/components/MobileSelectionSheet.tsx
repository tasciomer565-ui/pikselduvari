"use client";

import { Selection } from "@/app/page";
import { X, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { getRegionAt } from "@/lib/regions";

interface Props {
  selection: Selection;
  onClose: () => void;
  onPreset?: (w: number, h: number) => void;
}

const PRESETS = [
  { label: "10×10", w: 10, h: 10, price: "100₺" },
  { label: "20×20", w: 20, h: 20, price: "400₺" },
  { label: "50×50", w: 50, h: 50, price: "2.500₺" },
  { label: "100×100", w: 100, h: 100, price: "10.000₺" },
];

export default function MobileSelectionSheet({ selection, onClose, onPreset }: Props) {
  const router = useRouter();
  const pixels = selection.width * selection.height;
  const price = pixels;
  const region = getRegionAt(selection.x, selection.y);

  const handleBuy = () => {
    const params = new URLSearchParams({
      x: String(selection.x),
      y: String(selection.y),
      w: String(selection.width),
      h: String(selection.height),
    });
    router.push(`/satin-al?${params}`);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 rounded-t-2xl p-5 md:hidden"
        style={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        {/* Handle */}
        <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-4" />

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <ShoppingCart size={16} className="text-indigo-400" />
            Seçilen Alan
          </h3>
          <button onClick={onClose} className="text-gray-600 hover:text-white transition p-1">
            <X size={16} />
          </button>
        </div>

        {region && (
          <div className="text-xs text-indigo-300 bg-indigo-950/50 rounded-lg px-3 py-1.5 mb-3">
            📍 {region.name}
          </div>
        )}

        <div className="flex justify-between text-sm mb-1 text-gray-400">
          <span>Boyut</span>
          <span className="text-white">{selection.width}×{selection.height}px</span>
        </div>
        <div className="flex justify-between text-sm mb-4 text-gray-400">
          <span>Toplam</span>
          <span className="text-indigo-400 font-bold text-lg">{price.toLocaleString("tr-TR")} ₺</span>
        </div>

        {/* Presets */}
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => onPreset?.(p.w, p.h)}
              className={`py-2 px-1 rounded-lg border text-xs transition text-center ${
                selection.width === p.w && selection.height === p.h
                  ? "border-indigo-500 bg-indigo-950/50 text-indigo-300"
                  : "border-gray-700 bg-gray-800/50 text-gray-300"
              }`}
            >
              <div className="font-semibold">{p.label}</div>
              <div className="text-gray-500 text-[10px]">{p.price}</div>
            </button>
          ))}
        </div>

        <button
          onClick={handleBuy}
          className="w-full bg-indigo-600 hover:bg-indigo-500 transition py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Satın Al — {price.toLocaleString("tr-TR")} ₺
        </button>
      </div>
    </>
  );
}
