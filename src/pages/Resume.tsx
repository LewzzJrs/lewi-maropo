// TEMPLATE - semua teks masih lorem ipsum, tinggal diganti isi asli.
// Struktur mengikuti pola bagian bernomor: Experience, Projects,
// Expertise, Education, Certifications.

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
      'Build The Web App for the automotive workshop equipment store in Indonesia.',
      'MarketPlace Layout responsive, Modern technologies for Web, and intersing for customer',
      'Usefull and Easy to use.',
    ],
  },
  {
    periode: '2025',
    peran: 'Full Stack Developer',
    organisasi: 'PD. Riloka Mart',
    poin: [
      'Build The Web App for Supplies Store for small shop/stall.',
      'MarketPlace Layout responsive, Modern Technologies for Web, and Intersting for customers.',
      'Usefull and Easy to Use'
    ],
  },
];

const proyek: { judul: string; poin: string[] }[] = [
  {
    judul: 'Lorem Ipsum Platform',
    poin: [
      'Santo Putra Oil.',
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur.',
      'Technical note: describe one specific problem and how you solved it.',
    ],
  },
  {
    judul: 'Dolor Sit Amet System',
    poin: [
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.',
      'Et harum quidem rerum facilis est et expedita distinctio nam libero tempore.',
    ],
  },
];

const keahlian: { kelompok: string; isi: string[] }[] = [
  { kelompok: 'Languages', isi: ['English', 'Mandarin', 'Indonesia'] },
  { kelompok: 'Programming', isi: ['JavaScript', 'TypeScript', 'Python'] },
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
    jenjang: ' ', 
    institusi: 'SMA Kristen Kalam Kudus',
    catatan: 'Graduated 2023',
  },
];

const sertifikasi: { nama: string; penerbit: string; tahun: string }[] = [
  { nama: 'Lorem Certified Professional', penerbit: 'Ipsum Academy', tahun: '2025' },
  { nama: 'Dolor Sit Amet Associate', penerbit: 'Consectetur Cloud', tahun: '2024' },
];

export default function Resume() {
  return (
    <div className='resume'>
      <section className='resume-bagian'>
        <p className='resume-nomor'>01 / Experience</p>
        {pengalaman.map((item) => (
          <article key={item.peran} className='resume-item'>
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
        <p className='resume-nomor'>02 / Projects</p>
        {proyek.map((item) => (
          <article key={item.judul} className='resume-item'>
            <h3 className='resume-judul'>{item.judul}</h3>
            <ul className='resume-poin'>
              {item.poin.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className='resume-bagian'>
        <p className='resume-nomor'>03 / Expertise</p>
        {keahlian.map((k) => (
          <article key={k.kelompok} className='resume-item'>
            <h3 className='resume-judul'>{k.kelompok}</h3>
            <p className='resume-org'>{k.isi.join(' · ')}</p>
          </article>
        ))}
      </section>

      <section className='resume-bagian'>
        <p className='resume-nomor'>04 / Education</p>
        {pendidikan.map((p) => (
          <article key={p.jenjang} className='resume-item'>
            <p className='resume-periode'>{p.catatan}</p>
            <h3 className='resume-judul'>{p.jenjang}</h3>
            <p className='resume-org'>{p.institusi}</p>
          </article>
        ))}
      </section>

      <section className='resume-bagian'>
        <p className='resume-nomor'>05 / Certifications</p>
        {sertifikasi.map((s) => (
          <article key={s.nama} className='resume-item'>
            <p className='resume-periode'>{s.tahun}</p>
            <h3 className='resume-judul'>{s.nama}</h3>
            <p className='resume-org'>{s.penerbit}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
