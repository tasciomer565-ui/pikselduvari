import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Piksel Duvarı",
    short_name: "PikselDuvarı",
    description: "Türkiye'nin dijital piksel reklam duvarı. 1.000.000 piksellik haritada logonuzu sergileyin.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#4f46e5",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["business", "shopping"],
    lang: "tr",
  };
}
