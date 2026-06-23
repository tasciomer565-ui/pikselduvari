import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// In-memory cache for 30 seconds
let cache: { data: unknown; expiresAt: number } | null = null;

export async function GET() {
  const now = Date.now();

  if (cache && cache.expiresAt > now) {
    return NextResponse.json(cache.data, {
      headers: { "X-Cache": "HIT", "Cache-Control": "public, max-age=30" },
    });
  }

  const { data, error } = await supabase
    .from("pixels")
    .select("x,y,width,height")
    .in("status", ["pending_payment", "pending_approval", "approved"]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  cache = { data, expiresAt: now + 30_000 };
  return NextResponse.json(data, {
    headers: { "X-Cache": "MISS", "Cache-Control": "public, max-age=30" },
  });
}
