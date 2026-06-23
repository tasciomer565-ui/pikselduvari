import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nasıl Çalışır? — Piksel Duvarı",
  description: "Piksel Duvarı nasıl çalışır? Adım adım piksel satın alma rehberi ve sık sorulan sorular.",
};

const steps = [
  {
    num: "01",
    icon: "🗺️",
    title: "Şehrini ve Alanı Seç",
    desc: "Ana sayfadaki piksel haritasını açın. Türkiye'nin şehirlerine göre renk kodlu bölgelerden birini seçin. Farenizi sürükleyerek istediğiniz boyutta alan seçin. Ne kadar büyük alan, o kadar dikkat çekici reklam.",
  },
  {
    num: "02",
    icon: "💳",
    title: "Bilgilerini Gir",
    desc: "Seçilen alan için ad/marka adınızı, web sitenizin URL'ini ve piksel üzerine gelince görünecek tooltip metnini girin. Tüm bilgileri doğru girdiğinizden emin olun.",
  },
  {
    num: "03",
    icon: "💰",
    title: "Güvenli Ödeme Yap",
    desc: "Piksel fiyatı seçtiğiniz alana göre otomatik hesaplanır: 1 piksel = 1₺. Güvenli ödeme altyapımız ile kredi kartı veya diğer ödeme yöntemleriyle tek seferlik ödeme yapın.",
  },
  {
    num: "04",
    icon: "🖼️",
    title: "Logo veya Görsel Yükle",
    desc: "Ödeme tamamlandıktan sonra logonuzu veya görselinizi yükleyin. PNG, JPG, WebP veya SVG formatında, maksimum 2MB boyutunda dosya yükleyebilirsiniz.",
  },
  {
    num: "05",
    icon: "✅",
    title: "Admin Onayı",
    desc: "Yüklediğiniz görsel ekibimiz tarafından incelenir. Uygunsuz içerik barındırmayan görseller kısa sürede onaylanır. Onay durumu hakkında bilgilendirme yapılır.",
  },
  {
    num: "06",
    icon: "♾️",
    title: "Sonsuza Kadar Görün",
    desc: "Onaylanan piksel alanınız duvarda yayına girer. Ziyaretçiler logonuzun üzerine geldiğinde bilgilerinizi görür, tıkladığında web sitenize yönlendirilir. Tek ödeme, sonsuz görünürlük.",
  },
];

const faqs = [
  {
    q: "Piksel alanım gerçekten sonsuza kadar kalır mı?",
    a: "Evet. Piksel Duvarı platformu aktif kaldığı sürece piksel alanınız silinmez. Bu model 'bir kez öde, sonsuza kadar kal' prensibine dayanmaktadır.",
  },
  {
    q: "En küçük alan boyutu nedir?",
    a: "En küçük alan 10×10 piksel olup fiyatı 100₺'dir. İstediğiniz boyutta alan seçebilirsiniz; fiyat seçilen piksel sayısına göre hesaplanır (1 piksel = 1₺).",
  },
  {
    q: "Görsel yüklemek zorunlu mu?",
    a: "Hayır, ödeme sonrası görsel yüklemeden de alan sahiplenebilirsiniz. Ancak görsel yüklenene kadar alanınız beyaz blok olarak görünecektir.",
  },
  {
    q: "Hangi formatlarda görsel yükleyebilirim?",
    a: "PNG, JPG, WebP ve SVG formatlarında görsel yükleyebilirsiniz. Maksimum dosya boyutu 2MB'dır.",
  },
  {
    q: "Şehirimi seçemiyorum, neden?",
    a: "Piksel haritasındaki renkli bölgeler şehirlere karşılık gelmektedir. Herhangi bir bölgeden alan seçebilirsiniz; şehir kısıtlaması yoktur.",
  },
  {
    q: "Ödeme sonrası görselim reddedilirse ne olur?",
    a: "Görsel reddi durumunda sizinle iletişime geçilir. Uygun bir görsel ile tekrar başvurabilirsiniz. Gerekli durumlarda iade değerlendirmesi yapılır.",
  },
];

export default function NasilCalisirPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <a href="/" className="text-indigo-400 hover:text-indigo-300 text-sm mb-8 inline-block">
          ← Ana Sayfaya Dön
        </a>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Nasıl Çalışır?</h1>
          <p className="text-xl text-gray-400">
            Piksel Duvarı&apos;nda yer almak 6 adımda tamamlanır.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-20">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex gap-5"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-indigo-950 border border-indigo-800 rounded-xl flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
              </div>
              <div>
                <div className="text-xs text-indigo-400 font-bold mb-1">ADIM {step.num}</div>
                <h2 className="text-lg font-semibold mb-2">{step.title}</h2>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Sık Sorulan Sorular</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <h3 className="font-semibold mb-2 text-white">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-indigo-950 to-purple-950 rounded-3xl border border-indigo-800/50 p-10">
          <h2 className="text-2xl font-bold mb-3">Hemen Yerinizi Alın</h2>
          <p className="text-gray-400 mb-6">
            Türkiye genelinde milyonlarca kullanıcıya ulaşın.
          </p>
          <a
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 transition px-8 py-4 rounded-xl font-bold text-lg"
          >
            Piksel Haritasını Aç
          </a>
        </div>
      </div>
    </main>
  );
}
