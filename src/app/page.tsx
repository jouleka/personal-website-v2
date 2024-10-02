import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Hero from '@/components/hero';

const AboutSection = dynamic(() => import('@/components/about-section'), { ssr: false });
const ExpertiseAndWorkSection = dynamic(() => import('@/components/experience-section'), { ssr: false });
const PortfolioSection = dynamic(() => import('@/components/portfolio-section'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/contact-section'), { ssr: false });

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <AboutSection />
      <ExpertiseAndWorkSection />
      <PortfolioSection />
      <ContactSection />

      <div className="mt-12 pt-8 pb-4 border-t border-primary/20 text-center">
        <p className="text-sm text-muted-foreground font-serif">
          &copy; {currentYear} J. Leka. All rights reserved.
        </p>
      </div>
    </div>
  );
}