"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Phase =
  | "idle"
  | "coding"
  | "coded"
  | "loading"
  | "launching"
  | "shipped"
  | "landing";

const BUSY: Phase[] = ["coding", "loading", "launching", "landing"];

const CODE_LINES = [
  { x: 96, w: 56, c: "var(--bubble)" },
  { x: 108, w: 92, c: "var(--sun)" },
  { x: 108, w: 64, c: "var(--mint)" },
  { x: 120, w: 76, c: "var(--sky)" },
  { x: 108, w: 40, c: "var(--sun)" },
  { x: 96, w: 24, c: "var(--bubble)" },
];

const PUFFS = [
  { x: -58, y: -4, s: 1.7, d: 0 },
  { x: 60, y: -6, s: 1.8, d: 0.04 },
  { x: -24, y: 4, s: 2.1, d: 0.1 },
  { x: 26, y: 2, s: 2, d: 0.08 },
  { x: -100, y: -12, s: 1.4, d: 0.18 },
  { x: 104, y: -14, s: 1.5, d: 0.2 },
  { x: 0, y: 8, s: 2.3, d: 0.14 },
];

const WRONG: Record<"code" | "ship" | "repeat", Partial<Record<Phase, string>>> = {
  code: {
    coded: "Already written. It even compiles. Hit SHIP!",
    shipped: "It’s already live! Hit REPEAT to land the rocket.",
  },
  ship: {
    idle: "Ship what, exactly? Write some CODE first.",
    shipped: "Already in orbit. REPEAT brings it home.",
  },
  repeat: {
    idle: "Nothing to repeat yet. Start with CODE.",
    coded: "Not so fast. SHIP it first!",
  },
};

