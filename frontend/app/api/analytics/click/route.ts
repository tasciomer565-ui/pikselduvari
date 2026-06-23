import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getRegionAt } from "@/lib/regions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { x, y } = body;

    if (typeof x !== "number" || typeof y !== "number") {
      return NextResponse.json({ error: "x, y required" }, { status: 400 });
    }

    const region = getRegionAt(x, y);

    await supabase.from("click_events").insert({
      x,
      y,
      region_id: region?.id ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
