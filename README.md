# Lewi Maropo — Portfolio

Personal portfolio site built with Next.js, React, and TypeScript.

**Live:** [lewi-maropo.vercel.app](https://lewi-maropo.vercel.app)

## Features

- Minimalist single-frame layout with animated skill marquees
- Playable Chrome-dino clone on a 2D canvas, no game library
- Dark mode that follows your OS preference and remembers your choice
- Installable to the home screen as a PWA, works offline
- Single page: every section is visible by scrolling, nav links jump to them
- Responsive down to mobile, keyboard accessible

## Tech Stack

|           |                         |
| --------- | ----------------------- |
| Framework | Next.js 16 (App Router) |
| Library   | React 19                |
| Language  | TypeScript              |
| Styling   | Plain CSS               |
| Analytics | Vercel Web Analytics    |
| Hosting   | Vercel                  |

## Getting Started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server with hot reload |
| `npm run build` | Type-check and build for production  |
| `npm run start` | Serve the production build locally   |
| `npm run lint`  | Run ESLint                           |

## Project Structure

```
public/              Static assets served as-is (icons, photo, manifest, sw)
src/
  app/
    layout.tsx       Metadata, PWA tags, pre-hydration theme script
    page.tsx         Frame, navigation, theme toggle, marquees, sections
    globals.css      All styling
  components/        Game, Projects, Skills, Resume, Contact
  skillsData.tsx     Skill names with inline SVG icons
```

## Notes

The theme class is applied by an inline script in `layout.tsx` before React
hydrates, so dark mode never flashes light on load. That makes the server and
client markup differ by design, which is why `<body>` carries
`suppressHydrationWarning`.

## Deployment

Pushing to `main` triggers a production deploy on Vercel automatically.
Vercel detects Next.js on its own — no configuration file is needed.
