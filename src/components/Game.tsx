'use client';

import { useEffect, useRef, useState } from 'react';

const WIDTH = 600;
const HEIGHT = 180;
const GROUND_Y = 148;
const GRAVITY = 2600;
const JUMP_POWER = 720;
const BASE_SPEED = 260;
const MAX_SPEED = 620;

const DINO_X = 46;
const DINO_W = 34;
const DINO_H = 40;

type Obstacle = {
  x: number;
  y: number;
  w: number;
  h: number;
  bird: boolean;
};

type Phase = 'ready' | 'playing' | 'over';

type GameState = {
  phase: Phase;
  altitude: number;
  verticalSpeed: number;
  speed: number;
  distance: number;
  obstacles: Obstacle[];
  spawnGap: number;
  stride: number;
  flap: number;
  score: number;
};

function initialState(): GameState {
  return {
    phase: 'ready',
    altitude: 0,
    verticalSpeed: 0,
    speed: BASE_SPEED,
    distance: 0,
    obstacles: [],
    spawnGap: 420,
    stride: 0,
    flap: 0,
    score: 0,
  };
}

function readBest() {
  try {
    return Number(localStorage.getItem('dino-best')) || 0;
  } catch {
    return 0;
  }
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const actionRef = useRef<() => void>(() => {});
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [phase, setPhase] = useState<Phase>('ready');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    const startingBest = readBest();
    setBest(startingBest);

    let g = initialState();
    let currentBest = startingBest;
    let shownScore = -1;

    const randomBetween = (min: number, max: number) =>
      min + Math.random() * (max - min);

    function spawnObstacle() {
      const useBird = g.score > 350 && Math.random() < 0.28;

      if (useBird) {
        const low = Math.random() < 0.5;
        g.obstacles.push({
          x: WIDTH + 20,
          y: low ? GROUND_Y - 46 : GROUND_Y - 78,
          w: 32,
          h: 22,
          bird: true,
        });
      } else {
        const count = Math.random() < 0.35 ? 2 : 1;
        const h = randomBetween(28, 42);
        g.obstacles.push({
          x: WIDTH + 20,
          y: GROUND_Y - h,
          w: 14 * count + (count - 1) * 4,
          h,
          bird: false,
        });
      }

      g.spawnGap = randomBetween(300, 560) * (BASE_SPEED / g.speed) + 300;
    }

    function jump() {
      if (g.phase === 'ready') {
        g = { ...initialState(), phase: 'playing' };
        setPhase('playing');
        return;
      }
      if (g.phase === 'over') {
        g = { ...initialState(), phase: 'playing' };
        shownScore = -1;
        setPhase('playing');
        setScore(0);
        return;
      }
      if (g.altitude === 0) g.verticalSpeed = JUMP_POWER;
    }

    actionRef.current = jump;

    function hits(o: Obstacle) {
      const top = GROUND_Y - DINO_H - g.altitude;
      const left = DINO_X + 5;
      const right = DINO_X + DINO_W - 5;
      const bottom = top + DINO_H;
      return (
        right > o.x + 3 &&
        left < o.x + o.w - 3 &&
        bottom > o.y + 3 &&
        top + 4 < o.y + o.h - 3
      );
    }

    function update(dt: number) {
      if (g.phase !== 'playing') return;

      g.speed = Math.min(MAX_SPEED, BASE_SPEED + g.score * 0.32);
      const step = g.speed * dt;
      g.distance += step;
      g.score = Math.floor(g.distance / 12);

      g.verticalSpeed -= GRAVITY * dt;
      g.altitude += g.verticalSpeed * dt;
      if (g.altitude <= 0) {
        g.altitude = 0;
        g.verticalSpeed = 0;
        g.stride += step;
      }

      g.flap += dt;
      g.spawnGap -= step;
      if (g.spawnGap <= 0) spawnObstacle();

      for (const o of g.obstacles) o.x -= step;
      g.obstacles = g.obstacles.filter((o) => o.x + o.w > -20);

      for (const o of g.obstacles) {
        if (hits(o)) {
          g.phase = 'over';
          setPhase('over');
          if (g.score > currentBest) {
            currentBest = g.score;
            setBest(currentBest);
            try {
              localStorage.setItem('dino-best', String(currentBest));
            } catch {
              /* private mode: the best score is not stored */
            }
          }
          break;
        }
      }

      if (g.score !== shownScore) {
        shownScore = g.score;
        setScore(g.score);
      }
    }

    function drawDino(color: string) {
      const top = GROUND_Y - DINO_H - g.altitude;
      ctx!.fillStyle = color;

      ctx!.fillRect(DINO_X + 14, top, 20, 15);
      ctx!.fillRect(DINO_X + 30, top + 5, 6, 4);
      ctx!.fillRect(DINO_X + 6, top + 13, 22, 16);
      ctx!.fillRect(DINO_X, top + 16, 8, 7);
      ctx!.fillRect(DINO_X + 10, top + 27, 8, 9);

      const running = g.altitude === 0 && Math.floor(g.stride / 22) % 2 === 0;
      ctx!.fillRect(DINO_X + 9, top + 34, 6, running ? 6 : 3);
      ctx!.fillRect(DINO_X + 19, top + 34, 6, running ? 3 : 6);

      ctx!.clearRect(DINO_X + 27, top + 4, 3, 3);
    }

    function drawObstacle(o: Obstacle, color: string) {
      ctx!.fillStyle = color;
      if (o.bird) {
        const up = Math.floor(g.flap * 8) % 2 === 0;
        ctx!.fillRect(o.x + 10, o.y + 8, 22, 6);
        ctx!.fillRect(o.x, o.y + 10, 12, 4);
        if (up) ctx!.fillRect(o.x + 12, o.y, 14, 9);
        else ctx!.fillRect(o.x + 12, o.y + 13, 14, 9);
      } else {
        const stalks = Math.round((o.w + 4) / 18);
        for (let i = 0; i < stalks; i += 1) {
          const x = o.x + i * 18;
          ctx!.fillRect(x + 5, o.y, 6, o.h);
          ctx!.fillRect(x, o.y + o.h * 0.35, 5, 4);
          ctx!.fillRect(x + 11, o.y + o.h * 0.5, 5, 4);
        }
      }
    }

    let raf = 0;
    let lastTime = 0;
    let onScreen = true;

    function frame(time: number) {
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;

      update(dt);

      const color = getComputedStyle(canvas!).color;
      ctx!.clearRect(0, 0, WIDTH, HEIGHT);

      ctx!.fillStyle = color;
      ctx!.globalAlpha = 0.45;
      ctx!.fillRect(0, GROUND_Y + 2, WIDTH, 1);
      ctx!.globalAlpha = 1;

      drawDino(color);
      for (const o of g.obstacles) drawObstacle(o, color);

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    const observer = new IntersectionObserver(
      (entries) => {
        const nowVisible = entries[0]?.isIntersecting ?? true;
        if (nowVisible === onScreen) return;
        onScreen = nowVisible;
        if (nowVisible) {
          lastTime = 0;
          raf = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    function onKeyDown(e: KeyboardEvent) {
      if (
        e.key === ' ' ||
        e.key === 'ArrowUp' ||
        e.key === 'w' ||
        e.key === 'W'
      ) {
        e.preventDefault();
        jump();
      }
    }

    function onPointerDown(e: PointerEvent) {
      e.preventDefault();
      canvas!.focus();
      jump();
    }

    canvas.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('pointerdown', onPointerDown);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener('keydown', onKeyDown);
      canvas.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <div className='game'>
      <div className='game-board'>
        <canvas
          ref={canvasRef}
          className='game-canvas'
          tabIndex={0}
          role='application'
          aria-label='Dinosaur game. Press space or tap to jump.'
        />
        <div className='game-score'>
          <span>{String(score).padStart(5, '0')}</span>
          <span className='game-best'>HI {String(best).padStart(5, '0')}</span>
        </div>
      </div>

      <p className='game-hint'>
        {phase === 'ready' && 'Click the board, then press space to start.'}
        {phase === 'playing' && 'Space or tap to jump.'}
        {phase === 'over' && 'Ouch! Press space or tap to play again.'}
      </p>

      <button
        type='button'
        className='game-button'
        onClick={() => {
          canvasRef.current?.focus();
          actionRef.current();
        }}
      >
        {phase === 'over' ? 'Play again' : 'Jump'}
      </button>
    </div>
  );
}
