"use client";

import { useRef, useState, useCallback } from "react";
import { Pixel, Selection } from "@/app/page";
import { REGIONS, getRegionAt } from "@/lib/regions";

const GRID_SIZE = 1000;
const BLOCK = 10;

interface Props {
  pixels: Pixel[];
  selection: Selection | null;
  onSelect: (s: Selection | null) => void;
  onRegion?: (name: string | null) => void;
}

export default function PixelGrid({ pixels, selection, onSelect, onRegion }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startCell, setStartCell] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState<{ x: number; y: number } | null>(null);

  const getCellFromEvent = useCallback((e: React.MouseEvent) => {
    if (!divRef.current) return null;
    const rect = divRef.current.getBoundingClientRect();
    const scaleX = GRID_SIZE / rect.width;
    const scaleY = GRID_SIZE / rect.height;
    const rawX = (e.clientX - rect.left) * scaleX;
    const rawY = (e.clientY - rect.top) * scaleY;
    const cellX = Math.max(0, Math.min(GRID_SIZE - BLOCK, Math.floor(rawX / BLOCK) * BLOCK));
    const cellY = Math.max(0, Math.min(GRID_SIZE - BLOCK, Math.floor(rawY / BLOCK) * BLOCK));
    return { x: cellX, y: cellY };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const cell = getCellFromEvent(e);
    if (!cell) return;
    setDragging(true);
    setStartCell(cell);
    onSelect({ x: cell.x, y: cell.y, width: BLOCK, height: BLOCK });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const cell = getCellFromEvent(e);
    if (!cell) return;
    setHovered(cell);
    onRegion?.(getRegionAt(cell.x, cell.y)?.name ?? null);
    if (!dragging || !startCell) return;
    const x = Math.min(startCell.x, cell.x);
    const y = Math.min(startCell.y, cell.y);
    const w = Math.max(startCell.x, cell.x) - x + BLOCK;
    const h = Math.max(startCell.y, cell.y) - y + BLOCK;
    onSelect({ x, y, width: w, height: h });
  };

  const handleMouseUp = () => setDragging(false);
  const handleMouseLeave = () => { setDragging(false); setHovered(null); onRegion?.(null); };

  return (
    <div
      ref={divRef}
      className="relative select-none cursor-crosshair"
      style={{ width: GRID_SIZE, height: GRID_SIZE, background: "#060b14" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Bölge renk katmanı */}
      {REGIONS.map((r) => (
        <div
          key={r.id}
          className="absolute pointer-events-none"
          style={{
            left: r.x, top: r.y, width: r.w, height: r.h,
            background: r.color,
            opacity: 0.55,
            zIndex: 1,
          }}
        />
      ))}

      {/* Bölge etiketleri */}
      {REGIONS.map((r) => (
        <div
          key={`label-${r.id}`}
          className="absolute pointer-events-none flex flex-col items-center justify-center text-center"
          style={{ left: r.x, top: r.y, width: r.w, height: r.h, zIndex: 3 }}
        >
          <span
            className="font-bold text-white drop-shadow-lg leading-tight"
            style={{ fontSize: Math.max(8, Math.min(16, r.w / 8, r.h / 5)) }}
          >
            {r.name}
          </span>
          {r.w >= 150 && r.h >= 120 && (
            <span
              className="text-white/60 leading-tight mt-0.5"
              style={{ fontSize: Math.max(6, Math.min(9, r.w / 14)) }}
            >
              {r.subtitle}
            </span>
          )}
        </div>
      ))}

      {/* Bölge sınırları */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={GRID_SIZE}
        height={GRID_SIZE}
        style={{ zIndex: 4 }}
      >
        {REGIONS.map((r) => (
          <rect
            key={`border-${r.id}`}
            x={r.x} y={r.y} width={r.w} height={r.h}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
          />
        ))}
        {/* İnce ızgara çizgileri */}
        <defs>
          <pattern id="blockGrid" width={BLOCK * 5} height={BLOCK * 5} patternUnits="userSpaceOnUse">
            <path d={`M ${BLOCK * 5} 0 L 0 0 0 ${BLOCK * 5}`} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blockGrid)" />
      </svg>

      {/* Satılmış pikseller */}
      {pixels.map((p) => (
        <a
          key={p.id}
          href={p.website_url}
          target="_blank"
          rel="noopener noreferrer"
          title={p.tooltip}
          className="absolute block overflow-hidden transition-opacity hover:opacity-80"
          style={{ left: p.x, top: p.y, width: p.width, height: p.height, zIndex: 6 }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {p.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image_url} alt={p.tooltip} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/90 border border-white/30" />
          )}
        </a>
      ))}

      {/* Hover highlight */}
      {hovered && !dragging && (
        <div
          className="absolute pointer-events-none border border-white/50 bg-white/10"
          style={{ left: hovered.x, top: hovered.y, width: BLOCK, height: BLOCK, zIndex: 10 }}
        />
      )}

      {/* Seçim */}
      {selection && (
        <div
          className="absolute pointer-events-none border-2 border-yellow-400"
          style={{
            left: selection.x, top: selection.y,
            width: selection.width, height: selection.height,
            background: "rgba(250,204,21,0.15)",
            zIndex: 15,
          }}
        >
          <div
            className="absolute bg-yellow-400 text-black text-xs px-2 py-0.5 rounded font-bold whitespace-nowrap shadow-lg"
            style={{ top: -22, left: 0 }}
          >
            {selection.width}×{selection.height} · {(selection.width * selection.height).toLocaleString("tr-TR")} ₺
          </div>
        </div>
      )}
    </div>
  );
}
