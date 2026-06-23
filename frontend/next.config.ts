import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/pixels/grid",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=30, stale-while-revalidate=60" },
        ],
      },
      {
        source: "/api/pixels",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=30, stale-while-revalidate=60" },
        ],
      },
    ];
  },
};

export default nextConfig;
