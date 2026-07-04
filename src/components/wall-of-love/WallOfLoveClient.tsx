'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { SplitText } from 'gsap/SplitText';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { ArrowRight, Heart } from 'lucide-react';
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--wol-mono-font',
});

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, SplitText, Physics2DPlugin);

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  category: 'fintech' | 'web' | 'mobile' | 'api' | 'ai';
  likes: number;
}

// Placeholder content — swap with real client quotes when available.
const testimonials: Testimonial[] = [
  { quote: "We integrated EzeePay's AEPS APIs in under a week. Documentation was clear, support answered in minutes, not days.", name: "Rakesh Mehta", role: "CTO · Fintech startup", initials: "RM", category: "fintech", likes: 142 },
  { quote: "Our lead management system went from spreadsheets to a real dashboard. The team actually understood our workflow before writing a line of code.", name: "Ananya Iyer", role: "Ops Head · NBFC", initials: "AI", category: "api", likes: 98 },
  { quote: "The white-label platform launched under our brand in three weeks. Our customers have no idea it's not built in-house.", name: "Vikram Shah", role: "Founder · Payments reseller", initials: "VS", category: "fintech", likes: 176 },
  { quote: "Page speed went from a 40 to a 96. Same content, same design — just fast now. Didn't think that jump was possible.", name: "Priya Nair", role: "Marketing Lead · D2C brand", initials: "PN", category: "web", likes: 121 },
  { quote: "Built our mobile app end to end — Flutter, backend, the works. Shipped to both stores in six weeks.", name: "Karan Bhatia", role: "Product Manager · Logistics", initials: "KB", category: "mobile", likes: 89 },
  { quote: "Their WhatsApp Business API integration cut our support response time in half. Customers actually notice.", name: "Sana Kapoor", role: "COO · D2C retailer", initials: "SK", category: "api", likes: 134 },
  { quote: "We asked for a chatbot. We got a chatbot that actually resolves tickets instead of just routing them. Rare.", name: "Rohan Desai", role: "Head of Support · SaaS", initials: "RD", category: "ai", likes: 107 },
  { quote: "Migrated our entire CRM without a single day of downtime. Our sales team didn't even notice the switch happened.", name: "Meera Joshi", role: "VP Sales · Distribution", initials: "MJ", category: "api", likes: 156 },
  { quote: "Cloud infra costs dropped 30% after their DevOps audit. They found things our previous vendor missed for two years.", name: "Arjun Nair", role: "Engineering Lead · Fintech", initials: "AN", category: "web", likes: 112 },
];

const categoryColor: Record<Testimonial['category'], string> = {
  fintech: 'var(--wol-red)',
  web: 'var(--wol-blue)',
  mobile: '#22C55E',
  api: '#A855F7',
  ai: '#F59E0B',
};

const marqueeChips = [
  'Shipped ahead of schedule',
  'Support that actually responds',
  'Docs that made sense on day one',
  'Zero-downtime migration',
  'PageSpeed 96 and climbing',
  '200+ businesses and counting',
  'API uptime we can bet on',
  'Onboarded in a single sprint',
];

