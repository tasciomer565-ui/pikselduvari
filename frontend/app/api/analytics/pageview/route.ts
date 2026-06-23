import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { page, referrer } = body;

    if (!page) {
      return NextResponse.json({ error: "page required" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
    const userAgent = req.headers.get("user-agent") ?? "";

    // Hash IP for privacy
    const { createHash } = require("crypto");
    const ipHash = ip ? createHash("sha256").update(ip).digest("hex").slice(0, 16) : "";

    await supabase.from("page_views").insert({
      page,
      referrer: referrer ?? null,
      user_agent: userAgent,
      ip_hash: ipHash,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
