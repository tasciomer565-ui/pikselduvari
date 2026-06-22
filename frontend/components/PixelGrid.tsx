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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startCell, setStartCell] = useState<{ x: number; y: number } | null>(null);

  const getCellFromEvent = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const cellX = Math.floor(rawX / BLOCK) * BLOCK;
    const cellY = Math.floor(rawY / BLOCK) * BLOCK;
    return { x: cellX, y: cellY };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const cell = getCellFromEvent(e);
    setDragging(true);
    setStartCell(cell);
    onSelect({ x: cell.x, y: cell.y, width: BLOCK, height: BLOCK });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging || !startCell) return;
    const cell = getCellFromEvent(e);
    const x = Math.min(startCell.x, cell.x);
    const y = Math.min(startCell.y, cell.y);
    const width = Math.max(startCell.x, cell.x) - x + BLOCK;
    const height = Math.max(startCell.y, cell.y) - y + BLOCK;
    onSelect({ x, y, width, height });
  };

  const handleMouseUp = () => setDragging(false);

  // Build occupied set for fast lookup
  const occupiedBlocks = new Set<string>();
  pixels.forEach((p) => {
    for (let bx = p.x; bx < p.x + p.width; bx += BLOCK) {
      for (let by = p.y; by < p.y + p.height; by += BLOCK) {
        occupiedBlocks.add(`${bx},${by}`);
      }
    }
  });

  const isOccupied = (x: number, y: number) => occupiedBlocks.has(`${x},${y}`);
  const isSelected = (x: number, y: number) =>
    selection
      ? x >= selection.x && x < selection.x + selection.width && y >= selection.y && y < selection.y + selection.height
      : false;

  const cells = GRID_SIZE / BLOCK;

  return (
    <div className="relative" style={{ width: GRID_SIZE, height: GRID_SIZE }}>
      {/* Sold pixels with images/colors */}
      {pixels.map((p) => (
        <a
          key={p.id}
          href={p.website_url}
          target="_blank"
          rel="noopener noreferrer"
          title={p.tooltip}
          className="absolute block overflow-hidden border border-gray-700"
          style={{ left: p.x, top: p.y, width: p.width, height: p.height }}
        >
          {p.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${p.image_url}`}
              alt={p.tooltip}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-indigo-900 opacity-80" />
          )}
        </a>
      ))}

      {/* Selection overlay */}
      {selection && (
        <div
          className="absolute border-2 border-yellow-400 bg-yellow-400/20 pointer-events-none z-10"
          style={{
            left: selection.x,
            top: selection.y,
            width: selection.width,
            height: selection.height,
          }}
        />
      )}

      {/* Invisible interaction canvas */}
      <canvas
        ref={canvasRef}
        width={GRID_SIZE}
        height={GRID_SIZE}
        className="absolute inset-0 z-20 cursor-crosshair"
        style={{ opacity: 0 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Grid lines */}
      <svg
        className="absolute inset-0 pointer-events-none z-0"
        width={GRID_SIZE}
        height={GRID_SIZE}
      >
        {Array.from({ length: cells + 1 }).map((_, i) => (
          <g key={i}>
            <line x1={i * BLOCK} y1={0} x2={i * BLOCK} y2={GRID_SIZE} stroke="#1f2937" strokeWidth={0.5} />
            <line x1={0} y1={i * BLOCK} x2={GRID_SIZE} y2={i * BLOCK} stroke="#1f2937" strokeWidth={0.5} />
          </g>
        ))}
      </svg>
    </div>
  );
}