export default function WallOfLoveClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {

      // ---------- Hero ----------
      if (!reduceMotion) {
        const split = new SplitText('.wol-hero-line', { type: 'chars' });
        const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
        intro
          .from('.wol-eyebrow', { scale: 0.6, autoAlpha: 0, duration: 0.6, ease: 'back.out(2)' })
          .from(split.chars, {
            yPercent: 120,
            rotation: () => gsap.utils.random(-10, 10),
            duration: 0.9,
            stagger: { each: 0.018, from: 'random' },
          }, '-=0.3')
          .from('.wol-hero-sub, .wol-hero-hint', { y: 22, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, '-=0.4');

        const counter = { v: 0 };
        gsap.to(counter, {
          v: 4820, duration: 2, ease: 'power2.out', delay: 0.3,
          onUpdate: () => {
            const el = document.getElementById('wol-love-count');
            if (el) el.textContent = Math.floor(counter.v).toLocaleString();
          },
        });
      } else {
        const el = document.getElementById('wol-love-count');
        if (el) el.textContent = '4,820';
      }

      // ---------- Marquee ----------
      if (!reduceMotion) {
        document.querySelectorAll<HTMLElement>('.wol-mrow').forEach((row) => {
          const dir = Number(row.dataset.dir);
          gsap.to(row, {
            xPercent: dir === 1 ? -50 : 0,
            duration: 30,
            ease: 'none',
            repeat: -1,
            ...(dir === -1 ? { startAt: { xPercent: -50 }, xPercent: 0 } : {}),
          });
        });
      }

      // ---------- Wall reveal + drag ----------
      const cards = gsap.utils.toArray<HTMLElement>('.wol-card');
      cards.forEach((c) => gsap.set(c, { rotation: Number(c.dataset.rot) || 0 }));

      if (!reduceMotion) {
        ScrollTrigger.batch(cards, {
          start: 'top 92%',
          once: true,
          onEnter: (batch) => {
            batch.forEach((card, i) => {
              const el = card as HTMLElement;
              const finalRot = Number(el.dataset.rot) || 0;
              gsap.fromTo(el,
                { autoAlpha: 0, scale: 1.08, y: -20, rotation: finalRot + gsap.utils.random(-6, 6) },
                { autoAlpha: 1, scale: 1, y: 0, rotation: finalRot, duration: 0.6, ease: 'power3.out', delay: i * 0.07 }
              );
            });
          },
        });

        let zTop = 10;
        cards.forEach((card) => {
          const el = card as HTMLElement;
          Draggable.create(el, {
            type: 'x,y',
            inertia: true,
            bounds: '.wol-wall-section',
            edgeResistance: 0.7,
            throwResistance: 2200,
            onPress() {
              el.style.zIndex = String(++zTop);
              el.classList.add('wol-lifted');
              gsap.to(el, { scale: 1.04, duration: 0.25, ease: 'power2.out' });
            },
            onRelease() {
              el.classList.remove('wol-lifted');
              gsap.to(el, { scale: 1, duration: 0.5, ease: 'elastic.out(1,0.45)' });
            },
          });
        });
      } else {
        gsap.set(cards, { autoAlpha: 1 });
      }

      // ---------- Featured quote scroll-scrub ----------
      if (!reduceMotion) {
        const q = new SplitText('#wol-featured-quote', { type: 'words', wordsClass: 'wol-w' });
        gsap.timeline({
          scrollTrigger: {
            trigger: '#wol-featured',
            start: 'top top',
            end: '+=120%',
            pin: true,
            scrub: 0.6,
          },
        })
          .from('.wol-featured-mono', { autoAlpha: 0, y: 20 })
          .to(q.words, { opacity: 1, stagger: 0.5, ease: 'none' })
          .from('.wol-featured-who', { autoAlpha: 0, y: 24, duration: 2 });
      } else {
        document.querySelectorAll('#wol-featured-quote .wol-w').forEach((w) => ((w as HTMLElement).style.opacity = '1'));
      }

      // ---------- CTA reveal ----------
      if (!reduceMotion) {
        gsap.from('.wol-cta-section h2, .wol-cta-section p, .wol-cta-btn', {
          scrollTrigger: { trigger: '.wol-cta-section', start: 'top 78%' },
          y: 32, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        });
      }

    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const span = btn.querySelector('span');
    const loved = btn.classList.toggle('wol-loved');
    const base = Number(btn.dataset.count);
    if (span) span.textContent = String(base + (loved ? 1 : 0));
    gsap.fromTo(btn, { scale: 0.85 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1.4,0.4)' });

    if (!loved || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = btn.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
      const h = document.createElement('span');
      h.className = 'wol-heart-particle';
      h.innerHTML = '♥';
      h.style.left = `${r.left + r.width / 2}px`;
      h.style.top = `${r.top + r.height / 2}px`;
      document.body.appendChild(h);
      gsap.to(h, {
        duration: gsap.utils.random(0.8, 1.3),
        physics2D: { velocity: gsap.utils.random(200, 400), angle: gsap.utils.random(-135, -45), gravity: 900 },
        rotation: gsap.utils.random(-180, 180),
        opacity: 0,
        ease: 'none',
        onComplete: () => h.remove(),
      });
    }
  };

  const marqueeA = [...marqueeChips, ...marqueeChips];
  const marqueeB = [...marqueeChips.slice(4), ...marqueeChips.slice(0, 4), ...marqueeChips.slice(4), ...marqueeChips.slice(0, 4)];

  return (
    <div ref={rootRef} className={`wol-root ${jetbrainsMono.variable}`}>

      {/* ================= HERO ================= */}
      <section className="wol-hero">
        <div className="wol-eyebrow">
          <b id="wol-love-count">0</b>&nbsp;kind words collected — and counting
        </div>
        <h1 className="wol-hero-title">
          <span className="wol-hero-line">People keep</span>
          <span className="wol-hero-line">telling us so</span>
        </h1>
        <p className="wol-hero-sub">
          We stopped writing our own marketing copy and started pinning up what clients actually say instead.
        </p>
        <div className="wol-hero-hint">↓ drag the cards below — the wall is real, rearrange it</div>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className="wol-marquee" aria-hidden="true">
        <div className="wol-mrow" data-dir="1">
          <div className="wol-mrow-inner">
            {marqueeA.map((c, i) => <div key={i} className="wol-chip">{c}</div>)}
          </div>
        </div>
        <div className="wol-mrow" data-dir="-1">
          <div className="wol-mrow-inner">
            {marqueeB.map((c, i) => <div key={i} className="wol-chip wol-chip--alt">{c}</div>)}
          </div>
        </div>
      </div>

      {/* ================= THE WALL ================= */}
      <section className="wol-wall-section">
        <div className="wol-wall-head">
          <h2>The wall.</h2>
          <span className="wol-wall-sub">unedited, drag them around</span>
        </div>

        <div className="wol-wall">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className="wol-card"
              data-rot={[-1.6, 1.2, -0.8, 1.8, -1.2, 0.9, -1.9, 1.4, -1.1][i % 9]}
              style={{ borderLeftColor: categoryColor[t.category] }}
            >
              <span className="wol-card-tag" style={{ color: categoryColor[t.category] }}>
                // {t.category}
              </span>
              <p className="wol-card-quote">{t.quote}</p>
              <div className="wol-card-person">
                <span className="wol-avatar" style={{ background: categoryColor[t.category] }}>{t.initials}</span>
                <div>
                  <div className="wol-card-name">{t.name}</div>
                  <div className="wol-card-role">{t.role}</div>
                </div>
                <button className="wol-heart-btn" data-count={t.likes} onClick={handleLike}>
                  <Heart size={12} /> <span>{t.likes}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="wol-featured" id="wol-featured">
        <div className="wol-featured-inner">
          <div className="wol-featured-mono">from a client email, june 2026</div>
          <blockquote id="wol-featured-quote">
            Most vendors build what you ask for. <span className="wol-accent">MJ Digital built what we actually needed</span> —
            and told us when our original spec would've slowed us down. That kind of honesty is <span className="wol-accent">rare in this industry.</span>
          </blockquote>
          <div className="wol-featured-who">
            <span className="wol-avatar" style={{ background: 'var(--wol-red)' }}>NT</span>
            <div>
              <div className="wol-card-name">Neha Thakur</div>
              <div className="wol-card-role" style={{ color: 'rgba(242,244,250,0.6)' }}>Founder · Lending platform</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="wol-cta-section">
        <h2>Got a note for us?</h2>
        <p>There's a space on the wall with your name on it.</p>
        <Link href="/contact" className="wol-cta-btn">
          Become our next success story <ArrowRight size={18} />
        </Link>
      </section>

    </div>
  );
}