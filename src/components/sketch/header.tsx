"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "#work", label: "Work", note: "11 things" },
  { href: "#about", label: "About", note: "hi" },
  { href: "#journey", label: "Journey", note: "6 yrs" },
  { href: "#contact", label: "Contact", note: "say hey" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__bar">
        <a href="#hero" className="brand" aria-label="Jurgen Leka, back to the top">
          {/* Inlined from public/logo-mark.svg so a cached old copy can't linger. */}
          <svg className="brand__mark" viewBox="0 0 96 96" width="40" height="40" aria-hidden="true">
            <path d="M40 28h16v28c0 18-12 28-30 28H12V68h14c9 0 14-4 14-12V28Z" fill="var(--ink)" />
            <path d="M64 12h16v56h12v16H64V12Z" fill="var(--ink)" />
            <path d="M40 8h16v12H40V8Z" fill="var(--tomato)" />
          </svg>
          <span className="brand__name">
            Jurgen Leka
            <small>makes things</small>
          </span>
        </a>

        <nav className="nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav__link">
              {link.label}
              <svg aria-hidden="true" viewBox="0 0 100 14" preserveAspectRatio="none">
                <path d="M3 9 C24 3 44 12 62 7 C76 3 88 10 97 6" />
              </svg>
            </a>
          ))}
        </nav>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="sticky-note"
        >
          Résumé <ArrowUpRight size={15} />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={`burger${open ? " is-open" : ""}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <ul>
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -30, rotate: -4 }}
                  animate={{ opacity: 1, x: 0, rotate: i % 2 ? 1.5 : -1.5 }}
                  transition={{ delay: 0.15 + i * 0.07, type: "spring", stiffness: 200, damping: 16 }}
                >
                  <a href={link.href} onClick={() => setOpen(false)}>
                    <span className="mobile-menu__n">0{i + 1}</span>
                    {link.label}
                    <span className="mobile-menu__note">{link.note}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              className="btn btn--paper"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Résumé <ArrowUpRight size={18} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
