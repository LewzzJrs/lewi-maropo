# Lewi Maropo — Portfolio

Personal portfolio site built with React, TypeScript, and Vite.

**Live:** [lewi-maropo.vercel.app](https://lewi-maropo.vercel.app)

## Features

- Minimalist single-frame layout with animated skill marquees
- Dark mode that follows your OS preference and remembers your choice
- Single page: every section is visible by scrolling, nav links jump to them
- Responsive down to mobile, keyboard accessible

## Tech Stack

|            |                      |
| ---------- | -------------------- |
| Framework  | React 19             |
| Language   | TypeScript           |
| Build tool | Vite 8               |
| Styling    | Plain CSS            |
| Analytics  | Vercel Web Analytics |
| Hosting    | Vercel               |

## Getting Started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start the dev server with hot reload             |
| `npm run build`   | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally               |
| `npm run lint`    | Run ESLint                                       |

## Project Structure

```
public/            Static assets copied verbatim (favicon)
src/
  App.tsx          Layout, navigation, theme toggle, marquees
  App.css          All styling
  skillsData.tsx   Skill names with inline SVG icons
  pages/           Projects, Skills, Contact
index.html         Document head, meta tags
```

## Deployment

Pushing to `main` triggers a production deploy on Vercel automatically.

The site is a single page with anchor navigation, so no SPA rewrite
config is needed — every URL other than `/` should legitimately 404.
