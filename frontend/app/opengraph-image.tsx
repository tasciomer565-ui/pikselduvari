import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Piksel Duvarı — Türkiye'nin Dijital Reklam Duvarı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Logo */}
        <div
          style={{
            width: 80,
            height: 80,
            background: "#4f46e5",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 800,
            color: "white",
            marginBottom: 24,
          }}
        >
          PD
        </div>

        <h1
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "white",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Piksel Duvarı
        </h1>

        <p
          style={{
            fontSize: 24,
            color: "#a5b4fc",
            margin: "16px 0 0",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Türkiye&apos;nin Dijital Reklam Duvarı
        </p>

        <p
          style={{
            fontSize: 18,
            color: "#64748b",
            margin: "12px 0 0",
            textAlign: "center",
          }}
        >
          1.000.000 piksellik haritada logonuzu sergileyin · Bir kez öde, sonsuza kadar görün
        </p>

        {/* Pixel grid preview */}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginTop: 32,
          }}
        >
          {["#2563eb", "#7c3aed", "#0ea5e9", "#16a34a", "#dc2626", "#d97706", "#0284c7", "#6d28d9"].map(
            (color, i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  background: color,
                  borderRadius: 4,
                  opacity: 0.8,
                }}
              />
            )
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 14,
            color: "#475569",
          }}
        >
          pikselduvari.com
        </div>
      </div>
    ),
    { ...size }
  );
}
