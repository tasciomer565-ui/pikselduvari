import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function GET() {
  const { data, error } = await supabase
    .from("pixels")
    .select("width, height")
    .eq("status", "approved");

  if (error) return NextResponse.json({ total: 1000000, sold: 0, remaining: 1000000, percent: 0 });

  const sold = (data ?? []).reduce((sum, p) => sum + p.width * p.height, 0);
  const total = 1000000;
  const remaining = total - sold;
  const percent = Math.min(100, Math.round(sold / total * 100 * 10) / 10);

  return NextResponse.json({ total, sold, remaining, percent });
}
