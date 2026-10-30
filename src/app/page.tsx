'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Analytics } from '@vercel/analytics/next';
import { skillsWithIcons } from '@/skillsData';

import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Resume from '@/components/Resume';
import Game from '@/components/Game';
import Work from '@/components/Work';
import Hire from '@/components/Hire';

const section = [
  { id: 'build', label: 'Build' },
  { id: 'path', label: 'Path' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export default function Home() {
  // null while rendering on the server; the real value is read from the class
  // the layout script already set, so dark mode never flashes light first.
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    // Reads once from the DOM the script mutated before hydration. This is the
    // "read from an external system" case the rule itself carves out.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDarkMode(document.body.classList.contains('dark-mode'));
  }, []);

  useEffect(() => {
    if (isDarkMode === null) return;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Scroll progress for the chapter indicator the pattern asks for.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // The dot in the navigation follows whichever section is on screen.
  const [activeSection, setActiveSection] = useState<string>(section[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );

    section.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Elements fade in as they enter the viewport. The 'reveal' class is added
  // from JS so that without JS the content stays visible instead of hidden.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      [
        '.section-label',
        '.chapter-title',
        '.work-card',
        '.project-list li',
        '.skill-badge',
        '.resume-heading',
        '.resume-item',
        '.contact-title',
        '.contact-item',
        '.photo-slot',
      ].join(', '),
    );

    let previousParent: Element | null = null;
    let order = 0;

    targets.forEach((el) => {
      const parent = el.closest('.section');
      if (parent !== previousParent) {
        previousParent = parent;
        order = 0;
      }
      el.dataset.delay = `${Math.min(order, 6) * 70}ms`;
      order += 1;
      if ('IntersectionObserver' in window) el.classList.add('reveal');
    });

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;

          if (e.isIntersecting) {
            el.style.transitionDelay = el.dataset.delay ?? '0ms';
            el.classList.add('visible');
            return;
          }

          // Only hide again when the element leaves through the BOTTOM, meaning
          // it has not been reached yet. Hiding what left through the top would
          // leave blank gaps when scrolling back up.
          if (e.boundingClientRect.top > 0) {
            el.style.transitionDelay = '0ms';
            el.classList.remove('visible');
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );

    targets.forEach((el) => observer.observe(el));

    // Failsafe: if nothing has revealed after 1.5s the observer is broken.
    // Better to drop the animation than to hide the site permanently.
    const failsafe = window.setTimeout(() => {
      if (!document.querySelector('.reveal.visible')) {
        targets.forEach((el) => el.classList.remove('reveal'));
      }
    }, 1500);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className='progress'
        role='progressbar'
        aria-label='Reading progress'
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div
          className='progress-bar'
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <div className='frame-container'>
        <div className='social-links-external'>
          <a
            href='https://linkedin.com/in/lewi-maropo'
            target='_blank'
            rel='noreferrer'
            aria-label='LinkedIn'
          >
            <svg viewBox='0 0 24 24' aria-hidden='true'>
              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
            </svg>
          </a>
          <a
            href='https://github.com/LewzzJrs'
            target='_blank'
            rel='noreferrer'
            aria-label='GitHub'
          >
            <svg viewBox='0 0 24 24' aria-hidden='true'>
              <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
            </svg>
          </a>
        </div>

        <button
          type='button'
          className='theme-toggle'
          onClick={() => setIsDarkMode((v) => !v)}
          aria-pressed={isDarkMode ?? false}
          aria-label={
            isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
          }
        >
          <span className='active-theme'>
            {isDarkMode ? '□ LIGHT' : '■ LIGHT'}
          </span>
          <span className='inactive-theme'>
            {isDarkMode ? '■ DARK' : '□ DARK'}
          </span>
        </button>

        <header className='header'>
          <h1 className='name'>Lewi Maropo</h1>
          <br />
          <p className='role'>Front End Developer | Software Engineer</p>
        </header>

        <nav className='navigation'>
          <ul>
            {section.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`}>
                  <span
                    className='dot'
                    style={{ opacity: activeSection === id ? 1 : 0 }}
                  >
                    •
                  </span>{' '}
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className='content-container'>
          <div className='photo-slot'>
            <Image
              src='/foto.webp'
              alt='Lewi Maropo'
              width={600}
              height={800}
              priority
            />
          </div>
        </div>

        <div className='marquee-container text-marquee'>
          <div className='marquee-track'>
            {[
              ...skillsWithIcons,
              ...skillsWithIcons,
              ...skillsWithIcons,
              ...skillsWithIcons,
            ].map((item, index) => (
              <div key={`text-${index}`} className='marquee-item-text'>
                <span>{item.name}</span>
                <span className='marquee-dot'>•</span>
              </div>
            ))}
          </div>
        </div>

        <div className='marquee-container icon-marquee'>
          <div className='marquee-track'>
            {[
              ...skillsWithIcons,
              ...skillsWithIcons,
              ...skillsWithIcons,
              ...skillsWithIcons,
            ].map((item, index) => (
              <div key={`icon-${index}`} className='marquee-item-icon-only'>
                <span
                  className='marquee-svg-only'
                  dangerouslySetInnerHTML={{ __html: item.svg }}
                />
              </div>
            ))}
          </div>
        </div>

        <Game />

        <Analytics />
      </div>

      <div className='content-below'>
        <section id='build' className='section chapter chapter-1'>
          <p className='section-label'>Chapter 01</p>
          <h2 className='chapter-title'>What I build</h2>
          <p className='chapter-lede'>
            Three kinds of problem I keep coming back to, and the tools I reach
            for when I do.
          </p>
          <Projects />
          <Skills />
          <a className='chapter-next' href='#path'>
            How I got here <span aria-hidden='true'>&darr;</span>
          </a>
        </section>

        <section id='path' className='section chapter chapter-2'>
          <p className='section-label'>Chapter 02</p>
          <h2 className='chapter-title'>How I got here</h2>
          <p className='chapter-lede'>
            Two shops that needed software, and the schooling either side of
            them.
          </p>
          <Resume />
          <a className='chapter-next' href='#work'>
            See the work <span aria-hidden='true'>&darr;</span>
          </a>
        </section>

        <section id='work' className='section chapter chapter-3'>
          <p className='section-label'>Chapter 03</p>
          <h2 className='chapter-title'>The work</h2>
          <p className='chapter-lede'>
            Seven things I built. Five of them open in a new tab from here.
          </p>
          <Work />
          <a className='chapter-next' href='#contact'>
            Get in touch <span aria-hidden='true'>&darr;</span>
          </a>
        </section>

        <section id='contact' className='section chapter chapter-climax'>
          <p className='section-label'>The end</p>
          <Hire />
          <Contact />
          <a className='cv-link' href='/cv'>
            Download CV
          </a>
        </section>
      </div>
    </>
  );
}
