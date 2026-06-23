import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Haberler & Blog — Piksel Duvarı",
  description: "Piksel reklam, dijital marka görünürlüğü, SEO ve Türkiye'nin ilk piksel duvarı hakkında güncel içerikler.",
  alternates: { canonical: "https://pikselduvari.com/haberler" },
};

const posts = [
  {
    slug: "piksel-duvari-acilis",
    date: "15 Ocak 2025",
    category: "Duyuru",
    categoryColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
    title: "Türkiye'nin İlk Piksel Reklam Duvarı Açıldı!",
    excerpt: "Piksel Duvarı, 1.000.000 piksellik Türkiye haritasıyla yayına girdi. Şehir bazlı bölümleriyle markaların kalıcı dijital alan edinebileceği bu platform, reklam dünyasına yeni bir soluk getiriyor.",
    emoji: "🚀",
    readTime: "3 dk",
    content: "Türkiye'nin dijital reklam dünyasında yeni bir dönem başlıyor. Piksel Duvarı, 1 milyon piksellik Türkiye haritası üzerinde işletmelerin kalıcı reklam alanı satın alabileceği Türkiye'nin ilk platformudur. Her piksel sadece 1₺ — tek seferlik ödeme, sonsuza kadar görünürlük.",
  },
  {
    slug: "reklamverenler-icin-ipuclari",
    date: "22 Şubat 2025",
    category: "İpuçları",
    categoryColor: "bg-green-950 text-green-300 border-green-800",
    title: "Piksel Reklamınızdan Maksimum Verim Almanın 7 Yolu",
    excerpt: "Piksel alanınızı doğru konumlandırmak, doğru görseli seçmek ve hedef kitlenizle örtüşen bir bölge seçmek — bunların hepsi başarılı bir piksel reklam kampanyası için kritik öneme sahip.",
    emoji: "💡",
    readTime: "5 dk",
    content: "1. Hedef kitlenize yakın bölge seçin. 2. Net ve tanınabilir logo kullanın. 3. Büyük alan = daha fazla dikkat. 4. Yoğun bölge seçin. 5. Görseli düzenli güncelleyin. 6. Web sitenizi optimize edin. 7. Sosyal medyada paylaşın.",
  },
  {
    slug: "piksel-sanat-ornekleri",
    date: "10 Mart 2025",
    category: "İlham",
    categoryColor: "bg-purple-950 text-purple-300 border-purple-800",
    title: "Piksel Sanatıyla Markanızı Ölümsüzleştirin",
    excerpt: "Dünyaca ünlü Million Dollar Homepage'den ilham alan Piksel Duvarı, Türk işletmelerinin dijital varlıklarını sonsuza taşımasına olanak tanıyor.",
    emoji: "🎨",
    readTime: "4 dk",
    content: "2005 yılında Alex Tew, milyon dolarlık ana sayfa fikriyle internet tarihine geçti. Piksel Duvarı, bu konsepti Türkiye'ye ve Türk markalarına uyarlıyor.",
  },
  {
    slug: "kucuk-isletmeler-icin-dijital-reklam",
    date: "5 Nisan 2025",
    category: "Rehber",
    categoryColor: "bg-yellow-950 text-yellow-300 border-yellow-800",
    title: "Küçük İşletmeler İçin En Uygun Dijital Reklam: Piksel mi, Sosyal Medya mı?",
    excerpt: "Aylık bütçesi 500₺ olan küçük bir işletme için hangi reklam kanalı daha mantıklı? Google Ads, Instagram reklamı ve piksel reklam karşılaştırması.",
    emoji: "📊",
    readTime: "6 dk",
    content: "Google Ads: tıklama başına 2-10₺, sürekli bütçe gerekli. Instagram: 1000 gösterim için 30-80₺, geçici. Piksel Duvarı: 100₺ tek seferlik, kalıcı. Küçük işletmeler için en verimli seçenek piksel reklamdır.",
  },
  {
    slug: "istanbul-ankara-izmir-hangi-bolge",
    date: "20 Nisan 2025",
    category: "Rehber",
    categoryColor: "bg-blue-950 text-blue-300 border-blue-800",
    title: "İstanbul mu, Ankara mı, İzmir mi? Hangi Piksel Bölgesi Size Uygun?",
    excerpt: "Türkiye'nin üç büyük şehrinde faaliyet gösteren işletmeler için bölge seçimi kritik önem taşıyor. Her şehrin avantajlarını karşılaştırdık.",
    emoji: "🗺️",
    readTime: "5 dk",
    content: "İstanbul bölgesi en yoğun trafiği alır — e-ticaret, finans, teknoloji firmaları için ideal. Ankara bölgesi kamu kurumları ve B2B şirketler için. İzmir bölgesi turizm, tarım ve ihracat firmaları için en uygun seçim.",
  },
  {
    slug: "seo-icin-piksel-reklam",
    date: "3 Mayıs 2025",
    category: "SEO",
    categoryColor: "bg-orange-950 text-orange-300 border-orange-800",
    title: "Piksel Reklam SEO'nuzu Nasıl Güçlendirir?",
    excerpt: "pikselduvari.com'dan web sitenize verilen backlink, Google sıralamanıza nasıl etki eder? SEO uzmanları açıklıyor.",
    emoji: "🔍",
    readTime: "4 dk",
    content: "Her piksel alanı web sitenize dofollow backlink içerir. pikselduvari.com'un domain otoritesi arttıkça bu backlink'in değeri de artar. Ayrıca piksel üzerinde marka adınız ziyaretçilerde marka bilinirliği oluşturur.",
  },
  {
    slug: "referans-programi-nasil-calisir",
    date: "18 Mayıs 2025",
    category: "Duyuru",
    categoryColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
    title: "Referans Programımız Başladı: Arkadaşını Getir, Kazan!",
    excerpt: "Piksel Duvarı referans programıyla her başarılı yönlendirme için satış tutarının %10'unu kazanabilirsiniz. Pasif gelir fırsatını kaçırmayın.",
    emoji: "🤝",
    readTime: "3 dk",
    content: "Referans programımıza katılmak için WhatsApp'tan veya e-posta ile başvurun. Size özel referans kodunuzla gelen her satıştan %10 komisyon kazanırsınız. Minimum çekim tutarı 100₺.",
  },
  {
    slug: "marka-gorunurlugu-neden-onemli",
    date: "1 Haziran 2025",
    category: "Pazarlama",
    categoryColor: "bg-pink-950 text-pink-300 border-pink-800",
    title: "Marka Görünürlüğü Neden Bu Kadar Önemli? Rakamlarla Kanıtı",
    excerpt: "Araştırmalar gösteriyor: Bir kişi bir markayı ortalama 7 kez gördükten sonra satın alma kararı veriyor. Piksel reklam bu süreci nasıl hızlandırır?",
    emoji: "📈",
    readTime: "5 dk",
    content: "Marka bilinirliği, dönüşüm oranını doğrudan etkiler. Piksel Duvarı'nda yer alan markalar, ziyaretçilerin her siteye gelişinde görünür. Yüksek trafik + kalıcı konum = sürekli marka bilinirliği artışı.",
  },
  {
    slug: "e-ticaret-markalari-icin-piksel",
    date: "10 Haziran 2025",
    category: "İpuçları",
    categoryColor: "bg-green-950 text-green-300 border-green-800",
    title: "E-Ticaret Markaları İçin Piksel Reklam Stratejisi",
    excerpt: "Online mağaza açtınız ama trafik gelmiyor mu? Piksel reklam, e-ticaret sitelerine organik trafik çekmenin en ekonomik yollarından biri.",
    emoji: "🛒",
    readTime: "6 dk",
    content: "E-ticaret için en iyi strateji: büyük şehir bölgelerinde alan seçmek, ürün görselini değil logo kullanmak ve web sitesi URL'ini net yazmak. 50x50 ve üzeri alanlar en iyi CTR'ı sağlar.",
  },
  {
    slug: "piksel-duvari-vs-billboard",
    date: "20 Haziran 2025",
    category: "Karşılaştırma",
    categoryColor: "bg-red-950 text-red-300 border-red-800",
    title: "Piksel Reklam vs. Billboard: Hangisi Daha Karlı?",
    excerpt: "İstanbul'da bir billboard için yılda 120.000₺ ödersiniz. pikselduvari.com'da 10.000₺ ile 100×100 piksel alırsınız ve bu alan sonsuza kadar sizin olur.",
    emoji: "🆚",
    readTime: "4 dk",
    content: "Billboard: 120.000₺/yıl, lokasyon kısıtlı, hedefleme yok, geçici. Piksel Duvarı: 10.000₺ tek seferlik, tüm Türkiye, kalıcı, web sitesi linki. Maliyet avantajı %92 piksel reklamda.",
  },
];

