"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Eyebrow, Reveal, Underline } from "./ink";

const GREETINGS = ["HELLO", "HOLA", "CIAO", "BONJOUR", "HALLO", "OLÁ", "HEJ", "AHOJ"];
const START_TABS = 17;
const CRASH_AT = 32;

function NameBadge() {
  const [i, setI] = useState(0);
  const [spin, setSpin] = useState(0);
  return (
    <motion.button
      type="button"
      className="badge"
      onClick={() => {
        setI((n) => (n + 1) % GREETINGS.length);
        setSpin((s) => s + 1);
      }}
      aria-label="Name badge. Press to say hello in another language."
      initial={{ rotate: -7 }}
      animate={{ rotate: spin % 2 ? 5 : -7 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 12 }}
    >
      <span className="badge__top">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={GREETINGS[i]}
            className="badge__hello"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
          >
            {GREETINGS[i]}
          </motion.span>
        </AnimatePresence>
        <span className="badge__sub">my name is</span>
      </span>
      <span className="badge__name">Jurgen</span>
      <span className="badge__tap" aria-hidden="true">
        tap me
      </span>
    </motion.button>
  );
}

function TabHoarder() {
  const [tabs, setTabs] = useState(START_TABS);
  const [crashed, setCrashed] = useState(false);

  const open = () => {
    if (crashed) return;
    const next = tabs + 1;
    if (next >= CRASH_AT) {
      setTabs(next);
      setCrashed(true);
      window.setTimeout(() => {
        setTabs(3);
        setCrashed(false);
      }, 1800);
    } else {
      setTabs(next);
    }
  };

  const message = crashed
    ? "Laptop fan: 🌪️. Okay, okay, closing some."
    : tabs <= 5
      ? "Only a few left. That won’t last."
      : tabs > 26
        ? "The laptop fan is starting to complain."
        : "Every one of them is “important”.";

  return (
    <div className={`hoarder${crashed ? " is-crashed" : ""}`}>
      <div className="hoarder__window">
        <div className="hoarder__strip" aria-hidden="true">
          <AnimatePresence initial={false}>
            {Array.from({ length: tabs }, (_, n) => (
              <motion.span
                key={n}
                className="hoarder__tab"
                layout
                initial={{ y: 20, opacity: 0 }}
                animate={
                  crashed
                    ? { y: [0, -12, 60], rotate: (n % 2 ? 1 : -1) * (10 + (n % 7) * 6), opacity: [1, 1, 0] }
                    : { y: 0, opacity: 1, rotate: 0 }
                }
                exit={{ y: 40, opacity: 0 }}
                transition={crashed ? { duration: 0.9, delay: (n % 9) * 0.04 } : { type: "spring", stiffness: 400, damping: 26 }}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="hoarder__body">
          <span className="hoarder__count">
            <motion.strong key={tabs} initial={{ scale: 1.4 }} animate={{ scale: 1 }}>
              {tabs}
            </motion.strong>
            <span>tabs open right now</span>
          </span>
          <p className="hoarder__msg" role="status">
            {message}
          </p>
        </div>
      </div>
      <button type="button" className="btn btn--sun" onClick={open} disabled={crashed}>
        <Plus size={18} /> Open another tab
      </button>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="about page-width">
      <div className="about__grid">
        <Reveal className="about__left">
          <Eyebrow n="02">Off the clock, still on the keyboard</Eyebrow>
          <NameBadge />
          <TabHoarder />
        </Reveal>

        <Reveal className="about__notes" delay={0.1}>
          <div className="lined">
            <h2>
              I make things.
              <br />
              <Underline color="var(--tomato)">Then make them better.</Underline>
            </h2>
            <p className="about__big">
              Half my projects start with “this is annoying.” The other half
              start with “what if?”
            </p>
            <p>
              I&apos;m Jurgen, a software engineer living somewhere in Europe.
              For six years I&apos;ve worked with teams across Europe and the
              US, mostly in React, Next.js, Angular and Node.js. I&apos;m usually
              the one who ends up owning the frontend architecture, the scary
              migration and the big red release button. After hours I build iOS
              apps, release tools, local-first software and the occasional AI
              experiment that probably shouldn&apos;t exist.
            </p>
            <p>
              I like clean interfaces, fast feedback and code that survives
              users clicking things in the wrong order. Making it work is step
              one. Making it good is the fun bit.
            </p>
            <a className="text-link" href="/resume.pdf" target="_blank" rel="noreferrer">
              Grab my résumé <ArrowUpRight size={18} />
            </a>
          </div>

          <ul className="facts">
            <li className="fact fact--sun">
              <strong>6</strong>
              <span>years shipping</span>
            </li>
            <li className="fact fact--mint">
              <strong>11</strong>
              <span>things on the pile</span>
            </li>
            <li className="fact fact--bubble">
              <strong>∞</strong>
              <span>ideas in my notes app</span>
            </li>
          </ul>
          <p className="about__edu">
            🎓 BSc Computer Engineering · Canadian Institute of Technology ·
            2018–2021
          </p>
        </Reveal>
      </div>
    </section>
  );
}
