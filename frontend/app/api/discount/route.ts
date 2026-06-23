import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function POST(req: NextRequest) {
  const { code, pixels } = await req.json();
  if (!code) return NextResponse.json({ error: "Kod gerekli" }, { status: 400 });

  const { data, error } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("code", code.toUpperCase().trim())
    .eq("active", true)
    .single();

  if (error || !data) return NextResponse.json({ error: "Geçersiz veya süresi dolmuş kod" }, { status: 404 });
  if (data.expires_at && new Date(data.expires_at) < new Date()) return NextResponse.json({ error: "Kodun süresi dolmuş" }, { status: 400 });
  if (data.max_uses && data.uses >= data.max_uses) return NextResponse.json({ error: "Bu kod maksimum kullanım sayısına ulaştı" }, { status: 400 });

  const originalPrice = pixels * 1;
  const discountAmount = Math.floor(originalPrice * data.discount_percent / 100);
  const finalPrice = originalPrice - discountAmount;

  return NextResponse.json({
    valid: true,
    code: data.code,
    discountPercent: data.discount_percent,
    originalPrice,
    discountAmount,
    finalPrice,
  });
}
