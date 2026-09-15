interface ItemRiwayat {
  periode: string;
  peran: string;
  organisasi: string;
  poin: string[];
}

const pengalaman: ItemRiwayat[] = [
  {
    periode: '2025',
    peran: 'Full Stack Developer',
    organisasi: 'PD. Santo Putra Oil',
    poin: [
      'E-commerce for an automotive parts shop: product catalog, product detail, and cart on the storefront.',
      'Admin area behind protected routes for managing products, sales, and reports.',
      'React 19 and TypeScript with Tailwind v4 and shadcn/ui on Radix primitives; Supabase for data and authentication.',
    ],
  },
  {
    periode: '2025',
    peran: 'Full Stack Developer',
    organisasi: 'PD. Riloka Mart',
    poin: [
      'Web app for a supplies store serving small shops and stalls.',
      'Responsive marketplace layout built with modern web technologies.',
      'Focused on a simple, easy-to-use flow for customers.',
    ],
  },
];

const keahlian: { kelompok: string; isi: string[] }[] = [
  { kelompok: 'Languages', isi: ['JavaScript', 'TypeScript', 'Python'] },
  { kelompok: 'Markup & styling', isi: ['HTML', 'CSS', 'Tailwind'] },
  { kelompok: 'Frameworks & UI', isi: ['React', 'Next.js', 'Shadcn', 'Radix'] },
  {
    kelompok: 'State, data & forms',
    isi: ['Redux', 'Zustand', 'React Query', 'React Hook Form', 'Zod'],
  },
  { kelompok: 'Tools', isi: ['Vercel'] },
];

const pendidikan: { jenjang: string; institusi: string; catatan: string }[] = [
  {
    jenjang: 'Information Systems Major',
    institusi: 'Telkom University',
    catatan: '2023 - present',
  },
  {
    jenjang: '',
    institusi: 'SMA Kristen Kalam Kudus',
    catatan: 'Graduated 2023',
  },
];

export default function Resume() {
  return (
    <div className='resume'>
      <section className='resume-bagian'>
        <p className='resume-nomor'>01 / Experience</p>
        {pengalaman.map((item) => (
          <article key={item.organisasi} className='resume-item'>
            <p className='resume-periode'>{item.periode}</p>
            <h3 className='resume-judul'>{item.peran}</h3>
            <p className='resume-org'>{item.organisasi}</p>
            <ul className='resume-poin'>
              {item.poin.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className='resume-bagian'>
        <p className='resume-nomor'>02 / Expertise</p>
        {keahlian.map((k) => (
          <article key={k.kelompok} className='resume-item'>
            <h3 className='resume-judul'>{k.kelompok}</h3>
            <p className='resume-org'>{k.isi.join(' · ')}</p>
          </article>
        ))}
      </section>

      <section className='resume-bagian'>
        <p className='resume-nomor'>03 / Education</p>
        {pendidikan.map((p) => (
          <article key={p.institusi} className='resume-item'>
            <p className='resume-periode'>{p.catatan}</p>
            {p.jenjang && <h3 className='resume-judul'>{p.jenjang}</h3>}
            <p className='resume-org'>{p.institusi}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
