import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const x = parseInt(searchParams.get("x") ?? "0", 10);
  const y = parseInt(searchParams.get("y") ?? "0", 10);
  const w = parseInt(searchParams.get("w") ?? "10", 10);
  const h = parseInt(searchParams.get("h") ?? "10", 10);

  if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
    return NextResponse.json({ error: "Geçersiz koordinatlar." }, { status: 400 });
  }
  if (x < 0 || y < 0 || x + w > 1000 || y + h > 1000) {
    return NextResponse.json({ error: "Koordinatlar harita dışında." }, { status: 400 });
  }

  // Check for overlapping pixels
  const { data, error } = await supabase
    .from("pixels")
    .select("id, x, y, width, height, status")
    .not("status", "in", '("rejected")');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const overlapping = (data ?? []).filter((p) => {
    return !(x + w <= p.x || p.x + p.width <= x || y + h <= p.y || p.y + p.height <= y);
  });

  return NextResponse.json({
    available: overlapping.length === 0,
    overlapping_count: overlapping.length,
    requested: { x, y, width: w, height: h },
  });
}
