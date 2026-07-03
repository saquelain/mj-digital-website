"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { LinkPreview } from "@/components/ui/link-preview";
import AnimatedButton from "@/components/ui/AnimatedButton";

const stats = [
  { number: "200+", label: "Businesses Served" },
  { number: "50+", label: "APIs Available" },
  { number: "8+", label: "Years of Experience" },
  { number: "4", label: "Flagship Products" },
  { number: "10+", label: "Industries" },
];

const products = [
  { name: "EzeePay", logo: "/ezeepay-logo-jpeg.webp", desc: "Fintech Platform", url: "https://ezeepay.app", isStatic: false },
  { name: "Zoki", logo: "/zoki-logo.jpg", desc: "CPaaS Solution", url: "https://zoki-website.vercel.app/", isStatic: false },
  { name: "Mobilocker", logo: "/mobilocker-logo.png", desc: "Secure Storage", url: "https://mobilocker.app", isStatic: false },
  { name: "Cashlo", logo: "/cashlo-icon.svg", desc: "UPI Cashpoint", url: "https://cashlo-final-fxmt.vercel.app/", isStatic: false },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section className="hero-section" ref={sectionRef}>

      {/* Background image — outer layer handles scroll parallax, inner handles slow zoom */}
      <div className="hero-bg-image-wrap">
        <motion.div className="hero-bg-parallax" style={{ y: bgY }}>
          <div
            className="hero-bg-zoom"
            style={{ backgroundImage: "url('/mj-hero-bg.webp')" }}
          />
        </motion.div>
      </div>

      {/* Dark overlay for text contrast */}
      <div className="hero-bg-overlay" />

      {/* Content — sits above image/overlay */}
      <div className="hero-content">

        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Technology · Fintech · Innovation
        </div>

        {/* Headline */}
        <h1 className="hero-headline">
          Building Technology That<br />
          <span className="hero-headline-accent">Powers Businesses</span>
        </h1>

        {/* Subtext */}
        <p className="hero-subtext">
          Software solutions, fintech infrastructure, APIs, mobile applications,
          and digital transformation for startups, enterprises &amp; governments.
        </p>

        {/* CTAs */}
        <div className="hero-ctas">
          <AnimatedButton
            href="/services"
            className="hero-btn-primary"
            icon={<Rocket size={16} />}
          >
            Explore Services <ArrowRight size={16} />
          </AnimatedButton>
          <Link href="https://ezeepay.app" className="hero-btn-outline" target="_blank" rel="noopener noreferrer">
            View Products
          </Link>
        </div>

        {/* Product chips */}
        <div className="hero-chips">
          {/* <span className="hero-chips-label">Our Products:</span> */}
          {products.map((p, i) => (
            p.isStatic ? (
              <LinkPreview
                key={p.name}
                url={p.url}
                isStatic
                imageSrc={p.logo}
                width={200}
                height={120}
                className="hero-chip"
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7, animationDelay: `${0.6 + i * 0.1}s` }}>
                  <img src={p.logo} alt={p.name} style={{ width: 20, height: 20, borderRadius: "4px", objectFit: "contain", flexShrink: 0, backgroundColor: "white" }} />
                  <span>{p.name}</span>
                  <span className="hero-chip-desc">{p.desc}</span>
                </div>
              </LinkPreview>
            ) : (
              <LinkPreview
                key={p.name}
                url={p.url}
                width={200}
                height={120}
                className="hero-chip"
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7, animationDelay: `${0.6 + i * 0.1}s` }}>
                  <img src={p.logo} alt={p.name} style={{ width: 20, height: 20, borderRadius: "4px", objectFit: "contain", flexShrink: 0, backgroundColor: "white" }} />
                  <span>{p.name}</span>
                  <span className="hero-chip-desc">{p.desc}</span>
                </div>
              </LinkPreview>
            )
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero-stats-bar">
        <div className="hero-stats-inner">
          {stats.map((s, i) => (
            <div key={s.label} className="hero-stat">
              <div className="hero-stat-number">{s.number}</div>
              <div className="hero-stat-label">{s.label}</div>
              {i < stats.length - 1 && <div className="hero-stat-divider" />}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}