"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * True once the element has been on screen. Checks immediately on mount
 * (Safari can skip the observer's first "already visible" report), then
 * falls back to an IntersectionObserver plus a scroll check.
 */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const visible = () => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight * 0.9 && r.right > 0 && r.left < window.innerWidth;
    };
    let done = false;
    const cleanup = () => {
      done = true;
      io.disconnect();
      window.removeEventListener("scroll", check);
    };
    const reveal = () => {
      if (done) return;
      cleanup();
      setSeen(true);
    };
    const check = () => visible() && reveal();
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && reveal(),
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    window.addEventListener("scroll", check, { passive: true });
    const first = requestAnimationFrame(check);
    return () => {
      cancelAnimationFrame(first);
      cleanup();
    };
  }, []);
  return [ref, seen] as const;
}

const draw = {
  hidden: { pathLength: 0 },
  shown: { pathLength: 1 },
};

/** Fades and lifts content in when it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
}) {
  const [ref, seen] = useSeen<HTMLElement>();
  const Component = motion[as];
  return (
    <Component
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, y: 28, rotate: -0.6 }}
      animate={seen ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 28, rotate: -0.6 }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay }}
    >
      {children}
    </Component>
  );
}

/** A highlighter-marker swipe behind a word. */
export function Highlight({
  children,
  color = "var(--sun)",
  delay = 0.15,
}: {
  children: ReactNode;
  color?: string;
  delay?: number;
}) {
  const [ref, seen] = useSeen<HTMLSpanElement>();
  return (
    <motion.span ref={ref} className="ink-highlight" initial="hidden" animate={seen ? "shown" : "hidden"}>
      <motion.span
        aria-hidden="true"
        className="ink-highlight__swipe"
        style={{ background: color }}
        variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay }}
      />
      <span className="ink-highlight__text">{children}</span>
    </motion.span>
  );
}

/** A loose hand-drawn loop around a word. */
export function Circled({
  children,
  color = "var(--tomato)",
  delay = 0.3,
}: {
  children: ReactNode;
  color?: string;
  delay?: number;
}) {
  const [ref, seen] = useSeen<HTMLSpanElement>();
  return (
    <motion.span ref={ref} className="ink-circled" initial="hidden" animate={seen ? "shown" : "hidden"}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        className="ink-circled__svg"
      >
        <motion.path
          d="M168 14 C130 2 52 4 22 20 C2 32 6 58 40 68 C82 80 158 76 186 58 C204 44 192 20 150 12 C120 7 90 8 70 12"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#rough)"
          variants={draw}
          transition={{ duration: 0.9, ease: "easeInOut", delay }}
        />
      </svg>
    </motion.span>
  );
}

/** A wobbly underline that draws itself. */
export function Underline({
  children,
  color = "var(--tomato)",
  delay = 0.2,
}: {
  children: ReactNode;
  color?: string;
  delay?: number;
}) {
  const [ref, seen] = useSeen<HTMLSpanElement>();
  return (
    <motion.span ref={ref} className="ink-underline" initial="hidden" animate={seen ? "shown" : "hidden"}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        className="ink-underline__svg"
      >
        <motion.path
          d="M4 12 C40 4 70 16 104 9 C136 3 166 15 196 7"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          variants={draw}
          transition={{ duration: 0.6, ease: "easeOut", delay }}
        />
      </svg>
    </motion.span>
  );
}

/** Section label: a numbered tab of masking tape. */
export function Eyebrow({ n, children }: { n: string; children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="eyebrow__n">{n}</span>
      {children}
    </span>
  );
}

/** Four-point doodle sparkle. */
export function Sparkle({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={className}>
      <path
        d="M20 2 C22 14 26 18 38 20 C26 22 22 26 20 38 C18 26 14 22 2 20 C14 18 18 14 20 2 Z"
        fill={color}
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
