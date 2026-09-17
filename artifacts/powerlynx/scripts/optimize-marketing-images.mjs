// Generates responsive WebP variants for brand and generated marketing images.
//
// For each JPEG or PNG source in `src/assets/brand` and `src/assets/generated`
// this produces 400px, 800px, 1200px, and capped full-size WebP variants in
// the same directory. The source files are kept as source material but are no
// longer imported by app code.
//
// Re-run this script whenever a marketing image is added or replaced:
//   node scripts/optimize-marketing-images.mjs
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIRS = [
  path.resolve(import.meta.dirname, '../src/assets/brand'),
  path.resolve(import.meta.dirname, '../src/assets/generated'),
];
const WIDTHS = [400, 800, 1200];
const QUALITY = 82;

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;
  let sourceCount = 0;

  for (const sourceDir of SOURCE_DIRS) {
    const files = (await readdir(sourceDir)).filter((file) =>
      /\.(?:jpe?g|png)$/i.test(file),
    );

    for (const file of files) {
      const base = file.replace(/\.(?:jpe?g|png)$/i, '');
      const srcPath = path.join(sourceDir, file);
      const srcBuffer = await sharp(srcPath).toBuffer();
      const meta = await sharp(srcBuffer).metadata();
      totalBefore += srcBuffer.length;
      sourceCount += 1;

      // Full-size fallback, capped at 1600px so oversized sources do not ship
      // at their original resolution.
      const fullWidth = Math.min(meta.width ?? 1600, 1600);
      const fullInfo = await sharp(srcBuffer)
        .resize({ width: fullWidth, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(path.join(sourceDir, `${base}-full.webp`));
      totalAfter += fullInfo.size;

      for (const width of WIDTHS) {
        const targetWidth = Math.min(width, meta.width ?? width);
        const info = await sharp(srcBuffer)
          .resize({ width: targetWidth, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(path.join(sourceDir, `${base}-${width}.webp`));
        totalAfter += info.size;
      }

      console.log(`optimized ${path.relative(process.cwd(), srcPath)}`);
    }
  }

  console.log(
    `\nSource images (${sourceCount}): ${(totalBefore / 1024 / 1024).toFixed(2)} MB -> Generated WebP variants: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});