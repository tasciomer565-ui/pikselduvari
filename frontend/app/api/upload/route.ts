import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(ip, 10)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const pixelId = formData.get("pixel_id") as string | null;

    if (!file || !pixelId) {
      return NextResponse.json({ error: "file ve pixel_id gerekli" }, { status: 400 });
    }

    // Validate size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "Dosya 2MB'dan büyük olamaz" }, { status: 400 });
    }

    // Validate type
    const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Sadece PNG, JPG, WebP veya SVG yükleyebilirsiniz" }, { status: 400 });
    }

    const ext = file.name.split(".").pop() ?? "png";
    const fileName = `${pixelId}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("pixel-images")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: "Yükleme başarısız" }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("pixel-images")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    const { error: updateError } = await supabase
      .from("pixels")
      .update({ image_url: publicUrl })
      .eq("id", pixelId);

    if (updateError) {
      console.error("Update error:", updateError);
      return NextResponse.json({ error: "Veritabanı güncelleme başarısız" }, { status: 500 });
    }

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