function Tally({ count }: { count: number }) {
  const groups = Math.floor(count / 5);
  const rest = count % 5;
  return (
    <span className="tally" aria-hidden="true">
      {Array.from({ length: groups }, (_, g) => (
        <svg key={`g${g}`} viewBox="0 0 44 30" className="tally__group">
          {[6, 14, 22, 30].map((x) => (
            <path key={x} d={`M${x} 4 L${x + 1} 26`} />
          ))}
          <path d="M2 22 L40 8" />
        </svg>
      ))}
      {rest > 0 && (
        <svg viewBox="0 0 44 30" className="tally__group">
          {Array.from({ length: rest }, (_, i) => (
            <motion.path
              key={i}
              d={`M${6 + i * 8} 4 L${7 + i * 8} 26`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </svg>
      )}
    </span>
  );
}

export default function ShippingMachine() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [launches, setLaunches] = useState(0);
  const [note, setNote] = useState("");
  const [nudge, setNudge] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const busy = BUSY.includes(phase);
  const expected =
    phase === "idle" ? "code" : phase === "coded" ? "ship" : phase === "shipped" ? "repeat" : null;

  function press(key: "code" | "ship" | "repeat") {
    if (busy) return;
    if (key !== expected) {
      setNote(WRONG[key][phase] ?? "");
      setNudge(expected);
      later(700, () => setNudge(null));
      return;
    }
    if (key === "code") {
      setNote("Writing code… mostly semicolons.");
      setPhase("coding");
      later(1500, () => {
        setPhase("coded");
        setNote("Tests are green. Package is ready.");
      });
    } else if (key === "ship") {
      setNote("Loading the payload…");
      setPhase("loading");
      later(850, () => {
        setPhase("launching");
        setNote("3… 2… 1…");
      });
      later(2600, () => {
        setPhase("shipped");
        setNote(`v1.${launches} is live. Users are clicking things.`);
      });
    } else {
      setNote("Bringing the rocket home. Reuse everything.");
      setPhase("landing");
      later(1700, () => {
        setLaunches((n) => n + 1);
        setPhase("idle");
        setNote("Landed. Same rocket, next idea.");
      });
    }
  }

  const showCode = phase !== "idle" && phase !== "landing";
  const showBox = phase === "coded" || phase === "loading";
  const rocketGone = phase === "launching" || phase === "shipped";
  const flame = phase === "launching" || phase === "landing";

  return (
    <div className="machine">
      <div className="machine__paper">
        <span className="tape tape--tl" aria-hidden="true" />
        <span className="tape tape--tr" aria-hidden="true" />

        <svg
          className="machine__scene"
          viewBox="0 0 640 470"
          role="img"
          aria-label="A sketched laptop beside a rocket on a launch pad"
        >
          {/* sky details */}
          <g className="machine__cloud machine__cloud--a" filter="url(#rough)">
            <path
              d="M60 96 C56 78 78 68 92 78 C98 60 128 60 134 80 C150 76 160 92 150 102 Z"
              fill="var(--paper-hi)"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </g>
          <g className="machine__cloud machine__cloud--b" filter="url(#rough)">
            <path
              d="M330 60 C326 46 344 38 356 46 C362 32 386 32 390 48 C402 46 410 58 402 66 Z"
              fill="var(--paper-hi)"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </g>
          {[
            [250, 120],
            [592, 70],
            [190, 40],
            [560, 196],
          ].map(([x, y], i) => (
            <path
              key={i}
              className="machine__star"
              style={{ animationDelay: `${i * 0.45}s` }}
              d={`M${x} ${y - 9} L${x + 2.5} ${y - 2.5} L${x + 9} ${y} L${x + 2.5} ${y + 2.5} L${x} ${y + 9} L${x - 2.5} ${y + 2.5} L${x - 9} ${y} L${x - 2.5} ${y - 2.5} Z`}
              fill="var(--sun)"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          ))}

          {/* ground */}
          <path
            d="M12 432 C120 428 220 436 330 431 C440 427 540 435 628 430"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#rough)"
          />
          <g stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" opacity="0.35">
            <path d="M40 446 L60 446" />
            <path d="M200 450 L236 450" />
            <path d="M380 446 L400 446" />
            <path d="M560 452 L600 452" />
          </g>

          {/* laptop */}
          <g filter="url(#rough)">
            <rect x="74" y="246" width="200" height="146" rx="12" fill="var(--paper-hi)" stroke="var(--ink)" strokeWidth="4" />
            <rect x="88" y="260" width="172" height="118" rx="5" fill="var(--ink)" />
            <path
              d="M54 392 L294 392 L314 424 C316 429 313 432 308 432 L40 432 C35 432 32 429 34 424 Z"
              fill="var(--sky)"
              stroke="var(--ink)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path d="M146 410 L202 410" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="174" cy="253" r="2.5" fill="var(--ink)" />
          </g>
          {/* screen contents */}
          <g strokeLinecap="round" strokeWidth="6" fill="none">
            {CODE_LINES.map((line, i) => (
              <motion.path
                key={i}
                d={`M${line.x} ${280 + i * 16} L${line.x + line.w} ${280 + i * 16}`}
                stroke={line.c}
                initial={false}
                animate={{ pathLength: showCode ? 1 : 0, opacity: showCode ? 1 : 0 }}
                transition={{
                  duration: showCode ? 0.22 : 0.15,
                  delay: showCode && phase === "coding" ? i * 0.2 : 0,
                }}
              />
            ))}
          </g>
          {!showCode && (
            <rect className="machine__cursor" x="98" y="273" width="10" height="16" fill="var(--mint)" />
          )}

          {/* package */}
          <AnimatePresence>
            {showBox && (
              <motion.g
                key="box"
                initial={{ scale: 0, y: -40, opacity: 0 }}
                animate={
                  phase === "loading"
                    ? {
                        x: [0, 90, 168],
                        y: [0, -120, -74],
                        rotate: [0, -30, -110],
                        scale: [1, 0.95, 0],
                        opacity: 1,
                      }
                    : { scale: 1, y: 0, x: 0, rotate: 0, opacity: 1 }
                }
                exit={{ opacity: 0 }}
                transition={
                  phase === "loading"
                    ? { duration: 0.8, ease: "easeInOut" }
                    : { type: "spring", stiffness: 380, damping: 14 }
                }
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                filter="url(#rough)"
              >
                <rect x="306" y="390" width="46" height="40" rx="3" fill="var(--kraft)" stroke="var(--ink)" strokeWidth="3.5" />
                <path d="M306 402 L352 402 M329 390 L329 402" stroke="var(--ink)" strokeWidth="3" />
                <text x="329" y="423" textAnchor="middle" className="machine__glyph">
                  {"</>"}
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* launch pad */}
          <g filter="url(#rough)">
            <path d="M440 432 L452 416 L572 416 L584 432" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
            <path d="M470 416 L476 432 M512 416 L512 432 M554 416 L548 432" stroke="var(--ink)" strokeWidth="2.5" />
          </g>

          {/* rocket */}
          <motion.g
            initial={false}
            animate={
              phase === "launching"
                ? { y: [0, 3, -3, 2, -720], x: [0, -3, 3, -2, 0] }
                : phase === "shipped"
                  ? { y: -720 }
                  : phase === "landing"
                    ? { y: [-720, -40, 0], x: 0 }
                    : phase === "loading"
                      ? { y: 0, x: [0, -2, 2, -2, 0] }
                      : { y: 0, x: 0 }
            }
            transition={
              phase === "launching"
                ? { duration: 1.75, times: [0, 0.1, 0.2, 0.3, 1], ease: [0.6, 0, 0.9, 0.6] }
                : phase === "landing"
                  ? { duration: 1.5, times: [0, 0.75, 1], ease: "easeOut" }
                  : phase === "loading"
                    ? { duration: 0.4, delay: 0.7 }
                    : { duration: 0 }
            }
          >
            <g className={rocketGone || phase === "landing" ? "" : "machine__idle-bob"}>
              {/* flame */}
              <motion.path
                d="M496 428 C500 470 512 492 512 500 C512 492 524 470 528 428 Z"
                fill="var(--sun)"
                stroke="var(--tomato)"
                strokeWidth="3.5"
                strokeLinejoin="round"
                initial={false}
                animate={flame ? { scaleY: [0.5, 1.15, 0.8, 1.1], opacity: 1 } : { scaleY: 0, opacity: 0 }}
                transition={flame ? { duration: 0.25, repeat: Infinity, repeatType: "mirror" } : { duration: 0.15 }}
                style={{ transformBox: "fill-box", transformOrigin: "top" }}
              />
              <g filter="url(#rough)">
                <path d="M474 364 C446 376 438 396 438 418 L474 412 Z" fill="var(--tomato)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M550 364 C578 376 586 396 586 418 L550 412 Z" fill="var(--tomato)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M490 414 L534 414 L528 428 L496 428 Z" fill="var(--ink)" />
                <path
                  d="M512 228 C554 266 562 340 550 414 L474 414 C462 340 470 266 512 228 Z"
                  fill="var(--paper-hi)"
                  stroke="var(--ink)"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path d="M512 228 C528 242 538 258 544 280 L480 280 C486 258 496 242 512 228 Z" fill="var(--tomato)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
                <circle cx="512" cy="322" r="19" fill="var(--sky)" stroke="var(--ink)" strokeWidth="4" />
                <path d="M502 314 C506 308 512 306 518 308" fill="none" stroke="var(--paper-hi)" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M478 380 L546 380" stroke="var(--ink)" strokeWidth="3" />
                <text x="512" y="402" textAnchor="middle" className="machine__decal">
                  JL-1
                </text>
              </g>
            </g>
          </motion.g>

          {/* smoke */}
          {flame && (
            <g key={phase} transform="translate(512 424)" filter="url(#rough)">
              {PUFFS.map((p, i) => (
                <circle
                  key={i}
                  className="machine__puff"
                  r="16"
                  fill="var(--paper-hi)"
                  stroke="var(--ink)"
                  strokeWidth="3"
                  style={
                    {
                      "--dx": `${p.x}px`,
                      "--dy": `${p.y - 6}px`,
                      "--s": p.s,
                      animationDelay: `${phase === "landing" ? 0.95 + p.d : p.d}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </g>
          )}

          {/* shipped banner */}
          <AnimatePresence>
            {phase === "shipped" && (
              <motion.g
                key="banner"
                initial={{ scale: 0, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: -6, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <g filter="url(#rough)">
                  <rect x="392" y="236" width="230" height="80" rx="6" fill="var(--paper-hi)" stroke="var(--tomato)" strokeWidth="6" />
                  <rect x="402" y="246" width="210" height="60" rx="3" fill="none" stroke="var(--tomato)" strokeWidth="2.5" />
                </g>
                <text x="507" y="288" textAnchor="middle" className="machine__stamp">
                  SHIPPED!
                </text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        <div className="machine__hud">
          <p className="machine__note" role="status" aria-live="polite">
            {note || "Psst. The buttons below actually work."}
          </p>
          <div className="machine__count">
            <span>launches:</span>
            {launches === 0 ? <em>none yet</em> : <Tally count={launches} />}
            <span className="sr-only">{launches}</span>
          </div>
        </div>
      </div>

      <div className="machine__keys" role="group" aria-label="Shipping machine controls">
        {phase === "idle" && launches === 0 && (
          <span className="machine__hint" aria-hidden="true">
            start here
            <svg viewBox="0 0 60 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M6 6 C30 6 44 16 46 40" />
              <path d="M36 32 L46 42 L54 30" />
            </svg>
          </span>
        )}
        {(
          [
            ["code", "Code", "1"],
            ["ship", "Ship", "2"],
            ["repeat", "Repeat", "3"],
          ] as const
        ).map(([key, label, n]) => (
          <motion.button
            key={key}
            type="button"
            className={`key key--${key}${expected === key ? " is-next" : ""}`}
            onClick={() => press(key)}
            aria-disabled={busy || expected !== key}
            animate={nudge === key ? { rotate: [0, -6, 6, -4, 4, 0], scale: [1, 1.08, 1] } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="key__n">{n}</span>
            <span className="key__label">{label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
