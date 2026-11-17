import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Every crawler, including AI search and assistant crawlers, may read the
// portfolio. Only the contact API is excluded: it accepts POSTs, not pages.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
