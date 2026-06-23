"use client";

import { Selection } from "@/app/page";
import { X, ShoppingCart, Info, MapPin, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getRegionAt } from "@/lib/regions";
import HelpTooltip from "@/components/HelpTooltip";
import { useToast } from "@/components/Toast";

interface Props {
  selection: Selection;
  onClose: () => void;
  onPreset?: (w: number, h: number) => void;
}

const PIXEL_PRICE = 1;

const PRESETS = [
  { label: "20×20", w: 20, h: 20, price: "400₺" },
  { label: "50×50", w: 50, h: 50, price: "2.500₺" },
  { label: "100×100", w: 100, h: 100, price: "10.000₺" },
  { label: "200×200", w: 200, h: 200, price: "40.000₺" },
];

export default function SelectionPanel({ selection, onClose, onPreset }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
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

  const handleShare = () => {
    const url = `https://pikselduvari.com/?x=${selection.x}&y=${selection.y}&w=${selection.width}&h=${selection.height}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast("Bağlantı kopyalandı!", "success");
    });
  };

  // Coordinate label (A1-C3 style using 100px blocks)
  const colStart = String.fromCharCode(65 + Math.floor(selection.x / 100));
  const rowStart = Math.floor(selection.y / 100) + 1;
  const colEnd = String.fromCharCode(65 + Math.floor((selection.x + selection.width - 1) / 100));
  const rowEnd = Math.floor((selection.y + selection.height - 1) / 100) + 1;
  const coordLabel = colStart === colEnd && rowStart === rowEnd
    ? `${colStart}${rowStart}`
    : `${colStart}${rowStart}–${colEnd}${rowEnd}`;

  return (
    <div className="w-72 border-l border-gray-800/60 bg-gray-900/95 backdrop-blur-sm p-5 flex flex-col gap-4 overflow-y-auto">
      {/* Klavye kısayolları */}
      <div className="bg-gray-800/40 rounded-lg px-3 py-2 text-xs text-gray-500 space-y-1">
        <div className="flex justify-between"><span>↑ ↓ ← →</span><span>Seçimi kaydır</span></div>
        <div className="flex justify-between"><span>Shift + ok</span><span>5× hızlı kaydır</span></div>
        <div className="flex justify-between"><span>+ / −</span><span>Boyutu değiştir</span></div>
        <div className="flex justify-between"><span>Enter</span><span>Satın al</span></div>
        <div className="flex justify-between"><span>ESC</span><span>Seçimi sil</span></div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-white flex items-center gap-2">
          <ShoppingCart size={16} className="text-indigo-400" />
          Seçilen Alan
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={handleShare}
            className="text-gray-600 hover:text-indigo-400 transition rounded-lg p-1 hover:bg-gray-800"
            title="Bu alanı paylaş"
          >
            <Share2 size={14} />
          </button>
          <button onClick={onClose} className="text-gray-600 hover:text-white transition rounded-lg p-1 hover:bg-gray-800">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Grid coordinate label */}
      <div className="bg-indigo-950/30 border border-indigo-900/30 rounded-lg px-3 py-1.5 text-xs text-indigo-300 font-mono text-center">
        Izgara: <strong>{coordLabel}</strong>
      </div>

      {/* Preset size buttons */}
      <div>
        <p className="text-xs text-gray-500 mb-2 flex items-center">
          Hızlı Boyut Seç
          <HelpTooltip text="Hazır boyutlardan birini seçin ya da haritada sürükleyerek özel boyut belirleyin." />
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => onPreset?.(p.w, p.h)}
              className={`text-left px-3 py-2 rounded-lg border text-xs transition ${
                selection.width === p.w && selection.height === p.h
                  ? "border-indigo-500 bg-indigo-950/50 text-indigo-300"
                  : "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600"
              }`}
            >
              <div className="font-semibold">{p.label}</div>
              <div className="text-gray-500">{p.price}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Önizleme */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="p-4 space-y-2.5 text-sm">
          {region && (
            <div className="flex items-center gap-2 text-indigo-300 bg-indigo-950/50 rounded-lg px-2 py-1.5 mb-1">
              <MapPin size={12} />
              <span className="font-semibold text-xs">{region.name}</span>
              <span className="text-indigo-500 text-xs">— {region.subtitle.split("·")[0].trim()}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-400">
            <span className="flex items-center">
              Konum
              <HelpTooltip text="Seçilen alanın sol üst köşesinin harita koordinatları (piksel cinsinden)." />
            </span>
            <span className="text-white font-mono text-xs">({selection.x}, {selection.y})</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Boyut</span>
            <span className="text-white">{selection.width} × {selection.height} px</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span className="flex items-center">
              Blok sayısı
              <HelpTooltip text="Her blok 10×10 pikseldir. Seçim her zaman 10px katlarında yapılır." />
            </span>
            <span className="text-white">{blocks} blok</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span className="flex items-center">
              Toplam piksel
              <HelpTooltip text="Seçiminizde toplam kaç piksel olduğunu gösterir. 1 piksel = 1₺." />
            </span>
            <span className="text-white">{pixels.toLocaleString("tr-TR")}</span>
          </div>
        </div>
        <div className="border-t border-gray-700/50 px-4 py-3 flex justify-between items-center bg-indigo-950/30">
          <span className="text-gray-300 font-medium">Toplam</span>
          <span className="text-indigo-400 font-bold text-xl">{price.toLocaleString("tr-TR")} ₺</span>
        </div>
      </div>

      <div className="flex items-start gap-2 bg-blue-950/30 border border-blue-900/30 rounded-lg p-3">
        <Info size={14} className="text-blue-400 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-300/80 leading-relaxed">
          Bu alan kalıcı olarak sana aittir. Logo yükle, siten buradan görünsün.
        </p>
      </div>

      <button
        onClick={handleBuy}
        className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
      >
        <ShoppingCart size={16} />
        Satın Al — {price.toLocaleString("tr-TR")} ₺
      </button>

      <div className="space-y-1">
        <p className="text-xs text-center text-gray-600">🔒 Güvenli ödeme · 30 gün iade garantisi</p>
        <p className="text-[10px] text-center text-gray-700">
          ESC: Seçimi temizle · Enter: Satın al
        </p>
      </div>
    </div>
  );
}
