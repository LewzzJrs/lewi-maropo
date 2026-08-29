# Lewi Maropo — Portfolio

Personal portfolio site built with React, TypeScript, and Vite.

**Live:** [lewi-maropo.vercel.app](https://lewi-maropo.vercel.app)

## Features

- Minimalist single-frame layout with animated skill marquees
- Dark mode that follows your OS preference and remembers your choice
- Client-side routing across Projects, Skills, and Contact
- Responsive down to mobile, keyboard accessible

## Tech Stack

| | |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Routing | React Router 7 |
| Styling | Plain CSS |
| Analytics | Vercel Web Analytics |
| Hosting | Vercel |

## Getting Started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
public/            Static assets copied verbatim (favicon, SPA redirects)
src/
  App.tsx          Layout, navigation, theme toggle, marquees
  App.css          All styling
  skillsData.tsx   Skill names with inline SVG icons
  pages/           Projects, Skills, Contact
index.html         Document head, meta tags
vercel.json        SPA rewrite so deep links resolve
```

## Deployment

Pushing to `main` triggers a production deploy on Vercel automatically.

Routing is client-side, so the host must serve `index.html` for unknown
paths — otherwise `/skills` and `/contact` return 404 on refresh. Both
configs are committed: `vercel.json` for Vercel, `public/_redirects` for
Netlify and Cloudflare Pages.
