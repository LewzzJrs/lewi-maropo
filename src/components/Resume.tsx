interface TimelineEntry {
  period: string;
  role: string;
  organisation: string;
  points: string[];
}

const experience: TimelineEntry[] = [
  {
    period: '2026',
    role: 'Full Stack Developer',
    organisation: 'PD. Santo Putra Oil',
    points: [
      'E-commerce for an automotive parts shop: product catalog, product detail, and cart on the storefront.',
      'Admin area behind protected routes for managing products, sales, and reports.',
      'React 19 and TypeScript with Tailwind v4 and shadcn/ui on Radix primitives; Supabase for data and authentication.',
    ],
  },
  {
    period: '2026',
    role: 'Full Stack Developer',
    organisation: 'PD. Riloka Mart',
    points: [
      'Web app for a supplies store serving small shops and stalls.',
      'Responsive marketplace layout built with modern web technologies.',
      'Focused on a simple, easy-to-use flow for customers.',
    ],
  },
];

const expertise: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python'] },
  { group: 'Markup & styling', items: ['HTML', 'CSS', 'Tailwind'] },
  { group: 'Frameworks & UI', items: ['React', 'Next.js', 'Shadcn', 'Radix'] },
  {
    group: 'State, data & forms',
    items: ['Redux', 'Zustand', 'React Query', 'React Hook Form', 'Zod'],
  },
  { group: 'Tools', items: ['Vercel'] },
];

const education: { degree: string; school: string; note: string }[] = [
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

export default function Resume() {
  return (
    <div className='resume'>
      <section className='resume-block'>
        <p className='resume-heading'>01 / Experience</p>
        {experience.map((item) => (
          <article key={item.organisation} className='resume-item'>
            <p className='resume-period'>{item.period}</p>
            <h3 className='resume-title'>{item.role}</h3>
            <p className='resume-org'>{item.organisation}</p>
            <ul className='resume-points'>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className='resume-block'>
        <p className='resume-heading'>02 / Expertise</p>
        {expertise.map((entry) => (
          <article key={entry.group} className='resume-item'>
            <h3 className='resume-title'>{entry.group}</h3>
            <p className='resume-org'>{entry.items.join(' · ')}</p>
          </article>
        ))}
      </section>

      <section className='resume-block'>
        <p className='resume-heading'>03 / Education</p>
        {education.map((entry) => (
          <article key={entry.school} className='resume-item'>
            <p className='resume-period'>{entry.note}</p>
            {entry.degree && (
              <h3 className='resume-title'>{entry.degree}</h3>
            )}
            <p className='resume-org'>{entry.school}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
