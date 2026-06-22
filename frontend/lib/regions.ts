export interface Region {
  id: string;
  name: string;
  subtitle: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  textColor?: string;
}

// 4 yatay şerit, her biri tam 1000px genişlik
// Şerit 1: y:0-200   (Kuzey)
// Şerit 2: y:200-500 (Orta-Batı ve Orta)
// Şerit 3: y:500-700 (Orta-Güney)
// Şerit 4: y:700-1000 (Güney)

export const REGIONS: Region[] = [
  // ─── Şerit 1: Kuzey (y:0–200, h:200) ───────────────────────────
  {
    id: "trakya",
    name: "Trakya",
    subtitle: "Edirne · Tekirdağ · Kırklareli",
    x: 0, y: 0, w: 100, h: 200,
    color: "#1e3a5f",
  },
  {
    id: "istanbul",
    name: "İstanbul",
    subtitle: "Türkiye'nin kalbi · 15M+ nüfus",
    x: 100, y: 0, w: 300, h: 200,
    color: "#3b0764",
  },
  {
    id: "kocaeli-bursa",
    name: "Kocaeli & Bursa",
    subtitle: "Marmara · Sanayi Merkezi",
    x: 400, y: 0, w: 200, h: 200,
    color: "#1e3a8a",
  },
  {
    id: "karadeniz",
    name: "Karadeniz",
    subtitle: "Zonguldak · Samsun · Ordu · Giresun",
    x: 600, y: 0, w: 250, h: 200,
    color: "#14532d",
  },
  {
    id: "dogu-karadeniz",
    name: "Doğu Karadeniz",
    subtitle: "Trabzon · Rize · Artvin",
    x: 850, y: 0, w: 150, h: 200,
    color: "#166534",
  },

  // ─── Şerit 2: Orta (y:200–500, h:300) ──────────────────────────
  {
    id: "izmir",
    name: "İzmir",
    subtitle: "Ege'nin başkenti · 4M+ nüfus",
    x: 0, y: 200, w: 200, h: 300,
    color: "#1e40af",
  },
  {
    id: "ankara",
    name: "Ankara",
    subtitle: "Başkent · İç Anadolu",
    x: 200, y: 200, w: 300, h: 300,
    color: "#7f1d1d",
  },
  {
    id: "kayseri-sivas",
    name: "Kayseri & Sivas",
    subtitle: "Orta Anadolu · Sivas · Tokat · Yozgat",
    x: 500, y: 200, w: 200, h: 300,
    color: "#78350f",
  },
  {
    id: "erzurum-dogu",
    name: "Erzurum & Doğu",
    subtitle: "Erzurum · Ağrı · Kars · Ardahan",
    x: 700, y: 200, w: 300, h: 300,
    color: "#431407",
  },

  // ─── Şerit 3: Güney-Orta (y:500–700, h:200) ────────────────────
  {
    id: "mugla-ege",
    name: "Muğla & Ege",
    subtitle: "Muğla · Denizli · Afyon · Uşak",
    x: 0, y: 500, w: 200, h: 200,
    color: "#164e63",
  },
  {
    id: "konya",
    name: "Konya & İç Anadolu",
    subtitle: "Konya · Eskişehir · Aksaray · Karaman",
    x: 200, y: 500, w: 300, h: 200,
    color: "#9f1239",
  },
  {
    id: "malatya-diyarbakir",
    name: "Malatya & Diyarbakır",
    subtitle: "Malatya · Elazığ · Diyarbakır · Batman",
    x: 500, y: 500, w: 200, h: 200,
    color: "#92400e",
  },
  {
    id: "van-hakkari",
    name: "Van & Güneydoğu Doğu",
    subtitle: "Van · Muş · Bitlis · Hakkari · Şırnak",
    x: 700, y: 500, w: 300, h: 200,
    color: "#713f12",
  },

  // ─── Şerit 4: Güney (y:700–1000, h:300) ────────────────────────
  {
    id: "antalya",
    name: "Antalya & Akdeniz Batı",
    subtitle: "Antalya · Isparta · Burdur",
    x: 0, y: 700, w: 300, h: 300,
    color: "#0c4a6e",
  },
  {
    id: "adana-mersin",
    name: "Adana & Mersin",
    subtitle: "Adana · Mersin · Hatay · Osmaniye",
    x: 300, y: 700, w: 200, h: 300,
    color: "#0f4c75",
  },
  {
    id: "gaziantep-sanliurfa",
    name: "Gaziantep & Şanlıurfa",
    subtitle: "Gaziantep · Şanlıurfa · K.Maraş · Mardin · Siirt",
    x: 500, y: 700, w: 500, h: 300,
    color: "#1c1917",
  },
];

export function getRegionAt(x: number, y: number): Region | null {
  return REGIONS.find(r => x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h) ?? null;
}
