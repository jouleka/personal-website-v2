import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { securityHeaders } from "./security-headers.mjs";

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  async headers() {
    // Development asset URLs are reused; immutable caching hides style updates.
    const security = {
      source: "/:path*",
      headers: Object.entries(securityHeaders(process.env.NODE_ENV !== "production"))
        .map(([key, value]) => ({ key, value })),
    };
    if (process.env.NODE_ENV !== "production") return [security];
    return [
      security,
      // HTML pages - short cache, revalidate
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
          },
        ],
      },
      // Static assets - long cache
      {
        source: "/:path*.(js|css|jpg|jpeg|png|gif|ico|svg|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // API routes - no cache
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
