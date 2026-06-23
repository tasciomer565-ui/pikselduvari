import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabase.from("pixels").select("owner_name,tooltip,x,y,width,height").eq("id", id).single();
  if (!data) return { title: "Piksel Bulunamadı" };
  return {
    title: `${data.owner_name} — Piksel Duvarı'nda`,
    description: `${data.owner_name}, Türkiye'nin piksel reklam duvarında ${data.width}×${data.height} piksellik alan edindi.`,
    openGraph: {
      title: `${data.owner_name} Türkiye haritasında!`,
      description: `Piksel Duvarı'nda ${data.width * data.height} piksellik kalıcı dijital alan. Sen de al!`,
      url: `https://pikselduvari.com/piksel/${id}`,
    },
  };
}

export default async function PikselPage({ params }: Props) {
  const { id } = await params;
  const { data: pixel } = await supabase
    .from("pixels")
    .select("*")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (!pixel) notFound();

  const pixels = pixel.width * pixel.height;
  const mapUrl = `https://pikselduvari.com/?x=${pixel.x}&y=${pixel.y}&w=${pixel.width}&h=${pixel.height}`;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 py-12">
      <nav className="fixed top-0 left-0 right-0 border-b border-gray-800/50 px-6 py-4 flex items-center justify-between bg-gray-950/90 backdrop-blur-md z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold">PD</div>
          <span className="font-bold">Piksel Duvarı</span>
        </Link>
        <Link href="/" className="text-gray-400 hover:text-white text-sm transition">Haritaya Dön</Link>
      </nav>

      <div className="max-w-md w-full mt-20">
        {/* Piksel kartı */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-6">
          {pixel.image_url ? (
            <div className="h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pixel.image_url} alt={pixel.owner_name} className="max-h-full max-w-full object-contain" />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-indigo-950 to-purple-950 flex items-center justify-center">
              <div className="text-6xl font-black text-indigo-300 opacity-60">{pixel.owner_name?.charAt(0)}</div>
            </div>
          )}

          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-2xl font-extrabold mb-1">{pixel.owner_name}</h1>
                {pixel.tooltip && <p className="text-gray-400 text-sm">{pixel.tooltip}</p>}
              </div>
              <span className="bg-green-900/60 text-green-300 text-xs px-2 py-1 rounded-full font-semibold">✓ Aktif</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              {[
                { label: "Konum", value: `X:${pixel.x}, Y:${pixel.y}` },
                { label: "Boyut", value: `${pixel.width}×${pixel.height}` },
                { label: "Toplam", value: `${pixels.toLocaleString("tr-TR")} px` },
              ].map((s) => (
                <div key={s.label} className="bg-gray-800 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                  <div className="text-xs font-semibold text-white">{s.value}</div>
                </div>
              ))}
            </div>

            {pixel.website_url && (
              <a href={pixel.website_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 mt-4 text-indigo-400 hover:text-indigo-300 text-sm transition">
                🔗 {pixel.website_url.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>

        {/* Paylaş */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-6">
          <p className="text-gray-400 text-sm mb-3 font-semibold">📤 Bu Piksel Sayfasını Paylaş</p>
          <div className="flex gap-2">
            <input
              readOnly
              value={`https://pikselduvari.com/piksel/${id}`}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300"
            />
            <button
              onClick={undefined}
              id="copy-btn"
              data-url={`https://pikselduvari.com/piksel/${id}`}
              className="bg-indigo-600 hover:bg-indigo-500 transition px-3 py-2 rounded-lg text-xs font-semibold"
            >
              Kopyala
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Türkiye haritasında kalıcı dijital alanım var! 🇹🇷 #PikselDuvarı`)}&url=${encodeURIComponent(`https://pikselduvari.com/piksel/${id}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-gray-800 hover:bg-gray-700 transition rounded-lg py-2 text-xs text-center font-semibold">
              𝕏 Twitter&apos;da Paylaş
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(`Türkiye haritasında kalıcı piksel reklam alanım var! Bak: https://pikselduvari.com/piksel/${id}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-green-800 hover:bg-green-700 transition rounded-lg py-2 text-xs text-center font-semibold">
              WhatsApp
            </a>
          </div>
        </div>

        {/* Haritada gör */}
        <Link href={mapUrl}
          className="block w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-2xl p-4 text-center font-bold mb-4">
          🗺️ Haritada Konumunu Gör
        </Link>

        {/* CTA */}
        <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-800/40 rounded-2xl p-5 text-center">
          <p className="text-gray-300 text-sm mb-3">Sen de Türkiye haritasında yerini al!</p>
          <Link href="/" className="inline-block bg-white text-gray-900 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition">
            1 piksel = 1₺ — Hemen Al
          </Link>
        </div>
      </div>

      {/* Kopyala butonu için client script */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('copy-btn')?.addEventListener('click', function() {
          navigator.clipboard.writeText(this.dataset.url).then(() => {
            this.textContent = '✓ Kopyalandı';
            setTimeout(() => this.textContent = 'Kopyala', 2000);
          });
        });
      `}} />
    </div>
  );
}
