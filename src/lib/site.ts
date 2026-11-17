// Shared facts about the site and its owner. Kept dependency-free so the
// Node test runner can import it directly.

export const SITE_URL = "https://jurgenleka.com";
export const SITE_NAME = "Jurgen Leka";
export const SITE_TITLE = "Jurgen Leka — Software Engineer & Builder";
export const SITE_DESCRIPTION =
  "Software engineer with six years of shipping web, mobile and developer tools in React, Next.js, Angular and Swift. Owner of frontend architecture, migrations and release days. Maker of MySigner and too many side projects.";
export const SOCIAL_DESCRIPTION =
  "Six years of turning coffee into web apps, mobile apps and dev tools. Come play with the shipping machine.";
export const SOCIAL_IMAGE = {
  url: "/social-preview.png?v=jl2",
  width: 1200,
  height: 630,
  alt: "Jurgen Leka — Code. Ship. Repeat.",
} as const;
export const TWITTER_HANDLE = "@jou_leka";
export const CONTACT_EMAIL = "lekacoding@gmail.com";

export const socialProfiles = [
  { label: "GitHub", href: "https://github.com/jouleka", color: "ink" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jurgen-leka-31470119a/", color: "sky" },
  { label: "X", href: "https://x.com/jou_leka", color: "paper" },
  { label: "Instagram", href: "https://www.instagram.com/jou_leka/", color: "bubble" },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

// JSON.stringify does not escape "<", so a "</script>" inside a value could
// end the tag early. Escaping it keeps inline JSON-LD inert.
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
