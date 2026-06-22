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
    color: "#2563eb",
  },
  {
    id: "istanbul",
    name: "İstanbul",
    subtitle: "Türkiye'nin kalbi · 15M+ nüfus",
    x: 100, y: 0, w: 300, h: 200,
    color: "#7c3aed",
  },
  {
    id: "kocaeli-bursa",
    name: "Kocaeli & Bursa",
    subtitle: "Marmara · Sanayi Merkezi",
    x: 400, y: 0, w: 200, h: 200,
    color: "#0ea5e9",
  },
  {
    id: "karadeniz",
    name: "Karadeniz",
    subtitle: "Zonguldak · Samsun · Ordu · Giresun",
    x: 600, y: 0, w: 250, h: 200,
    color: "#16a34a",
  },
  {
    id: "dogu-karadeniz",
    name: "Doğu Karadeniz",
    subtitle: "Trabzon · Rize · Artvin",
    x: 850, y: 0, w: 150, h: 200,
    color: "#15803d",
  },

  // ─── Şerit 2: Orta (y:200–500, h:300) ──────────────────────────
  {
    id: "izmir",
    name: "İzmir",
    subtitle: "Ege'nin başkenti · 4M+ nüfus",
    x: 0, y: 200, w: 200, h: 300,
    color: "#3b82f6",
  },
  {
    id: "ankara",
    name: "Ankara",
    subtitle: "Başkent · İç Anadolu",
    x: 200, y: 200, w: 300, h: 300,
    color: "#dc2626",
  },
  {
    id: "kayseri-sivas",
    name: "Kayseri & Sivas",
    subtitle: "Orta Anadolu · Sivas · Tokat · Yozgat",
    x: 500, y: 200, w: 200, h: 300,
    color: "#d97706",
  },
  {
    id: "erzurum-dogu",
    name: "Erzurum & Doğu",
    subtitle: "Erzurum · Ağrı · Kars · Ardahan",
    x: 700, y: 200, w: 300, h: 300,
    color: "#ea580c",
  },

  // ─── Şerit 3: Güney-Orta (y:500–700, h:200) ────────────────────
  {
    id: "mugla-ege",
    name: "Muğla & Ege",
    subtitle: "Muğla · Denizli · Afyon · Uşak",
    x: 0, y: 500, w: 200, h: 200,
    color: "#0891b2",
  },
  {
    id: "konya",
    name: "Konya & İç Anadolu",
    subtitle: "Konya · Eskişehir · Aksaray · Karaman",
    x: 200, y: 500, w: 300, h: 200,
    color: "#e11d48",
  },
  {
    id: "malatya-diyarbakir",
    name: "Malatya & Diyarbakır",
    subtitle: "Malatya · Elazığ · Diyarbakır · Batman",
    x: 500, y: 500, w: 200, h: 200,
    color: "#b45309",
  },
  {
    id: "van-hakkari",
    name: "Van & Güneydoğu Doğu",
    subtitle: "Van · Muş · Bitlis · Hakkari · Şırnak",
    x: 700, y: 500, w: 300, h: 200,
    color: "#c2410c",
  },

  // ─── Şerit 4: Güney (y:700–1000, h:300) ────────────────────────
  {
    id: "antalya",
    name: "Antalya & Akdeniz Batı",
    subtitle: "Antalya · Isparta · Burdur",
    x: 0, y: 700, w: 300, h: 300,
    color: "#0284c7",
  },
  {
    id: "adana-mersin",
    name: "Adana & Mersin",
    subtitle: "Adana · Mersin · Hatay · Osmaniye",
    x: 300, y: 700, w: 200, h: 300,
    color: "#0369a1",
  },
  {
    id: "gaziantep-sanliurfa",
    name: "Gaziantep & Şanlıurfa",
    subtitle: "Gaziantep · Şanlıurfa · K.Maraş · Mardin · Siirt",
    x: 500, y: 700, w: 500, h: 300,
    color: "#6d28d9",
  },
];

export function getRegionAt(x: number, y: number): Region | null {
  return REGIONS.find(r => x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h) ?? null;
}
