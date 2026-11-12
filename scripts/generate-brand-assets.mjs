import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { buildSocialCard } from "./social-card.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function generate() {
  const mark = await fs.readFile(
    path.join(root, "public/logo-mark.svg"),
    "utf8",
  );
  const paths = mark.match(/<path[^>]+\/>/g).join("");
  const lightPaths = paths
    .replaceAll("#1c1a2e", "#f7f1e3");
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#1c1a2e"/><g transform="translate(42 35) scale(4.38)">${lightPaths}</g></svg>`;
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

  const logoPaths = paths;
  const social = buildSocialCard({ root, logoPaths });
  await sharp(Buffer.from(social))
    .png()
    .toFile(path.join(root, "public/social-preview.png"));
  console.log("Generated logo icons and social preview.");
}
generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
