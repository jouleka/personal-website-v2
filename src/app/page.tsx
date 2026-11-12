import Header from "@/components/sketch/header";
import Hero from "@/components/sketch/hero";
import Work from "@/components/sketch/work";
import About from "@/components/sketch/about";
import Journey from "@/components/sketch/journey";
import Contact from "@/components/sketch/contact";
import Footer from "@/components/sketch/footer";
import DoodlePad from "@/components/sketch/doodle-pad";
import SmoothScroll from "@/components/sketch/smooth-scroll";
import { SketchDefs } from "@/components/sketch/sketch-defs";

const tape = ["LESS TALK", "MORE SHIPPING", "CODE", "SHIP", "REPEAT", "ONE MORE SIDE PROJECT"];

function TapeStrip() {
  return (
    <div className="tape-strip" aria-hidden="true">
      <div className="tape-strip__track">
        {[0, 1].map((k) => (
          <span key={k}>
            {tape.map((t) => (
              <span key={t}>
                {t} <i>✦</i>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <SmoothScroll>
      <SketchDefs />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <TapeStrip />
        <Work />
        <About />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <DoodlePad />
    </SmoothScroll>
  );
}
