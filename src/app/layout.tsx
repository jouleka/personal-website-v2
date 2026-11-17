import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_DESCRIPTION,
  SOCIAL_IMAGE,
  TWITTER_HANDLE,
} from "@/lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  fallback: ["system-ui", "sans-serif"],
});

const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-hand",
  fallback: ["cursive"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f1e3",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Jurgen Leka",
    default: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Jurgen Leka",
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Angular",
    "React",
    "Next.js",
    "Ionic",
    "TypeScript",
    "Swift",
    "Python",
    "Rust",
    "React Native",
    "Ruby on Rails",
    "Developer Tools",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  // Defaults for any route that does not set its own; pages pass complete
  // objects through pageMetadata() because nested metadata is not deep-merged.
  openGraph: {
    images: [SOCIAL_IMAGE],
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
  },
  twitter: {
    images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg?v=jl2", type: "image/svg+xml" },
      { url: "/favicon-32x32.png?v=jl2", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico?v=jl2", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png?v=jl2",
  },
  manifest: "/site.webmanifest?v=jl2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${hand.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
