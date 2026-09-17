---
name: Cloudflare Pages deployment verification
description: Reliable verification for GitHub-triggered Cloudflare Pages builds after closely spaced commits.
---

For GitHub-connected Cloudflare Pages sites, local workspace state, the GitHub branch tree, and the public deployment are separate states. A change can be present locally but absent from the GitHub tree, or present in GitHub while Cloudflare still serves an older hashed bundle. Treat this as a mandatory release gate and verify all three independently.

**Why:** A visual check initially showed the previous homepage because one commit updated translations while the component files containing the visual change were not in the same GitHub tree. Later, a second issue came from slogan text baked into raster logo assets, which translation changes could never update.

**How to apply:** Before reporting success, complete and record every gate: (1) enumerate the intended changed files and compare each local Git blob SHA with the GitHub `main` tree; if any file is absent or mismatched, stop and push a complete tree, (2) record the GitHub `main` commit SHA, fetch the public HTML, and confirm Cloudflare serves a new hashed bundle after the final commit, (3) inspect the entry bundle and every affected lazy route chunk for distinctive code/text markers, not only the entry bundle, (4) exercise the affected route in a real browser and verify computed styles, visible text, and lazy-loaded assets, and (5) only then report deployment success. A local build, a GitHub commit, or a top-of-page screenshot alone is never deployment proof.