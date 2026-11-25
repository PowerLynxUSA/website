// Precise product replacement: retain all original typography, logo, line set
// and torch pixels. Keep the old cover available for a later catalog edition.
import path from 'node:path';
import sharp from 'sharp';

const assets = path.resolve(import.meta.dirname, '../src/assets');
const original = path.join(assets, 'brand/catalog-hero-collage-clean.jpeg');
const output = path.join(assets, 'brand/catalog-hero-collage-current');
const { data: pixels, info } = await sharp(original).removeAlpha().raw().toBuffer({ resolveWithObject: true });
if (info.width !== 1024 || info.height !== 1024 || info.channels !== 3) {
  throw new Error('The source cover geometry changed; inspect replacement regions before proceeding.');
}
// The product row sits on a flat grey (~220) background. Clear the whole row,
// then lay all four products back out with equal gaps and a shared centre line.
const row = { x: 110, y: 440, w: 804, h: 255 };
for (let y = row.y; y < row.y + row.h; y++) {
  const left = (y * info.width + row.x - 5) * 3;
  const right = (y * info.width + row.x + row.w + 5) * 3;
  for (let x = row.x; x < row.x + row.w; x++) {
    const t = (x - row.x) / (row.w - 1);
    for (let c = 0; c < 3; c++) pixels[(y * info.width + x) * 3 + c] = Math.round(pixels[left + c] * (1 - t) + pixels[right + c] * t);
  }
}
const originalCover = sharp(original).removeAlpha();
const crop = async (left, top, width, height) => {
  const buffer = await originalCover.clone().extract({ left, top, width, height }).png().toBuffer();
  return { buffer, width, height };
};
const product = async (source, width, height) => {
  const buffer = await sharp(path.join(assets, source)).trim().resize({ width, height, fit: 'inside' }).png().toBuffer();
  const meta = await sharp(buffer).metadata();
  return { buffer, width: meta.width, height: meta.height };
};
// Left-to-right order alternates wide and narrow items for an even rhythm.
const items = [
  await crop(120, 490, 212, 185), // insulated line set, original pixels
  await crop(538, 470, 102, 205), // torch, original pixels
  await product('products/flaring-tool-800.webp', 192, 226),
  await product('products-dark/reamer-800.webp', 105, 151),
];
const rowLeft = 120;
const rowRight = info.width - 120;
const gap = (rowRight - rowLeft - items.reduce((sum, item) => sum + item.width, 0)) / (items.length - 1);
const centreY = 572;
const layers = [];
let cursor = rowLeft;
for (const item of items) {
  layers.push({ input: item.buffer, left: Math.round(cursor), top: Math.round(centreY - item.height / 2) });
  cursor += item.width + gap;
}
const edited = await sharp(pixels, { raw: info }).composite(layers).jpeg({ quality: 96 }).toBuffer();
await sharp(edited).toFile(`${output}.jpeg`);
for (const width of [400, 800, 1200]) {
  await sharp(edited).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${output}-${width}.webp`);
}
await sharp(edited).webp({ quality: 82 }).toFile(`${output}-full.webp`);
console.log('Created current catalog cover and responsive variants; original cover retained.');
