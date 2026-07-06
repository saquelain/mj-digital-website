"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface Partner {
  name: string;
  slug: string;
  abbr: string;
  color: string;
}

const palette = [
  "#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#3b82f6",
  "#ef4444", "#8b5cf6", "#10b981", "#f97316", "#0ea5e9",
  "#d946ef", "#84cc16",
];

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function abbreviate(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    return words.slice(0, 3).map((w) => w[0].toUpperCase()).join("");
  }
  const caps = name.match(/[A-Z]/g) || [];
  if (caps.length >= 2) return caps.slice(0, 2).join("");
  return name.slice(0, 2).toUpperCase();
}

const partnerNames = [
  "PhonePe", "Axis Bank", "ICICI Lombard", "Razorpay", "Protean eGov Technologies",
  "NSDL Payments Bank", "Bharat BillPay", "MobiKwik", "AU Small Finance Bank",
  "Jio Payments Bank", "InsuranceDekho", "Coverfox", "Decentro", "Fino Payments Bank",
  "Shivalik Small Finance Bank", "OneAssist", "SabPaisa", "Tax2Win", "VakilGiri",
  "eTrav", "Oxymoney", "Unlimit", "Elephant", "Fingspring", "MPay", "INRDeals", "Azmarq",
];

const partners: Partner[] = partnerNames.map((name, i) => ({
  name,
  slug: slugify(name),
  abbr: abbreviate(name),
  color: palette[i % palette.length],
}));

