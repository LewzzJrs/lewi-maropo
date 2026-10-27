import Image from 'next/image';

type Stat = { value: string; label: string };

type Project = {
  name: string;
  kind: string;
  year: string;
  summary: string;
  stats: [Stat, Stat];
  stack: string[];
  preview: string;
  previewNote?: string;
  live?: string;
  code?: string;
  feature?: boolean;
};

const projects: Project[] = [
  {
    name: 'Exo Worship Library',
    kind: 'Worship team · Chord library',
    year: '2026',
    summary:
      'A private library of chord sheets for a 50-person worship team. Instant transposition, auto-scroll and screen wake lock for use on stage, team and personal setlists, and combined medley sheets that export as one PDF.',
    stats: [
      { value: '50', label: 'Team members' },
      { value: 'Offline', label: 'Installable PWA' },
    ],
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Supabase',
      'shadcn/ui',
      'Radix',
    ],
    preview: '/work/exo-worship.webp',
    live: 'https://exo-worship.vercel.app',
    code: 'https://github.com/LewzzJrs/exo-worship',
    feature: true,
  },
  {
    name: 'MaropoChord',
    kind: 'Chords · Public library',
    year: '2026',
    summary:
      'A public chord site for pop, worship, Indonesian regional, Western and children’s songs. Change the key, add a capo, switch to number chords, read guitar and piano diagrams, and build setlists. Grown out of the Exo Worship codebase and opened up.',
    stats: [
      { value: '114', label: 'Songs live' },
      { value: 'Chord AI', label: 'From a YouTube link' },
    ],
    stack: [
      'Next.js 16',
      'React 19',
      'Supabase',
      'ChordSheetJS',
      'Zustand',
      'Tailwind v4',
    ],
    preview: '/work/maropochord.webp',
    live: 'https://maropo-chord.vercel.app',
  },
  {
    name: 'Santo Putra Oil',
    kind: 'E-commerce · Automotive parts',
    year: '2026',
    summary:
      'Storefront for an automotive parts shop in Bandung — catalog, product detail and cart — with an admin area behind protected routes for managing products, sales and reports.',
    stats: [
      { value: 'Admin', label: 'Products & reports' },
      { value: 'Supabase', label: 'Auth and data' },
    ],
    stack: [
      'React 19',
      'TypeScript',
      'Tailwind v4',
      'shadcn/ui',
      'Radix',
      'Supabase',
    ],
    preview: '/work/santo-putra.webp',
  },
  {
    name: 'Movie Explorer',
    kind: 'Films · TMDB API',
    year: '2026',
    summary:
      'Browse trending and now-playing films, search as you type, open a detail page with the trailer, cast and similar titles, and keep a list of favourites. Built to a supplied Figma spec for phone and desktop.',
    stats: [
      { value: '0.4s', label: 'Debounced search' },
      { value: 'URL', label: 'Keeps search state' },
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Zod',
      'Framer Motion',
    ],
    preview: '/work/movie-explorer.webp',
    live: 'https://movie-explorer-jade-tau.vercel.app',
  },
  {
    name: 'Foody',
    kind: 'Food ordering · Restaurant app',
    year: '2026',
    summary:
      'A food ordering app over a supplied REST API: browse and filter restaurants, open a menu, fill a cart, check out, and look back through order history. Eleven pages behind a sign-in.',
    stats: [
      { value: 'Full flow', label: 'Browse to checkout' },
      { value: 'Zustand', label: 'Cart and UI state' },
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'Zustand',
      'Zod',
      'shadcn/ui',
    ],
    preview: '/work/foody.webp',
  },
  {
    name: 'Sociality',
    kind: 'Social media · Photo sharing',
    year: '2026',
    summary:
      'Photo sharing with follows, likes, comments and saves. Built as a frontend MVP on the Sociality REST API, with optimistic updates so an action lands before the server answers.',
    stats: [
      { value: 'Optimistic', label: 'Like & follow' },
      { value: 'Infinite', label: 'Scroll feed' },
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind',
      'TanStack Query',
      'Zod',
      'Redux Toolkit',
    ],
    preview: '/work/sociality.webp',
    live: 'https://sociality-sand.vercel.app',
    code: 'https://github.com/LewzzJrs/sociality',
  },
  {
    name: 'Lewi Maropo',
    kind: 'Personal · Portfolio',
    year: '2026',
    summary:
      'The page you are reading. One long scroll in four chapters, hand-written CSS with no UI framework, and installable to a home screen.',
    stats: [
      { value: '4', label: 'Chapters' },
      { value: 'Installable', label: 'PWA' },
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Plain CSS', 'Vercel'],
    preview: '/work/lewi-maropo.webp',
    live: 'https://lewi-maropo.vercel.app',
    code: 'https://github.com/LewzzJrs/lewi-maropo',
  },
];

export default function Work() {
  return (
    <div className='work'>
      <div className='work-grid'>
        {projects.map((p) => (
          <article
            key={p.name}
            className={p.feature ? 'work-card work-card-feature' : 'work-card'}
          >
            <div className='work-shot'>
              <Image
                src={p.preview}
                alt={`${p.name} screenshot`}
                width={900}
                height={563}
              />
              <span className='work-kind'>{p.kind}</span>
            </div>

            <div className='work-text'>
              <p className='work-year'>{p.year}</p>
              <h3 className='work-name'>{p.name}</h3>
              <p className='work-summary'>{p.summary}</p>

              <dl className='work-stats'>
                {p.stats.map((s) => (
                  <div key={s.label}>
                    <dt>{s.value}</dt>
                    <dd>{s.label}</dd>
                  </div>
                ))}
              </dl>

              <ul className='work-stack'>
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>

              {p.previewNote && <p className='work-note'>{p.previewNote}</p>}

              {(p.live || p.code) && (
                <div className='work-links'>
                  {p.live && (
                    <a href={p.live} target='_blank' rel='noreferrer'>
                      Live preview
                    </a>
                  )}
                  {p.code && (
                    <a
                      className='work-link-ghost'
                      href={p.code}
                      target='_blank'
                      rel='noreferrer'
                    >
                      Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
