import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("pixels")
    .select("status, price, width, height");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = data ?? [];
  const approved = rows.filter((r) => r.status === "approved");
  const pending = rows.filter((r) => r.status === "paid");
  const rejected = rows.filter((r) => r.status === "rejected");

  const total_revenue = approved.reduce((sum, r) => sum + (r.price ?? 0), 0);
  const total_pixels_sold = approved.reduce((sum, r) => sum + (r.width ?? 0) * (r.height ?? 0), 0);

  return NextResponse.json({
    total_pixels_sold,
    total_revenue,
    pending_count: pending.length,
    approved_count: approved.length,
    rejected_count: rejected.length,
  });
}
