"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Eyebrow, Highlight, Reveal } from "./ink";

const jobs = [
  {
    company: "Moveo",
    role: "Lead Frontend Developer",
    period: "Jan 2024 — Present",
    detail:
      "Led frontend architecture for a multi-tenant Angular monorepo, structuring shared application logic and configurable interfaces for multiple brands. Introduced NgRx state management and used RxJS with REST integrations to keep UI behavior consistent across tenants. Delivered workforce-management workflows and an Ionic app, owning platform-specific builds, release preparation and store submissions.",
    tech: ["Angular", "TypeScript", "RxJS", "NgRx", "Ionic", "Monorepo", "REST APIs", "Webpack"],
    color: "sun",
  },
  {
    company: "Helius",
    role: "Full Stack Developer / Frontend Migration Lead",
    period: "Sep 2021 — Mar 2024",
    detail:
      "Led an AngularJS-to-Angular 15 migration while maintaining React.js features and Node.js / HapiJS services. Built responsive product data-management features with Vue.js, Java / Spring Boot and PostgreSQL. Expanded regression testing to catch release issues, and mentored interns through onboarding, ticket breakdown and technical support.",
    tech: ["Angular", "AngularJS", "React.js", "Vue.js", "Node.js", "HapiJS", "Java", "Spring Boot", "PostgreSQL", "RethinkDB"],
    color: "mint",
  },
  {
    company: "Rayonit",
    role: "Full Stack Developer",
    period: "Jun 2021 — Aug 2021",
    detail: "Traffic management software and real-time data from connected sensors.",
    tech: ["Angular", "Spring Boot", "MongoDB"],
    color: "bubble",
  },
];

const STICKERS = [
  { label: "React", color: "sky", x: 4, y: 10, r: -8 },
  { label: "Next.js", color: "ink", x: 24, y: 44, r: 6 },
  { label: "Angular", color: "tomato", x: 46, y: 8, r: -4 },
  { label: "Ionic", color: "sky", x: 66, y: 52, r: 9 },
  { label: "Node.js", color: "mint", x: 6, y: 66, r: 4 },
  { label: "TypeScript", color: "sky", x: 60, y: 70, r: -6 },
  { label: "Rails", color: "tomato", x: 70, y: 22, r: 7 },
  { label: "Python", color: "sun", x: 36, y: 74, r: -3 },
  { label: "SwiftUI", color: "bubble", x: 28, y: 4, r: 10 },
  { label: "Rust", color: "kraft", x: 74, y: 82, r: -9 },
  { label: "Realtime", color: "lilac", x: 50, y: 40, r: 3 },
  { label: "Tests that catch things", color: "paper", x: 2, y: 38, r: -2 },
];

function Road() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const revealed = useTransform(progress, (v) => v * 1000);
  return (
    <div ref={ref} className="road" aria-hidden="true">
      <svg viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path
          d="M50 0 C92 120 8 220 50 340 C92 460 8 560 50 680 C92 800 8 900 50 1000"
          fill="none"
          stroke="var(--line)"
          strokeWidth="14"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <clipPath id="road-reveal">
            <motion.rect x="-20" y="0" width="140" height={revealed} />
          </clipPath>
        </defs>
        <path
          d="M50 0 C92 120 8 220 50 340 C92 460 8 560 50 680 C92 800 8 900 50 1000"
          fill="none"
          stroke="var(--tomato)"
          strokeWidth="5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          clipPath="url(#road-reveal)"
        />
      </svg>
    </div>
  );
}

function StickerBoard() {
  const board = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<string | null>(null);
  const [moved, setMoved] = useState(0);
  return (
    <Reveal className="toolkit">
      <div className="toolkit__head">
        <h3>The toolkit</h3>
        <p>
          {moved === 0
            ? "Go ahead, rearrange my stickers. Drag them anywhere."
            : moved < 6
              ? "Nice. Very organized. Very you."
              : "You’ve rearranged more than my last sprint planning did."}
        </p>
      </div>
      <div ref={board} className="toolkit__board">
        {STICKERS.map((s) => (
          <motion.span
            key={s.label}
            className={`sticker sticker--${s.color}`}
            style={{ left: `${s.x}%`, top: `${s.y}%`, rotate: s.r, zIndex: top === s.label ? 5 : 1 }}
            drag
            dragConstraints={board}
            dragElastic={0.15}
            dragMomentum
            whileHover={{ scale: 1.08, rotate: 0 }}
            whileDrag={{ scale: 1.15, rotate: 0, boxShadow: "6px 12px 0 rgba(28,26,46,.25)" }}
            onDragStart={() => setTop(s.label)}
            onDragEnd={() => setMoved((n) => n + 1)}
          >
            {s.label}
          </motion.span>
        ))}
      </div>
    </Reveal>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="journey page-width">
      <Reveal className="section-head">
        <Eyebrow n="03">The day jobs</Eyebrow>
        <h2>
          Less theory.
          <br />
          <Highlight color="var(--mint)">More shipped code.</Highlight>
        </h2>
        <p>
          Six years of big platforms, scary migrations and release days that
          went fine (mostly). Keep scrolling, the road draws itself.
        </p>
      </Reveal>

      <div className="timeline">
        <Road />
        <ol className="timeline__stops">
          {jobs.map((job, i) => (
            <Reveal as="li" key={job.company} className={`stop stop--${i % 2 ? "right" : "left"}`}>
              <span className={`stop__pin stop__pin--${job.color}`} aria-hidden="true" />
              <article className={`job job--${job.color}`}>
                <span className="job__period">{job.period}</span>
                <h3 className="job__company">{job.company}</h3>
                <p className="job__role">{job.role}</p>
                <p className="job__detail">{job.detail}</p>
                <ul className="job__tech" aria-label="Technologies">
                  {job.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
          <Reveal as="li" className="stop stop--end">
            <span className="stop__flag" aria-hidden="true">
              🏁
            </span>
            <p className="stop__start">June 2021. Where the road starts.</p>
          </Reveal>
        </ol>
      </div>

      <StickerBoard />
    </section>
  );
}
