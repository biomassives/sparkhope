# MycoLab Quick Start Guide

Get up and running in 5 minutes!

## 1. Setup Files (Copy & Paste)

### Replace `src/content.config.ts`:

```typescript
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
};
```

### Replace `astro.config.mjs`:

Use the provided config file with sidebar navigation.

## 2. Create Directory Structure

```bash
mkdir -p src/data
mkdir -p src/pages/{species,batches,observations,recipes,ingredients}
mkdir -p src/components
mkdir -p src/types
mkdir -p src/styles
mkdir -p scripts
```

## 3. Copy All Files

Copy these files from the artifacts to your project:

**Data Files:**
- `src/data/observations.json`
- `src/data/batches.json`
- `src/data/species.json`
- `src/data/recipes.json`
- `src/data/ingredients.json`

**Page Files:**
- `src/pages/observations/index.astro`
- `src/pages/observations/[id].astro`
- `src/pages/batches/index.astro`
- `src/pages/batches/[id].astro`
- `src/pages/species/index.astro`
- `src/pages/species/[id].astro`
- `src/pages/recipes/index.astro`
- `src/pages/recipes/[id].astro`
- `src/pages/ingredients/index.astro`

**Components & Styles:**
- `src/components/DatabaseStats.astro`
- `src/styles/custom.css`
- `src/types/database.ts`

**Scripts:**
- `scripts/export-db.js`

**Docs:**
- `src/content/docs/index.md`

**Config:**
- `.env.example`
- `.gitignore`

## 4. Install Dependencies

```bash
npm install
```

Make sure you have:
- `@astrojs/starlight`
- `astro`
- `@supabase/supabase-js` (for exports)

## 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:4321`

## 6. Test Each Section

Click through the sidebar:
- ✅ Species
- ✅ Ingredients
- ✅ Recipes
- ✅ Batches
- ✅ Observations

## 7. Add Your Real Data

### Option A: Manual JSON

Edit files in `src/data/` with your actual data.

### Option B: Export from Supabase

```bash
# Setup environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Export
npm run export
```

## 8. Clean Up Old Files

If migrating from markdown-based system:

```bash
# Backup first!
cp -r src/content src/content.backup

# Remove old mycolab markdown files
rm -rf src/content/mycolab/observations/*.md
rm -rf src/content/mycolab/batches/*.md
# etc...

# Keep only actual docs in src/content/docs/
```

## 9. Build & Deploy

```bash
# Build
npm run build

# Preview
npm run preview

# Deploy dist/ folder to your server
```

## Verify Everything Works

### Database Pages
- [ ] `/species/` shows list of species
- [ ] `/species/hericium-erinaceus/` shows detail page
- [ ] `/batches/` shows list of batches
- [ ] `/batches/lc-20251005-002/` shows detail page
- [ ] `/observations/` shows grouped observations
- [ ] `/observations/obs-001/` shows detail page
- [ ] `/recipes/` shows list of recipes
- [ ] `/ingredients/` shows ingredients by category

### Navigation
- [ ] Sidebar links work
- [ ] Cross-links between pages work
- [ ] Home page shows database stats
- [ ] Pagination works (if applicable)

### Styling
- [ ] Starlight theme applied
- [ ] Custom colors showing
- [ ] Responsive on mobile
- [ ] Dark mode works

## Troubleshooting

### "Module not found"
```bash
npm install
```

### "Cannot find JSON file"
Check that files are in `src/data/` and named correctly.

### "Build failed"
```bash
npm run validate:json
npm run build
```

### Pages not updating
```bash
# Restart dev server
^C
npm run dev
```

### Missing types
Copy `src/types/database.ts` from artifacts.

## Next Steps

1. **Customize Styling** - Edit `src/styles/custom.css`
2. **Add Documentation** - Create guides in `src/content/docs/`
3. **Setup Auto-Export** - Schedule `npm run export` with cron
4. **Add More Pages** - Create custom views in `src/pages/`
5. **Deploy** - Push to your hosting platform

## Quick Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build
npm run preview         # Preview build

# Database
npm run export          # Export from Supabase
npm run stats           # Show record counts

# Utilities
npm run validate:json   # Check JSON syntax
npm run format:json     # Format JSON files
npm run clean          # Clean build files
```

## Help

- **Starlight Docs**: https://starlight.astro.build
- **Astro Docs**: https://docs.astro.build
- **Check Issues**: Review error messages carefully
- **Read README.md**: Comprehensive documentation

## Success! 🎉

You now have a fully functional JSON-based database site with:
- Dynamic pages for all collections
- Beautiful Starlight UI
- Type-safe development
- Easy data updates
- Cross-linked relationships

Enjoy your MycoLab! 🍄
