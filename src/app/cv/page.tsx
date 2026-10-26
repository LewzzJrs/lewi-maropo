import type { Metadata } from 'next';
import Link from 'next/link';
import { profile, experience, expertise, education } from '@/data/resume';
import PrintButton from './PrintButton';

export const metadata: Metadata = {
  title: 'CV — Lewi Maropo',
  description: `Curriculum vitae for ${profile.name}, front end developer and software engineer.`,
  robots: { index: false, follow: true },
};

export default function CvPage() {
  return (
    <main className='cv'>
      <div className='cv-bar'>
        <Link className='cv-back' href='/'>
          Back to the site
        </Link>
        <PrintButton />
      </div>

      <article className='cv-sheet'>
        <header className='cv-head'>
          <h1>{profile.name}</h1>
          <p className='cv-role'>{profile.role}</p>
          <ul className='cv-contact'>
            <li>{profile.email}</li>
            <li>{profile.linkedin}</li>
            <li>{profile.github}</li>
            <li>{profile.site}</li>
          </ul>
        </header>

        <section className='cv-section'>
          <h2>Experience</h2>
          {experience.map((item) => (
            <div key={item.organisation} className='cv-entry'>
              <div className='cv-entry-head'>
                <h3>{item.role}</h3>
                <span>{item.period}</span>
              </div>
              <p className='cv-org'>{item.organisation}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className='cv-section'>
          <h2>Expertise</h2>
          <dl className='cv-skills'>
            {expertise.map((entry) => (
              <div key={entry.group}>
                <dt>{entry.group}</dt>
                <dd>{entry.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className='cv-section'>
          <h2>Education</h2>
          {education.map((entry) => (
            <div key={entry.school} className='cv-entry'>
              <div className='cv-entry-head'>
                <h3>{entry.degree || entry.school}</h3>
                <span>{entry.note}</span>
              </div>
              {entry.degree && <p className='cv-org'>{entry.school}</p>}
            </div>
          ))}
        </section>
      </article>
    </main>
  );
}
