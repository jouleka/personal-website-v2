"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, RotateCcw } from "lucide-react";
import { projects } from "@/lib/projects";
import { Doodle } from "./doodles";
import { Eyebrow, Highlight, Reveal } from "./ink";

const TILTS = [-3, 4, -6, 2, 5, -4, 3, -2, 6, -5, 1];
const VISIBLE = 4;
const pad = (n: number) => String(n + 1).padStart(2, "0");

const faceUp = (deg: number) => {
  const a = ((deg % 360) + 360) % 360;
  return a < 90 || a > 270;
};

// Flips with a 3D turn, but hides each face by opacity past 90° instead of
// relying on backface-visibility, which Safari ignores here.
function Flipper({ flipped, front, back }: { flipped: boolean; front: ReactNode; back: ReactNode }) {
  const rotateY = useMotionValue(0);
  const frontOpacity = useTransform(rotateY, (r) => (faceUp(r) ? 1 : 0));
  const backOpacity = useTransform(rotateY, (r) => (faceUp(r) ? 0 : 1));
  useEffect(() => {
    const controls = animate(rotateY, flipped ? 180 : 0, { type: "spring", stiffness: 200, damping: 20 });
    return () => controls.stop();
  }, [flipped, rotateY]);
  return (
    <motion.div className="card__inner" style={{ rotateY }}>
      <motion.div className="card__face card__front" style={{ opacity: frontOpacity }}>
        {front}
      </motion.div>
      <motion.div className="card__face card__back" style={{ opacity: backOpacity }} aria-hidden={!flipped}>
        {back}
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  const [order, setOrder] = useState(() => projects.map((_, i) => i));
  const [flying, setFlying] = useState<{ id: number; dir: 1 | -1 } | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [thrown, setThrown] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);

  const top = order[0];
  const project = projects[top];
  const flyDir = flying?.dir ?? 1;

  const advance = () => {
    setFlipped(false);
    setOrder((o) => [...o.slice(1), o[0]]);
  };
  const back = () => {
    if (flying) return;
    setFlipped(false);
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  };
  const toss = (dir: 1 | -1 = 1) => {
    if (flying) return;
    setThrown((n) => n + 1);
    setFlying({ id: top, dir });
  };
  const bringToTop = (index: number) => {
    setFlipped(false);
    setOrder((o) => {
      const at = o.indexOf(index);
      return [...o.slice(at), ...o.slice(0, at)];
    });
    stackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (Math.abs(offset.x) > 110 || Math.abs(velocity.x) > 600) {
      toss(offset.x > 0 ? 1 : -1);
    }
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") toss(1);
    else if (event.key === "ArrowLeft") back();
    else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setFlipped((f) => !f);
    }
  };

  return (
    <section id="work" className="work page-width">
      <Reveal className="section-head">
        <Eyebrow n="01">Selected work</Eyebrow>
        <h2>
          A pile of things
          <br />I <Highlight color="var(--bubble)">actually shipped.</Highlight>
        </h2>
        <p>
          Eleven things I couldn&apos;t leave alone. Fling a card off the pile
          to see the next one, or tap it to peek at the back.
        </p>
      </Reveal>

      <div className="work__table">
        <div className="work__stack-col">
          <div
            ref={stackRef}
            className="stack"
            tabIndex={0}
            role="group"
            aria-roledescription="card pile"
            aria-label={`${project.name}, card ${pad(top)} of ${projects.length}. Arrow keys move through the pile, Enter flips the card.`}
            onKeyDown={onKey}
          >
            {order.map((id, pos) => {
              const p = projects[id];
              const isTop = pos === 0;
              const isFlying = flying?.id === id;
              const hidden = pos >= VISIBLE && !isFlying;
              return (
                <motion.div
                  key={p.name}
                  className={`card card--${p.color}${isTop ? " is-top" : ""}`}
                  style={{ zIndex: isFlying ? 50 : projects.length - pos }}
                  initial={false}
                  animate={
                    isFlying
                      ? { x: flyDir * 640, y: -60, rotate: flyDir * 32, opacity: 1, scale: 1 }
                      : {
                          x: isTop ? 0 : pos * 7,
                          y: isTop ? 0 : pos * 9,
                          rotate: isTop ? TILTS[id] * 0.35 : TILTS[id],
                          scale: 1 - pos * 0.035,
                          opacity: hidden ? 0 : 1,
                        }
                  }
                  transition={
                    isFlying
                      ? { duration: 0.38, ease: [0.5, 0, 0.75, 0] }
                      : { type: "spring", stiffness: 260, damping: 24 }
                  }
                  onAnimationComplete={() => {
                    if (isFlying) {
                      setFlying(null);
                      advance();
                    }
                  }}
                  drag={isTop && !flying ? "x" : false}
                  dragSnapToOrigin
                  dragElastic={0.9}
                  onDragEnd={isTop ? onDragEnd : undefined}
                  onTap={isTop ? () => setFlipped((f) => !f) : undefined}
                  whileDrag={{ scale: 1.04, cursor: "grabbing" }}
                  aria-hidden={!isTop}
                >
                  <Flipper
                    flipped={isTop && flipped}
                    front={
                      <>
                      <span className="card__tape" aria-hidden="true" />
                      <div className="card__meta">
                        <span>No. {pad(id)}</span>
                        <span>{p.eyebrow.split(" / ")[0]}</span>
                      </div>
                      <div className="card__art">
                        <Doodle key={`${id}-${isTop}`} name={p.doodle} draw={isTop} />
                      </div>
                      <h3 className="card__name">{p.name}</h3>
                      <p className="card__audience">{p.audience}</p>
                      </>
                    }
                    back={
                      <>
                      <span className="card__label">The moment ✦</span>
                      <p className="card__moment">{p.moment}</p>
                      <ul className="card__tags">
                        {p.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                      <span className="card__flip-hint">tap to flip back</span>
                      </>
                    }
                  />
                </motion.div>
              );
            })}
          </div>

          <div className="stack__controls">
            <button type="button" className="round-btn" onClick={back} aria-label="Previous project">
              <ArrowLeft size={20} />
            </button>
            <button type="button" className="round-btn round-btn--wide" onClick={() => setFlipped((f) => !f)}>
              <RotateCcw size={16} /> Flip
            </button>
            <button type="button" className="round-btn" onClick={() => toss(1)} aria-label="Next project">
              <ArrowRight size={20} />
            </button>
          </div>
          <p className="stack__hint" aria-hidden="true">
            {thrown === 0
              ? "← drag & throw it →"
              : thrown < 11
                ? `${thrown} card${thrown === 1 ? "" : "s"} thrown. ${11 - Math.min(thrown, 11)} to go.`
                : "You went through the whole pile. Respect. ✦"}
          </p>
        </div>

        <div className="work__detail" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.article
              key={project.name}
              className="detail"
              initial={{ opacity: 0, y: 18, rotate: 1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              <span className="detail__count">
                {pad(top)} <i>/</i> {projects.length}
              </span>
              <span className="detail__eyebrow">{project.eyebrow}</span>
              <h3 className="detail__name">{project.name}</h3>
              <p className="detail__audience">{project.audience}</p>
              <p className="detail__description">{project.description}</p>
              <div className="detail__tags">
                {project.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="detail__links">
                <a className="btn btn--ink" href={project.url} target="_blank" rel="noreferrer">
                  {project.url.includes("github.com") ? "Read the code" : "Visit site"}
                  <ArrowUpRight size={17} />
                </a>
                {project.sourceUrl && (
                  <a className="btn btn--paper" href={project.sourceUrl} target="_blank" rel="noreferrer">
                    Source <ArrowUpRight size={17} />
                  </a>
                )}
                {project.secondaryUrl && (
                  <a className="btn btn--paper" href={project.secondaryUrl} target="_blank" rel="noreferrer">
                    {project.secondaryLabel} <ArrowUpRight size={17} />
                  </a>
                )}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <Reveal className="index">
        <span className="index__title">Or pick one straight from the index:</span>
        <ol className="index__list">
          {projects.map((p, i) => (
            <li key={p.name}>
              <button
                type="button"
                className={`index__chip index__chip--${p.color}${i === top ? " is-active" : ""}`}
                onClick={() => bringToTop(i)}
                aria-pressed={i === top}
              >
                <span>{pad(i)}</span>
                {p.name}
              </button>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
