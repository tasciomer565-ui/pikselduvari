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
  selectable?: boolean;
}

interface TooltipInfo {
  pixel: Pixel;
  x: number;
  y: number;
}

export default function PixelGrid({ pixels, selection, onSelect, onRegion, selectable = true }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startCell, setStartCell] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState<{ x: number; y: number } | null>(null);
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);

  // Sağ tık → context menu engelle
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();

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
    if (!selectable) return;
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
      className={`relative select-none ${selectable ? "cursor-crosshair" : "cursor-grab active:cursor-grabbing"}`}
      style={{ width: GRID_SIZE, height: GRID_SIZE, background: "#0f172a" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
    >
      {/* 1. Bölge renk katmanı (alt) */}
      {REGIONS.map((r) => (
        <div
          key={r.id}
          className="absolute pointer-events-none"
          style={{
            left: r.x, top: r.y, width: r.w, height: r.h,
            backgroundColor: r.color,
            opacity: 0.7,
            zIndex: 1,
          }}
        />
      ))}

      {/* 2. Bölge sınır çizgileri (SVG) */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={GRID_SIZE}
        height={GRID_SIZE}
        style={{ zIndex: 2 }}
      >
        {/* 50px'de bir belirgin çizgi (5 blok = 1 süper blok) */}
        {Array.from({ length: GRID_SIZE / 50 + 1 }, (_, i) => i * 50).map((pos) => (
          <g key={pos}>
            <line x1={pos} y1={0} x2={pos} y2={GRID_SIZE} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
            <line x1={0} y1={pos} x2={GRID_SIZE} y2={pos} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
          </g>
        ))}
        {/* 100px'de bir kalın çizgi */}
        {Array.from({ length: GRID_SIZE / 100 + 1 }, (_, i) => i * 100).map((pos) => (
          <g key={`big-${pos}`}>
            <line x1={pos} y1={0} x2={pos} y2={GRID_SIZE} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            <line x1={0} y1={pos} x2={GRID_SIZE} y2={pos} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          </g>
        ))}
        {/* Bölge sınırları */}
        {REGIONS.map((r) => (
          <rect
            key={`border-${r.id}`}
            x={r.x + 0.5} y={r.y + 0.5} width={r.w - 1} height={r.h - 1}
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="2"
          />
        ))}
      </svg>

      {/* 3. Bölge etiketleri */}
      {REGIONS.map((r) => (
        <div
          key={`label-${r.id}`}
          className="absolute pointer-events-none flex flex-col items-center justify-center text-center px-1"
          style={{ left: r.x, top: r.y, width: r.w, height: r.h, zIndex: 3 }}
        >
          <span
            className="font-bold text-white leading-tight drop-shadow"
            style={{
              fontSize: Math.max(9, Math.min(18, r.w / 9, r.h / 5)),
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            {r.name}
          </span>
          {r.w >= 160 && r.h >= 120 && (
            <span
              className="text-white/70 leading-tight mt-0.5"
              style={{
                fontSize: Math.max(6, Math.min(10, r.w / 16)),
                textShadow: "0 1px 3px rgba(0,0,0,0.9)",
              }}
            >
              {r.subtitle}
            </span>
          )}
        </div>
      ))}

      {/* 4. Satılmış pikseller */}
      {pixels.map((p) => (
        <a
          key={p.id}
          href={p.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute block overflow-hidden hover:opacity-80 transition-opacity"
          style={{ left: p.x, top: p.y, width: p.width, height: p.height, zIndex: 5 }}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseEnter={(e) => {
            const rect = divRef.current?.getBoundingClientRect();
            if (!rect) return;
            const scaleX = GRID_SIZE / rect.width;
            const scaleY = GRID_SIZE / rect.height;
            setTooltip({
              pixel: p,
              x: (e.clientX - rect.left) * scaleX,
              y: (e.clientY - rect.top) * scaleY,
            });
          }}
          onMouseMove={(e) => {
            const rect = divRef.current?.getBoundingClientRect();
            if (!rect) return;
            const scaleX = GRID_SIZE / rect.width;
            const scaleY = GRID_SIZE / rect.height;
            setTooltip((prev) => prev ? {
              ...prev,
              x: (e.clientX - rect.left) * scaleX,
              y: (e.clientY - rect.top) * scaleY,
            } : null);
          }}
          onMouseLeave={() => setTooltip(null)}
        >
          {p.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image_url} alt={p.tooltip} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/90 border border-white/30" />
          )}
        </a>
      ))}

      {/* Rich tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: Math.min(tooltip.x + 12, GRID_SIZE - 220),
            top: tooltip.y > GRID_SIZE / 2 ? tooltip.y - 100 : tooltip.y + 12,
          }}
        >
          <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-3 w-52">
            {tooltip.pixel.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tooltip.pixel.image_url}
                alt={tooltip.pixel.owner_name}
                className="w-full h-16 object-contain rounded-lg mb-2 bg-gray-800"
              />
            )}
            <p className="font-semibold text-white text-sm truncate">{tooltip.pixel.owner_name}</p>
            {tooltip.pixel.website_url && (
              <p className="text-indigo-400 text-xs truncate mt-0.5">{tooltip.pixel.website_url}</p>
            )}
            {tooltip.pixel.tooltip && (
              <p className="text-gray-400 text-xs mt-1 line-clamp-2">{tooltip.pixel.tooltip}</p>
            )}
          </div>
        </div>
      )}

      {/* 5. Hover highlight */}
      {hovered && !dragging && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: hovered.x, top: hovered.y, width: BLOCK, height: BLOCK,
            border: "1.5px solid rgba(255,255,255,0.7)",
            background: "rgba(255,255,255,0.15)",
            zIndex: 10,
          }}
        />
      )}

      {/* 6. Seçim */}
      {selection && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: selection.x, top: selection.y,
            width: selection.width, height: selection.height,
            border: "2.5px solid #facc15",
            background: "rgba(250,204,21,0.18)",
            zIndex: 15,
          }}
        >
          {/* Etiket */}
          <div
            style={{
              position: "absolute",
              top: selection.y > 25 ? -24 : 4,
              left: 0,
              background: "#facc15",
              color: "#000",
              fontSize: 11,
              fontWeight: 700,
              padding: "2px 6px",
              borderRadius: 4,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
            }}
          >
            {selection.width}×{selection.height} · {(selection.width * selection.height).toLocaleString("tr-TR")} ₺
          </div>
          {/* Köşe tutucuları */}
          {[
            { top: -3, left: -3 }, { top: -3, right: -3 },
            { bottom: -3, left: -3 }, { bottom: -3, right: -3 },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-sm"
              style={pos}
            />
          ))}
        </div>
      )}
    </div>
  );
}
