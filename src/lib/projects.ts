import {
  AichuArtifact,
  ChatArtifact,
  GoldengoArtifact,
  GreatWallArtifact,
  MySignerArtifact,
  OopsFeeArtifact,
  OptionsArtifact,
  PolymarketArtifact,
  ReadingArtifact,
  ResumeArtifact,
  SubtitleArtifact,
} from "@/components/project-artifacts";

export const projects = [
  {
    name: "MySigner",
    eyebrow: "Mobile delivery / Rails + Ruby",
    audience: "For mobile teams tired of release friction",
    description:
      "A Rails dashboard, API, and Ruby CLI that turn mobile signing and store delivery into one repeatable workflow—from certificates and profiles to TestFlight or Google Play.",
    moment:
      "Run mysigner ship testflight; the tool validates the build, matches signing assets, and drives the upload.",
    tags: ["Rails 8", "Hotwire", "PostgreSQL", "Ruby CLI"],
    url: "https://mysigner.dev",
    sourceUrl: "https://github.com/jouleka/my-signer",
    artifact: MySignerArtifact,
  },
  {
    name: "Aichu",
    eyebrow: "Developer security / Rust",
    audience: "For developers using AI coding agents",
    description:
      "A local proxy that detects secret-shaped values in outbound prompts, swaps them for typed placeholders, then restores preserved values in streamed responses.",
    moment:
      "Paste a log containing a credential. The provider receives a placeholder; the original value stays on your machine.",
    tags: ["Rust", "MITM Proxy", "SSE", "Local first"],
    url: "https://github.com/jouleka/aichu",
    artifact: AichuArtifact,
  },
  {
    name: "Subtitle.fm",
    eyebrow: "Media platform / SvelteKit + Bun",
    audience: "For subtitle teams and communities",
    description:
      "An AI-assisted subtitle production platform with waveform timing, glossaries, realtime collaboration, reviews, GPU transcription, and a Stremio add-on.",
    moment:
      "Generate the first draft, tighten every cue against the waveform, review together, and publish from one workspace.",
    tags: ["SvelteKit", "Bun", "Python", "Yjs"],
    url: "https://github.com/jouleka/subtitle-fm",
    artifact: SubtitleArtifact,
  },
  {
    name: "Reading Companion",
    eyebrow: "Local-first reader / React + FastAPI",
    audience: "For readers returning to complex books",
    description:
      "A self-hosted EPUB reader that builds a chapter-bounded memory of characters, relationships, events, highlights, and where you stopped.",
    moment:
      "Ask who someone is in chapter 12 and get the useful context—without facts revealed in chapter 13.",
    tags: ["React", "FastAPI", "SQLite", "PWA"],
    url: "https://github.com/jouleka/reading-companion",
    artifact: ReadingArtifact,
  },
  {
    name: "Goldengo",
    eyebrow: "Native iOS / Swift",
    audience: "For private, low-friction money tracking",
    description:
      "A native personal-finance app with local statement parsing, duplicate detection, budgets, goals, widgets, App Shortcuts, and optional private CloudKit sync.",
    moment:
      "Import a bank statement locally, resolve duplicates, then capture the next expense from Siri, the Action Button, or a widget.",
    tags: ["SwiftUI", "SwiftData", "CloudKit", "500+ tests"],
    url: "https://github.com/jouleka/goldengo",
    artifact: GoldengoArtifact,
  },
  {
    name: "OopsFee",
    eyebrow: "Accountability app / Expo",
    audience: "For promises that need consequences",
    description:
      "A cross-platform accountability product: make a promise, choose how it is verified, optionally put money at stake, and let the app manage reminders and outcomes.",
    moment:
      "Pick the promise, deadline, evidence, and verifier. Friends can sponsor, encourage, or roast you while your streak is on the line.",
    tags: ["React Native", "Expo", "Supabase", "Stripe"],
    url: "https://github.com/jouleka/Oops-fee",
    artifact: OopsFeeArtifact,
  },
  {
    name: "OptionsBot",
    eyebrow: "Research system / Python",
    audience: "For a single operator on an IBKR paper account",
    description:
      "Options research, alerting, and opt-in execution with strategy scoring, deterministic gates, a durable broker ledger, and a persisted kill switch.",
    moment:
      "Scan the chain, rank a defined-risk setup, then reject or route it only after freshness, liquidity, sizing, heat, and paper-account checks.",
    tags: ["Python", "IBKR", "SQLite", "Paper only"],
    url: "https://github.com/jouleka/optionsbot",
    artifact: OptionsArtifact,
  },
  {
    name: "Polymarket Bot",
    eyebrow: "Market research / Python",
    audience: "For prediction-market strategy research",
    description:
      "A paper-only research lab where an agent can propose, but a separate execution and risk service owns validation, repricing, sizing, and simulated accounting.",
    moment:
      "The reasoning layer suggests a trade. The ERS independently reconstructs the evidence before the paper harness records anything.",
    tags: ["Python", "Risk Engine", "Agents", "Paper only"],
    url: "https://github.com/jouleka/polymarket-bot",
    artifact: PolymarketArtifact,
  },
  {
    name: "Great Wall of Ideas",
    eyebrow: "Community product / Next.js",
    audience: "For curious people with unfinished ideas",
    description:
      "A community wall for publishing ideas, discovering what is trending, discussing them in realtime, and branching someone else’s thought into a remix.",
    moment:
      "Post the rough version. Votes and comments surface what resonates; remixes show how one idea becomes a family of better ones.",
    tags: ["Next.js", "Supabase", "Realtime", "RLS"],
    url: "https://www.greatwallofideas.com",
    sourceUrl: "https://github.com/jouleka/great-wall-of-ideas",
    artifact: GreatWallArtifact,
  },
  {
    name: "Resume Builder",
    eyebrow: "Document system / React",
    audience: "For developers who want a maintainable CV",
    description:
      "A typed, configurable resume system that separates personal data from presentation and produces a responsive, print-ready professional document.",
    moment:
      "Change one structured profile config and every experience, skill, project, and contact detail lands in the polished layout.",
    tags: ["React", "TypeScript", "Vite", "Print CSS"],
    url: "https://github.com/jouleka/cv-template",
    secondaryUrl: "/resume.pdf",
    secondaryLabel: "Open resume",
    artifact: ResumeArtifact,
  },
  {
    name: "Chat Application",
    eyebrow: "Realtime app / Angular",
    audience: "An early full-stack realtime product",
    description:
      "A WhatsApp-inspired Angular client with authentication, direct and group conversations, group discovery, favorites, emoji, and STOMP/SockJS messaging.",
    moment:
      "Register, find a group, and move between direct and group conversations while messages arrive over the realtime connection.",
    tags: ["Angular", "Material", "STOMP", "SockJS"],
    url: "https://github.com/jouleka/Chat-Application",
    artifact: ChatArtifact,
  },
];
