import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function generate() {
  const mark = await fs.readFile(
    path.join(root, "public/logo-mark.svg"),
    "utf8",
  );
  const paths = mark.match(/<path[^>]+\/>/g).join("");
  const lightPaths = paths
    .replaceAll("#302e28", "#eeece2")
    .replaceAll("#9e4b36", "#c47854");
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#302e28"/><g transform="translate(42 35) scale(4.38)">${lightPaths}</g></svg>`;
  await fs.writeFile(path.join(root, "public/favicon.svg"), icon);
  for (const [size, file] of [
    [16, "favicon-16x16.png"],
    [32, "favicon-32x32.png"],
    [180, "apple-touch-icon.png"],
    [192, "android-chrome-192x192.png"],
    [512, "android-chrome-512x512.png"],
  ]) {
    await sharp(Buffer.from(icon))
      .resize(size, size)
      .png()
      .toFile(path.join(root, "public", file));
  }
  const png = await sharp(Buffer.from(icon)).resize(48, 48).png().toBuffer();
  const ico = Buffer.alloc(22);
  ico.writeUInt16LE(1, 2);
  ico.writeUInt16LE(1, 4);
  ico[6] = 48;
  ico[7] = 48;
  ico.writeUInt16LE(1, 10);
  ico.writeUInt16LE(32, 12);
  ico.writeUInt32LE(png.length, 14);
  ico.writeUInt32LE(22, 18);
  await fs.writeFile(
    path.join(root, "public/favicon.ico"),
    Buffer.concat([ico, png]),
  );

  const rings = Array.from(
    { length: 26 },
    (_, i) =>
      `<ellipse cx="910" cy="315" rx="${12 + i * 5.2}" ry="162" fill="none" stroke="${i % 3 === 0 ? "#b56548" : "#9e4b36"}" stroke-width="4" transform="rotate(-25 910 315)"/>`,
  ).join("");
  const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#eeece2"/><g transform="translate(52 13) scale(.6)">${paths}</g><text x="126" y="52" font-family="Arial" font-size="19" fill="#302e28">Jurgen Leka / Product engineer</text><text x="1145" y="52" text-anchor="end" font-family="Arial" font-size="14" fill="#69675c">BASED IN EUROPE</text><path d="M55 89H1145M55 551H1145" stroke="#cfcec0"/><text x="55" y="233" font-family="Arial" font-weight="bold" font-size="135" letter-spacing="-9" fill="#302e28">Code.</text><text x="55" y="353" font-family="Arial" font-weight="bold" font-size="135" letter-spacing="-9" fill="#302e28">Ship.</text><text x="55" y="477" font-family="Georgia" font-style="italic" font-size="137" letter-spacing="-7" fill="#9e4b36">Repeat.</text>${rings}<text x="55" y="594" font-family="Arial" font-size="18" fill="#69675c">Web · iOS · Developer tools · AI</text><text x="1145" y="594" text-anchor="end" font-family="Arial" font-size="18" fill="#302e28">jurgenleka.com ↗</text></svg>`;
  await sharp(Buffer.from(social))
    .png()
    .toFile(path.join(root, "public/social-preview.png"));
  console.log("Generated logo icons and social preview.");
}
generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
