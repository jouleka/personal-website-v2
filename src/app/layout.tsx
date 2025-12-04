import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#12100e' },
  ],
};

export const metadata: Metadata = {
  title: {
    template: '%s | Jurgen Leka',
    default: 'Jurgen Leka - Full Stack JavaScript Developer',
  },
  description: 'Full Stack JavaScript Developer specializing in Angular, TypeScript, and React. Building scalable web applications with clean architecture.',
  keywords: ['JavaScript', 'TypeScript', 'Angular', 'React', 'Full Stack Developer', 'Web Developer'],
  authors: [{ name: 'Jurgen Leka' }],
  creator: 'Jurgen Leka',
  metadataBase: new URL('https://jurgenleka.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Jurgen Leka',
    title: 'Jurgen Leka - Full Stack JavaScript Developer',
    description: 'Full Stack JavaScript Developer specializing in Angular, TypeScript, and React.',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@jou_leka',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.className} ${playfair.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
