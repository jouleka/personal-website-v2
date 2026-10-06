import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import AboutSection from "@/components/about-section";
import ExpertiseAndWorkSection from "@/components/experience-section";
import PortfolioSection from "@/components/portfolio-section";
import ContactSection from "@/components/contact-section";
import { MotionSystem } from "@/components/motion-system";

export default function Home() {
  return (
    <MotionSystem>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <PortfolioSection />
        <AboutSection />
        <ExpertiseAndWorkSection />
        <ContactSection />
      </main>
      <Footer />
    </MotionSystem>
  );
}
