"use client";

import { useEffect, useRef } from "react";
import { REGIONS } from "@/lib/regions";
import { Pixel } from "@/app/page";

interface Props {
  pixels: Pixel[];
  viewportX: number;
  viewportY: number;
  viewportW: number;
  viewportH: number;
}

const MINIMAP_SIZE = 150;
const GRID_SIZE = 1000;
const SCALE = MINIMAP_SIZE / GRID_SIZE;

export default function Minimap({ pixels, viewportX, viewportY, viewportW, viewportH }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, MINIMAP_SIZE, MINIMAP_SIZE);

    // Draw regions
    for (const r of REGIONS) {
      ctx.fillStyle = r.color;
      ctx.globalAlpha = 0.7;
      ctx.fillRect(r.x * SCALE, r.y * SCALE, r.w * SCALE, r.h * SCALE);
    }

    // Draw sold pixels
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff";
    for (const p of pixels) {
      ctx.fillRect(p.x * SCALE, p.y * SCALE, p.width * SCALE, p.height * SCALE);
    }

    // Viewport indicator
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 1.5;
    const vx = viewportX * SCALE;
    const vy = viewportY * SCALE;
    const vw = Math.min(viewportW * SCALE, MINIMAP_SIZE - vx);
    const vh = Math.min(viewportH * SCALE, MINIMAP_SIZE - vy);
    ctx.strokeRect(vx, vy, vw, vh);
    ctx.fillStyle = "rgba(250,204,21,0.08)";
    ctx.fillRect(vx, vy, vw, vh);
    ctx.globalAlpha = 1;
  }, [pixels, viewportX, viewportY, viewportW, viewportH]);

  return (
    <div className="absolute bottom-12 left-3 z-40 rounded-lg border border-gray-700 overflow-hidden shadow-2xl" title="Minimap">
      <div className="bg-gray-900 px-2 py-0.5 text-xs text-gray-500 border-b border-gray-700">Minimap</div>
      <canvas
        ref={canvasRef}
        width={MINIMAP_SIZE}
        height={MINIMAP_SIZE}
        style={{ display: "block", imageRendering: "pixelated" }}
      />
    </div>
  );
}
