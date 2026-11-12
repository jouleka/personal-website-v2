"use client";

import { motion } from "framer-motion";
import type { DoodleKey } from "@/lib/projects";

type Stroke = { d: string; fill?: string; stroke?: string; w?: number };

const rr = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;
const c = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} A${r} ${r} 0 1 0 ${cx + r} ${cy} A${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;
const coin = (y: number): Stroke[] => [
  { d: `M24 ${y} V${y + 9} A26 9 0 0 0 76 ${y + 9} V${y}`, fill: "var(--sun)" },
  { d: `M24 ${y} A26 9 0 1 0 76 ${y} A26 9 0 1 0 24 ${y} Z`, fill: "var(--sun)" },
];

const P = "var(--paper-hi)";
const INK = "var(--ink)";

export const DOODLES: Record<DoodleKey, Stroke[]> = {
  mysigner: [
    { d: rr(36, 8, 48, 100, 10), fill: P },
    { d: "M52 17 L68 17" },
    { d: "M44 62 C48 44 54 72 58 56 C61 44 64 68 70 52 C72 48 75 51 77 56", stroke: "var(--sky)", w: 4 },
    { d: "M48 84 L56 92 L74 74", stroke: "var(--tomato)", w: 5 },
  ],
  aichu: [
    { d: "M60 8 L98 22 C98 62 84 90 60 108 C36 90 22 62 22 22 Z", fill: P },
    { d: c(60, 50, 9), fill: INK },
    { d: "M55 56 L51 78 L69 78 L65 56 Z", fill: INK },
    { d: "M4 46 L16 46 M10 40 L10 52" },
    { d: "M104 70 L116 70 M110 64 L110 76" },
    { d: "M100 20 L110 30 M110 20 L100 30" },
  ],
  subtitle: [
    { d: "M18 20 H102 Q110 20 110 28 V72 Q110 80 102 80 H52 L34 98 V80 H18 Q10 80 10 72 V28 Q10 20 18 20 Z", fill: P },
    {
      d: [8, 18, 30, 14, 24, 36, 20, 10, 26, 16]
        .map((h, i) => `M${24 + i * 8} ${50 - h / 2} L${24 + i * 8} ${50 + h / 2}`)
        .join(" "),
      stroke: "var(--tomato)",
      w: 4,
    },
    { d: "M60 108 L104 108", w: 5 },
    { d: "M70 116 L96 116", w: 3 },
  ],
  reading: [
    { d: "M60 30 C46 22 28 22 12 28 V94 C28 88 46 88 60 96 C74 88 92 88 108 94 V28 C92 22 74 22 60 30 Z", fill: P },
    { d: "M60 30 V96" },
    { d: "M22 46 C32 43 42 43 50 46 M22 58 C32 55 42 55 50 58 M22 70 C32 67 42 67 50 70", w: 2.5 },
    { d: "M70 46 C78 43 88 43 98 46 M70 58 C78 55 88 55 98 58", w: 2.5 },
    { d: "M86 20 V46 L92 40 L98 46 V22", fill: "var(--tomato)" },
  ],
  goldengo: [
    ...coin(88),
    ...coin(76),
    ...coin(64),
    { d: c(88, 38, 22), fill: "var(--sun)" },
    { d: "M95 32 C90 26 78 28 78 38 C78 48 90 50 95 43 L88 43" },
    { d: "M22 22 L30 30 M30 22 L22 30", stroke: "var(--tomato)" },
  ],
  oopsfee: [
    { d: "M52 14 H68 V24 H52 Z", fill: INK },
    { d: c(60, 66, 38), fill: P },
    { d: "M60 34 V39 M92 66 H87 M60 98 V93 M28 66 H33", w: 3 },
    { d: "M60 66 V44", w: 4 },
    { d: "M60 66 L78 78", stroke: "var(--tomato)", w: 5 },
    { d: "M104 10 L98 32", stroke: "var(--tomato)", w: 5 },
    { d: c(96, 40, 2.5), fill: "var(--tomato)", stroke: "var(--tomato)" },
  ],
  options: [
    { d: "M14 10 V106 H112" },
    { d: "M32 38 V90" },
    { d: rr(25, 48, 14, 28, 2), fill: "var(--mint)" },
    { d: "M54 50 V100" },
    { d: rr(47, 58, 14, 28, 2), fill: "var(--tomato)" },
    { d: "M76 26 V74" },
    { d: rr(69, 34, 14, 28, 2), fill: "var(--mint)" },
    { d: "M98 12 V52" },
    { d: rr(91, 18, 14, 22, 2), fill: "var(--mint)" },
  ],
  polymarket: [
    { d: c(60, 50, 34), fill: "var(--sky)" },
    { d: "M38 40 C42 30 50 24 60 22", stroke: P, w: 5 },
    { d: "M70 54 L80 54 M75 49 L75 59", stroke: P, w: 3 },
    { d: "M50 64 L54 64 M52 62 L52 66", stroke: P, w: 3 },
    { d: "M32 92 C40 82 80 82 88 92 L94 108 H26 Z", fill: "var(--tomato)" },
  ],
  greatwall: [
    { d: "M10 72 H110 V108 H10 Z", fill: "var(--tomato)" },
    { d: "M10 84 H110 M10 96 H110", w: 2.5 },
    { d: "M35 72 V84 M60 72 V84 M85 72 V84 M22 84 V96 M47 84 V96 M72 84 V96 M97 84 V96 M35 96 V108 M60 96 V108 M85 96 V108", w: 2.5 },
    { d: c(60, 34, 18), fill: "var(--sun)" },
    { d: "M52 50 H68 V62 H52 Z", fill: P },
    { d: "M54 36 L58 29 L62 38 L66 31", w: 2.5 },
    { d: "M60 4 V9 M34 14 L38 18 M86 14 L82 18 M26 34 H31 M89 34 H94", w: 3 },
  ],
  resume: [
    { d: rr(26, 8, 68, 102, 6), fill: P },
    { d: c(44, 30, 10), fill: "var(--sky)" },
    { d: "M60 25 H82 M60 34 H76", w: 3 },
    { d: "M36 54 H84 M36 64 H78 M36 74 H84 M36 84 H68", w: 2.5 },
    { d: "M70 96 L76 102 L88 90", stroke: "var(--tomato)", w: 4 },
  ],
  chat: [
    { d: "M12 14 H72 Q80 14 80 22 V50 Q80 58 72 58 H34 L20 70 V58 H12 Q4 58 4 50 V22 Q4 14 12 14 Z", fill: P },
    { d: `${c(26, 36, 4)} ${c(42, 36, 4)} ${c(58, 36, 4)}`, fill: INK },
    { d: "M48 54 H108 Q116 54 116 62 V88 Q116 96 108 96 H100 V110 L86 96 H48 Q40 96 40 88 V62 Q40 54 48 54 Z", fill: "var(--sky)" },
    { d: "M52 70 H100 M52 80 H86", stroke: P, w: 3.5 },
  ],
};

export function Doodle({
  name,
  draw = false,
  className,
}: {
  name: DoodleKey;
  draw?: boolean;
  className?: string;
}) {
  const strokes = DOODLES[name];
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g filter="url(#rough)">
        {strokes.map((s, i) => (
          <motion.path
            key={i}
            d={s.d}
            fill={s.fill ?? "none"}
            stroke={s.stroke ?? INK}
            strokeWidth={s.w ?? 3.5}
            initial={draw ? { pathLength: 0, fillOpacity: 0 } : false}
            animate={{ pathLength: 1, fillOpacity: 1 }}
            transition={{
              pathLength: { duration: 0.5, delay: i * 0.12, ease: "easeInOut" },
              fillOpacity: { duration: 0.3, delay: i * 0.12 + 0.35 },
            }}
          />
        ))}
      </g>
    </svg>
  );
}
