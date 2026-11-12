import { ArrowDown, ArrowUpRight } from "lucide-react";
import ShippingMachine from "./shipping-machine";
import { Circled, Highlight, Sparkle } from "./ink";

export default function Hero() {
  return (
    <section id="hero" className="hero page-width">
      <div className="hero__copy">
        <p className="hero__hello">
          <span className="wave" aria-hidden="true">
            👋
          </span>
          Hey! I&apos;m Jurgen. I write software.
        </p>
        <h1 className="hero__title">
          <span className="hero__line">
            <Highlight color="var(--sun)">Code.</Highlight>
          </span>
          <span className="hero__line">
            <Circled>Ship.</Circled>
          </span>
          <span className="hero__line hero__line--repeat">
            Repeat.
            <svg
              aria-hidden="true"
              className="hero__loop"
              viewBox="0 0 80 80"
              fill="none"
              stroke="var(--mint)"
              strokeWidth="6"
              strokeLinecap="round"
            >
              <path d="M62 30 A26 26 0 1 0 64 50" />
              <path d="M52 22 L64 30 L70 16" />
            </svg>
          </span>
        </h1>
        <p className="hero__intro">
          Six years of turning coffee into web apps, mobile apps and dev tools
          for teams across Europe and the US. If something annoys me, I build a
          fix. If nothing annoys me, I build something anyway.
        </p>
        <div className="hero__actions">
          <a href="#work" className="btn btn--ink">
            See the work <ArrowDown size={18} />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn btn--paper"
          >
            Résumé <ArrowUpRight size={18} />
          </a>
        </div>
        <Sparkle className="hero__sparkle hero__sparkle--a" color="var(--bubble)" />
        <Sparkle className="hero__sparkle hero__sparkle--b" color="var(--sun)" />
      </div>
      <ShippingMachine />
    </section>
  );
}
