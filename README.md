# Saifullah Khan — Developer Portfolio (recruiter-facing)

Single-page developer portfolio aimed at recruiters, hiring managers and engineering leads.
React 18 + Vite + Tailwind CSS, dark-leaning with a lime accent.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview   # sanity-check the built output
```

## Deploy to Vercel

**Option A — CLI**
```bash
npm i -g vercel
vercel        # first deploy, follow prompts (framework: Vite)
vercel --prod # promote to production
```

**Option B — Git + dashboard**
1. Push this folder to a GitHub repo (a separate repo from the freelance-facing site, or a
   different branch/subfolder — your call).
2. In Vercel, "Add New Project" → import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

No environment variables are required — this is a static site.

## Placeholders to fill in before you ship

1. **Zentra's live/play URL** — appears three times: `src/components/Hero.jsx` ("Play Zentra"
   button) and `src/components/Zentra.jsx` ("Play now" button, `href="#"` in both).
2. **Résumé link** — `src/components/Hero.jsx`, the "Résumé" link (`href="#"`). Point this at a
   hosted PDF or a Drive/Docs link.
3. **Email address** — `src/components/Contact.jsx` (`mailto:#`, contact card and primary CTA).
4. **Zentra gameplay screenshot or GIF** — `src/components/Zentra.jsx`, the placeholder block
   above the "Play now" button. Drop the file in `public/images/` and swap the placeholder
   `<span>` for an `<img>`.
5. **ERP module screenshots (5 total)** — `src/components/Erp.jsx`, one per module card:
   Watchman + Billing, Trucks, Users & Permissions, Ageing Report, Reporting. **Keep these in
   light/white mode** — the frames around them are white by design so the screenshots read
   cleanly against the dark page.
6. **Open Graph share image** — `index.html`, `og:image` / `twitter:image`
   (`/images/og-cover.jpg`). 1200×630 works best for link previews. Can reuse the one from the
   freelance-facing site if you want consistent link previews.
7. **`og:url`** — `index.html`, currently `https://example.com/`. Update once deployed.
8. **Favicon** — none set. Add one to `public/` and link it in `index.html`.

## Where the content came from

Headline, subhead, both project write-ups (Zentra's mechanics and architecture, the ERP's
4–6hr → 20min result, problem/solution and all five modules), and the contact links (GitHub,
LinkedIn, phone) come directly from your brief. Nothing was invented — no employer names,
testimonials, GitHub stats, user counts or metrics beyond what you gave me.
