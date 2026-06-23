import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular (SSS) — Piksel Duvarı",
  description: "Piksel Duvarı hakkında merak ettikleriniz: ödeme, görsel gereksinimleri, alan seçimi, referans programı ve daha fazlası.",
  alternates: { canonical: "https://pikselduvari.com/sss" },
};

const faqs = [
  {
    category: "Genel",
    items: [
      { q: "Piksel Duvarı nedir?", a: "Piksel Duvarı, 1.000.000 piksellik bir Türkiye haritası üzerinde işletmelerin kalıcı reklam alanı satın alabildiği Türkiye'nin ilk piksel reklam platformudur. Her piksel 1₺ değerindedir. Bir kez ödeme yaparsınız, alanınız sonsuza kadar haritada kalır." },
      { q: "Alan gerçekten sonsuza kadar mı kalır?", a: "Evet. Piksel Duvarı platformu hizmet verdiği sürece alanınız kaldırılmaz. Bu tek seferlik ödeme, kalıcı görünürlük modelidir. Rakip platformlarda aylık ücret ödersiniz, burada bir kez ödersiniz." },
      { q: "Türkiye'nin herhangi bir şehrinde alan alabilir miyim?", a: "Evet. Haritamız 16 büyük bölgeye ayrılmıştır: İstanbul, Ankara, İzmir, Antalya, Karadeniz, Ege, İç Anadolu, Doğu Anadolu ve daha fazlası. Dilediğiniz bölgeden alan seçebilirsiniz." },
      { q: "Kaç piksel satın alabilirim?", a: "Minimum 10×10 (100 piksel), maksimum tüm duvar (1.000.000 piksel). İstediğiniz boyutta alan seçebilirsiniz. Birden fazla alan da alabilirsiniz." },
      { q: "Aynı anda birden fazla alan alınabilir mi?", a: "Evet. Her alan için ayrı işlem yapmanız yeterli. Farklı bölgelerde birden fazla alan alarak marka görünürlüğünüzü artırabilirsiniz." },
      { q: "Piksel Duvarı'nı kim kurdu?", a: "Piksel Duvarı, Türk girişimciler tarafından kurulmuş, Türkiye'ye özel bir platformdur. Amacımız Türk işletmelerinin dijital dünyada kalıcı yer edinmesini sağlamaktır." },
      { q: "Platformun güvenilirliği nasıl sağlanıyor?", a: "SSL sertifikası, PayTR 3D Secure ödeme altyapısı ve KVKK uyumluluğu ile güvenli bir platform sunuyoruz. Tüm işlemler kayıt altındadır." },
    ],
  },
  {
    category: "Ödeme",
    items: [
      { q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?", a: "Kredi kartı, banka kartı ve sanal kart ile ödeme yapabilirsiniz. Tüm ödemeler PayTR altyapısı üzerinden 3D Secure ile güvenli şekilde işlenir." },
      { q: "Aylık ya da yıllık ödeme var mı?", a: "Hayır. Piksel Duvarı tamamen tek seferlik ödeme modelidir. Bir kez ödersiniz, alan sonsuza kadar sizin olur. Abonelik veya yenileme ücreti yoktur." },
      { q: "Para iadesi mümkün mü?", a: "Evet. Görseliniz yüklenip yayına girmeden önce 30 gün içinde talep etmeniz halinde tam iade yapılır. İade talepleriniz için info@pikselduvari.com adresine yazın." },
      { q: "Fatura alabilir miyim?", a: "Evet, ödeme sonrası e-posta adresinize fatura gönderilir. Kurumsal fatura için info@pikselduvari.com adresine yazabilirsiniz." },
      { q: "Taksitle ödeme yapılabilir mi?", a: "Kredi kartınızın vade seçeneğine göre taksit yapabilirsiniz. Platform olarak ek taksit seçeneği sunmamaktayız." },
      { q: "Ödeme güvenli mi?", a: "Evet. Tüm ödemeler Türkiye'nin en güvenilir ödeme altyapılarından biri olan PayTR üzerinden işlenir. Kart bilgileriniz bizimle paylaşılmaz, doğrudan PayTR'a iletilir." },
      { q: "Toplu satın alım için özel fiyat var mı?", a: "Evet. 10.000 piksel ve üzeri satın alımlarda özel indirim uyguluyoruz. Detaylar için info@pikselduvari.com adresine yazın veya WhatsApp'tan ulaşın." },
      { q: "Yabancı para birimiyle ödeme yapabilir miyim?", a: "Şu an sadece Türk Lirası (₺) kabul edilmektedir. Yabancı uyruklu işletmeler için özel çözümler için iletişime geçin." },
    ],
  },
  {
    category: "Görsel & İçerik",
    items: [
      { q: "Ne tür görseller yükleyebilirim?", a: "PNG, JPG veya WebP formatında görseller yükleyebilirsiniz. Logonuz, ürün görseliniz veya marka renginiz olabilir. Maksimum dosya boyutu 2MB'dır." },
      { q: "Minimum görsel boyutu nedir?", a: "Seçtiğiniz alanın boyutuyla eşleşen bir görsel yüklemeniz önerilir. Örneğin 50×50 piksel alan için en az 50×50 piksel görsel kullanın. Daha büyük görseller otomatik boyutlandırılır." },
      { q: "Hangi içerikler yasaktır?", a: "Yetişkin içerik, siyasi içerik, yanıltıcı reklamlar, telif hakkı ihlali içeren görseller, nefret söylemi ve yasadışı ürün/hizmet reklamları kesinlikle yasaktır. İhlal durumunda alan iptal edilir, iade yapılmaz." },
      { q: "Görselimi sonradan değiştirebilir miyim?", a: "Evet. Alan size ait olduğu sürece görselinizi istediğiniz zaman güncelleyebilirsiniz. Her güncelleme 24 saat içinde admin onayına tabidir." },
      { q: "Görselim onaylanmazsa ne olur?", a: "Görseliniz platform kurallarına uymuyorsa size e-posta ile bildirim yapılır ve düzeltme için 7 gün süre verilir. Düzeltilmezse alan askıya alınabilir." },
      { q: "Logom yoksa ne yapabilirim?", a: "Sadece marka adınızı ve renklerinizi içeren basit bir görsel de kabul edilir. Profesyonel logo tasarımı için grafik tasarımcı önerilerimiz için WhatsApp'tan ulaşabilirsiniz." },
    ],
  },
  {
    category: "Teknik",
    items: [
      { q: "En küçük satın alınabilecek alan nedir?", a: "En küçük alan 10×10 piksel = 100₺'dir. Grid 10px blok sistemiyle çalışır, bu nedenle seçimler her zaman 10'un katlarında yapılır." },
      { q: "Koordinat sistemi nasıl çalışır?", a: "Harita 1000×1000 piksel boyutundadır. Sol üst köşe (0,0), sağ alt köşe ise (990,990) koordinatına karşılık gelir. Haritada herhangi bir yere tıkladığınızda koordinatlar panelde gösterilir." },
      { q: "Bir bölgede birden fazla alan alabilir miyim?", a: "Evet, birden fazla alan satın alabilirsiniz. Ancak aynı koordinata iki farklı alan yüklenemez." },
      { q: "Reklam alanım ne kadar sürede yayına girer?", a: "Ödeme ve görsel yüklemesinin ardından admin ekibimiz 24 saat içinde inceleyip onaylar. Onaylandıktan sonra anında yayına girer ve tüm ziyaretçiler tarafından görülür." },
      { q: "Haritada alanım nasıl görünür?", a: "Yüklediğiniz görsel, seçtiğiniz piksel alanında tam olarak görüntülenir. Ziyaretçiler üzerine geldiklerinde marka adınızı, açıklamanızı ve web sitenize giden bağlantıyı görür." },
      { q: "Mobil cihazlarda harita nasıl görünür?", a: "Harita mobil cihazlarda da tam olarak görüntülenir. Mobil kullanıcılar parmakla zoom yapabilir ve kaydırabilir. Piksel seçimi mobil panelden yapılabilir." },
      { q: "SEO açısından bir faydası var mı?", a: "Evet. Piksel alanınızda web sitenize link verilir. Bu, web sitenize ek bir backlink sağlar ve SEO değerine katkıda bulunur." },
      { q: "Harita dolduğunda ne olur?", a: "Tüm pikseller satıldığında yeni alan satışı durur. Bu nedenle erken satın almak hem daha iyi konum hem de daha iyi fiyat anlamına gelir." },
    ],
  },
  {
    category: "Referans Programı",
    items: [
      { q: "Referans programı nedir?", a: "Pikselduvari.com'u başkalarına tavsiye ederek para kazanabilirsiniz. Her başarılı yönlendirme için satış tutarının %10'u hesabınıza eklenir." },
      { q: "Referans programına nasıl katılırım?", a: "WhatsApp hattımızdan veya info@pikselduvari.com adresinden başvurabilirsiniz. Size özel referans kodu oluşturulur." },
      { q: "Kazancımı nasıl alırım?", a: "Biriken referans kazançlarınızı banka havalesi veya EFT ile alabilirsiniz. Minimum çekim tutarı 100₺'dir." },
    ],
  },
  {
    category: "İletişim & Destek",
    items: [
      { q: "Sorunum olursa kime başvurabilirim?", a: "WhatsApp hattımız (+90 555 166 33 80) ve e-posta adresimiz (info@pikselduvari.com) üzerinden bize ulaşabilirsiniz. Çalışma saatlerimiz 09:00-18:00 (hafta içi)." },
      { q: "Destek ne kadar sürede yanıt verir?", a: "WhatsApp mesajlarına genellikle 1 saat içinde, e-postalara ise 24 saat içinde yanıt veriyoruz." },
      { q: "Reklam ortaklığı teklif edebilir miyim?", a: "Evet, reklam ortaklığı ve kurumsal işbirliği teklifleri için info@pikselduvari.com adresine yazabilirsiniz." },
    ],
  },
];

export default function SSSPage() {
  const allFaqs = faqs.flatMap((s) => s.items);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-xs font-bold">PD</div>
          <span className="font-bold">Piksel Duvarı</span>
        </Link>
        <Link href="/" className="text-gray-400 hover:text-white text-sm transition">← Ana Sayfa</Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: "SSS" }]} />

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-3">Sık Sorulan Sorular</h1>
          <p className="text-gray-400">Piksel Duvarı hakkında merak ettiğiniz her şeyin yanıtı burada. {faqs.reduce((a, s) => a + s.items.length, 0)} soru ve cevap.</p>
        </div>

        {/* Kategori atlama linkleri */}
        <div className="flex flex-wrap gap-2 mb-10">
          {faqs.map((s) => (
            <a key={s.category} href={`#${s.category}`} className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded-full transition">
              {s.category}
            </a>
          ))}
        </div>

        {faqs.map((section) => (
          <div key={section.category} id={section.category} className="mb-10 scroll-mt-6">
            <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="w-4 h-0.5 bg-indigo-600" />
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <details key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group">
                  <summary className="px-5 py-4 font-semibold cursor-pointer hover:bg-gray-800/50 transition flex items-center justify-between">
                    <span>{item.q}</span>
                    <span className="text-gray-600 group-open:rotate-180 transition-transform text-lg shrink-0 ml-2">↓</span>
                  </summary>
                  <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-3">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm mb-4">Sorunuzu burada bulamadınız mı?</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="https://wa.me/905551663380" target="_blank" rel="noopener noreferrer" className="bg-green-700 hover:bg-green-600 transition px-5 py-2.5 rounded-xl text-sm font-semibold">WhatsApp ile Sor</a>
            <Link href="/iletisim" className="bg-gray-700 hover:bg-gray-600 transition px-5 py-2.5 rounded-xl text-sm font-semibold">İletişim Formu</Link>
          </div>
        </div>

        {/* İlgili İçerikler */}
        <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Daha Fazla Bilgi</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/haberler/piksel-reklamlarin-avantajlari", label: "📖 Piksel Reklamların Avantajları" },
              { href: "/haberler/dijital-reklam-maliyetleri-karsilastirma", label: "💰 Reklam Maliyet Karşılaştırması" },
              { href: "/basari-hikayeleri", label: "🏆 Başarı Hikayeleri" },
              { href: "/referans", label: "🤝 Referans Programı" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="bg-gray-800 hover:bg-gray-700 transition rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Şehir Sayfaları */}
        <div className="mt-6 bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Şehrine Göre Piksel Reklam</p>
          <div className="flex flex-wrap gap-2">
            {[
              { slug: "istanbul", name: "İstanbul" },
              { slug: "ankara", name: "Ankara" },
              { slug: "izmir", name: "İzmir" },
              { slug: "antalya", name: "Antalya" },
              { slug: "bursa", name: "Bursa" },
              { slug: "gaziantep", name: "Gaziantep" },
            ].map((c) => (
              <Link key={c.slug} href={`/sehir/${c.slug}`} className="text-xs bg-gray-800 hover:bg-indigo-900/50 hover:text-indigo-300 text-gray-400 px-3 py-1.5 rounded-full transition">
                {c.name}
              </Link>
            ))}
            <Link href="/sehirler" className="text-xs bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/60 px-3 py-1.5 rounded-full transition">
              Tüm Şehirler →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
