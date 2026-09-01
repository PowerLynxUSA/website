---
name: Flattened raster PDF product photo extraction
description: How to get usable individual product photos out of a catalog PDF where each page is a single flattened raster image (no separate embedded image objects per product).
---

Some product catalog PDFs (e.g. print-ready vendor catalogs) are exported as one full-page JPEG/raster image per page, with all product photos, text, and layout baked into that single flattened image. Standard PDF image extraction (pulling embedded XObjects) only yields the one giant page image, not per-product cutouts.

**Approach that worked:** use PyMuPDF (`fitz`) to render/copy the full-page pixmap, then crop it with hand-tuned *fractional* bounding boxes (0..1 of page width/height) per product, based on visually inspecting the page layout. Iterate: crop, view the result, tighten the box to exclude bleed from adjacent product photos, stray SKU text, or certification logos.

**Why:** there is no structural/metadata way to isolate products on a flattened page — bounding boxes must be derived visually and iterated.

**How to apply:** when a user wants real product photos from a PDF catalog used throughout a site, first check whether the PDF pages are flattened single images (inspect embedded image count/size per page) before assuming per-product image extraction is possible. If flattened, write a small crop script with per-product fractional boxes, run it, and visually verify each crop before wiring it into the app.
