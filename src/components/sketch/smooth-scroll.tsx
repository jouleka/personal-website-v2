"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    const configure = () => {
      lenis?.destroy();
      lenis = undefined;
      if (desktop.matches && !calm.matches) {
        lenis = new Lenis({
          autoRaf: true,
          lerp: 0.09,
          smoothWheel: true,
          syncTouch: false,
          anchors: { offset: -90, duration: 1.2 },
        });
      }
    };
    configure();
    desktop.addEventListener("change", configure);
    calm.addEventListener("change", configure);
    return () => {
      lenis?.destroy();
      desktop.removeEventListener("change", configure);
      calm.removeEventListener("change", configure);
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
