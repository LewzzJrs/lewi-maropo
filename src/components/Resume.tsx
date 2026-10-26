import { experience, expertise, education } from '@/data/resume';

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
