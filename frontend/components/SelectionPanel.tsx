"use client";

import { Selection } from "@/app/page";
import { X, ShoppingCart, Info, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { getRegionAt } from "@/lib/regions";

interface Props {
  selection: Selection;
  onClose: () => void;
}

const PIXEL_PRICE = 1;

export default function SelectionPanel({ selection, onClose }: Props) {
  const router = useRouter();
  const pixels = selection.width * selection.height;
  const price = pixels * PIXEL_PRICE;
  const blocks = (selection.width / 10) * (selection.height / 10);
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
    <div className="w-72 border-l border-gray-800/60 bg-gray-900/95 backdrop-blur-sm p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-white flex items-center gap-2">
          <ShoppingCart size={16} className="text-indigo-400" />
          Seçilen Alan
        </h2>
        <button onClick={onClose} className="text-gray-600 hover:text-white transition rounded-lg p-1 hover:bg-gray-800">
          <X size={16} />
        </button>
      </div>

      {/* Önizleme */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="p-4 space-y-2.5 text-sm">
          {region && (
            <div className="flex items-center gap-2 text-indigo-300 bg-indigo-950/50 rounded-lg px-2 py-1.5 mb-1">
              <MapPin size={12} />
              <span className="font-semibold text-xs">{region.name}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-400">
            <span>Konum</span>
            <span className="text-white font-mono text-xs">({selection.x}, {selection.y})</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Boyut</span>
            <span className="text-white">{selection.width} × {selection.height} px</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Blok sayısı</span>
            <span className="text-white">{blocks} blok</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Toplam piksel</span>
            <span className="text-white">{pixels.toLocaleString("tr-TR")}</span>
          </div>
        </div>
        <div className="border-t border-gray-700/50 px-4 py-3 flex justify-between items-center bg-indigo-950/30">
          <span className="text-gray-300 font-medium">Toplam</span>
          <span className="text-indigo-400 font-bold text-xl">{price.toLocaleString("tr-TR")} ₺</span>
        </div>
      </div>

      <div className="flex items-start gap-2 bg-blue-950/30 border border-blue-900/30 rounded-lg p-3">
        <Info size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-300/80 leading-relaxed">
          Bu alan kalıcı olarak sana aittir. Logo yükle, siten buradan görünsün.
        </p>
      </div>

      <button
        onClick={handleBuy}
        className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
      >
        <ShoppingCart size={16} />
        Satın Al — {price.toLocaleString("tr-TR")} ₺
      </button>

      <p className="text-xs text-center text-gray-600">
        🔒 Güvenli ödeme
      </p>
    </div>
  );
}
