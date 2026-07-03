import Link from "next/link";
import { Lightbulb, Shield, Layers, Heart, ArrowRight } from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Innovation Driven",     desc: "We don't just write code — we engineer solutions that move businesses forward. Every product starts with a problem worth solving." },
  { icon: Layers,    title: "Scalable Architecture", desc: "Built to grow with you. Our infrastructure handles a single merchant or a million transactions — without breaking a sweat." },
  { icon: Shield,    title: "Security First",         desc: "Bank-grade security, end-to-end encryption, and audit-ready compliance. Trust isn't a feature — it's the foundation." },
  { icon: Heart,     title: "Dedicated Support",     desc: "From kickoff to scale-up, you get a real team — not a ticket queue. We're invested in your success, every step." },
];

const products = [
  { name: "EzeePay",    tag: "Fintech",   desc: "AEPS, money transfer, bill payments, and Aadhaar services — a complete fintech merchant platform.",                              href: "https://ezeepay.app",    color: "#22c55e" },
  { name: "Zoki",       tag: "FASTag",    desc: "WhatsApp engagement, customer communication, marketing automation, and lead management — in one inbox.",                         href: "https://zoki-website.vercel.app/",       color: "#3b82f6" },
  { name: "Mobilocker", tag: "Security",  desc: "Digital document storage, secure verification, and data protection for businesses that take privacy seriously.",                 href: "https://mobilocker.app", color: "#a855f7" },
  { name: "Cashlo",     tag: "Fintech",   desc: "UPI Sound Box, QuickServices, and merchant tools built for rural and semi-urban retailers across India.",                        href: "https://cashlo-final-fxmt.vercel.app/", color: "#E5182A" },
];

export default function AboutValues() {
  return (
    <>
      {/* Values */}
      <section className="about-values">
        <div className="about-values-header">
          <div className="about-section-label">Why MJ Digital</div>
          <h2 className="about-section-title">The principles we build on</h2>
          <p className="about-values-sub">
            Four ideas guide every project, every line of code, every customer conversation.
          </p>
        </div>
        <div className="about-values-grid">
          {values.map((v) => (
            <div key={v.title} className="about-value-card">
              <div className="about-value-icon"><v.icon size={20} /></div>
              <h3 className="about-value-title">{v.title}</h3>
              <p className="about-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="about-products">
        <div className="about-products-header">
          <div className="about-section-label">Our Products</div>
          <h2 className="about-section-title">Three platforms. One technology vision.</h2>
          <p className="about-values-sub">
            MJ Digital Services is the technology arm and parent company behind our flagship digital products.
          </p>
        </div>
        <div className="about-products-grid">
          {products.map((p) => (
            <Link key={p.name} href={p.href} className="about-product-card" target="_blank" rel="noopener noreferrer">
              <div className="about-product-stripe" style={{ background: p.color }} />
              <div className="about-product-body">
                <div className="about-product-tag" style={{ color: p.color, borderColor: `${p.color}33`, background: `${p.color}11` }}>
                  {p.tag}
                </div>
                <h3 className="about-product-name">{p.name}</h3>
                <p className="about-product-desc">{p.desc}</p>
                <div className="about-product-link">
                  Explore {p.name} <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-glow" />
        <div className="about-cta-inner">
          <div className="about-cta-badge">Let&apos;s Talk</div>
          <h2 className="about-cta-title">
            Have a project in mind?<br />
            <span className="about-cta-title-accent">Let&apos;s build it together.</span>
          </h2>
          <p className="about-cta-sub">
            Whether you need fintech APIs, a custom platform, or a full digital transformation — our team is ready to help.
          </p>
          <div className="about-cta-buttons">
            <Link href="/contact" className="about-cta-btn-primary">
              Get in Touch <ArrowRight size={15} />
            </Link>
            <Link href="/services" className="about-cta-btn-outline">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}