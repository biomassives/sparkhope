# Food Security and Foundational Sustainable Solutions

Documentation & workshops for biodiversity-positive, community-owned solutions — published with VuePress 2 + Theme Hope and deployed on Vercel.

## Project Goals

- **Open, multi-lingual documentation** (EN / NL, more welcome)
- **Practical, workshop-first content** (events, guides, standards)
- **Transparency**: clear versioning, reproducible builds, and open contributions

## Repository Structure

```
docs/
  ├─ events/            # workshops, announcements, posts
  ├─ guide/             # how-to guides
  ├─ standards/         # standards & references
  ├─ nl/ ...            # Dutch locale (mirrors structure)
  └─ .vuepress/
      ├─ config.ts      # VuePress + Theme Hope config
      ├─ public/        # manifest.webmanifest, icons, static assets
      └─ sidebar.js     # AUTO-GENERATED (do not hand-edit)
scripts/
  ├─ gen-sidebars.mjs   # generates sidebar.js from folder structure
  └─ gen-sitemap.mjs    # generates sitemap.xml after build
```

## Requirements

- **Node 20.x** (use `nvm use 20`)
- **npm** (comes with Node)
- **Git**

### Pinned Dependencies

For reproducible builds:

- `vuepress@2.0.0-rc.24`
- `@vuepress/bundler-webpack@2.0.0-rc.24`
- `vuepress-theme-hope@2.0.0-rc.94`
- `@vuepress/plugin-search@2.0.0-rc.112`
- `@vuepress/plugin-catalog@2.0.0-rc.112`
- `@vuepress/plugin-feed@2.0.0-rc.112`
- **Build deps**: sass-loader, sass-embedded, mermaid
- **Post-build**: sitemap, globby

## Quick Start (Local)

```bash
# 1) Node 20
nvm use 20

# 2) Install deps (also runs postinstall → generates sidebar)
npm install

# 3) Dev server
npm run docs:dev          # http://localhost:8080

# 4) Production build (+ sitemap.xml)
npm run docs:build

# 5) Preview the static output (optional)
npx http-server docs/.vuepress/dist -p 4173
```

## Scripts

- `npm run gen:sidebars` — regenerate `docs/.vuepress/sidebar.js` from the folder tree
- `npm run docs:dev` — run local dev server
- `npm run docs:build` — build static site then generate sitemap.xml

## Authoring Content

### Adding Content

Add Markdown under the correct locale:
- **English**: `docs/...`
- **Dutch**: `docs/nl/...`

### Workshop/Event Content

For workshops/events, drop files in `docs/events/` (mirrored under locales) with frontmatter:

```yaml
---
title: "Solflare 101 & Web3 Safety"
date: 2025-09-10
event: true
summary: Short description here.
tags: ["workshop", "solana", "safety"]
---
```

### Updating Sidebars

After adding/removing folders, run:

```bash
npm run gen:sidebars
```

> **Note**: Sidebars are auto-generated: don't hand-edit `docs/.vuepress/sidebar.js`.

## Contributing

We welcome change requests, edits, translations, and art.

1. **Fork the repo** → create a feature branch
2. **Make changes** (docs or assets)
3. **Run locally** (see Quick start)
4. **Commit** with a clear message and open a Pull Request

### Translations

Mirror the English path under `/nl/`. If adding a new language later, mirror the folder structure and open a PR titled `feat(i18n): add <lang>`.

### Art/Diagrams

Add to `docs/.vuepress/public/assets/<topic>/` and reference with `/assets/...` paths.

## CI/CD on Vercel (GitHub Integration)

This project deploys automatically via Vercel when you push to GitHub.

### Setup

1. **Connect the repo** in Vercel → "New Project" → import from GitHub

2. **Project settings**:
   - **Node.js**: 20.x
   - **Install Command**: `npm ci` (or `npm install` if you don't use a lockfile)
   - **Build Command**: `npm run docs:build`
   - **Output Directory**: `docs/.vuepress/dist`
   - **Env vars**: `SITE_URL = https://sparkhope.vercel.app` (used by gen-sitemap.mjs)

3. **Deployment**:
   - **Preview Deployments**: every PR gets its own preview URL
   - **Production**: merges to main deploy to production domain

### Optional vercel.json

Place at repo root for cache & clean URLs:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)\\.(css|js|woff2|png|jpg|jpeg|webp|svg)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/(sitemap\\.xml|rss\\.xml|feed\\.json)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=600" }]
    }
  ]
}
```

The build also writes `sitemap.xml` and `robots.txt`. Ensure `SITE_URL` is set in Vercel so sitemap links are absolute.

## Using GitHub

### Initialize/Push Existing Repo

```bash
git init
git remote add origin https://github.com/biomassives/sparkhope.git
git branch -M main
git add -A
git commit -m "chore: initial import"
git push -u origin main
```

### Issues and Pull Requests

- **Open issues** → propose enhancements, report bugs, or request new workshop topics
- **Open PRs** → edits, translations, art, config tweaks

## Support

- **Open an Issue** for help/questions
- **Tag PRs** with `docs`, `i18n`, `build`, or `workshop` labels if applicable

## Roadmap

- [ ] Expand multi-chain workshop appendix (ETH, Tezos, Tron, Polygon, Celo, Algorand, Chainlink, L2s)
- [ ] Add more locales (starting with EN/NL)
- [ ] Optional PWA (once plugin versions align)
- [ ] More event templates + printable handouts

## License

Specify your license in `LICENSE` (e.g., MIT).  
If none yet, contributions default to the repository's future license once added.

## Acknowledgments

Thanks to the open-source maintainers behind VuePress, Theme Hope, and the multi-chain tooling ecosystems — and to all contributors who make food security & biodiversity literacy accessible.