export default function HaberlerPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold">PD</div>
          <span className="font-bold">Piksel Duvarı</span>
        </Link>
        <Link href="/" className="text-gray-400 hover:text-white text-sm transition">← Ana Sayfa</Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: "Haberler" }]} />

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-3">Haberler & Blog</h1>
          <p className="text-gray-400">Piksel reklam, dijital pazarlama ve marka görünürlüğü hakkında {posts.length} içerik.</p>
        </div>

        {/* Öne çıkan yazı */}
        <article className="bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-700/40 rounded-2xl p-8 mb-8 hover:border-indigo-600/60 transition group">
          <div className="flex items-start gap-5">
            <div className="text-5xl shrink-0">{posts[posts.length - 1].emoji}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${posts[posts.length - 1].categoryColor}`}>{posts[posts.length - 1].category}</span>
                <span className="text-gray-500 text-xs">{posts[posts.length - 1].date}</span>
                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Yeni</span>
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-indigo-300 transition">{posts[posts.length - 1].title}</h2>
              <p className="text-gray-400 leading-relaxed">{posts[posts.length - 1].excerpt}</p>
              <div className="mt-4 text-indigo-400 text-sm hover:text-indigo-300 transition cursor-pointer">Devamını oku →</div>
            </div>
          </div>
        </article>

        <div className="grid gap-5">
          {[...posts].reverse().slice(1).map((post) => (
            <article key={post.slug} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition group">
              <div className="flex items-start gap-5">
                <div className="text-3xl shrink-0 mt-1">{post.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${post.categoryColor}`}>{post.category}</span>
                    <span className="text-gray-600 text-xs">{post.date}</span>
                    <span className="text-gray-700 text-xs">·</span>
                    <span className="text-gray-600 text-xs">{post.readTime} okuma</span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 group-hover:text-indigo-300 transition">{post.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="mt-3 text-indigo-400 text-sm hover:text-indigo-300 transition cursor-pointer">Devamını oku →</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-indigo-950/30 border border-indigo-900/40 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Yeni içeriklerden haberdar olun</h3>
          <p className="text-gray-400 text-sm mb-6">Her yeni yazıda ilk siz bilinin. Üstelik ücretsiz 10×10 piksel alanı kazanın.</p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="e-posta adresiniz" className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500" />
            <button className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2.5 rounded-xl text-sm font-semibold">Abone Ol</button>
          </div>
        </div>
      </main>
    </div>
  );
}
