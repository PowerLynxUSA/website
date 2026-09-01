---
name: Non-Replit deployment (GitHub + Cloudflare Pages)
description: What's involved when a user wants to host a Replit-built web artifact outside Replit, e.g. on Cloudflare Pages via a GitHub repo, instead of using Replit's own publish/deploy.
---

Replit's built-in publish/deploy only targets a `.replit.app` domain (or a custom domain attached to that Replit deployment) — there is no native "deploy to Cloudflare Pages" (or other third-party host) path from Replit publishing itself.

To host elsewhere (e.g. Cloudflare Pages) while still building in Replit:
1. Get the code onto GitHub — Replit has a Git pane / GitHub connection (a `connection:github`-style integration) that can connect/push the repo; there's also import-from-GitHub for the reverse direction.
2. Configure the external host (e.g. Cloudflare Pages) separately, pointed at that GitHub repo, with the correct monorepo build settings (root directory, build command, output/publish directory — this project is a pnpm workspace, so the build must target the specific artifact package).

**Why this matters:** artifacts scaffolded by Replit's artifact system often have a Vite config that hard-requires `PORT` and `BASE_PATH` env vars (used for Replit's per-artifact path-based proxy routing) and will throw if unset. A standalone deploy on another host needs `BASE_PATH` set to `/` (root-served, no path prefix) and some dummy `PORT` value supplied at build time, or the config adjusted to make these optional outside the Replit environment.

**How to apply:** when a user asks to deploy a Replit-built app to a non-Replit host, check the artifact's vite.config (or equivalent) for Replit-specific required env vars before assuming a plain `npm run build` will work on the external platform's CI.
