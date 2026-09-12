// Creates transparent, responsive product assets for the Dark Showroom.
//
// The source catalog images remain untouched. This uses a local, deterministic
// flood-fill to remove near-white backgrounds connected to the image edges,
// then writes a separate dark-showroom asset set.
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_DIR = path.resolve(import.meta.dirname, '../src/assets/products');
const OUTPUT_DIR = path.resolve(import.meta.dirname, '../src/assets/products-dark');
const SOURCE_DIR = path.join(OUTPUT_DIR, 'source');
const WIDTHS = [400, 800, 1200];
const QUALITY = 84;

function isBackgroundPixel(r, g, b, a) {
  if (a < 24) return true;
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  return r >= 238 && g >= 238 && b >= 238 && spread <= 24;
}

function removeEdgeBackground(input, width, height) {
  const pixels = new Uint8Array(input);
  const visited = new Uint8Array(width * height);
  const queue = [];

  const enqueue = (x, y) => {
    const index = y * width + x;
    if (visited[index]) return;
    const offset = index * 4;
    if (!isBackgroundPixel(pixels[offset], pixels[offset + 1], pixels[offset + 2], pixels[offset + 3])) {
      return;
    }
    visited[index] = 1;
    queue.push(index);
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const index = queue[cursor];
    const x = index % width;
    const y = Math.floor(index / width);
    pixels[index * 4 + 3] = 0;

    if (x > 0) enqueue(x - 1, y);
    if (x < width - 1) enqueue(x + 1, y);
    if (y > 0) enqueue(x, y - 1);
    if (y < height - 1) enqueue(x, y + 1);
  }

  return Buffer.from(pixels);
}

async function main() {
  await mkdir(SOURCE_DIR, { recursive: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await readdir(SRC_DIR))
    .filter((file) => file.toLowerCase().endsWith('.png'))
    .sort();

  for (const file of files) {
    const base = file.replace(/\.png$/i, '');
    const sourcePath = path.join(SRC_DIR, file);
    const sourceBuffer = await sharp(sourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const cleanedRaw = removeEdgeBackground(
      sourceBuffer.data,
      sourceBuffer.info.width,
      sourceBuffer.info.height,
    );
    const cleanedPng = await sharp(cleanedRaw, {
      raw: {
        width: sourceBuffer.info.width,
        height: sourceBuffer.info.height,
        channels: 4,
      },
    })
      .png()
      .toBuffer();

    await writeFile(path.join(SOURCE_DIR, `${base}.png`), cleanedPng);

    const fullWidth = Math.min(sourceBuffer.info.width, 1600);
    await sharp(cleanedPng)
      .resize({ width: fullWidth, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(path.join(OUTPUT_DIR, `${base}-full.webp`));

    for (const width of WIDTHS) {
      await sharp(cleanedPng)
        .resize({ width: Math.min(width, sourceBuffer.info.width), withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(path.join(OUTPUT_DIR, `${base}-${width}.webp`));
    }

    console.log(`prepared dark showroom assets for ${file}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});