import type { Metadata } from "next";
import Link from "next/link";
import { sehirler } from "@/app/sehir/sehirler";

export const metadata: Metadata = {
  title: "Türkiye'nin Tüm Şehirlerinde Piksel Reklam — Piksel Duvarı",
  description: "İstanbul'dan Van'a, Edirne'den Hakkari'ye Türkiye'nin 81 ilinde kalıcı dijital reklam alanı. 1 piksel = 1₺, tek seferlik ödeme.",
  keywords: "türkiye dijital reklam, şehir bazlı reklam, piksel reklam tüm iller, online reklam türkiye",
  alternates: { canonical: "https://pikselduvari.com/sehirler" },
};

const regions = [
  { name: "Marmara", slugs: ["istanbul", "kocaeli", "sakarya", "bursa", "balikesir", "canakkale", "edirne", "kirklareli", "tekirdag", "yalova", "bilecik"] },
  { name: "Ege", slugs: ["izmir", "manisa", "aydin", "denizli", "mugla", "usak", "kutahya", "afyonkarahisar"] },
  { name: "Akdeniz", slugs: ["antalya", "mersin", "adana", "hatay", "isparta", "burdur", "kahramanmaras", "osmaniye"] },
  { name: "İç Anadolu", slugs: ["ankara", "konya", "eskisehir", "kayseri", "sivas", "yozgat", "aksaray", "nigde", "nevsehir", "kirsehir", "cankiri", "karaman", "kirikkale"] },
  { name: "Karadeniz", slugs: ["samsun", "trabzon", "ordu", "giresun", "rize", "artvin", "sinop", "kastamonu", "bartin", "zonguldak", "bolu", "amasya", "tokat", "corum", "gumushane", "bayburt", "karabuk", "duzce"] },
  { name: "Doğu Anadolu", slugs: ["erzurum", "erzincan", "van", "malatya", "elazig", "kars", "agri", "mus", "bingol", "bitlis", "ardahan", "igdir", "tunceli", "hakkari"] },
  { name: "Güneydoğu Anadolu", slugs: ["gaziantep", "sanliurfa", "diyarbakir", "mardin", "batman", "siirt", "sirnak", "adiyaman", "kilis"] },
];

export default function SehirlerPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold">PD</div>
          <span className="font-bold">Piksel Duvarı</span>
        </Link>
        <Link href="/" className="text-gray-400 hover:text-white text-sm transition">← Ana Sayfa</Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Türkiye&apos;nin 81 İlinde Piksel Reklam</h1>
          <p className="text-gray-400 text-lg mb-6">Şehrinizi seçin, Türkiye haritasında kalıcı dijital alan edinin.</p>
          <div className="inline-flex items-center gap-2 bg-indigo-950/40 border border-indigo-800/40 rounded-full px-5 py-2 text-indigo-300 text-sm">
            🗺️ 1 piksel = 1₺ · Tek seferlik ödeme · Sonsuza kadar görünürlük
          </div>
        </div>

        {regions.map((region) => {
          const cities = region.slugs.map(s => sehirler.find(sh => sh.slug === s)).filter(Boolean);
          return (
            <div key={region.name} className="mb-10">
              <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-4 h-0.5 bg-indigo-600" />
                {region.name} Bölgesi
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {cities.map((city) => city && (
                  <Link key={city.slug} href={`/sehir/${city.slug}`} className="bg-gray-900 border border-gray-800 hover:border-indigo-700/60 hover:bg-indigo-950/20 rounded-xl p-4 transition group">
                    <div className="font-semibold text-sm group-hover:text-indigo-300 transition mb-1">{city.name}</div>
                    <div className="text-gray-600 text-xs">{city.population} nüfus</div>
                    <div className="text-gray-700 text-xs mt-1 truncate">{city.industries.slice(0, 2).join(", ")}</div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-12 bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-800/40 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Hangi Şehir Olursa Olsun</h3>
          <p className="text-gray-400 text-sm mb-6">Türkiye haritasında istediğiniz bölgeden alan seçin. 1 piksel = 1₺.</p>
          <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-500 transition px-8 py-3 rounded-xl font-bold">
            🗺️ Haritayı Aç & Alan Seç
          </Link>
        </div>
      </main>
    </div>
  );
}
