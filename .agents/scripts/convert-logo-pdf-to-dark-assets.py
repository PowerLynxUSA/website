from collections import deque
from pathlib import Path

import fitz
from PIL import Image


PDF_PATH = Path("attached_assets/logo_白边_1789611572025.pdf")
OUTPUT_DIR = Path("artifacts/powerlynx/src/assets/brand")
SCALE = 8
BACKGROUND_TOLERANCE = 24


def flood_background(rgba_image: Image.Image) -> Image.Image:
    rgb_image = rgba_image.convert("RGB")
    pixels = rgb_image.load()
    source_alpha = rgba_image.getchannel("A")
    source_alpha_pixels = source_alpha.load()
    width, height = rgb_image.size
    background = pixels[min(width - 1, SCALE * 10), min(height - 1, SCALE * 10)]
    candidates = bytearray(width * height)

    for y in range(height):
        for x in range(width):
            color = pixels[x, y]
            if (
                source_alpha_pixels[x, y] >= 240
                and max(abs(color[channel] - background[channel]) for channel in range(3))
                <= BACKGROUND_TOLERANCE
            ):
                candidates[y * width + x] = 1

    background_pixels = bytearray(width * height)
    queue = deque()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        index = y * width + x
        if background_pixels[index] or not candidates[index]:
            continue
        background_pixels[index] = 1
        if x:
            queue.append((x - 1, y))
        if x + 1 < width:
            queue.append((x + 1, y))
        if y:
            queue.append((x, y - 1))
        if y + 1 < height:
            queue.append((x, y + 1))

    alpha_values = list(source_alpha.getdata())
    for index, is_background in enumerate(background_pixels):
        if is_background or alpha_values[index] < 240:
            alpha_values[index] = 0

    alpha = Image.new("L", (width, height))
    alpha.putdata(alpha_values)
    rgba = rgb_image.convert("RGBA")
    rgba.putalpha(alpha)
    return rgba


def trim_with_padding(image: Image.Image, padding: int) -> Image.Image:
    bbox = image.getchannel("A").getbbox()
    if bbox is None:
        raise RuntimeError("The converted logo has no visible pixels.")
    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(image.width, right + padding)
    bottom = min(image.height, bottom + padding)
    return image.crop((left, top, right, bottom))


document = fitz.open(PDF_PATH)
if document.page_count != 1:
    raise RuntimeError(f"Expected one logo page, found {document.page_count}.")

page = document[0]
pixmap = page.get_pixmap(matrix=fitz.Matrix(SCALE, SCALE), alpha=True)
rendered = Image.frombytes("RGBA", (pixmap.width, pixmap.height), pixmap.samples)
transparent = flood_background(rendered)
full_logo = trim_with_padding(transparent, padding=SCALE * 12)

# The lynx mark occupies the upper portion of the supplied lockup. Crop it
# from the same converted raster so all dark-mode marks share this PDF source.
mark_crop = transparent.crop(
    (
        int(transparent.width * 0.12),
        int(transparent.height * 0.02),
        int(transparent.width * 0.88),
        int(transparent.height * 0.60),
    )
)
mark = trim_with_padding(mark_crop, padding=SCALE * 10)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
full_logo.save(OUTPUT_DIR / "powerlynx-logo-dark.png")
mark.save(OUTPUT_DIR / "powerlynx-mark-dark.png")

print(f"rendered page: {rendered.size}")
print(f"logo: {full_logo.size} -> {OUTPUT_DIR / 'powerlynx-logo-dark.png'}")
print(f"mark: {mark.size} -> {OUTPUT_DIR / 'powerlynx-mark-dark.png'}")