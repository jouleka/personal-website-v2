# Jurgen Leka — Portfolio

The source for [jurgenleka.com](https://jurgenleka.com): a playful, hand-drawn portfolio for Jurgen Leka's software engineering work across enterprise web platforms, native iOS, developer tools, and carefully bounded AI systems.

## What is showcased

- **MySigner** — mobile signing and release automation through a Rails dashboard, API, and Ruby CLI
- **Aichu** — local secret redaction for prompts sent through AI coding agents
- **Subtitle.fm** — AI-assisted, realtime collaborative subtitle production
- **Reading Companion** — a local-first EPUB reader with spoiler-bounded story memory
- **Goldengo** — a privacy-minded native iOS personal-finance app
- **OopsFee** — a cross-platform promises, verification, and accountability product
- **OptionsBot** — paper-only IBKR options research and deterministic execution controls
- **Polymarket Bot** — paper-only prediction-market research with a separate execution and risk service
- **Great Wall of Ideas** — realtime idea discovery, discussion, and remixing
- **Resume Builder** — a typed, configurable, print-ready CV system
- **Chat Application** — an early Angular realtime group-messaging product

Every project gets a hand-drawn doodle on an index card. The eleven cards form a pile you can drag, throw and flip; an index below brings any project straight to the top.

## Art direction

**The Sketchbook.** The whole site is a living, hand-drawn notebook: marker colours (sun, tomato, mint, sky, bubblegum, lilac) on dotted paper, thick ink outlines, hard offset shadows and wobbly corners. Clean SVG paths become hand-drawn ink through a shared `feTurbulence` + `feDisplacementMap` filter (`src/components/sketch/sketch-defs.tsx`). Type is Bricolage Grotesque for display and body, Caveat for handwritten notes and JetBrains Mono for labels.

Each section has something to play with:

- **Hero:** a shipping machine. Press CODE, SHIP, REPEAT: the laptop writes code, a package is tossed into a rocket, the rocket launches, then lands for the next release. Pressing out of order gets a cheeky reply; launches are tallied.
- **Work:** a pile of project cards. Drag or swipe to throw the top card, tap to flip it for the key moment, or use the arrow buttons and keyboard.
- **About:** a "HELLO my name is" badge that greets in other languages, and a browser-tab hoarder that crashes when too many tabs are open.
- **Journey:** a wiggly road that draws itself as you scroll, and a board of toolkit stickers you can drag around.
- **Contact:** the form is a letter. Sending it folds it into a paper plane that flies away.
- **Everywhere:** a pencil button lets visitors draw on the page; strokes stay pinned to the document as you scroll.

Framer Motion drives the interactions and respects the visitor's reduced-motion setting. Lenis smooths desktop wheel scrolling; touch scrolling stays native, and card dragging is horizontal-only so phones can still scroll past the pile.

The custom JL monogram combines a curved J, squared L, and a tomato accent in the Sketchbook ink. `public/logo-mark.svg` is the master vector. Run `npm run brand:generate` to regenerate favicon sizes and the social preview from that source. The social preview is a Sketchbook-style card drawn in `scripts/social-card.mjs`; its text is converted to outlines with `fontkit` from the site's own OFL fonts in `scripts/fonts/`, so it renders the same on any machine.

## Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion, Lenis, SVG filters and a canvas doodle layer
- Resend for the contact form
- OpenNext for Cloudflare deployment

## Local development

```bash
git clone https://github.com/jouleka/personal-website-v2.git
cd personal-website-v2
npm ci
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The site renders without contact-form credentials; configure the values documented in `.env.example` to send messages.

## Verification

`/buzzfetti-test` and `/buzzfetti-test/thanks` are unlisted, noindex pages for
testing consented Buzzfetti visits and a synthetic page goal. Only these pages
load Buzzfetti and allow its exact origin in CSP. The Minilytics gateway skips
injection on these test pages; normal portfolio tracking stays unchanged.

```bash
npm run lint
npm run test:security
npm audit
npm run build
```

## Deployment

Production runs as an OpenNext Cloudflare Worker on `jurgenleka.com` and
`www.jurgenleka.com`. The checked-in Wrangler configuration includes the
Worker entry point, static assets, domain routes, and R2 incremental cache
binding. Contact-form values stay in Cloudflare secrets and are never committed.

Use Node.js 22.18 or newer. `predev` and `prebuild` generate the Cloudflare
binding/runtime declarations from `wrangler.toml`; regenerate them with
`npm run cf:typegen` after changing bindings.

## Security

The custom `worker.mjs` entry point caps contact request bodies at 32 KiB
while streaming, before OpenNext buffers them, and times out stalled bodies
after five seconds. Only same-origin JSON POSTs reach the contact handler.
Other write endpoints are disabled because this portfolio has no Server Actions.

Cloudflare bindings limit contact attempts to five per IP per minute, delivery
to one per email address per minute, and delivery to ten messages per minute
across the site. These counters are approximate and **per Cloudflare location**,
not a global billing quota. Missing or unavailable limiters fail closed. Email
counter keys are hashes, and message content is not logged. A hidden honeypot
discards basic automated submissions without sending email.

The Worker and Next config set CSP, anti-framing, MIME-sniffing, referrer,
permissions, and HTTPS headers; `public/_headers` covers Cloudflare-served
static assets. CSP allows inline bootstrap scripts and motion styles needed
by the statically rendered page, so it is not a nonce-based strict CSP.

The pinned Next.js release includes security patches through 16.3.8. Sharp is
overridden to its patched 0.35.5 release, including Miniflare's exact dependency.
Tailwind 4 removes its vulnerable legacy glob/watch dependencies. Next's lint
plugin still uses an unpatched `braces` dependency through `fast-glob`; the
scoped override in `package.json` replaces just that lint-only glob operation
with the small `tools/eslint-glob` adapter backed by `tinyglobby`. Its directory
matching contract is covered by regression tests. Remove the override when
Next's lint plugin adopts a patched dependency chain.

Recheck the installed lockfile with `npm audit` after dependency changes. Do not
use `npm audit fix --force` to roll deployment or lint tooling back to old majors.

```bash
npm run preview
npm run deploy
```

## License

The site content and design are personal portfolio material. You may use the code as inspiration, but do not present Jurgen's identity, copy, or project work as your own.
