import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";

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
  title: {
    template: "%s | Jurgen Leka",
    default: "Jurgen Leka — Software Engineer & Builder",
  },
  description:
    "Software engineer with six years of shipping web, mobile and developer tools in React, Next.js, Angular and Swift. Owner of frontend architecture, migrations and release days. Maker of MySigner and too many side projects.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
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
  authors: [{ name: "Jurgen Leka" }],
  creator: "Jurgen Leka",
  metadataBase: new URL("https://jurgenleka.com"),
  openGraph: {
    images: [
      {
        url: "/social-preview.png?v=jl2",
        width: 1200,
        height: 630,
        alt: "Jurgen Leka — Code. Ship. Repeat.",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "Jurgen Leka",
    title: "Jurgen Leka — Software Engineer & Builder",
    description:
      "Six years of turning coffee into web apps, mobile apps and dev tools. Come play with the shipping machine.",
  },
  twitter: {
    images: ["/social-preview.png?v=jl2"],
    card: "summary_large_image",
    creator: "@jou_leka",
  },
  robots: {
    index: true,
    follow: true,
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
