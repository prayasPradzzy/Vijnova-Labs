"use client";

import { useEffect, useRef } from "react";

// Control points of the path (normalised to the canvas). Margastra = "path".
const CONTROL: [number, number][] = [
  [0.34, 1.04],
  [0.46, 0.94],
  [0.58, 0.97],
  [0.7, 0.72],
  [0.82, 0.56],
  [0.9, 0.36],
  [0.96, 0.2],
];

const SPACING = 30;
const REACH = 96; // how far the path lights nearby dots
const CURSOR = 150;
const DRAW_MS = 3600;
const START_DELAY = 500;

function samplePath(n: number) {
  const pts: [number, number][] = [];
  const c = [CONTROL[0], ...CONTROL, CONTROL[CONTROL.length - 1]];
  const segs = CONTROL.length - 1;
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * segs;
    const s = Math.min(Math.floor(t), segs - 1);
    const u = t - s;
    const [p0, p1, p2, p3] = [c[s], c[s + 1], c[s + 2], c[s + 3]];
    const f = (a: number, b: number, c2: number, d: number) =>
      0.5 *
      (2 * b +
        (-a + c2) * u +
        (2 * a - 5 * b + 4 * c2 - d) * u * u +
        (-a + 3 * b - 3 * c2 + d) * u * u * u);
    pts.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
  }
  return pts;
}

export function Lattice({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const path = samplePath(240);
    let w = 0;
    let h = 0;
    let dpr = 1;
    let dots: { x: number; y: number; idx: number; d: number }[] = [];
    let px: [number, number][] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const layout = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      px = path.map(([x, y]) => [x * w, y * h]);
      dots = [];
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      const ox = (w - (cols - 1) * SPACING) / 2;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = ox + i * SPACING;
          const y = j * SPACING;
          let best = Infinity;
          let bi = 0;
          for (let k = 0; k < px.length; k++) {
            const dx = px[k][0] - x;
            const dy = px[k][1] - y;
            const dd = dx * dx + dy * dy;
            if (dd < best) {
              best = dd;
              bi = k;
            }
          }
          dots.push({ x, y, idx: bi / (px.length - 1), d: Math.sqrt(best) });
        }
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const p = reduced ? 1 : Math.min(Math.max((now - t0 - START_DELAY) / DRAW_MS, 0), 1);
      // ease the head so it lingers on the climb
      const head = 1 - Math.pow(1 - p, 2.2);
      ctx.clearRect(0, 0, w, h);

      for (const dot of dots) {
        let x = dot.x;
        let y = dot.y;
        let r = 1.1;
        let color = "138,144,162";
        let a = 0.2;

        if (dot.d < REACH && dot.idx <= head) {
          const wgt = Math.pow(1 - dot.d / REACH, 2);
          const age = head - dot.idx;
          const flare = age < 0.07 ? 1 - age / 0.07 : 0;
          color = "242,177,92";
          a = 0.2 + wgt * (0.5 + flare * 0.45);
          r = 1.1 + wgt * (1.6 + flare * 1.4);
        }

        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR) {
            const k = 1 - dist / CURSOR;
            const push = k * k * 14;
            x += (dx / (dist || 1)) * push;
            y += (dy / (dist || 1)) * push;
            r += k * 1.8;
            if (color === "138,144,162") color = "124,156,255";
            a = Math.max(a, 0.2 + k * 0.7);
          }
        }

        ctx.fillStyle = `rgba(${color},${a})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // the path itself, drawn up to the head
      const last = Math.floor(head * (px.length - 1));
      if (last > 1) {
        ctx.save();
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(242,177,92,0.85)";
        ctx.shadowColor = "rgba(242,177,92,0.7)";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(px[0][0], px[0][1]);
        for (let i = 1; i <= last; i++) ctx.lineTo(px[i][0], px[i][1]);
        ctx.stroke();
        ctx.restore();

        const [hx, hy] = px[last];
        const pulse = reduced ? 0 : (Math.sin(now / 420) + 1) / 2;
        ctx.fillStyle = "#f2b15c";
        ctx.beginPath();
        ctx.arc(hx, hy, 4, 0, Math.PI * 2);
        ctx.fill();
        if (p >= 1) {
          ctx.strokeStyle = `rgba(242,177,92,${0.5 - pulse * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(hx, hy, 9 + pulse * 10, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (reduced) {
        cancelAnimationFrame(raf);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = mouse.y >= 0 && mouse.y <= r.height;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    layout();
    raf = requestAnimationFrame(frame);
    const ro = new ResizeObserver(() => {
      layout();
      if (reduced) raf = requestAnimationFrame(frame);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(canvas);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
