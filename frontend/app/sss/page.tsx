import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular (SSS) — Piksel Duvarı",
  description: "Piksel Duvarı hakkında merak ettikleriniz: ödeme, görsel gereksinimleri, alan seçimi ve daha fazlası.",
  alternates: { canonical: "https://pikselduvari.com/sss" },
};

const faqs = [
  {
    category: "Genel",
    items: [
      {
        q: "Piksel Duvarı nedir?",
        a: "Piksel Duvarı, 1.000.000 piksellik bir Türkiye haritası üzerinde işletmelerin kalıcı reklam alanı satın alabildiği bir platformdur. Her piksel 1₺ değerindedir.",
      },
      {
        q: "Alan gerçekten sonsuza kadar mı kalır?",
        a: "Evet. Piksel Duvarı platformu hizmet verdiği sürece alanınız kaldırılmaz. Bu tek seferlik ödeme, kalıcı görünürlük modelidir.",
      },
      {
        q: "Türkiye'nin herhangi bir şehrinde alan alabilir miyim?",
        a: "Evet. Haritamız 16 büyük bölgeye ayrılmıştır ve Trakya'dan Güneydoğu'ya kadar tüm Türkiye'yi kapsar. Dilediğiniz bölgeden alan seçebilirsiniz.",
      },
    ],
  },
  {
    category: "Ödeme",
    items: [
      {
        q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        a: "Kredi kartı, banka kartı ve sanal kart ile ödeme yapabilirsiniz. Tüm ödemeler PayTR altyapısı üzerinden 3D Secure ile güvenli şekilde işlenir.",
      },
      {
        q: "Aylık ya da yıllık ödeme var mı?",
        a: "Hayır. Piksel Duvarı tamamen tek seferlik ödeme modelidir. Bir kez ödersiniz, alan sonsuza kadar sizin olur.",
      },
      {
        q: "Para iadesi mümkün mü?",
        a: "Evet. Görseliniz yüklenip yayına girmeden önce 30 gün içinde talep etmeniz halinde tam iade yapılır.",
      },
      {
        q: "Fatura alabilir miyim?",
        a: "Evet, ödeme sonrası e-posta adresinize fatura gönderilir. Kurumsal fatura için info@pikselduvari.com adresine yazabilirsiniz.",
      },
    ],
  },
  {
    category: "Görsel Gereksinimleri",
    items: [
      {
        q: "Ne tür görseller yükleyebilirim?",
        a: "PNG, JPG veya GIF formatında görseller yükleyebilirsiniz. Logonuz, ürün görseliniz veya marka renginiz olabilir. Animasyonlu GIF'ler de desteklenir.",
      },
      {
        q: "Minimum görsel boyutu nedir?",
        a: "Seçtiğiniz alanın boyutuyla eşleşen bir görsel yüklemeniz önerilir. Örneğin 50×50 piksel alan için en az 50×50 piksel görsel kullanın.",
      },
      {
        q: "Hangi içerikler yasaktır?",
        a: "Yetişkin içerik, siyasi içerik, yanıltıcı reklamlar, telif hakkı ihlali içeren görseller ve yasadışı ürün/hizmet reklamları kesinlikle yasaktır.",
      },
      {
        q: "Görselimi sonradan değiştirebilir miyim?",
        a: "Evet. Alan size ait olduğu sürece görselinizi güncelleyebilirsiniz. Her güncelleme admin onayına tabidir.",
      },
    ],
  },
  {
    category: "Teknik",
    items: [
      {
        q: "En küçük satın alınabilecek alan nedir?",
        a: "En küçük alan 10×10 piksel = 100₺'dir. Daha küçük alan satışı yapılmamaktadır.",
      },
      {
        q: "Koordinat sistemi nasıl çalışır?",
        a: "Harita 1000×1000 piksel boyutundadır. Sol üst köşe (0,0), sağ alt köşe ise (1000,1000) koordinatına karşılık gelir.",
      },
      {
        q: "Bir bölgede birden fazla alan alabilir miyim?",
        a: "Evet, birden fazla alan satın alabilirsiniz. Ancak aynı koordinata iki farklı alan yüklenemez.",
      },
      {
        q: "Reklam alanım ne kadar sürede yayına girer?",
        a: "Ödeme ve görsel yüklemesinin ardından admin ekibimiz 24 saat içinde inceleyip onaylar. Onaylandıktan sonra anında yayına girer.",
      },
    ],
  },
  {
    category: "İletişim",
    items: [
      {
        q: "Sorunum olursa kime başvurabilirim?",
        a: "WhatsApp hattımız (+90 555 166 33 80) ve e-posta adresimiz (info@pikselduvari.com) üzerinden bize ulaşabilirsiniz. Çalışma saatlerimiz 09:00-18:00 (hafta içi).",
      },
      {
        q: "Toplu satın alım için özel fiyat var mı?",
        a: "Evet. 10.000 piksel ve üzeri satın alımlarda özel indirim uyguluyoruz. Detaylar için info@pikselduvari.com adresine yazın.",
      },
    ],
  },
];

export default function SSSPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
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
          <p className="text-gray-400">Piksel Duvarı hakkında merak ettiğiniz her şeyin yanıtı burada.</p>
        </div>

        {faqs.map((section) => (
          <div key={section.category} className="mb-10">
            <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="w-4 h-0.5 bg-indigo-600" />
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <details
                  key={i}
                  className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group"
                >
                  <summary className="px-5 py-4 font-semibold cursor-pointer hover:bg-gray-800/50 transition flex items-center justify-between">
                    <span>{item.q}</span>
                    <span className="text-gray-600 group-open:rotate-180 transition-transform text-lg shrink-0 ml-2">↓</span>
                  </summary>
                  <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-3">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm mb-4">Sorunuzu burada bulamadınız mı?</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="https://wa.me/905551663380"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 hover:bg-green-600 transition px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              WhatsApp ile Sor
            </a>
            <a
              href="/iletisim"
              className="bg-gray-700 hover:bg-gray-600 transition px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              İletişim Formu
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
