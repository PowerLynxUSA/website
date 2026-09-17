// Creates transparent, responsive product assets for the Dark Showroom.
//
// The source catalog images remain untouched. This uses a local, deterministic
// flood-fill for isolated renders and explicit foreground masks for
// photographic sources, then writes a separate dark-showroom asset set.
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_DIR = path.resolve(import.meta.dirname, '../src/assets/products');
const OUTPUT_DIR = path.resolve(import.meta.dirname, '../src/assets/products-dark');
const SOURCE_DIR = path.join(OUTPUT_DIR, 'source');
const WIDTHS = [400, 800, 1200];
const QUALITY = 84;

// A small number of catalog photos are not isolated renders. Keep the
// foreground product silhouette explicit for those photos instead of trying to
// classify every dark pixel as either product or background. Coordinates are
// normalized so the mask remains tied to the source composition if the source
// is re-encoded at a different size.
const MANUAL_FOREGROUND_MASKS = {
  'black-rubber-insulated-line-set': {
    foreground: [
      [
        [0.007, 0],
        [0.1, 0],
        [0.206, 0.083],
        [0.196, 0.167],
        [0.201, 0.25],
        [0.25, 0.333],
        [0.231, 0.417],
        [0.336, 0.5],
        [0.414, 0.583],
        [0.504, 0.667],
        [0.584, 0.75],
        [0.666, 0.833],
        [0.75, 0.917],
        [0.837, 1],
        [1, 1],
        [0.172, 1],
        [0.116, 0.833],
        [0.086, 0.75],
        [0.069, 0.667],
        [0.041, 0.583],
        [0.014, 0.5],
        [0.014, 0.333],
        [0, 0.167],
        [0.026, 0.083],
      ],
      [
        [0.294, 0],
        [0.581, 0],
        [0.675, 0.06],
        [0.7, 0.15],
        [0.681, 0.3],
        [0.67, 0.4],
        [0.65, 0.46],
        [0.58, 0.49],
        [0.48, 0.47],
        [0.39, 0.4],
        [0.35, 0.3],
        [0.306, 0.15],
      ],
    ],
    // Bright foam is separated from the textured coil by luminance; warm
    // pixels in the fitting are retained even when they are comparatively
    // dark (including the copper opening).
    foamLuminance: { start: 72, end: 112 },
    warmPixel: { redOverBlue: 18, greenOverBlue: 5, minimumRed: 55 },
  },
};

function isBackgroundPixel(r, g, b, a) {
  if (a < 24) return true;
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  return r >= 238 && g >= 238 && b >= 238 && spread <= 24;
}

// Sources without a manual foreground mask are only safe to run through the
// automatic edge flood-fill when their border is actually an isolated
// near-white (or transparent) backdrop. A fully opaque photo, or one shot
// against a gray/textured background, has few or no background-colored
// pixels along its border, so the flood-fill never reaches the product and
// silently ships an un-isolated card. Isolated catalog renders in this
// project sit at 90%+ border background coverage; a photographic source
// that needs a manual mask (see MANUAL_FOREGROUND_MASKS) measures close to
// 0%. The threshold sits well below the isolated-render floor so it never
// flags a real isolated render as a false positive.
const ISOLATED_BORDER_BACKGROUND_THRESHOLD = 0.6;

function borderBackgroundCoverage(pixels, width, height) {
  let total = 0;
  let background = 0;

  const sample = (x, y) => {
    const offset = (y * width + x) * 4;
    total += 1;
    if (isBackgroundPixel(pixels[offset], pixels[offset + 1], pixels[offset + 2], pixels[offset + 3])) {
      background += 1;
    }
  };

  for (let x = 0; x < width; x += 1) {
    sample(x, 0);
    sample(x, height - 1);
  }
  for (let y = 1; y < height - 1; y += 1) {
    sample(0, y);
    sample(width - 1, y);
  }

  return total === 0 ? 0 : background / total;
}

