"use client";

import { Selection } from "@/app/page";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  selection: Selection;
  onClose: () => void;
}

const PIXEL_PRICE = 1;

export default function SelectionPanel({ selection, onClose }: Props) {
  const router = useRouter();
  const pixels = selection.width * selection.height;
  const price = pixels * PIXEL_PRICE;

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
    <div className="w-72 border-l border-gray-800 bg-gray-900 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-white">Seçilen Alan</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-white">
          <X size={18} />
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Konum</span>
          <span className="text-white">({selection.x}, {selection.y})</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Boyut</span>
          <span className="text-white">{selection.width} × {selection.height} piksel</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Toplam Piksel</span>
          <span className="text-white">{pixels.toLocaleString()}</span>
        </div>
        <hr className="border-gray-700" />
        <div className="flex justify-between font-semibold text-base">
          <span className="text-gray-300">Toplam Fiyat</span>
          <span className="text-indigo-400">{price.toLocaleString("tr-TR")} ₺</span>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Seçtiğin alan kalıcı olarak sana aittir. Logonu yükle, siten buradan görünsün.
      </p>

      <button
        onClick={handleBuy}
        className="w-full bg-indigo-600 hover:bg-indigo-500 transition py-3 rounded-lg font-semibold text-sm"
      >
        Satın Al → {price.toLocaleString("tr-TR")} ₺
      </button>

      <p className="text-xs text-center text-gray-600">
        Iyzico güvenceli ödeme
      </p>
    </div>
  );
}
