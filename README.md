# Jurgen Leka — Portfolio

The source for [jurgenleka.com](https://jurgenleka.com): an editorial portfolio for Jurgen Leka's product engineering work across enterprise web platforms, native iOS, developer tools, and carefully bounded AI systems.

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

Each selected project has a small interface artifact built directly in React and CSS. The portfolio does not depend on a gallery of external screenshots and stays useful in both light and dark themes.

## Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS
- Framer Motion
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

```bash
npm run lint
npm run build
```

## Deployment

The checked-in OpenNext scripts target Cloudflare:

```bash
npm run preview
npm run deploy
```

## License

The site content and design are personal portfolio material. You may use the code as inspiration, but do not present Jurgen's identity, copy, or project work as your own.
