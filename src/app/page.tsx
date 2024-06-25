import Header from "@/components/header/header";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      {/* Other sections will go here */}
    </div>
  );
}