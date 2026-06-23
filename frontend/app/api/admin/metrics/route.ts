import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const adminSecret = req.headers.get("x-admin-secret");
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get pixels with paid/approved status from last 30 days
  const since = new Date();
  since.setDate(since.getDate() - 30);

  const { data, error } = await supabase
    .from("pixels")
    .select("price, paid_at, created_at, status")
    .in("status", ["approved", "paid"])
    .gte("paid_at", since.toISOString());

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Group by day
  const dayMap: Record<string, { count: number; revenue: number }> = {};
  for (const p of data ?? []) {
    const d = (p.paid_at ?? p.created_at ?? "").slice(0, 10);
    if (!d) continue;
    if (!dayMap[d]) dayMap[d] = { count: 0, revenue: 0 };
    dayMap[d].count++;
    dayMap[d].revenue += p.price ?? 0;
  }

  // Build last 30 days array
  const days: { date: string; count: number; revenue: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ date: key, ...(dayMap[key] ?? { count: 0, revenue: 0 }) });
  }

  const totalRevenue = days.reduce((s, d) => s + d.revenue, 0);
  const totalSales = days.reduce((s, d) => s + d.count, 0);

  return NextResponse.json({ days, totalRevenue, totalSales });
}
