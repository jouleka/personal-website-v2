"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eraser, Pencil, Undo2, X } from "lucide-react";

type Point = { x: number; y: number };
type Stroke = {
  color: string;
  width: number;
  points: Point[];
  group: SVGGElement;
  segment: SVGPathElement;
  segmentStart: number;
  hue: number;
};

const NS = "http://www.w3.org/2000/svg";
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

/** Smooth path through points: quadratic curves via segment midpoints. */
function smooth(pts: Point[]) {
  if (pts.length === 1) return `M${pts[0].x} ${pts[0].y} l0.01 0`;
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q${pts[i].x} ${pts[i].y} ${mx} ${my}`;
  }
  const last = pts[pts.length - 1];
  return `${d} L${last.x} ${last.y}`;
}

// Drawings are SVG paths on a layer that covers the whole document, so the
// browser scrolls them together with the page. (A viewport canvas repainted
// on scroll lags and jumps on iOS Safari, which scrolls off the main thread
// and resizes the viewport as its toolbar collapses.)
export default function DoodlePad() {
  const layerRef = useRef<SVGSVGElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const current = useRef<Stroke | null>(null);
  const [active, setActive] = useState(false);
  const [color, setColor] = useState(COLORS[1].value);
  const [count, setCount] = useState(0);
  const [callout, setCallout] = useState(false);

  // Keep the layer as tall as the page content.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const fit = () => {
      layer.style.height = `${document.body.offsetHeight}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  const newSegment = (stroke: Stroke) => {
    const path = document.createElementNS(NS, "path");
    path.setAttribute("stroke", stroke.color === RAINBOW ? `hsl(${stroke.hue} 90% 58%)` : stroke.color);
    path.setAttribute("stroke-width", String(stroke.width));
    stroke.group.appendChild(path);
    stroke.segment = path;
    stroke.segmentStart = Math.max(0, stroke.points.length - 1);
  };

  const paint = (stroke: Stroke) => {
    if (stroke.color === RAINBOW && stroke.points.length - stroke.segmentStart > 6) {
      stroke.hue = (stroke.hue + 26) % 360;
      newSegment(stroke);
    }
    stroke.segment.setAttribute("d", smooth(stroke.points.slice(stroke.segmentStart)));
  };

  const removeLast = useCallback(() => {
    strokes.current.pop()?.group.remove();
    setCount(strokes.current.length);
  }, []);

  const clearAll = () => {
    strokes.current.forEach((s) => s.group.remove());
    strokes.current = [];
    setCount(0);
  };

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
        removeLast();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, removeLast]);

  return (
    <>
      <svg
        ref={layerRef}
        className={`doodle-layer${active ? " is-active" : ""}`}
        aria-hidden="true"
        onPointerDown={(e) => {
          const layer = layerRef.current;
          if (!active || !layer) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          const group = document.createElementNS(NS, "g");
          layer.appendChild(group);
          const width = color === RAINBOW ? 8 : e.pointerType === "pen" ? 2.5 + e.pressure * 4 : 4.5;
          const stroke: Stroke = {
            color,
            width,
            points: [{ x: e.pageX, y: e.pageY }],
            group,
            segment: document.createElementNS(NS, "path"),
            segmentStart: 0,
            hue: 0,
          };
          newSegment(stroke);
          paint(stroke);
          strokes.current.push(stroke);
          current.current = stroke;
        }}
        onPointerMove={(e) => {
          const stroke = current.current;
          if (!stroke) return;
          const events = e.nativeEvent.getCoalescedEvents?.() ?? [e.nativeEvent];
          for (const ev of events.length ? events : [e.nativeEvent]) {
            stroke.points.push({ x: ev.pageX, y: ev.pageY });
          }
          paint(stroke);
        }}
        onPointerUp={() => {
          if (current.current) setCount(strokes.current.length);
          current.current = null;
        }}
        onPointerCancel={() => {
          if (current.current) setCount(strokes.current.length);
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
              <button type="button" className="doodle-tools__btn" onClick={removeLast} aria-label="Undo last line" disabled={count === 0}>
                <Undo2 size={18} />
              </button>
              <button
                type="button"
                className="doodle-tools__btn"
                onClick={clearAll}
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
