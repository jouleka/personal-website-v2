import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif, DM_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import "./editorial-motion.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eeece2",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Jurgen Leka",
    default: "Jurgen Leka — Product Engineer & Builder",
  },
  description:
    "Product engineer building enterprise web platforms, native iOS apps, developer tools, and carefully bounded AI systems. Creator of MySigner.",
  keywords: [
    "Product Engineer",
    "Full Stack Developer",
    "Angular",
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
        url: "/social-preview.png?v=jl1",
        width: 1200,
        height: 630,
        alt: "Jurgen Leka — Code. Ship. Repeat.",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "Jurgen Leka",
    title: "Jurgen Leka — Product Engineer & Builder",
    description:
      "Enterprise web platforms, native iOS apps, developer tools, and carefully bounded AI systems.",
  },
  twitter: {
    images: ["/social-preview.png?v=jl1"],
    card: "summary_large_image",
    creator: "@jou_leka",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg?v=jl1", type: "image/svg+xml" },
      { url: "/favicon-32x32.png?v=jl1", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico?v=jl1", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png?v=jl1",
  },
  manifest: "/site.webmanifest?v=jl1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
