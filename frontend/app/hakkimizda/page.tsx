import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda — Piksel Duvarı",
  description: "Piksel Duvarı'nın hikayesi, misyonu ve ekibi hakkında bilgi edinin.",
  alternates: { canonical: "https://pikselduvari.com/hakkimizda" },
};

export default function HakkimizdaPage() {
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
        <Breadcrumb items={[{ label: "Hakkımızda" }]} />

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-4xl font-extrabold mx-auto mb-6">PD</div>
          <h1 className="text-4xl font-extrabold mb-4">Piksel Duvarı Hakkında</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Türkiye&apos;nin dijital reklamcılık dünyasına yeni bir boyut kazandırmak için yola çıktık.
            Her piksel, bir markanın sonsuza taşınan sesi.
          </p>
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <div className="text-3xl mb-4">🎯</div>
            <h2 className="text-xl font-bold mb-3">Misyonumuz</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              KOBİ'lerden büyük markalara kadar her işletmenin, büyük reklam bütçelerine ihtiyaç duymadan
              kalıcı dijital görünürlük elde edebileceği demokratik bir platform oluşturmak.
              1 piksel = 1₺ modeliyle her bütçeye uygun, eşit fırsat sunuyoruz.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <div className="text-3xl mb-4">🔭</div>
            <h2 className="text-xl font-bold mb-3">Vizyonumuz</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Türkiye&apos;nin en tanınan dijital koleksiyonu olmak. Piksel Duvarı&apos;nın,
              gelecek nesillerin Türkiye iş dünyasının 2020&apos;li yıllardaki dijital izini görebileceği
              bir dijital müze haline gelmesini hedefliyoruz.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Hikayemiz</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              2024 yılında iki girişimci arkadaş, Alex Tew&apos;in 2005&apos;te hayata geçirdiği
              efsanevi &quot;Million Dollar Homepage&quot;den ilham alarak Türkiye&apos;ye özgü bir versiyon
              oluşturmaya karar verdi.
            </p>
            <p>
              Fark şuydu: sadece piksel satmak değil, <strong className="text-white">Türkiye haritasını</strong> şehir
              bazlı bölümlere ayırarak yerel işletmelerin kendi şehirlerinde görünmesini sağlamak.
              İstanbul&apos;daki bir kafe İstanbul bölgesinde, Antalya&apos;daki bir otel Antalya bölgesinde
              yer alabilecekti.
            </p>
            <p>
              2025 yılı başında beta sürümüyle yayına girdik. İlk ay içinde yüzlerce işletme
              haritada yerini aldı. Piksel Duvarı büyümeye devam ediyor.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Ekibimiz</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                name: "Mert Yıldız",
                role: "Kurucu & CEO",
                bio: "10 yıllık yazılım geliştirme ve girişimcilik deneyimiyle Piksel Duvarı'nın teknik mimarisini kurdu. Next.js ve Supabase kullanıcısı.",
                avatar: "MY",
                color: "#4f46e5",
                social: { linkedin: "#", twitter: "#" },
              },
              {
                name: "Selin Arslan",
                role: "Kurucu & CMO",
                bio: "Dijital pazarlama ve büyüme hacklemedeki uzmanlığıyla Piksel Duvarı'nın marka kimliğini ve büyüme stratejisini oluşturdu.",
                avatar: "SA",
                color: "#7c3aed",
                social: { linkedin: "#", twitter: "#" },
              },
            ].map((member) => (
              <div key={member.name} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold text-white shrink-0"
                  style={{ backgroundColor: member.color }}
                >
                  {member.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-indigo-400 text-xs mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "1M", label: "Toplam Piksel" },
              { value: "50+", label: "Memnun Müşteri" },
              { value: "16", label: "Bölge" },
              { value: "24s", label: "Onay Süresi" },
            ].map((s) => (
              <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
                <div className="text-3xl font-extrabold text-indigo-400">{s.value}</div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-gradient-to-br from-indigo-950 to-purple-950 rounded-2xl border border-indigo-800/50 p-8">
          <h2 className="text-xl font-bold mb-2">Birlikte çalışalım</h2>
          <p className="text-gray-400 text-sm mb-6">
            Sorularınız için her zaman buradayız.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/iletisim" className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-2.5 rounded-xl text-sm font-semibold">
              İletişime Geç
            </Link>
            <a href="https://wa.me/905551663380" target="_blank" rel="noopener noreferrer" className="bg-green-700 hover:bg-green-600 transition px-6 py-2.5 rounded-xl text-sm font-semibold">
              WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
