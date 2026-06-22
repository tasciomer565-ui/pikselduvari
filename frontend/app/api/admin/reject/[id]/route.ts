import { NextRequest, NextResponse } from "next/server";
import { supabase, verifyAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const secret = req.headers.get("x-admin-secret");
  if (!verifyAdmin(secret)) return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });

  const { id } = await params;
  await supabase.from("pixels").update({ status: "rejected" }).eq("id", id);

  return NextResponse.json({ success: true });
}
