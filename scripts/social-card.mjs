// Builds the 1200×630 "Sketchbook" social preview as a self-contained SVG.
// Text is converted to outlines with fontkit (using the site's own OFL fonts
// in scripts/fonts), so the PNG renders identically on any machine without
// relying on installed system fonts.
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const fontkit = require("fontkit");

const C = {
  paper: "#f7f1e3",
  paperHi: "#fffcf4",
  paper2: "#ede2c8",
  ink: "#1c1a2e",
  inkSoft: "#55526b",
  line: "rgba(28,26,46,0.13)",
  tomato: "#ff5b3a",
  sun: "#ffd23f",
  mint: "#4fd6a0",
  sky: "#7aa2ff",
  bubble: "#ff9ecb",
};

function fonts(root) {
  const dir = path.join(root, "scripts/fonts");
  const bricolage = fontkit.openSync(path.join(dir, "BricolageGrotesque.ttf"));
  const caveat = fontkit.openSync(path.join(dir, "Caveat.ttf"));
  return {
    display: bricolage.getVariation({ wght: 800, opsz: 96, wdth: 100 }),
    bold: bricolage.getVariation({ wght: 700, opsz: 24, wdth: 100 }),
    hand: caveat.getVariation({ wght: 700 }),
  };
}

/** Lays out `text` and returns its outline path plus measured width. */
function outline(font, text, size, x, y, tracking = 0) {
  const scale = size / font.unitsPerEm;
  const run = font.layout(text);
  let pen = 0;
  const parts = [];
  run.glyphs.forEach((glyph, i) => {
    const pos = run.positions[i];
    const d = glyph.path
      .scale(scale, -scale)
      .translate(x + pen + pos.xOffset * scale, y - pos.yOffset * scale)
      .toSVG();
    if (d) parts.push(d);
    pen += pos.xAdvance * scale + tracking;
  });
  return { d: parts.join(" "), width: pen - tracking };
}

/** Maps every absolute coordinate pair of an M/C/L path through fn. */
function mapPath(d, fn) {
  return d.replace(/(-?\d*\.?\d+)[ ,](-?\d*\.?\d+)/g, (_, a, b) => {
    const [x, y] = fn(Number(a), Number(b));
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  });
}

