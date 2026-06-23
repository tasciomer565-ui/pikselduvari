import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Piksel Duvarı — Türkiye'nin Dijital Reklam Duvarı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #030712 0%, #0f172a 50%, #1e1b4b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Pixel blocks top-left */}
        <div style={{ position: "absolute", top: 40, left: 60, display: "flex", gap: 8 }}>
          {["#4f46e5","#7c3aed","#2563eb","#059669","#d97706","#dc2626"].map((c, i) => (
            <div key={i} style={{ width: 24, height: 24, background: c, borderRadius: 4, opacity: 0.8 }} />
          ))}
        </div>
        {/* Pixel blocks bottom-right */}
        <div style={{ position: "absolute", bottom: 40, right: 60, display: "flex", gap: 8 }}>
          {["#dc2626","#d97706","#059669","#2563eb","#7c3aed","#4f46e5"].map((c, i) => (
            <div key={i} style={{ width: 24, height: 24, background: c, borderRadius: 4, opacity: 0.8 }} />
          ))}
        </div>

        {/* Logo */}
        <div
          style={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 900,
            color: "white",
            marginBottom: 32,
            boxShadow: "0 0 40px rgba(99,102,241,0.5)",
          }}
        >
          PD
        </div>

        {/* Title */}
        <div style={{ fontSize: 54, fontWeight: 900, color: "white", textAlign: "center", marginBottom: 16, lineHeight: 1.1 }}>
          Piksel Duvari
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 26, color: "#a5b4fc", textAlign: "center", marginBottom: 40, fontWeight: 500 }}>
          Turkiye nin Dijital Reklam Duvari
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 32, marginBottom: 40 }}>
          {[
            { value: "1.000.000", label: "Piksel" },
            { value: "81", label: "Il" },
            { value: "1TL", label: "Piksel Basi" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: 16,
                padding: "16px 28px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 900, color: "#c4b5fd" }}>{s.value}</div>
              <div style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* URL pill */}
        <div
          style={{
            background: "rgba(99,102,241,0.2)",
            border: "1px solid rgba(99,102,241,0.4)",
            borderRadius: 100,
            padding: "10px 28px",
            fontSize: 18,
            color: "#a5b4fc",
            fontWeight: 600,
          }}
        >
          pikselduvari.com
        </div>
      </div>
    ),
    { ...size }
  );
}
