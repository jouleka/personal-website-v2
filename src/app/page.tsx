import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import AboutSection from '@/components/about-section';
import ExpertiseAndWorkSection from '@/components/experience-section';
import PortfolioSection from '@/components/portfolio-section';
import ContactSection from '@/components/contact-section';

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
