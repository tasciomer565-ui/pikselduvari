import { NextRequest, NextResponse } from "next/server";
import { supabase, verifyAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const secret = req.headers.get("x-admin-secret");
  if (!verifyAdmin(secret)) return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });

  const { id } = await params;

  // Parse rejection reason if provided
  let rejection_reason: string | undefined;
  try {
    const body = await req.json();
    rejection_reason = body?.rejection_reason;
  } catch {
    // Body is optional
  }

  const update: Record<string, unknown> = { status: "rejected" };
  if (rejection_reason) update.rejection_reason = rejection_reason;

  await supabase.from("pixels").update(update).eq("id", id);

  return NextResponse.json({ success: true });
}
