import { NextRequest, NextResponse } from "next/server";
import { supabase, verifyAdmin } from "@/lib/supabase";

const DEMO_PIXELS = [
  { x: 100, y: 0, width: 300, height: 200, owner_name: "İstanbul Reklam", website_url: "https://pikselduvari.vercel.app", tooltip: "İstanbul bölgesinde premium alan", status: "approved", image_url: null, price: 60000 },
  { x: 0, y: 200, width: 200, height: 150, owner_name: "Ege Turizm", website_url: "https://pikselduvari.vercel.app", tooltip: "İzmir bölgesi", status: "approved", image_url: null, price: 30000 },
  { x: 200, y: 200, width: 150, height: 150, owner_name: "Ankara Tech", website_url: "https://pikselduvari.vercel.app", tooltip: "Başkent teknoloji", status: "approved", image_url: null, price: 22500 },
  { x: 0, y: 700, width: 200, height: 200, owner_name: "Antalya Turizm", website_url: "https://pikselduvari.vercel.app", tooltip: "Akdeniz tatil", status: "approved", image_url: null, price: 40000 },
  { x: 500, y: 700, width: 200, height: 150, owner_name: "Güneydoğu Lezzet", website_url: "https://pikselduvari.vercel.app", tooltip: "Gaziantep mutfağı", status: "approved", image_url: null, price: 30000 },
  { x: 600, y: 0, width: 250, height: 100, owner_name: "Karadeniz Fındık", website_url: "https://pikselduvari.vercel.app", tooltip: "Karadeniz ürünleri", status: "approved", image_url: null, price: 25000 },
  { x: 300, y: 700, width: 200, height: 100, owner_name: "Adana Kebap", website_url: "https://pikselduvari.vercel.app", tooltip: "Adana'nın en iyisi", status: "approved", image_url: null, price: 20000 },
  { x: 700, y: 200, width: 150, height: 150, owner_name: "Doğu Ekspres", website_url: "https://pikselduvari.vercel.app", tooltip: "Doğu Anadolu turu", status: "approved", image_url: null, price: 22500 },
];

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!verifyAdmin(secret)) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("pixels")
    .insert(DEMO_PIXELS)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, count: data.length, pixels: data });
}
