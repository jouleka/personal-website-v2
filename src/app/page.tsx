"use client";

import { useMemo } from 'react';
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import ExpertiseAndWorkSection from "@/components/experience-section";
import Header from "@/components/header";
import Hero from "@/components/hero";
import PortfolioSection from "@/components/portfolio-section";

export default function Home() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

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