export const profile = {
  name: 'Lewi Maropo',
  role: 'Front End Developer | Software Engineer',
  email: 'nainggolanlewi3@gmail.com',
  github: 'github.com/LewzzJrs',
  linkedin: 'linkedin.com/in/lewi-maropo',
  site: 'lewi-maropo.vercel.app',
};

export interface TimelineEntry {
  period: string;
  role: string;
  organisation: string;
  points: string[];
}

export const experience: TimelineEntry[] = [
  {
    period: '2026 - present',
    role: 'Founder & Developer',
    organisation: 'MaropoChord',
    points: [
      'A public chord site for pop, worship, Indonesian regional, Western and children’s songs, with 114 songs live.',
      'Grown out of the Exo Worship codebase and opened up: key changes, capo, number chords, guitar and piano diagrams, and setlists.',
      'Next.js 16 and Supabase with ChordSheetJS for transposition, PDF export and import, and a service worker that keeps opened pages readable offline.',
    ],
  },
  {
    period: '2025',
    role: 'Full Stack Developer — Freelance',
    organisation: 'PD. Santo Putra Oil',
    points: [
      'E-commerce for an automotive parts shop: product catalog, product detail, and cart on the storefront.',
      'Admin area behind protected routes for managing products, sales, and reports.',
      'React 19 and TypeScript with Tailwind v4 and shadcn/ui on Radix primitives; Supabase for data and authentication.',
    ],
  },
  {
    period: '2024',
    role: 'Full Stack Developer — Freelance',
    organisation: 'PD. Riloka Mart',
    points: [
      'Web app for a supplies store serving small shops and stalls.',
      'Responsive marketplace layout built with modern web technologies.',
      'Focused on a simple, easy-to-use flow for customers.',
    ],
  },
];

export const expertise: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python'] },
  { group: 'Markup & styling', items: ['HTML', 'CSS', 'Tailwind'] },
  { group: 'Frameworks & UI', items: ['React', 'Next.js', 'Shadcn', 'Radix'] },
  {
    group: 'State, data & forms',
    items: ['Redux', 'Zustand', 'React Query', 'React Hook Form', 'Zod'],
  },
  { group: 'Tools', items: ['Vercel'] },
];

export const education: { degree: string; school: string; note: string }[] = [
  {
    degree: 'Information Systems Major',
    school: 'Telkom University',
    note: '2023 - present',
  },
  {
    degree: '',
    school: 'SMA Kristen Kalam Kudus',
    note: 'Graduated 2023',
  },
];
