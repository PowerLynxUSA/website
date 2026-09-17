// Generates responsive WebP variants for every product source image.
//
// For each `src/assets/products/<name>.png` this produces:
//   <name>-400.webp, <name>-800.webp, <name>-1200.webp, <name>-full.webp
// capped to the source's own dimensions (never upscaled). The original PNGs
// are kept as source material but are no longer imported by app code.
//
// Re-run this script whenever a product image is added or replaced:
//   node scripts/optimize-product-images.mjs
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_DIR = path.resolve(import.meta.dirname, '../src/assets/products');
const WIDTHS = [400, 800, 1200];
const QUALITY = 82;

async function main() {
  const files = (await readdir(SRC_DIR)).filter((f) => f.toLowerCase().endsWith('.png'));
  await mkdir(SRC_DIR, { recursive: true });

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const base = file.replace(/\.png$/i, '');
    const srcPath = path.join(SRC_DIR, file);
    const srcBuffer = await sharp(srcPath).toBuffer();
    const meta = await sharp(srcBuffer).metadata();
    totalBefore += srcBuffer.length;

    // Full-size fallback, capped at 1600px so oversized sources don't ship at
    // full resolution.
    const fullWidth = Math.min(meta.width ?? 1600, 1600);
    const fullOut = path.join(SRC_DIR, `${base}-full.webp`);
    const fullInfo = await sharp(srcBuffer)
      .resize({ width: fullWidth, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(fullOut);
    totalAfter += fullInfo.size;

    for (const width of WIDTHS) {
      const targetWidth = Math.min(width, meta.width ?? width);
      const outPath = path.join(SRC_DIR, `${base}-${width}.webp`);
      const info = await sharp(srcBuffer)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);
      totalAfter += info.size;
    }

    console.log(`optimized ${file}`);
  }

  console.log(
    `\nSource PNGs: ${(totalBefore / 1024 / 1024).toFixed(2)} MB -> Generated WebP variants: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
