// Fill WHATSAPP in with the number in international form, no plus or spaces
// (example: '6281234567890'). Leave it empty and the button stays hidden.
const WHATSAPP = '';

const MESSAGE = 'Halo Lewi, saya mau tanya soal pembuatan website.';

const takes = [
  'Company sites and storefronts, from the database up to the screen',
  'Internal tools: admin panels, catalogs, reports, role-based access',
  'Fixing or finishing a site somebody else started',
];

const steps = [
  { n: '01', t: 'Tell me what it is for', d: 'A message with the business and the problem is enough to start.' },
  { n: '02', t: 'Scope and quote', d: 'I come back with what I would build, how long, and what it costs.' },
  { n: '03', t: 'Build in the open', d: 'A live preview URL from the first week, so you watch it take shape.' },
];

export default function Hire() {
  const waHref = WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MESSAGE)}`
    : null;

  return (
    <div className='hire'>
      <p className='hire-status'>
        <span className='hire-dot' aria-hidden='true' />
        Available for freelance work
      </p>

      <div className='hire-cols'>
        <div>
          <h3 className='hire-label'>What I take on</h3>
          <ul className='hire-list'>
            {takes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='hire-label'>How it starts</h3>
          <ol className='hire-steps'>
            {steps.map((s) => (
              <li key={s.n}>
                <span className='hire-step-n'>{s.n}</span>
                <span>
                  <strong>{s.t}</strong>
                  {s.d}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {waHref && (
        <a className='hire-wa' href={waHref} target='_blank' rel='noreferrer'>
          Chat on WhatsApp
        </a>
      )}
    </div>
  );
}
