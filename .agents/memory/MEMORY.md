# Memory Index

- [Flattened raster PDF product photo extraction](flattened-pdf-catalog-crop.md) — when a catalog PDF has each page as one big flattened JPEG, crop products with fractional bounding boxes via PyMuPDF, not text/image extraction.
- [Non-Replit deployment (GitHub + Cloudflare Pages)](non-replit-deploy-cloudflare-pages.md) — Replit publish only targets .replit.app; for GitHub+Cloudflare hosting, push via Replit's Git pane/GitHub connection and fix the artifact's BASE_PATH/PORT-dependent vite config for standalone hosting.
- [Cloudflare Pages deployment verification](cloudflare-pages-deploy-verification.md) — after closely spaced GitHub commits, verify the live HTML's hashed JS bundle contains the new copy before declaring the site updated.
- [GitHub Contents API blocks "script"](github-contents-api-script-block.md) — via Replit's connector proxy, PUT contents/:path 403s if content contains "script" anywhere; use the Git Data API (blobs/trees/commits/refs) instead.
- [GitHub tree sync before Cloudflare deploy](github-tree-sync-before-cloudflare.md) — compare local tracked files with the remote tree before API commits; local task merges can leave assets absent from GitHub and break Pages builds.
- [State-driven hover menus](state-driven-hover-menus.md) — Tailwind hover variants may be disabled in headless browsers; use component state for critical dropdown visibility.
- [Testing Vite modules from Playwright/Node](playwright-node-vite-asset-imports.md) — importing a module that pulls in image/asset imports crashes plain Node; read source as text or import type-only modules instead.
- [i18n parity checks: code/measurement strings](i18n-parity-code-strings.md) — a strict "localized text must differ from English" check false-positives on model codes/measurements; gate it on the string containing real prose.
- [Lighthouse mobile audits in this sandbox](lighthouse-mobile-audit-sandbox.md) — use 127.0.0.1 (not localhost) with a run_in_background preview server and CHROME_PATH=/repl/tools/bin/chromium, or Chrome throws an interstitial/refused-connection error.
- [Responsive product images via basename + glob](responsive-images-glob-pattern.md) — store plain basename strings in data files, resolve to generated width variants with import.meta.glob so components don't hand-import each size.
- [Vite manual chunk boundaries](vite-manual-chunk-boundaries.md) — packages that bridge Radix and other shared dependencies, such as cmdk, must share Radix's chunk to avoid circular chunks.
- [Dark Showroom background cleanup](dark-showroom-background-cleanup.md) — edge flood-fill handles white catalog backgrounds; photographic gray backgrounds need a stronger mask.
- [Theme provider duplicate React](theme-provider-duplicate-react.md) — use the app-local theme context when external provider hooks resolve a second React instance.
- [Sharp grayscale mask output](sharp-grayscale-mask-output.md) — force blurred single-channel masks back to b-w before reading raw bytes, or Sharp expands them to three channels.
- [Artifact-local Sharp resolution](artifact-local-sharp-resolution.md) — run Sharp image scripts from the owning artifact with pnpm exec; root-level Node resolution may not find the workspace package.
- [Playwright WebKit host limitation](playwright-webkit-host-limitation.md) — WebKit may remain unlaunchable in this Nix container when its pinned ICU/atomic/GL/GStreamer sonames differ from available packages.
- [i18n fallback test readiness](i18n-fallback-networkidle.md) — fallback-warning checks should use bounded render settling, not networkidle.
- [Embedded logo taglines](embedded-logo-taglines.md) — changing translated text does not remove slogans baked into raster logo assets; audit image content separately.
