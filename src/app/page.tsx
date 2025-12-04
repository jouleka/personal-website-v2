import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

// Skeleton loader for below-fold sections
const SectionSkeleton = () => (
  <div className="py-32 animate-pulse">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="h-4 w-24 bg-muted rounded mb-4" />
        <div className="h-12 w-72 bg-muted rounded mb-8" />
        <div className="h-4 w-full max-w-md bg-muted rounded mb-2" />
        <div className="h-4 w-3/4 max-w-md bg-muted rounded" />
      </div>
    </div>
  </div>
);

// Dynamic imports for below-fold content - loaded after initial paint
const AboutSection = dynamic(() => import('@/components/about-section'), { 
  ssr: false,
  loading: () => <SectionSkeleton />
});

const ExpertiseAndWorkSection = dynamic(() => import('@/components/experience-section'), { 
  ssr: false,
  loading: () => <SectionSkeleton />
});

const PortfolioSection = dynamic(() => import('@/components/portfolio-section'), { 
  ssr: false,
  loading: () => <SectionSkeleton />
});

const ContactSection = dynamic(() => import('@/components/contact-section'), { 
  ssr: false,
  loading: () => <SectionSkeleton />
});

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
