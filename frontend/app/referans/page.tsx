import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referans Programı — Piksel Duvarı",
  description: "Piksel Duvarı referans programına katılın. Arkadaşınızı davet edin, %10 komisyon kazanın.",
};

export default function ReferansPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950/90 backdrop-blur-md z-50">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">PD</div>
          <span className="font-bold text-lg">Piksel Duvarı</span>
        </a>
        <a href="/" className="text-gray-400 hover:text-white text-sm transition">← Ana Sayfa</a>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🤝</div>
          <h1 className="text-4xl font-extrabold mb-4">Referans Programı</h1>
          <p className="text-xl text-gray-400">Arkadaşlarınızı davet edin, her satıştan <strong className="text-green-400">%10 komisyon</strong> kazanın!</p>
        </div>

        {/* How it works */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { step: "1", icon: "🔗", title: "Referans Linki Al", desc: "Bize WhatsApp veya e-posta ile ulaşın. Size özel referans kodunuzu oluşturalım." },
            { step: "2", icon: "📢", title: "Paylaşın", desc: "Referans linkinizi sosyal medya, WhatsApp veya e-posta yoluyla arkadaşlarınızla paylaşın." },
            { step: "3", icon: "💰", title: "Komisyon Kazanın", desc: "Her başarılı satıştan %10 komisyon hesabınıza yatırılır. Sınır yok!" },
          ].map((item) => (
            <div key={item.step} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-xs text-indigo-400 font-bold mb-1">ADIM {item.step}</div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Earnings table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-10">
          <h2 className="font-bold text-lg mb-4">💵 Örnek Kazanç Tablosu</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="pb-3 text-left text-gray-400">Arkadaşınızın Alımı</th>
                  <th className="pb-3 text-right text-gray-400">Satış Tutarı</th>
                  <th className="pb-3 text-right text-green-400">Komisyonunuz (%10)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {[
                  { name: "10×10 piksel", price: "100₺", commission: "10₺" },
                  { name: "50×50 piksel", price: "2.500₺", commission: "250₺" },
                  { name: "100×100 piksel", price: "10.000₺", commission: "1.000₺" },
                  { name: "200×200 piksel", price: "40.000₺", commission: "4.000₺" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="py-3 text-gray-300">{row.name}</td>
                    <td className="py-3 text-right text-gray-400">{row.price}</td>
                    <td className="py-3 text-right font-bold text-green-400">{row.commission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-10">
          <h2 className="font-bold mb-4">📋 Program Koşulları</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><span className="text-green-400">✓</span> Her başarılı satıştan %10 komisyon</li>
            <li className="flex gap-2"><span className="text-green-400">✓</span> Komisyon, ödeme tamamlandıktan sonra 3 iş günü içinde aktarılır</li>
            <li className="flex gap-2"><span className="text-green-400">✓</span> Minimum çekim tutarı: 100₺</li>
            <li className="flex gap-2"><span className="text-green-400">✓</span> Havale / EFT veya kripto ile ödeme</li>
            <li className="flex gap-2"><span className="text-gray-500">•</span> Kendi alımlarınız komisyon programına dahil değildir</li>
            <li className="flex gap-2"><span className="text-gray-500">•</span> Program koşulları önceden bildirimle değiştirilebilir</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-indigo-950 to-purple-950 rounded-2xl border border-indigo-800/40 p-8">
          <h3 className="text-2xl font-bold mb-2">Hemen Başla!</h3>
          <p className="text-gray-400 text-sm mb-6">Referans kodunuzu almak için bize ulaşın.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://wa.me/905551663380?text=Referans%20programına%20katılmak%20istiyorum"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 transition px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2"
            >
              WhatsApp ile Başvur
            </a>
            <a
              href="mailto:info@pikselduvari.com?subject=Referans Programı Başvurusu"
              className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white transition px-6 py-3 rounded-xl font-semibold text-sm"
            >
              E-posta Gönder
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
