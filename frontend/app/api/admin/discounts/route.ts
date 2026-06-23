import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function GET(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase.from("discount_codes").select("*").order("created_at", { ascending: false });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { code, discount_percent, max_uses, expires_at } = await req.json();
  if (!code || !discount_percent) return NextResponse.json({ error: "Kod ve indirim oranı gerekli" }, { status: 400 });

  const { data, error } = await supabase.from("discount_codes").insert({
    code: code.toUpperCase().trim(),
    discount_percent: Number(discount_percent),
    max_uses: max_uses ? Number(max_uses) : null,
    expires_at: expires_at || null,
    active: true,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  if (req.headers.get("x-admin-secret") !== process.env.ADMIN_SECRET)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await supabase.from("discount_codes").update({ active: false }).eq("id", id);
  return NextResponse.json({ success: true });
}
