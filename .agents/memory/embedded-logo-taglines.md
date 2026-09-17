---
name: Embedded logo taglines
description: How to handle brand slogan changes when logo artwork contains text inside the raster image.
---

When a brand slogan changes, inspect every raster logo asset for text baked into the pixels; translation keys only control adjacent HTML text and cannot change the image itself.

**Why:** The footer could show the new translated slogan below a logo that still visibly contained the previous slogan inside the artwork.

**How to apply:** For every logo use, verify the image pixels as well as the surrounding text. Crop or regenerate the asset when the embedded slogan must be removed, and verify the rendered result in the live browser.