'use client';

import { useEffect, useRef } from 'react';

export function IsometricWaveGridBackground({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const draw = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(120,145,255,0.13)';
      const spacing = 28;
      const angle = Math.PI / 6;
      const dy = spacing * Math.sin(angle);

      for (let y = -h; y < h * 2; y += dy) {
        ctx.beginPath();
        for (let x = -w; x < w * 2; x += spacing) {
          const yy = y + Math.sin((x + t * 0.04) / 80) * 6;
          ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }
      for (let x = -w; x < w * 2; x += spacing) {
        ctx.beginPath();
        for (let y = -h; y < h * 2; y += dy) {
          const xx = x + Math.cos((y + t * 0.05) / 80) * 6;
          ctx.lineTo(xx, y);
        }
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className={`absolute inset-0 ${className}`} />;
}
