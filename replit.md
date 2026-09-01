# POWERLYNX

Corporate/catalog website for POWERLYNX (Powerlink Inc.), a professional HVAC/R tools and parts brand (HVAC Tool + HVAC Supply product lines).

## Run & Operate

- `pnpm --filter @workspace/powerlynx run dev` — run the POWERLYNX website (frontend-only, no backend)
- `pnpm --filter @workspace/api-server run dev` — run the shared API server (currently unused by the site; only `/healthz` exists)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- POWERLYNX site: React + Vite, wouter routing, Tailwind, shadcn/ui — static/presentational, no backend calls
- Shared scaffolding: Express 5 API server + PostgreSQL/Drizzle exist in the monorepo but are not used by this site yet

## Where things live

- `artifacts/powerlynx/` — the website (Home, Products, Product detail, About, Contact)
- `artifacts/powerlynx/src/data/products.ts` — real POWERLYNX catalog data (20 SKUs, HVAC Tool + HVAC Supply), sourced from the 2027 catalog PDF. Edit here to change product content.
- `artifacts/powerlynx/src/assets/brand/` — extracted brand assets (logo, icon mark, catalog photos) pulled from the source catalog PDF

## Architecture decisions

- Built as a frontend-only react-vite artifact — no OpenAPI/backend, since the site is presentation/catalog content with no persisted user data yet.
- Contact form validates and shows a success state locally (react-hook-form + zod); it does not send email yet — no email API is wired up. Copy nudges "Quote Request" toward orders@powerlinkus.com and other inquiry types toward info@powerlinkus.com, but this is not enforced by any backend.
- Language switcher in the header is a structural placeholder (English only, live) — no i18n library or translated strings yet. The original request calls for 24-language support down the line.

## Product

- Home, Products (filterable by line/category), per-product spec-sheet pages, About, and Contact — all in English for now.

## User preferences

- Source spec (in Korean) described a two-phase rollout: an "Under Construction" placeholder first, then the full site, aimed at a GitHub + Cloudflare Pages deploy pipeline with a later hand-off to Cursor for final integrations (email sending, etc.). Since this is being built directly as a Replit project/artifact rather than that external pipeline, the full site was built directly instead of a placeholder page.
- Brand color cues: dark charcoal + red-orange accent (~#E8552A family), taken from the real catalog PDF logo.

## Gotchas

- None yet.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
