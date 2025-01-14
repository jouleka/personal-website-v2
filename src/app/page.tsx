import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

const AboutSection = dynamic(() => import('@/components/about-section'), { ssr: false });
const ExpertiseAndWorkSection = dynamic(() => import('@/components/experience-section'), { ssr: false });
const PortfolioSection = dynamic(() => import('@/components/portfolio-section'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/contact-section'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <AboutSection />
      <ExpertiseAndWorkSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
}