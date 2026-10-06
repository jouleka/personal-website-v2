"use client";

import { useEffect, useRef, type ReactNode, type PointerEvent } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";

export function MotionSystem({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  useEffect(() => {
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)");
    let lenis: Lenis | undefined;
    const configure = () => {
      lenis?.stop();
      lenis?.destroy();
      lenis = undefined;
      if (desktop.matches) {
        lenis = new Lenis({
          autoRaf: true,
          lerp: 0.085,
          smoothWheel: true,
          syncTouch: false,
          anchors: { offset: -100, duration: 1.15 },
        });
      }
    };
    configure();
    desktop.addEventListener("change", configure);
    return () => {
      lenis?.stop();
      lenis?.destroy();
      desktop.removeEventListener("change", configure);
    };
  }, []);
  return (
    <MotionConfig reducedMotion="never">
      <motion.div
        className="scroll-progress"
        aria-hidden="true"
        style={{ scaleX: progress }}
      />
      {children}
    </MotionConfig>
  );
}

// The server renders readable content. Enhancement begins only after hydration.
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.remove("reveal-pending");
        animation = element.animate(
          [
            { opacity: 0, transform: "translateY(55px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 900,
            delay: delay * 1000,
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "backwards",
          },
        );
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    if (element.getBoundingClientRect().top >= window.innerHeight)
      element.classList.add("reveal-pending");
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
      element.classList.remove("reveal-pending");
    };
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function MagneticLink({
  children,
  className = "",
  href,
  label,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  label?: string;
}) {
  const x = useSpring(0, { stiffness: 180, damping: 16 });
  const y = useSpring(0, { stiffness: 180, damping: 16 });
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.25);
  }
  return (
    <motion.a
      href={href}
      aria-label={label}
      className={className}
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onBlur={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}
