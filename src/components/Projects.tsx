export default function Projects() {
  return (
    <div className="projects">
      <ul className="project-list">
        <li>
          <h3>Full-stack web apps</h3>
          <p>Storefronts, chord libraries and social feeds — from the database schema up to the screen, with Next.js, React and TypeScript.</p>
        </li>
        <li>
          <h3>Offline-first and installable</h3>
          <p>Service workers and PWA installs, so pages already opened stay readable with no connection at all.</p>
        </li>
        <li>
          <h3>Documents in and out</h3>
          <p>Importing lyrics and chords from Word, PDF and Google Docs, and exporting a whole setlist back out as one PDF.</p>
        </li>
      </ul>
    </div>
  );
}