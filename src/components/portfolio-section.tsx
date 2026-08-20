import { ArrowUpRight, Github } from 'lucide-react';
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
} from '@/components/project-artifacts';

const projects = [
  {
    name: 'Aichu',
    eyebrow: 'Developer security / Rust',
    audience: 'For developers using AI coding agents',
    description: 'A local proxy that detects secret-shaped values in outbound prompts, swaps them for typed placeholders, then restores preserved values in streamed responses.',
    moment: 'Paste a log containing a credential. The provider receives a placeholder; the original value stays on your machine.',
    tags: ['Rust', 'MITM Proxy', 'SSE', 'Local first'],
    url: 'https://github.com/jouleka/aichu',
    artifact: AichuArtifact,
  },
  {
    name: 'Subtitle.fm',
    eyebrow: 'Media platform / SvelteKit + Bun',
    audience: 'For subtitle teams and communities',
    description: 'An AI-assisted subtitle production platform with waveform timing, glossaries, realtime collaboration, reviews, GPU transcription, and a Stremio add-on.',
    moment: 'Generate the first draft, tighten every cue against the waveform, review together, and publish from one workspace.',
    tags: ['SvelteKit', 'Bun', 'Python', 'Yjs'],
    url: 'https://github.com/jouleka/subtitle-fm',
    artifact: SubtitleArtifact,
  },
  {
    name: 'Reading Companion',
    eyebrow: 'Local-first reader / React + FastAPI',
    audience: 'For readers returning to complex books',
    description: 'A self-hosted EPUB reader that builds a chapter-bounded memory of characters, relationships, events, highlights, and where you stopped.',
    moment: 'Ask who someone is in chapter 12 and get the useful context—without facts revealed in chapter 13.',
    tags: ['React', 'FastAPI', 'SQLite', 'PWA'],
    url: 'https://github.com/jouleka/reading-companion',
    artifact: ReadingArtifact,
  },
  {
    name: 'Goldengo',
    eyebrow: 'Native iOS / Swift',
    audience: 'For private, low-friction money tracking',
    description: 'A native personal-finance app with local statement parsing, duplicate detection, budgets, goals, widgets, App Shortcuts, and optional private CloudKit sync.',
    moment: 'Import a bank statement locally, resolve duplicates, then capture the next expense from Siri, the Action Button, or a widget.',
    tags: ['SwiftUI', 'SwiftData', 'CloudKit', '500+ tests'],
    url: 'https://github.com/jouleka/goldengo',
    artifact: GoldengoArtifact,
  },
  {
    name: 'OopsFee',
    eyebrow: 'Accountability app / Expo',
    audience: 'For promises that need consequences',
    description: 'A cross-platform accountability product: make a promise, choose how it is verified, optionally put money at stake, and let the app manage reminders and outcomes.',
    moment: 'Pick the promise, deadline, evidence, and verifier. Friends can sponsor, encourage, or roast you while your streak is on the line.',
    tags: ['React Native', 'Expo', 'Supabase', 'Stripe'],
    url: 'https://github.com/jouleka/Oops-fee',
    artifact: OopsFeeArtifact,
  },
  {
    name: 'OptionsBot',
    eyebrow: 'Research system / Python',
    audience: 'For a single operator on an IBKR paper account',
    description: 'Options research, alerting, and opt-in execution with strategy scoring, deterministic gates, a durable broker ledger, and a persisted kill switch.',
    moment: 'Scan the chain, rank a defined-risk setup, then reject or route it only after freshness, liquidity, sizing, heat, and paper-account checks.',
    tags: ['Python', 'IBKR', 'SQLite', 'Paper only'],
    url: 'https://github.com/jouleka/optionsbot',
    artifact: OptionsArtifact,
  },
  {
    name: 'Polymarket Bot',
    eyebrow: 'Market research / Python',
    audience: 'For prediction-market strategy research',
    description: 'A paper-only research lab where an agent can propose, but a separate execution and risk service owns validation, repricing, sizing, and simulated accounting.',
    moment: 'The reasoning layer suggests a trade. The ERS independently reconstructs the evidence before the paper harness records anything.',
    tags: ['Python', 'Risk Engine', 'Agents', 'Paper only'],
    url: 'https://github.com/jouleka/polymarket-bot',
    artifact: PolymarketArtifact,
  },
  {
    name: 'Great Wall of Ideas',
    eyebrow: 'Community product / Next.js',
    audience: 'For curious people with unfinished ideas',
    description: 'A community wall for publishing ideas, discovering what is trending, discussing them in realtime, and branching someone else’s thought into a remix.',
    moment: 'Post the rough version. Votes and comments surface what resonates; remixes show how one idea becomes a family of better ones.',
    tags: ['Next.js', 'Supabase', 'Realtime', 'RLS'],
    url: 'https://www.greatwallofideas.com',
    sourceUrl: 'https://github.com/jouleka/great-wall-of-ideas',
    artifact: GreatWallArtifact,
  },
  {
    name: 'Resume Builder',
    eyebrow: 'Document system / React',
    audience: 'For developers who want a maintainable CV',
    description: 'A typed, configurable resume system that separates personal data from presentation and produces a responsive, print-ready professional document.',
    moment: 'Change one structured profile config and every experience, skill, project, and contact detail lands in the polished layout.',
    tags: ['React', 'TypeScript', 'Vite', 'Print CSS'],
    url: 'https://github.com/jouleka/cv-template',
    secondaryUrl: '/resume.pdf',
    secondaryLabel: 'Open resume',
    artifact: ResumeArtifact,
  },
  {
    name: 'Chat Application',
    eyebrow: 'Realtime app / Angular',
    audience: 'An early full-stack realtime product',
    description: 'A WhatsApp-inspired Angular client with authentication, direct and group conversations, group discovery, favorites, emoji, and STOMP/SockJS messaging.',
    moment: 'Register, find a group, and move between direct and group conversations while messages arrive over the realtime connection.',
    tags: ['Angular', 'Material', 'STOMP', 'SockJS'],
    url: 'https://github.com/jouleka/Chat-Application',
    artifact: ChatArtifact,
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      <div className="project-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="container relative mx-auto px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid gap-10 border-b border-border pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="mb-4 block text-sm font-mono text-primary">03 — PRODUCT ATLAS</span>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl">
                Built to be used,<br />
                <span className="text-primary">not just displayed</span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-4 lg:pb-1">
              Eleven products, ordered by ambition. Every preview below maps to a real workflow in the code—not a decorative dashboard invented for this portfolio.
            </p>
          </div>

          <div className="mb-12 grid border-y border-border sm:grid-cols-3">
            {[
              ['11', 'selected builds'],
              ['06', 'problem spaces'],
              ['100%', 'real workflows'],
            ].map(([value, label], index) => (
              <div key={label} className={`flex items-baseline gap-3 py-5 sm:px-6 ${index > 0 ? 'border-t border-border sm:border-l sm:border-t-0' : ''}`}>
                <span className="text-2xl font-semibold text-primary">{value}</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          <article className="project-card group mb-8 border border-border bg-card">
            <div className="grid lg:grid-cols-12">
              <div className="flex flex-col justify-between p-7 md:p-10 lg:col-span-6 lg:p-12">
                <div>
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary">Flagship / Mobile delivery</span>
                    <span className="text-xs font-mono text-muted-foreground">01 / 11</span>
                  </div>
                  <p className="mb-3 text-xs text-muted-foreground">For mobile teams tired of signing and release friction</p>
                  <h3 className="text-4xl font-semibold tracking-tight md:text-5xl">MySigner</h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    A Rails dashboard, API, and Ruby CLI that turn mobile signing and store delivery into one repeatable workflow—from certificates and profiles to TestFlight or Google Play.
                  </p>
                  <div className="mt-6 border-l-2 border-primary bg-primary/5 p-4">
                    <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-primary">The product moment</span>
                    <p className="mt-2 text-sm leading-relaxed">Run <code className="text-primary">mysigner ship testflight</code>; the tool validates the build, matches signing assets, and drives the upload.</p>
                  </div>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {['Rails 8', 'Hotwire', 'PostgreSQL', 'Ruby CLI', 'iOS + Android'].map((tag) => (
                      <span key={tag} className="border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-10 flex flex-wrap gap-5">
                  <a href="https://mysigner.dev" target="_blank" rel="noreferrer" className="project-link inline-flex items-center gap-2 text-sm font-medium text-primary">Open product <ArrowUpRight className="h-4 w-4" /></a>
                  <a href="https://github.com/jouleka/my-signer" target="_blank" rel="noreferrer" className="project-link inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><Github className="h-4 w-4" /> Source</a>
                  <a href="https://github.com/jouleka/my-signer-cli" target="_blank" rel="noreferrer" className="project-link inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">CLI repository <ArrowUpRight className="h-4 w-4" /></a>
                </div>
              </div>
              <div className="border-t border-border bg-secondary/30 p-5 md:p-8 lg:col-span-6 lg:flex lg:items-center lg:border-l lg:border-t-0 lg:p-10 [&>div]:w-full">
                <MySignerArtifact />
              </div>
            </div>
          </article>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => {
              const Artifact = project.artifact;
              const number = String(index + 2).padStart(2, '0');
              return (
                <article key={project.name} className="project-card group flex h-full flex-col border border-border bg-card">
                  <div className="border-b border-border bg-secondary/20 p-4 md:p-5"><Artifact /></div>
                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">{project.eyebrow}</span>
                      <span className="font-mono text-xs text-muted-foreground">{number} / 11</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{project.audience}</p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tight">{project.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{project.description}</p>
                    <div className="mt-6 border-l-2 border-primary/70 bg-primary/5 p-4">
                      <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-primary">The product moment</span>
                      <p className="mt-2 text-xs leading-relaxed text-foreground/80">{project.moment}</p>
                    </div>
                    <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-5 text-[11px] text-muted-foreground">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-5">
                      <a href={project.url} target="_blank" rel="noreferrer" className="project-link inline-flex w-fit items-center gap-2 text-sm font-medium text-primary">
                        {project.sourceUrl ? 'Open product' : 'Explore the source'} <ArrowUpRight className="h-4 w-4" />
                      </a>
                      {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="project-link inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><Github className="h-4 w-4" /> Source</a>}
                      {project.secondaryUrl && <a href={project.secondaryUrl} target="_blank" rel="noreferrer" className="project-link inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">{project.secondaryLabel} <ArrowUpRight className="h-4 w-4" /></a>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">These are the selected stories. The repository archive goes further back—and gets weirder.</p>
            <a href="https://github.com/jouleka?tab=repositories" target="_blank" rel="noreferrer" className="project-link inline-flex w-fit items-center gap-2 text-sm font-medium">Browse every public repository <ArrowUpRight className="h-4 w-4 text-primary" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
