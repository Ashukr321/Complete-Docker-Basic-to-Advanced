# Docs website

A Next.js site that renders the repo's markdown notes (everything outside `website/`) at build time.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # prerenders every page
npx vitest run     # checks slugs, titles and that every repo image shows up
```

- Notes are read from `..` (override with `CONTENT_DIR`). Each top-level folder is a category, sub-folders become sidebar groups.
- Repo images/HTML are served from `/content/<repo path>`.
- **Vercel:** set Root Directory to `website`.
- **Docker:** `cd website && docker compose up --build` (the build context is the repo root).

Shortcuts: `Ctrl/⌘ K` or `/` search, `Ctrl/⌘ B` or `Shift /` toggle the sidebar.