export default function PartnersField() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Preload real logo files if present at /public/partners/<slug>.svg,
    // fall back silently to the initials tile if missing.
    const images = new Map<string, HTMLImageElement | "error">();
    partners.forEach((p) => {
      const exts = ["svg", "png", "webp"];
      let i = 0;
      const img = new window.Image();
      const tryNext = () => {
        if (i >= exts.length) { images.set(p.slug, "error"); return; }
        img.src = `/partners/${p.slug}.${exts[i]}`;
        i++;
      };
      img.onload = () => images.set(p.slug, img);
      img.onerror = tryNext;
      tryNext();
    });

    const hash = (x: number, y: number) => {
      const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return h - Math.floor(h);
    };

    let W = 0, H = 0, dpr = 1;
    let CELL = 120, TILE = 84;
    let offX = 0, offY = 0;
    let velX = 0, velY = 0;
    const IDLE = reduceMotion ? { x: 0, y: 0 } : { x: -0.16, y: -0.11 };
    let hovering = false;
    const steer = { x: 0, y: 0 };

    const MAX_SPEED = 8;
    const DEAD_ZONE = 0.06;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = section!.getBoundingClientRect();
      W = r.width; H = r.height;
      CELL = Math.max(96, Math.min(148, W / 11));
      TILE = CELL * 0.72;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(section);
    resize();

    function updateSteer(e: PointerEvent) {
      const r = section!.getBoundingClientRect();
      let nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      let ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      nx = Math.max(-1, Math.min(1, nx));
      ny = Math.max(-1, Math.min(1, ny));
      const d = Math.min(Math.hypot(nx, ny), 1);
      if (d < DEAD_ZONE) { steer.x = 0; steer.y = 0; return; }
      const speed = MAX_SPEED * d * d;
      steer.x = (nx / d) * speed;
      steer.y = (ny / d) * speed;
    }

    const onEnter = (e: PointerEvent) => { if (e.pointerType === "mouse") { hovering = true; updateSteer(e); } };
    const onMove = (e: PointerEvent) => { if (hovering) updateSteer(e); };
    const onLeave = () => { hovering = false; steer.x = 0; steer.y = 0; };

    section.addEventListener("pointerenter", onEnter);
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    function roundRect(x: number, y: number, w: number, h: number, r: number) {
      ctx!.beginPath();
      ctx!.moveTo(x + r, y);
      ctx!.arcTo(x + w, y, x + w, y + h, r);
      ctx!.arcTo(x + w, y + h, x, y + h, r);
      ctx!.arcTo(x, y + h, x, y, r);
      ctx!.arcTo(x, y, x + w, y, r);
      ctx!.closePath();
    }

    function drawTile(cx: number, cy: number, col: number, row: number, alpha: number, scale: number) {
      const rnd = hash(col, row);
      const p = partners[Math.floor(rnd * partners.length)];
      const s = TILE * scale;
      const x = cx - s / 2, y = cy - s / 2;

      ctx!.globalAlpha = alpha;
      ctx!.fillStyle = "#ffffff";
      ctx!.strokeStyle = "rgba(0,0,0,0.05)";
      roundRect(x, y, s, s, s * 0.24);
      ctx!.fill();
      ctx!.stroke();

      const loaded = images.get(p.slug);
      if (loaded && loaded !== "error") {
        const pad = s * 0.2;
        const iw = s - pad * 2;
        const ratio = loaded.naturalWidth / loaded.naturalHeight || 1;
        let dw = iw, dh = iw / ratio;
        if (dh > iw) { dh = iw; dw = iw * ratio; }
        ctx!.drawImage(loaded, cx - dw / 2, cy - dh / 2, dw, dh);
      } else {
        ctx!.fillStyle = p.color;
        ctx!.font = `700 ${s * 0.3}px -apple-system, "Segoe UI", sans-serif`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(p.abbr, cx, cy + s * 0.02);
      }
      ctx!.globalAlpha = 1;
    }

    function drawLayer(ox: number, oy: number, cell: number, tileScale: number, alpha: number, seedShift: number) {
      const half = cell / 2;
      const cols = Math.ceil(W / cell) + 4;
      const rows = Math.ceil(H / cell) + 4;
      const startCol = Math.floor(-ox / cell) - 2;
      const startRow = Math.floor(-oy / cell) - 2;

      for (let r = startRow; r < startRow + rows; r++) {
        const stagger = r % 2 === 0 ? 0 : half;
        for (let c = startCol; c < startCol + cols; c++) {
          drawTile(c * cell + stagger + ox, r * cell + oy, c + seedShift, r + seedShift * 7, alpha, tileScale);
        }
      }
    }

    function render() {
      ctx!.clearRect(0, 0, W, H);
      drawLayer(offX * 0.55 + 40, offY * 0.55 + 20, CELL * 0.9, 0.42, 0.18, 13);
      drawLayer(offX, offY, CELL, 1, 0.95, 0);
    }

    let visible = false;
    let rafId: number | null = null;

    function frame() {
      const tx = hovering ? steer.x : IDLE.x;
      const ty = hovering ? steer.y : IDLE.y;
      velX += (tx - velX) * 0.08;
      velY += (ty - velY) * 0.08;
      offX += velX;
      offY += velY;
      render();
      rafId = visible ? requestAnimationFrame(frame) : null;
    }

    let io: IntersectionObserver | null = null;
    if (reduceMotion) {
      render();
    } else {
      io = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible && rafId === null) rafId = requestAnimationFrame(frame);
        },
        { rootMargin: "100px" }
      );
      io.observe(section);
    }

    return () => {
      ro.disconnect();
      io?.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      section.removeEventListener("pointerenter", onEnter);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="ptn" className="ptn-section" aria-label="Our Partners" ref={sectionRef}>
      <div className="ptn-field">
        <canvas ref={canvasRef} />
      </div>

      <div className="ptn-content">
        <span className="ptn-eyebrow">Our Partners</span>
        <h2>
          27+ trusted partners<span> powering our platform</span>
        </h2>
        <p>
          From leading banks and NBFCs to payment gateways and compliance platforms —
          our partner network powers every product we build.
        </p>
        <Link className="ptn-btn ptn-btn--primary" href="/contact">
        Partner With Us
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        </Link>
        <Link className="ptn-btn ptn-btn--ghost" href="/about">
        Learn More
        </Link>
        <span className="ptn-note">
          Don&apos;t see your platform? <strong>We&apos;re always integrating new partners.</strong>
        </span>
      </div>
    </section>
  );
}