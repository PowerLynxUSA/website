# /// script
# requires-python = ">=3.13"
# dependencies = ["pymupdf>=1.28.2"]
# ///
import pymupdf as fitz
import os

os.makedirs(".agents/outputs/products", exist_ok=True)

# (source page file, output slug, left, top, right, bottom) as fractions of full page 0..1
# generous boxes on purpose - white background, so extra margin is harmless
crops = [
    ("page01_img0.jpeg", "white-insulated-line-set", 0.60, 0.21, 0.775, 0.34),
    ("page01_img0.jpeg", "black-rubber-insulated-line-set", 0.60, 0.585, 0.775, 0.71),
    ("page02_img0.jpeg", "thermal-imaging-camera", 0.73, 0.175, 0.88, 0.43),
    ("page02_img0.jpeg", "thermal-imaging-camera-accessories", 0.685, 0.445, 0.88, 0.515),
    ("page03_img0.jpeg", "condenser-fan-motor-single-speed", 0.60, 0.175, 0.755, 0.40),
    ("page04_img0.jpeg", "brazing-torch", 0.665, 0.175, 0.80, 0.46),
    ("page04_img0.jpeg", "utility-torch", 0.70, 0.625, 0.775, 0.85),
    ("page05_img0.jpeg", "manifold-gauge-2valve", 0.14, 0.425, 0.375, 0.585),
    ("page05_img0.jpeg", "manifold-gauge-4valve", 0.53, 0.425, 0.765, 0.585),
    ("page06_img0.jpeg", "refrigerant-hose-set-standard", 0.14, 0.395, 0.475, 0.54),
    ("page06_img0.jpeg", "refrigerant-hose-set-valve", 0.52, 0.39, 0.84, 0.555),
    ("page07_img0.jpeg", "flaring-tool", 0.60, 0.175, 0.83, 0.32),
    ("page07_img0.jpeg", "tube-expander", 0.60, 0.46, 0.84, 0.56),
    ("page07_img0.jpeg", "tube-straightener", 0.60, 0.695, 0.84, 0.82),
    ("page08_img0.jpeg", "tube-cutter", 0.575, 0.175, 0.865, 0.40),
    ("page08_img0.jpeg", "reamer", 0.735, 0.505, 0.85, 0.615),
    ("page08_img0.jpeg", "deburring-tool", 0.64, 0.795, 0.825, 0.885),
    ("page09_img0.jpeg", "ratcheting-wrench", 0.55, 0.175, 0.865, 0.285),
    ("page09_img0.jpeg", "folding-knife", 0.525, 0.365, 0.865, 0.44),
    ("page09_img0.jpeg", "dual-blade-folding-knife", 0.525, 0.645, 0.865, 0.715),
    ("page10_img0.jpeg", "led-penlight", 0.71, 0.175, 0.865, 0.325),
    ("page10_img0.jpeg", "led-headlight", 0.685, 0.585, 0.885, 0.665),
]

for src, slug, l, t, r, b in crops:
    fn = f".agents/outputs/{src}"
    pix = fitz.Pixmap(fn)
    w, h = pix.width, pix.height
    box = fitz.IRect(int(l * w), int(t * h), int(r * w), int(b * h))
    cropped = fitz.Pixmap(pix, )
    # crop via alpha-less pixmap subarea using set_rect not available; use Pixmap(pix, mask) trick instead:
    sub = fitz.Pixmap(fitz.csRGB, box, False)
    sub.copy(pix, box)
    out = f".agents/outputs/products/{slug}.png"
    sub.save(out)
    print(slug, box, out)
