"use client";

import { useRef, useState, useCallback } from "react";
import { Pixel, Selection } from "@/app/page";

const GRID_SIZE = 1000;
const BLOCK = 10;

interface Props {
  pixels: Pixel[];
  selection: Selection | null;
  onSelect: (s: Selection | null) => void;
}

export default function PixelGrid({ pixels, selection, onSelect }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startCell, setStartCell] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState<{ x: number; y: number } | null>(null);

  const getCellFromEvent = useCallback((e: React.MouseEvent) => {
    if (!divRef.current) return null;
    const rect = divRef.current.getBoundingClientRect();
    // Gerçek piksel koordinatına çevir (CSS scale'i dikkate alır)
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
    if (!dragging || !startCell) return;
    const x = Math.min(startCell.x, cell.x);
    const y = Math.min(startCell.y, cell.y);
    const w = Math.max(startCell.x, cell.x) - x + BLOCK;
    const h = Math.max(startCell.y, cell.y) - y + BLOCK;
    onSelect({ x, y, width: w, height: h });
  };

  const handleMouseUp = () => setDragging(false);
  const handleMouseLeave = () => { setDragging(false); setHovered(null); };

  return (
    <div
      ref={divRef}
      className="relative select-none cursor-crosshair"
      style={{ width: GRID_SIZE, height: GRID_SIZE, background: "#0a0f1e" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grid çizgileri - SVG */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={GRID_SIZE}
        height={GRID_SIZE}
        style={{ zIndex: 1 }}
      >
        <defs>
          <pattern id="smallGrid" width={BLOCK} height={BLOCK} patternUnits="userSpaceOnUse">
            <path d={`M ${BLOCK} 0 L 0 0 0 ${BLOCK}`} fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
          <pattern id="bigGrid" width={100} height={100} patternUnits="userSpaceOnUse">
            <rect width={100} height={100} fill="url(#smallGrid)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#334155" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bigGrid)" />
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
          style={{ left: p.x, top: p.y, width: p.width, height: p.height, zIndex: 5 }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {p.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image_url} alt={p.tooltip} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-700 to-indigo-500 border border-indigo-400/30" />
          )}
        </a>
      ))}

      {/* Hover highlight */}
      {hovered && !dragging && (
        <div
          className="absolute pointer-events-none border border-indigo-400/60 bg-indigo-400/15"
          style={{ left: hovered.x, top: hovered.y, width: BLOCK, height: BLOCK, zIndex: 10 }}
        />
      )}

      {/* Seçim */}
      {selection && (
        <div
          className="absolute pointer-events-none border-2 border-yellow-400 bg-yellow-400/10"
          style={{ left: selection.x, top: selection.y, width: selection.width, height: selection.height, zIndex: 15 }}
        >
          <div
            className="absolute bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded font-mono whitespace-nowrap font-bold"
            style={{ top: -22, left: 0 }}
          >
            {selection.width}×{selection.height} — {(selection.width * selection.height).toLocaleString("tr-TR")} ₺
          </div>
        </div>
      )}
    </div>
  );
}