const sparkle = (x, y, r, fill) =>
  `<path d="M${x} ${y - r} C${x + r * 0.1} ${y - r * 0.3} ${x + r * 0.3} ${y - r * 0.1} ${x + r} ${y} C${x + r * 0.3} ${y + r * 0.1} ${x + r * 0.1} ${y + r * 0.3} ${x} ${y + r} C${x - r * 0.1} ${y + r * 0.3} ${x - r * 0.3} ${y + r * 0.1} ${x - r} ${y} C${x - r * 0.3} ${y - r * 0.1} ${x - r * 0.1} ${y - r * 0.3} ${x} ${y - r} Z" fill="${fill}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;

// The hero's shipping machine, mid-launch, in its own 640×470 coordinates.
function machineScene() {
  const code = [
    [96, 56, C.bubble],
    [108, 92, C.sun],
    [108, 64, C.mint],
    [120, 76, C.sky],
    [108, 40, C.sun],
    [96, 24, C.bubble],
  ]
    .map(
      ([x, w, c], i) =>
        `<path d="M${x} ${280 + i * 16} L${x + w} ${280 + i * 16}" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`,
    )
    .join("");
  const puffs = [
    [-60, -2, 26],
    [58, -4, 28],
    [-24, 6, 32],
    [26, 4, 30],
    [-104, -10, 20],
    [102, -12, 22],
    [0, 10, 34],
  ]
    .map(
      ([dx, dy, r]) =>
        `<circle cx="${512 + dx}" cy="${426 + dy}" r="${r}" fill="${C.paperHi}" stroke="${C.ink}" stroke-width="3"/>`,
    )
    .join("");
  const lift = -96;
  return `
    <g filter="url(#rough)">
      <path d="M60 96 C56 78 78 68 92 78 C98 60 128 60 134 80 C150 76 160 92 150 102 Z" fill="${C.paperHi}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M330 60 C326 46 344 38 356 46 C362 32 386 32 390 48 C402 46 410 58 402 66 Z" fill="${C.paperHi}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>
    </g>
    ${sparkle(250, 120, 9, C.sun)}${sparkle(596, 64, 9, C.sun)}${sparkle(190, 40, 8, C.sun)}${sparkle(380, 200, 7, C.sun)}
    <path d="M12 432 C120 428 220 436 330 431 C440 427 540 435 628 430" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
    <g filter="url(#rough)">
      <rect x="74" y="246" width="200" height="146" rx="12" fill="${C.paperHi}" stroke="${C.ink}" stroke-width="4"/>
      <rect x="88" y="260" width="172" height="118" rx="5" fill="${C.ink}"/>
      <path d="M54 392 L294 392 L314 424 C316 429 313 432 308 432 L40 432 C35 432 32 429 34 424 Z" fill="${C.sky}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M146 410 L202 410" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round"/>
    </g>
    ${code}
    <g filter="url(#rough)">
      <path d="M440 432 L452 416 L572 416 L584 432" fill="${C.paper2}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
    </g>
    <g transform="translate(0 ${lift})">
      <path d="M494 428 C498 486 512 520 512 532 C512 520 526 486 530 428 Z" fill="${C.sun}" stroke="${C.tomato}" stroke-width="3.5" stroke-linejoin="round"/>
      <g filter="url(#rough)">
        <path d="M474 364 C446 376 438 396 438 418 L474 412 Z" fill="${C.tomato}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M550 364 C578 376 586 396 586 418 L550 412 Z" fill="${C.tomato}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M490 414 L534 414 L528 428 L496 428 Z" fill="${C.ink}"/>
        <path d="M512 228 C554 266 562 340 550 414 L474 414 C462 340 470 266 512 228 Z" fill="${C.paperHi}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M512 228 C528 242 538 258 544 280 L480 280 C486 258 496 242 512 228 Z" fill="${C.tomato}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
        <circle cx="512" cy="322" r="19" fill="${C.sky}" stroke="${C.ink}" stroke-width="4"/>
        <path d="M502 314 C506 308 512 306 518 308" fill="none" stroke="${C.paperHi}" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M478 380 L546 380" stroke="${C.ink}" stroke-width="3"/>
      </g>
    </g>
    <g filter="url(#rough)">${puffs}</g>`;
}

export function buildSocialCard({ root, logoPaths }) {
  const f = fonts(root);
  const X = 64;
  const size = 138;
  const code = outline(f.display, "Code.", size, X, 262, -5);
  const ship = outline(f.display, "Ship.", size, X, 390, -5);
  const repeat = outline(f.display, "Repeat.", size, X, 518, -5);
  const hello = outline(f.hand, "Hey! I'm Jurgen. I write software.", 46, X, 134);
  const label = outline(f.bold, "JURGEN LEKA · SOFTWARE ENGINEER", 17, 118, 66, 1.6);
  const tagline = outline(f.hand, "web · mobile · dev tools · too many side projects", 31, X, 590);
  const url = outline(f.bold, "jurgenleka.com", 25, 0, 0);

  // Circle around "Ship.", stretched from the site's hand-drawn loop.
  const loop =
    "M168 14 C130 2 52 4 22 20 C2 32 6 58 40 68 C82 80 158 76 186 58 C204 44 192 20 150 12 C120 7 90 8 70 12";
  const box = { x: X - 26, y: 278, w: ship.width + 60, h: 138 };
  const circle = mapPath(loop, (x, y) => [box.x + (x / 200) * box.w, box.y + (y / 80) * box.h]);

  const rx = X + repeat.width + 18;
  const urlX = 1136 - url.width - 30;

  const card = { x: 636, y: 104, w: 516, h: 382 };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="1.4" fill="rgba(28,26,46,0.14)"/></pattern>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0 L0 0 0 24" fill="none" stroke="${C.line}" stroke-width="1"/></pattern>
    <filter id="rough" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="${C.paper}"/>
  <rect width="1200" height="630" fill="url(#dots)"/>

  <g transform="translate(${X} 34) scale(0.5)">${logoPaths}</g>
  <path d="M110 44 L${label.width + 134} 40 L${label.width + 140} 56 L${label.width + 132} 76 L112 78 L106 60 Z" fill="rgba(255,228,140,0.85)"/>
  <path d="${label.d}" fill="${C.ink}"/>

  <path d="${hello.d}" fill="${C.inkSoft}"/>

  <path d="M${X - 14} ${262 - 58} L${X + code.width + 16} ${262 - 64} L${X + code.width + 8} ${262 + 10} L${X - 20} ${262 + 14} Z" fill="${C.sun}" filter="url(#rough)"/>
  <path d="${code.d}" fill="${C.ink}"/>
  <path d="${ship.d}" fill="${C.ink}"/>
  <path d="${circle}" fill="none" stroke="${C.tomato}" stroke-width="6" stroke-linecap="round" filter="url(#rough)"/>
  <path d="${repeat.d}" fill="${C.tomato}"/>
  <g transform="translate(${rx} 420) scale(0.8)" fill="none" stroke="${C.mint}" stroke-width="7" stroke-linecap="round">
    <path d="M62 30 A26 26 0 1 0 64 50"/><path d="M52 22 L64 30 L70 16"/>
  </g>
  <path d="${tagline.d}" fill="${C.inkSoft}"/>

  ${sparkle(580, 168, 18, C.bubble)}

  <g transform="rotate(-2 ${card.x + card.w / 2} ${card.y + card.h / 2})">
    <rect x="${card.x + 9}" y="${card.y + 9}" width="${card.w}" height="${card.h}" rx="22" fill="${C.ink}"/>
    <rect x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" rx="22" fill="${C.paperHi}"/>
    <rect x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" rx="22" fill="url(#grid)"/>
    <svg x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" viewBox="0 0 640 474" overflow="hidden">
      <g transform="translate(0 6)">${machineScene()}</g>
      <g transform="rotate(-7 160 140)">
        <rect x="40" y="104" width="250" height="78" rx="6" fill="${C.paperHi}" stroke="${C.tomato}" stroke-width="6" filter="url(#rough)"/>
        <rect x="50" y="114" width="230" height="58" rx="3" fill="none" stroke="${C.tomato}" stroke-width="2.5"/>
        <path d="${outline(f.display, "SHIPPED!", 42, 0, 0, 1.5).d}" fill="${C.tomato}" transform="translate(${165 - outline(f.display, "SHIPPED!", 42, 0, 0, 1.5).width / 2} 158)"/>
      </g>
    </svg>
    <rect x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" rx="22" fill="none" stroke="${C.ink}" stroke-width="3.5"/>
    <path d="M${card.x + 22} ${card.y - 10} L${card.x + 116} ${card.y - 18} L${card.x + 120} ${card.y + 10} L${card.x + 24} ${card.y + 16} Z" fill="rgba(255,210,63,0.75)"/>
    <path d="M${card.x + card.w - 120} ${card.y - 16} L${card.x + card.w - 22} ${card.y - 6} L${card.x + card.w - 26} ${card.y + 18} L${card.x + card.w - 124} ${card.y + 10} Z" fill="rgba(255,158,203,0.8)"/>
  </g>

  <g transform="rotate(-3 ${urlX + url.width / 2 + 30} 566)">
    <rect x="${urlX - 6}" y="533" width="${url.width + 82}" height="64" rx="32" fill="${C.paperHi}"/>
    <rect x="${urlX}" y="539" width="${url.width + 70}" height="52" rx="26" fill="${C.sun}" stroke="${C.ink}" stroke-width="3"/>
    <path d="${url.d}" fill="${C.ink}" transform="translate(${urlX + 22} 574)"/>
    <path d="M${urlX + url.width + 32} 576 L${urlX + url.width + 48} 558 M${urlX + url.width + 36} 557 L${urlX + url.width + 48} 558 L${urlX + url.width + 48} 570" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
}