function pointInPolygon(x, y, polygon) {
  let inside = false;

  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
    const [currentX, currentY] = polygon[index];
    const [previousX, previousY] = polygon[previous];
    const intersects =
      currentY > y !== previousY > y &&
      x < ((previousX - currentX) * (y - currentY)) / (previousY - currentY) + currentX;

    if (intersects) inside = !inside;
  }

  return inside;
}

function normalizePolygons(polygons, width, height) {
  return polygons.map((polygon) =>
    polygon.map(([x, y]) => [x * width, y * height]),
  );
}

async function removePhotographicBackground(input, width, height, maskConfig) {
  const pixels = new Uint8Array(input);
  const polygons = normalizePolygons(maskConfig.foreground, width, height);
  const outputMask = new Uint8Array(width * height);
  const [foamStart, foamEnd] = [
    maskConfig.foamLuminance.start,
    maskConfig.foamLuminance.end,
  ];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixelIndex = y * width + x;
      const offset = pixelIndex * 4;

      const polygonIndex = polygons.findIndex((polygon) =>
        pointInPolygon(x + 0.5, y + 0.5, polygon),
      );
      if (polygonIndex < 0) {
        continue;
      }

      const red = pixels[offset];
      const green = pixels[offset + 1];
      const blue = pixels[offset + 2];
      const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
      const isWarm =
        red > blue + maskConfig.warmPixel.redOverBlue &&
        green > blue + maskConfig.warmPixel.greenOverBlue &&
        red > maskConfig.warmPixel.minimumRed;

      if (isWarm) {
        outputMask[pixelIndex] = 255;
      } else if (polygonIndex === 0 && luminance > foamStart) {
        outputMask[pixelIndex] = Math.min(
          255,
          Math.round(((luminance - foamStart) / (foamEnd - foamStart)) * 255),
        );
      }
    }
  }

  // A slight blur creates a clean, antialiased edge before the responsive
  // WebP resize, without leaving a visible hard polygon boundary.
  const softenedMask = await sharp(outputMask, {
    raw: { width, height, channels: 1 },
  })
    .blur(0.7)
    .toColourspace('b-w')
    .raw()
    .toBuffer();

  for (let pixelIndex = 0; pixelIndex < width * height; pixelIndex += 1) {
    pixels[pixelIndex * 4 + 3] = Math.min(
      pixels[pixelIndex * 4 + 3],
      softenedMask[pixelIndex],
    );
  }

  return Buffer.from(pixels);
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

  const flaggedSources = [];

  for (const file of files) {
    const base = file.replace(/\.png$/i, '');
    const sourcePath = path.join(SRC_DIR, file);
    const sourceBuffer = await sharp(sourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const maskConfig = MANUAL_FOREGROUND_MASKS[base];

    if (!maskConfig) {
      const coverage = borderBackgroundCoverage(
        sourceBuffer.data,
        sourceBuffer.info.width,
        sourceBuffer.info.height,
      );
      if (coverage < ISOLATED_BORDER_BACKGROUND_THRESHOLD) {
        flaggedSources.push({ file, coverage });
        console.warn(
          `SKIPPED ${file}: border background coverage ${(coverage * 100).toFixed(1)}% is below the ` +
            `${(ISOLATED_BORDER_BACKGROUND_THRESHOLD * 100).toFixed(0)}% isolated-render threshold. This looks ` +
            `like a fully opaque or photographic source without an isolated background. Add a manual foreground ` +
            `mask for "${base}" to MANUAL_FOREGROUND_MASKS before it can be published to the Dark Showroom.`,
        );
        continue;
      }
    }

    const cleanedRaw = maskConfig
      ? await removePhotographicBackground(
          sourceBuffer.data,
          sourceBuffer.info.width,
          sourceBuffer.info.height,
          maskConfig,
        )
      : removeEdgeBackground(
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

  if (flaggedSources.length > 0) {
    const names = flaggedSources.map(({ file }) => file).join(', ');
    console.error(
      `\n${flaggedSources.length} source image(s) need a manual foreground mask before publishing: ${names}\n` +
        `Add an entry to MANUAL_FOREGROUND_MASKS for each, then re-run this script.`,
    );
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});