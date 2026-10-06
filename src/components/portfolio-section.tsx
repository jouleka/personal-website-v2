"use client";
import { useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Reveal } from "./motion-system";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Leaf,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { projects } from "@/lib/projects";

function SignerStudy() {
  return (
    <div
      className="signer-study"
      role="img"
      aria-label="MySigner interface study: certificate validation, signing profiles, and a repeatable release workflow"
    >
      <div className="study-browser">
        <span>
          <i />
          <i />
          <i />
        </span>
        <small>mysigner.dev / releases</small>
        <ShieldCheck size={13} />
      </div>
      <div className="signer-body">
        <div className="study-app-label">
          <span className="signer-logo">m.</span>
          <span>MySigner</span>
          <small>WORKSPACE / JL</small>
        </div>
        <div className="signer-headline">
          <div>
            <span className="study-kicker">FROM BUILD TO STORE</span>
            <h4>
              A good day
              <br />
              to ship.
            </h4>
          </div>
          <span className="release-stamp">
            <Check size={22} />
            Ready to release
          </span>
        </div>
        <div className="release-steps">
          {[
            "Certificates verified",
            "Signing profile matched",
            "Upload accepted",
          ].map((step, index) => (
            <div key={step}>
              <span>0{index + 1}</span>
              <p>{step}</p>
              <Check size={14} />
            </div>
          ))}
        </div>
        <div className="study-command">
          <span>$</span> mysigner ship testflight{" "}
          <span className="terminal-cursor" />
        </div>
      </div>
    </div>
  );
}
function FinanceStudy() {
  return (
    <div
      className="finance-study"
      role="img"
      aria-label="Goldengo interface study: a private native iOS finance dashboard with illustrative sample balances"
    >
      <span className="finance-disc" />
      <div className="phone">
        <div className="phone-status">
          <span>9:41</span>
          <span className="phone-island" />
          <span>••• ▰</span>
        </div>
        <div className="phone-content">
          <div className="phone-brand">
            <Leaf size={18} />
            <span>goldengo</span>
            <span className="phone-avatar">J</span>
          </div>
          <span className="study-kicker">THIS MONTH</span>
          <p className="phone-balance">
            €2,480<span>.00</span>
          </p>
          <p className="phone-subtitle">Your month, at a glance</p>
          <div className="phone-chart">
            {[28, 44, 38, 58, 50, 68, 83, 64, 78, 96].map((height, index) => (
              <span key={index} style={{ height: height + "%" }} />
            ))}
          </div>
          <div className="phone-budget">
            <span>Monthly budget</span>
            <strong>68%</strong>
            <span className="budget-track">
              <i />
            </span>
            <small>€794 left in your budget.</small>
          </div>
          <div className="phone-transaction">
            <span>☕</span>
            <div>
              Coffee break<small>Food & coffee</small>
            </div>
            <strong>−€4.50</strong>
          </div>
          <div className="phone-nav">
            <span>Overview</span>
            <span>Activity</span>
            <span>Goals</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function PrivacyStudy() {
  return (
    <div
      className="privacy-study"
      role="img"
      aria-label="Aichu interface study showing a credential replaced locally with a safe placeholder"
    >
      <div className="privacy-terminal">
        <div className="privacy-bar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>aichu / local proxy</span>
          <ShieldCheck size={15} />
        </div>
        <div className="privacy-content">
          <p className="privacy-command">$ aichu protect</p>
          <p className="privacy-muted">Your context. Your machine.</p>
          <div className="privacy-line">
            <span>01</span>
            <p>Debug this request:</p>
          </div>
          <div className="privacy-line secret-line">
            <span>02</span>
            <p>
              api_key = <s>sk-••••-7F2C</s>
            </p>
          </div>
          <div className="privacy-divider">
            <ArrowDown size={18} />
            <span>REDACTED BEFORE IT LEAVES</span>
          </div>
          <div className="privacy-safe">«SECRET_API_KEY_001»</div>
          <div className="privacy-foot">
            <span className="status-dot" />
            Original stays local. Context keeps moving.
          </div>
        </div>
      </div>
    </div>
  );
}
function SubtitleStudy() {
  return (
    <div
      className="subtitle-study"
      role="img"
      aria-label="Subtitle.fm interface study showing a waveform and collaborative subtitle timing"
    >
      <div className="subtitle-window">
        <div className="subtitle-toolbar">
          <strong>subtitle.fm</strong>
          <span>A story worth sharing</span>
          <div className="collaborators">
            <i>JL</i>
            <i>AM</i>
            <i>+1</i>
          </div>
        </div>
        <div className="subtitle-frame">
          <span>SCENE 04 / THE RETURN</span>
          <div className="scene-disc" />
          <div className="scene-hill" />
          <p>
            Every story deserves
            <br />
            <em>to be understood.</em>
          </p>
        </div>
        <div className="subtitle-timeline">
          <span>01:24:06</span>
          <div className="study-wave">
            {Array.from({ length: 48 }, (_, index) => (
              <i
                key={index}
                style={{
                  height: 18 + ((index * 17 + index * index * 3) % 69) + "%",
                }}
              />
            ))}
          </div>
          <div className="subtitle-cue">
            01:24:08 <span>Timing, language, and context—in sync.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
const featured = [
  {
    name: "MySigner",
    number: "01",
    type: "DEVELOPER TOOLS",
    description: "App signing without the usual headache.",
    color: "olive",
    study: SignerStudy,
    url: "https://mysigner.dev",
    tags: "Rails · Ruby CLI · iOS + Android",
  },
  {
    name: "Goldengo",
    number: "02",
    type: "NATIVE IOS",
    description: "Know where your money went. Keep the data yours.",
    color: "peach",
    study: FinanceStudy,
    url: "https://github.com/jouleka/goldengo",
    tags: "SwiftUI · SwiftData · CloudKit",
  },
  {
    name: "Aichu",
    number: "03",
    type: "LOCAL PRIVACY",
    description: "Use AI. Keep your secrets off the internet.",
    color: "lilac",
    study: PrivacyStudy,
    url: "https://github.com/jouleka/aichu",
    tags: "Rust · Local proxy · AI tooling",
  },
  {
    name: "Subtitle.fm",
    number: "04",
    type: "COLLABORATIVE MEDIA",
    description: "Subtitles, translated and timed together.",
    color: "clay",
    study: SubtitleStudy,
    url: "https://github.com/jouleka/subtitle-fm",
    tags: "SvelteKit · Bun · Python · Yjs",
  },
];
const filters = [
  "Everything",
  "Web & tools",
  "Mobile",
  "AI & research",
] as const;

function FeaturedProject({
  project,
  index,
}: {
  project: (typeof featured)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const artScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.06]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const x = useSpring(cursorX, { stiffness: 250, damping: 25 });
  const y = useSpring(cursorY, { stiffness: 250, damping: 25 });
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - rect.left);
    cursorY.set(event.clientY - rect.top);
  }
  return (
    <article
      ref={ref}
      className={`featured-project featured-${project.color}`}
      style={{ zIndex: index + 1 }}
    >
      <div
        className={`project-poster poster-${project.color}`}
        onPointerMove={move}
      >
        <div className="poster-meta">
          <span>{project.type}</span>
          <span>JL / {project.number}</span>
        </div>
        <motion.div className="poster-art" style={{ y: artY, scale: artScale }}>
          <project.study />
        </motion.div>
        <div className="poster-bottom">
          <span>INTERFACE STUDY</span>
          <span>{project.tags}</span>
        </div>
        <a
          className="poster-hitarea"
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Explore ${project.name}`}
        />
        <motion.span
          className="project-cursor"
          aria-hidden="true"
          style={{ x, y }}
        >
          View <ArrowUpRight size={19} />
        </motion.span>
      </div>
      <div className="featured-info">
        <span className="feature-number" aria-hidden="true">
          {project.number}
          <small>/ 04</small>
        </span>
        <div>
          <span className="eyebrow">{project.type}</span>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
        <a
          className="project-arrow"
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.name}`}
        >
          <span>Explore project</span>
          <ArrowUpRight size={24} />
        </a>
      </div>
    </article>
  );
}
type Filter = (typeof filters)[number];
function matchesFilter(name: string, filter: Filter) {
  if (filter === "Everything") return true;
  if (filter === "Mobile") return ["Goldengo", "OopsFee"].includes(name);
  if (filter === "AI & research")
    return [
      "Aichu",
      "Subtitle.fm",
      "Reading Companion",
      "OptionsBot",
      "Polymarket Bot",
    ].includes(name);
  return [
    "MySigner",
    "Great Wall of Ideas",
    "Resume Builder",
    "Chat Application",
  ].includes(name);
}
export default function PortfolioSection() {
  const [filter, setFilter] = useState<Filter>("Everything");
  const filteredProjects = projects.filter((project) =>
    matchesFilter(project.name, filter),
  );
  return (
    <section id="portfolio" className="portfolio-section page-width">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">01 / Selected work</span>
          <h2>
            Made it.
            <br />
            <em>Shipped it.</em>
          </h2>
        </div>
        <p>
          A few recent projects.
          <br />
          Scroll through. Pick one. Get into it.
        </p>
      </Reveal>
      <div className="featured-grid">
        {featured.map((project, index) => (
          <FeaturedProject key={project.name} project={project} index={index} />
        ))}
      </div>
      <div className="project-index" id="project-index">
        <div className="index-heading">
          <div>
            <span className="eyebrow">There&apos;s more</span>
            <h3>The project archive.</h3>
          </div>
          <a
            href="https://github.com/jouleka?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            More on GitHub <ArrowUpRight size={17} />
          </a>
        </div>
        <div
          className="index-filters"
          role="group"
          aria-label="Filter projects"
        >
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
              {item === "Everything" && <span>11</span>}
            </button>
          ))}
          <span className="index-count" role="status">
            {filteredProjects.length} projects
          </span>
        </div>
        <div className="project-rows">
          {filteredProjects.map((project) => {
            const Artifact = project.artifact;
            return (
              <details key={project.name} className="index-row">
                <summary>
                  <span className="index-number">
                    {String(projects.indexOf(project) + 1).padStart(2, "0")}
                  </span>
                  <span className="index-name">{project.name}</span>
                  <span className="index-type">
                    {project.eyebrow.split(" / ")[0]}
                  </span>
                  <ChevronDown size={20} />
                </summary>
                <div className="index-detail">
                  <div>
                    <span className="eyebrow">{project.audience}</span>
                    <p>{project.description}</p>
                    <p className="project-moment">{project.moment}</p>
                    <div className="index-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="index-links">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-link"
                      >
                        {project.sourceUrl ? "Open product" : "Explore source"}{" "}
                        <ArrowUpRight size={16} />
                      </a>
                      {project.sourceUrl && (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-link"
                        >
                          <Code2 size={16} /> Source
                        </a>
                      )}
                      {project.name === "MySigner" && (
                        <a
                          href="https://github.com/jouleka/my-signer-cli"
                          target="_blank"
                          rel="noreferrer"
                          className="text-link"
                        >
                          CLI source <ArrowUpRight size={16} />
                        </a>
                      )}
                      {project.secondaryUrl && (
                        <a
                          href={project.secondaryUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-link"
                        >
                          {project.secondaryLabel} <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="index-artifact">
                    <Artifact />
                    <small>Workflow illustration</small>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
      <div className="work-footnote">
        <Smartphone size={16} />
        <span>
          Interfaces above are coded studies of real products. Explore the
          repositories for the full story.
        </span>
      </div>
    </section>
  );
}
