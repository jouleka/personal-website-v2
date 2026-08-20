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
  variable: '--font-playfair-display',
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
    default: 'Jurgen Leka — Product Engineer & Builder',
  },
  description: 'Product engineer building enterprise web platforms, native iOS apps, developer tools, and carefully bounded AI systems. Creator of MySigner.',
  keywords: ['Product Engineer', 'Full Stack Developer', 'Angular', 'TypeScript', 'Swift', 'Python', 'Rust', 'React Native', 'Ruby on Rails', 'Developer Tools'],
  authors: [{ name: 'Jurgen Leka' }],
  creator: 'Jurgen Leka',
  metadataBase: new URL('https://jurgenleka.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Jurgen Leka',
    title: 'Jurgen Leka — Product Engineer & Builder',
    description: 'Enterprise web platforms, native iOS apps, developer tools, and carefully bounded AI systems.',
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
      <body className={`${inter.className} ${playfair.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
