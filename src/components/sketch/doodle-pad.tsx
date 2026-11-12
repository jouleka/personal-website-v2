"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eraser, Pencil, Undo2, X } from "lucide-react";

type Point = { x: number; y: number; p: number };
type Stroke = { color: string; points: Point[] };

const RAINBOW = "rainbow";
const COLORS = [
  { name: "Ink", value: "#1c1a2e" },
  { name: "Tomato", value: "#ff5b3a" },
  { name: "Sky", value: "#4d7cfe" },
  { name: "Mint", value: "#2fbf86" },
  { name: "Sun", value: "#ffc61a" },
  { name: "Rainbow", value: RAINBOW },
];

const HINT_KEY = "jl-doodle-hint-seen";

// Strokes live in document coordinates so they scroll with the page,
// while the canvas itself stays viewport-sized (cheap on long pages).
export default function DoodlePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const current = useRef<Stroke | null>(null);
  const frame = useRef(0);
  const [active, setActive] = useState(false);
  const [color, setColor] = useState(COLORS[1].value);
  const [count, setCount] = useState(0);
  const [callout, setCallout] = useState(false);

  const render = useCallback(() => {
    frame.current = 0;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, -window.scrollX * dpr, -window.scrollY * dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const stroke of strokes.current) {
      const pts = stroke.points;
      const rainbow = stroke.color === RAINBOW;
      const paint = (i: number) => (rainbow ? `hsl(${(i * 7) % 360} 90% 58%)` : stroke.color);
      if (pts.length === 1) {
        ctx.fillStyle = paint(0);
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const prev = pts[i - 2] ?? a;
        ctx.strokeStyle = paint(i);
        ctx.lineWidth = (rainbow ? 7 : 3.5) + b.p * 4;
        ctx.beginPath();
        ctx.moveTo((prev.x + a.x) / 2, (prev.y + a.y) / 2);
        ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
        ctx.stroke();
      }
    }
  }, []);

  const schedule = useCallback(() => {
    if (!frame.current) frame.current = requestAnimationFrame(render);
  }, [render]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      schedule();
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame.current);
      // Without this reset a remount would think a frame is still pending
      // and never paint again.
      frame.current = 0;
    };
  }, [schedule]);

  // First-time visitors get a little nudge that the page is drawable.
  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(HINT_KEY) === "1";
    } catch {}
    if (seen) return;
    const show = window.setTimeout(() => setCallout(true), 3500);
    return () => window.clearTimeout(show);
  }, []);

  const start = useCallback(() => {
    setActive(true);
    setCallout(false);
    try {
      window.localStorage.setItem(HINT_KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        strokes.current.pop();
        setCount(strokes.current.length);
        schedule();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, schedule]);

  const point = (e: React.PointerEvent): Point => ({
    x: e.clientX + window.scrollX,
    y: e.clientY + window.scrollY,
    p: e.pointerType === "pen" ? e.pressure : 0.35,
  });

  const undo = () => {
    strokes.current.pop();
    setCount(strokes.current.length);
    schedule();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`doodle-canvas${active ? " is-active" : ""}`}
        aria-hidden="true"
        onPointerDown={(e) => {
          if (!active) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          current.current = { color, points: [point(e)] };
          strokes.current.push(current.current);
          schedule();
        }}
        onPointerMove={(e) => {
          if (!current.current) return;
          current.current.points.push(point(e));
          schedule();
        }}
        onPointerUp={() => {
          if (current.current) setCount(strokes.current.length);
          current.current = null;
        }}
        onPointerCancel={() => {
          current.current = null;
        }}
      />

      <AnimatePresence>
        {active && (
          <motion.div
            className="doodle-banner"
            role="status"
            initial={{ y: -40, opacity: 0, rotate: -2 }}
            animate={{ y: 0, opacity: 1, rotate: -1 }}
            exit={{ y: -40, opacity: 0 }}
          >
            <Pencil size={16} />
            {count === 0 ? (
              <span>Drawing mode! Scribble anywhere on the page.</span>
            ) : count < 4 ? (
              <span>Picasso who? Keep going.</span>
            ) : (
              <span>This is my website now? Fair.</span>
            )}
            <small className="doodle-banner__desk">Esc to stop · scroll to doodle further down</small>
            <small className="doodle-banner__touch">tap ✕ to stop &amp; scroll</small>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="doodle-dock">
        <AnimatePresence>
          {active && (
            <motion.div
              className="doodle-tools"
              role="toolbar"
              aria-label="Drawing tools"
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.9 }}
            >
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`swatch${c.value === color ? " is-on" : ""}${c.value === RAINBOW ? " swatch--rainbow" : ""}`}
                  style={c.value === RAINBOW ? undefined : { background: c.value }}
                  onClick={() => setColor(c.value)}
                  aria-label={`${c.name} pen`}
                  aria-pressed={c.value === color}
                />
              ))}
              <button type="button" className="doodle-tools__btn" onClick={undo} aria-label="Undo last line" disabled={count === 0}>
                <Undo2 size={18} />
              </button>
              <button
                type="button"
                className="doodle-tools__btn"
                onClick={() => {
                  strokes.current = [];
                  setCount(0);
                  schedule();
                }}
                aria-label="Erase all drawings"
                disabled={count === 0}
              >
                <Eraser size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {callout && !active && (
            <motion.div
              className="doodle-callout"
              initial={{ opacity: 0, scale: 0.6, rotate: 6, y: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: [-3, 3, -3], y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ rotate: { duration: 2.4, repeat: Infinity }, default: { type: "spring", stiffness: 260, damping: 14 } }}
            >
              <button type="button" className="doodle-callout__go" onClick={start}>
                psst… you can draw on my site ✏️
              </button>
              <button
                type="button"
                className="doodle-callout__close"
                aria-label="Dismiss drawing tip"
                onClick={() => {
                  setCallout(false);
                  try {
                    window.localStorage.setItem(HINT_KEY, "1");
                  } catch {}
                }}
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          className={`pencil-fab${active ? " is-active" : ""}`}
          onClick={() => (active ? setActive(false) : start())}
          aria-pressed={active}
          aria-label={active ? "Stop drawing" : "Draw on this page"}
          whileHover={{ rotate: -12, scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
        >
          {active ? <X size={22} /> : <Pencil size={22} />}
          {!active && !callout && <span className="pencil-fab__label">draw on my site</span>}
        </motion.button>
      </div>
    </>
  );
}
