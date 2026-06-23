import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (!q || q.length < 2) {
    return NextResponse.json({ error: "En az 2 karakter girin." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("pixels")
    .select("id, x, y, width, height, owner_name, website_url, tooltip, status")
    .or(`owner_name.ilike.%${q}%,website_url.ilike.%${q}%`)
    .eq("status", "approved")
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ results: data ?? [], count: data?.length ?? 0 });
}
