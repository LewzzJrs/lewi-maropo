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
    periode: 'Lorem 2025 - Ipsum 2026',
    peran: 'Lorem Ipsum Developer',
    organisasi: 'PT. Dolor Sit Amet',
    poin: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    ],
  },
  {
    periode: 'Lorem 2024 - Ipsum 2025',
    peran: 'Consectetur Adipiscing',
    organisasi: 'CV. Tempor Incididunt',
    poin: [
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
    ],
  },
];

const proyek: { judul: string; poin: string[] }[] = [
  {
    judul: 'Lorem Ipsum Platform',
    poin: [
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur.',
      'Catatan teknis: jelaskan satu masalah spesifik dan bagaimana kamu menyelesaikannya.',
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
  { kelompok: 'Bahasa', isi: ['Lorem', 'Ipsum', 'Dolor'] },
  { kelompok: 'Framework', isi: ['Sit', 'Amet', 'Consectetur'] },
  { kelompok: 'Basis Data', isi: ['Adipiscing', 'Elit'] },
  { kelompok: 'Tools', isi: ['Tempor', 'Incididunt', 'Labore'] },
];

const pendidikan: { jenjang: string; institusi: string; catatan: string }[] = [
  {
    jenjang: 'Lorem Ipsum Dolor',
    institusi: 'Universitas Sit Amet',
    catatan: 'Lorem 2024 - Sekarang',
  },
  {
    jenjang: 'Consectetur Adipiscing',
    institusi: 'SMK Elit Tempor',
    catatan: 'Lulus 2023',
  },
];

const sertifikasi: { nama: string; penerbit: string; tahun: string }[] = [
  { nama: 'Lorem Certified Professional', penerbit: 'Ipsum Academy', tahun: '2025' },
  { nama: 'Dolor Sit Amet Associate', penerbit: 'Consectetur Cloud', tahun: '2024' },
];

export default function Resume() {
  return (
    <div className='dynamic-section resume'>
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
