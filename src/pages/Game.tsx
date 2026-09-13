import { useEffect, useRef, useState } from 'react';

const LEBAR = 600;
const TINGGI = 180;
const Y_TANAH = 148;
const GRAVITASI = 2600;
const DAYA_LOMPAT = 720;
const LAJU_AWAL = 260;
const LAJU_MAKS = 620;

const DINO_X = 46;
const DINO_L = 34;
const DINO_T = 40;

type Rintangan = {
  x: number;
  y: number;
  l: number;
  t: number;
  burung: boolean;
};

type Keadaan = {
  status: 'siap' | 'main' | 'selesai';
  tinggiDino: number;
  lajuVertikal: number;
  laju: number;
  jarak: number;
  rintangan: Rintangan[];
  jarakSpawn: number;
  langkahKaki: number;
  kepak: number;
  skor: number;
};

function keadaanAwal(): Keadaan {
  return {
    status: 'siap',
    tinggiDino: 0,
    lajuVertikal: 0,
    laju: LAJU_AWAL,
    jarak: 0,
    rintangan: [],
    jarakSpawn: 420,
    langkahKaki: 0,
    kepak: 0,
    skor: 0,
  };
}

function bacaRekor() {
  try {
    return Number(localStorage.getItem('dino-rekor')) || 0;
  } catch {
    return 0;
  }
}

