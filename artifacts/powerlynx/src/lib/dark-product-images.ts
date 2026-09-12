const width400 = import.meta.glob('/src/assets/products-dark/*-400.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const width800 = import.meta.glob('/src/assets/products-dark/*-800.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const width1200 = import.meta.glob('/src/assets/products-dark/*-1200.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const widthFull = import.meta.glob('/src/assets/products-dark/*-full.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function indexByBasename(glob: Record<string, string>, suffix: string) {
  const map: Record<string, string> = {};
  for (const [filePath, url] of Object.entries(glob)) {
    const filename = filePath.split('/').pop() ?? '';
    map[filename.replace(suffix, '')] = url;
  }
  return map;
}

const map400 = indexByBasename(width400, '-400.webp');
const map800 = indexByBasename(width800, '-800.webp');
const map1200 = indexByBasename(width1200, '-1200.webp');
const mapFull = indexByBasename(widthFull, '-full.webp');

export type DarkProductImage = {
  src: string;
  srcSet: string;
  sizes: string;
};

export function getResponsiveDarkProductImage(
  name: string,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
): DarkProductImage {
  const src = map800[name] ?? mapFull[name] ?? map1200[name] ?? map400[name];

  if (!src) {
    throw new Error(`No dark showroom product image found for "${name}".`);
  }

  return {
    src,
    srcSet: [
      map400[name] && `${map400[name]} 400w`,
      map800[name] && `${map800[name]} 800w`,
      map1200[name] && `${map1200[name]} 1200w`,
    ]
      .filter(Boolean)
      .join(', '),
    sizes,
  };
}