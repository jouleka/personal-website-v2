"use client";

import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import PaperSculpture from "./paper-sculpture";
import { MagneticLink } from "./motion-system";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const marqueeX = useTransform(scrollYProgress, [0, 1], [0, -180]);
  return (
    <section ref={ref} id="hero" className="hero">
      <div className="page-width">
        <div className="hero-meta">
          <span className="eyebrow">Jurgen Leka / Product engineer</span>
          <span className="eyebrow location-note">Based in Europe</span>
        </div>
        <div className="hero-grid">
          <motion.div className="hero-copy" style={{ y: textY }}>
            <h1 aria-label="Code. Ship. Repeat.">
              <span className="hero-line">
                <span>Code.</span>
              </span>
              <span className="hero-line">
                <span>Ship.</span>
              </span>
              <span className="hero-line">
                <em>Repeat.</em>
              </span>
            </h1>
            <div className="hero-intro">
              <p>
                I build apps, platforms, and tools that fix annoying problems.
                And yes, I probably have another side project open.
              </p>
              <MagneticLink href="#portfolio" className="hero-work-link">
                See the work <ArrowUpRight size={21} />
              </MagneticLink>
            </div>
          </motion.div>
          <motion.div
            className="hero-art"
            style={{ y: artY, rotate: artRotate }}
          >
            <PaperSculpture />
          </motion.div>
        </div>
        <div className="hero-bottom">
          <span>Web · iOS · Developer tools · AI</span>
          <a href="#portfolio">
            Scroll. There&apos;s more. <ArrowDown size={18} />
          </a>
        </div>
      </div>
      <div className="hero-marquee" aria-hidden="true">
        <motion.div style={{ x: marqueeX }}>
          <div className="marquee-track">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i}>
                LESS TALK <i>↗</i> MORE SHIPPING <i>↗</i>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
