import type { Metadata, Viewport } from 'next';
import { Lexend_Mega, Public_Sans } from 'next/font/google';
import './globals.css';

const display = Lexend_Mega({
  subsets: ['latin'],
  weight: ['400', '800'],
  variable: '--font-display',
  display: 'swap',
});

const body = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
});

const deskripsi =
  'Portfolio of Lewi Maropo, a front end developer and software engineer building modern web applications with React, TypeScript, and Next.js.';

export const metadata: Metadata = {
  title: 'Lewi Maropo — Front End Developer',
  description: deskripsi,
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    title: 'Lewi Maropo',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    type: 'website',
    url: 'https://lewi-maropo.vercel.app/',
    title: 'Lewi Maropo — Front End Developer',
    description: deskripsi,
  },
  twitter: {
    card: 'summary',
  },
};

export const viewport: Viewport = {
  themeColor: '#111111',
};

const skripTema = `
(function () {
  try {
    var t = localStorage.getItem('theme');
    var gelap = t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    if (gelap) document.body.classList.add('dark-mode');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={`${display.variable} ${body.variable}`}>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: skripTema }} />
        {children}
      </body>
    </html>
  );
}
