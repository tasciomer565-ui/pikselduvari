"use client";

import { useRef, useState } from "react";
import { Pixel, Selection } from "@/app/page";

const GRID_SIZE = 1000;
const BLOCK = 10;

interface Props {
  pixels: Pixel[];
  selection: Selection | null;
  onSelect: (s: Selection | null) => void;
}

export default function PixelGrid({ pixels, selection, onSelect }: Props) {
  const [dragging, setDragging] = useState(false);
  const [startCell, setStartCell] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCellFromEvent = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cellX = Math.floor((e.clientX - rect.left) / BLOCK) * BLOCK;
    const cellY = Math.floor((e.clientY - rect.top) / BLOCK) * BLOCK;
    return { x: cellX, y: cellY };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const cell = getCellFromEvent(e);
    setDragging(true);
    setStartCell(cell);
    onSelect({ x: cell.x, y: cell.y, width: BLOCK, height: BLOCK });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const cell = getCellFromEvent(e);
    setHovered(cell);
    if (!dragging || !startCell) return;
    const x = Math.min(startCell.x, cell.x);
    const y = Math.min(startCell.y, cell.y);
    const width = Math.max(startCell.x, cell.x) - x + BLOCK;
    const height = Math.max(startCell.y, cell.y) - y + BLOCK;
    onSelect({ x, y, width, height });
  };

  const handleMouseUp = () => setDragging(false);
  const handleMouseLeave = () => { setDragging(false); setHovered(null); };

  return (
    <div className="relative" style={{ width: GRID_SIZE, height: GRID_SIZE, background: "#030712" }}>
      {/* Grid lines */}
      <svg className="absolute inset-0 pointer-events-none z-0" width={GRID_SIZE} height={GRID_SIZE}>
        <defs>
          <pattern id="grid" width={BLOCK} height={BLOCK} patternUnits="userSpaceOnUse">
            <path d={`M ${BLOCK} 0 L 0 0 0 ${BLOCK}`} fill="none" stroke="#1f2937" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Satılmış pikseller */}
      {pixels.map((p) => (
        <a
          key={p.id}
          href={p.website_url}
          target="_blank"
          rel="noopener noreferrer"
          title={p.tooltip}
          className="pixel-block absolute block overflow-hidden border border-indigo-900/30 hover:border-indigo-400/60 hover:z-10"
          style={{ left: p.x, top: p.y, width: p.width, height: p.height }}
        >
          {p.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image_url} alt={p.tooltip} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-indigo-700 opacity-80" />
          )}
        </a>
      ))}

      {/* Hover highlight */}
      {hovered && !dragging && (
        <div
          className="absolute pointer-events-none z-10 border border-indigo-400/40 bg-indigo-400/10"
          style={{ left: hovered.x, top: hovered.y, width: BLOCK, height: BLOCK }}
        />
      )}

      {/* Seçim */}
      {selection && (
        <div
          className="absolute pointer-events-none z-20 border-2 border-yellow-400 bg-yellow-400/10"
          style={{ left: selection.x, top: selection.y, width: selection.width, height: selection.height }}
        >
          <div className="absolute -top-5 left-0 bg-yellow-400 text-black text-xs px-1.5 py-0.5 rounded font-mono whitespace-nowrap">
            {selection.width}×{selection.height}
          </div>
        </div>
      )}

      {/* Interaction canvas */}
      <canvas
        ref={canvasRef}
        width={GRID_SIZE}
        height={GRID_SIZE}
        className="absolute inset-0 z-30 cursor-crosshair"
        style={{ opacity: 0 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
