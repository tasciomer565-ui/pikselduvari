/*
 * Supabase'de contacts tablosu oluşturmak için:
 * CREATE TABLE contacts (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   name TEXT NOT NULL,
 *   email TEXT NOT NULL,
 *   message TEXT NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT now()
 * );
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(ip, 5)) {
    return NextResponse.json({ error: "Çok fazla istek" }, { status: 429 });
  }

  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Tüm alanlar zorunlu" }, { status: 400 });
  }

  const { error } = await supabase
    .from("contacts")
    .insert({ name, email, message });

  if (error) {
    console.error("Contact insert error:", error);
    return NextResponse.json({ error: "Kayıt başarısız" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
