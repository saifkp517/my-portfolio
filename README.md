# Saifullah Khan — Developer Portfolio

Recruiter-facing portfolio built with Next.js App Router, React, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Production build

```bash
npm run build
npm run start
```

The routes live in `src/app`: `/`, `/projects/zentra`, `/projects/erp`, `/articles/websockets`, and `/articles/redis`. Page content is in `src/views`, shared UI is in `src/components`, and static images are in `public/images`.

## Deploy to Vercel

Import this repository as a Next.js project. Vercel detects the framework and uses `npm run build`; no output directory or environment variables are needed. Direct requests to project and article URLs are handled by Next.js.

Page titles and social metadata are in `src/app/layout.jsx` and the route `page.jsx` files. Add a share image to `public/images` and reference it in metadata if desired.
