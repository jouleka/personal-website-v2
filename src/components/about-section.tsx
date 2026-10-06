import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion-system";
export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <Reveal className="page-width about-grid">
        <div className="about-label">
          <span className="eyebrow">
            02 / Off the clock, still on the keyboard
          </span>
          <div className="about-print" aria-hidden="true">
            <span className="print-sun">↗</span>
            <span>
              One more
              <br />
              <em>side project.</em>
            </span>
            <small>JL / THE TABS ARE NEVER CLOSED</small>
          </div>
        </div>
        <div className="about-copy">
          <h2>
            I make things.
            <br />
            <em>Then make them better.</em>
          </h2>
          <p className="large-copy">
            Half my projects start with “this is annoying.” The other half start
            with “what if?”
          </p>
          <p>
            I&apos;m Jurgen, a product engineer based in Europe. I work with
            teams across Europe and the US, mostly in Angular and TypeScript.
            Outside that, I build iOS apps, release tools, local-first software,
            and AI experiments.
          </p>
          <p>
            I like clean interfaces, fast feedback, and code that holds up when
            someone uses it in a way I didn&apos;t expect. Getting it working is
            the start. Getting it right is the fun part.
          </p>
          <a
            className="text-link"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Grab my résumé <ArrowUpRight size={18} />
          </a>
          <div className="about-facts">
            <div>
              <strong>5+</strong>
              <span>years shipping</span>
            </div>
            <div>
              <strong>11</strong>
              <span>selected products</span>
            </div>
            <div>
              <strong>01</strong>
              <span>more idea, probably</span>
            </div>
          </div>
          <p className="education-note">
            BSc Computer Engineering · Canadian Institute of Technology ·
            2018–2021
          </p>
        </div>
      </Reveal>
    </section>
  );
}