export default function Game() {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refAksi = useRef<() => void>(() => {});
  const [skor, setSkor] = useState(0);
  const [rekor, setRekor] = useState(0);
  const [status, setStatus] = useState<'siap' | 'main' | 'selesai'>('siap');

  useEffect(() => {
    const canvas = refCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = LEBAR * dpr;
    canvas.height = TINGGI * dpr;
    ctx.scale(dpr, dpr);

    const rekorAwal = bacaRekor();
    setRekor(rekorAwal);

    let g = keadaanAwal();
    let rekorKini = rekorAwal;
    let skorTampil = -1;

    const acak = (min: number, maks: number) => min + Math.random() * (maks - min);

    function buatRintangan() {
      const pakaiBurung = g.skor > 350 && Math.random() < 0.28;

      if (pakaiBurung) {
        const rendah = Math.random() < 0.5;
        g.rintangan.push({
          x: LEBAR + 20,
          y: rendah ? Y_TANAH - 46 : Y_TANAH - 78,
          l: 32,
          t: 22,
          burung: true,
        });
      } else {
        const jumlah = Math.random() < 0.35 ? 2 : 1;
        const t = acak(28, 42);
        g.rintangan.push({
          x: LEBAR + 20,
          y: Y_TANAH - t,
          l: 14 * jumlah + (jumlah - 1) * 4,
          t,
          burung: false,
        });
      }

      g.jarakSpawn = acak(300, 560) * (LAJU_AWAL / g.laju) + 300;
    }

    function lompat() {
      if (g.status === 'siap') {
        g = { ...keadaanAwal(), status: 'main' };
        setStatus('main');
        return;
      }
      if (g.status === 'selesai') {
        g = { ...keadaanAwal(), status: 'main' };
        skorTampil = -1;
        setStatus('main');
        setSkor(0);
        return;
      }
      if (g.tinggiDino === 0) g.lajuVertikal = DAYA_LOMPAT;
    }

    refAksi.current = lompat;

    function tabrakan(r: Rintangan) {
      const dTop = Y_TANAH - DINO_T - g.tinggiDino;
      const dx1 = DINO_X + 5;
      const dx2 = DINO_X + DINO_L - 5;
      const dy1 = dTop + 4;
      const dy2 = dTop + DINO_T;
      return dx2 > r.x + 3 && dx1 < r.x + r.l - 3 && dy2 > r.y + 3 && dy1 < r.y + r.t - 3;
    }

    function perbarui(dt: number) {
      if (g.status !== 'main') return;

      g.laju = Math.min(LAJU_MAKS, LAJU_AWAL + g.skor * 0.32);
      const maju = g.laju * dt;
      g.jarak += maju;
      g.skor = Math.floor(g.jarak / 12);

      g.lajuVertikal -= GRAVITASI * dt;
      g.tinggiDino += g.lajuVertikal * dt;
      if (g.tinggiDino <= 0) {
        g.tinggiDino = 0;
        g.lajuVertikal = 0;
        g.langkahKaki += maju;
      }

      g.kepak += dt;
      g.jarakSpawn -= maju;
      if (g.jarakSpawn <= 0) buatRintangan();

      for (const r of g.rintangan) r.x -= maju;
      g.rintangan = g.rintangan.filter((r) => r.x + r.l > -20);

      for (const r of g.rintangan) {
        if (tabrakan(r)) {
          g.status = 'selesai';
          setStatus('selesai');
          if (g.skor > rekorKini) {
            rekorKini = g.skor;
            setRekor(rekorKini);
            try {
              localStorage.setItem('dino-rekor', String(rekorKini));
            } catch {
              /* mode privat: rekor tidak tersimpan */
            }
          }
          break;
        }
      }

      if (g.skor !== skorTampil) {
        skorTampil = g.skor;
        setSkor(g.skor);
      }
    }

    function gambarDino(warna: string) {
      const top = Y_TANAH - DINO_T - g.tinggiDino;
      ctx!.fillStyle = warna;

      ctx!.fillRect(DINO_X + 14, top, 20, 15);
      ctx!.fillRect(DINO_X + 30, top + 5, 6, 4);
      ctx!.fillRect(DINO_X + 6, top + 13, 22, 16);
      ctx!.fillRect(DINO_X, top + 16, 8, 7);
      ctx!.fillRect(DINO_X + 10, top + 27, 8, 9);

      const lari = g.tinggiDino === 0 && Math.floor(g.langkahKaki / 22) % 2 === 0;
      ctx!.fillRect(DINO_X + 9, top + 34, 6, lari ? 6 : 3);
      ctx!.fillRect(DINO_X + 19, top + 34, 6, lari ? 3 : 6);

      ctx!.clearRect(DINO_X + 27, top + 4, 3, 3);
    }

    function gambarRintangan(r: Rintangan, warna: string) {
      ctx!.fillStyle = warna;
      if (r.burung) {
        const naik = Math.floor(g.kepak * 8) % 2 === 0;
        ctx!.fillRect(r.x + 10, r.y + 8, 22, 6);
        ctx!.fillRect(r.x, r.y + 10, 12, 4);
        if (naik) ctx!.fillRect(r.x + 12, r.y, 14, 9);
        else ctx!.fillRect(r.x + 12, r.y + 13, 14, 9);
      } else {
        const batang = Math.round((r.l + 4) / 18);
        for (let i = 0; i < batang; i += 1) {
          const x = r.x + i * 18;
          ctx!.fillRect(x + 5, r.y, 6, r.t);
          ctx!.fillRect(x, r.y + r.t * 0.35, 5, 4);
          ctx!.fillRect(x + 11, r.y + r.t * 0.5, 5, 4);
        }
      }
    }

    let raf = 0;
    let sebelumnya = 0;
    let terlihat = true;

    function bingkai(waktu: number) {
      const dt = sebelumnya ? Math.min((waktu - sebelumnya) / 1000, 0.05) : 0;
      sebelumnya = waktu;

      perbarui(dt);

      const warna = getComputedStyle(canvas!).color;
      ctx!.clearRect(0, 0, LEBAR, TINGGI);

      ctx!.fillStyle = warna;
      ctx!.globalAlpha = 0.45;
      ctx!.fillRect(0, Y_TANAH + 2, LEBAR, 1);
      ctx!.globalAlpha = 1;

      gambarDino(warna);
      for (const r of g.rintangan) gambarRintangan(r, warna);

      raf = requestAnimationFrame(bingkai);
    }

    raf = requestAnimationFrame(bingkai);

    const pengamat = new IntersectionObserver(
      (entri) => {
        const tampak = entri[0]?.isIntersecting ?? true;
        if (tampak === terlihat) return;
        terlihat = tampak;
        if (tampak) {
          sebelumnya = 0;
          raf = requestAnimationFrame(bingkai);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    pengamat.observe(canvas);

    function tekan(e: KeyboardEvent) {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        lompat();
      }
    }

    function sentuh(e: PointerEvent) {
      e.preventDefault();
      canvas!.focus();
      lompat();
    }

    canvas.addEventListener('keydown', tekan);
    canvas.addEventListener('pointerdown', sentuh);

    return () => {
      cancelAnimationFrame(raf);
      pengamat.disconnect();
      canvas.removeEventListener('keydown', tekan);
      canvas.removeEventListener('pointerdown', sentuh);
    };
  }, []);

  return (
    <div className='game'>
      <div className='game-papan'>
        <canvas
          ref={refCanvas}
          className='game-kanvas'
          tabIndex={0}
          role='application'
          aria-label='Permainan dinosaurus. Tekan spasi atau ketuk untuk melompat.'
        />
        <div className='game-skor'>
          <span>{String(skor).padStart(5, '0')}</span>
          <span className='game-rekor'>HI {String(rekor).padStart(5, '0')}</span>
        </div>
      </div>

      <p className='game-petunjuk'>
        {status === 'siap' && 'Klik papannya, lalu tekan spasi untuk mulai.'}
        {status === 'main' && 'Spasi atau ketuk untuk melompat.'}
        {status === 'selesai' && 'Kena! Tekan spasi atau ketuk untuk main lagi.'}
      </p>

      <button
        type='button'
        className='game-tombol'
        onClick={() => {
          refCanvas.current?.focus();
          refAksi.current();
        }}
      >
        {status === 'selesai' ? 'Main lagi' : 'Lompat'}
      </button>
    </div>
  );
}
