import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// The portfolio is a single page. /buzzfetti-test is an unlisted, noindex test
// page and /api/* is not content, so neither is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/resume.pdf"), lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
