import { NextRequest, NextResponse } from "next/server";
import { supabase, verifyAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!verifyAdmin(secret)) return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });

  const { data, error } = await supabase.from("pixels").select("*").eq("status", "pending_approval");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
