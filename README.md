# Kyuto — Static Storefront

A static (no-build, no-framework) clone-style storefront: vanilla HTML/CSS/JS, ~49 products across Mugs and Cup-Saucer Sets, working cart (localStorage), search, filters, sort, and collection grids.

## Pages

| Path | Content |
|---|---|
| `/` | Homepage (hero carousel, collections, product rails, reviews) |
| `/about` | Founder story + values |
| `/blog` | Journal index |
| `/contact` | Contact form (client-side validation) |
| `/collections/mugs` | 44 products, search + sort + filter |
| `/collections/cup-saucer` | 5 products, same grid |
| `/collections/candles` • `/collections/bowls` | "Launching soon" states |

## Local preview

```bash
node server.js        # http://localhost:4173 (or vercel dev)
# or open index.html directly in a browser — everything is relative paths
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. https://vercel.com/new → Import the repo → Framework preset: **Other** (static) → Root: `./` → Deploy.
3. `vercel.json` sets `cleanUrls` (extensionless URLs) and cache headers for assets. No environment variables or build steps required.

## Structure & tooling

- `build.js` — generates the shared chrome (header/footer/drawers) across all pages; edit and run `node build.js` to regenerate.
- `data/mugs.json` + `data/cup-saucer.json` — catalog source of truth.
- `fetch-images.js` — re-downloads catalog images into `assets/`.
- `patch-index.js` — one-off homepage link patcher (kept for reference).
- `assets/catalog.js` — merged catalog consumed by `assets/app.js` (search, rails, cart, grids).

## Ownership note

All brand assets and copy belong to Kyuto (the site this repo is derived from). Any reuse of the imagery or text requires Kyuto's permission, independent of any license for the scaffolding.
