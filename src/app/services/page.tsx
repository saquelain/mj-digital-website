import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceGroups } from "@/lib/site-data";
import "@/components/services/shared/service-shared.css";

export default function ServicesPage() {
  return (
    <main>
      <section className="svc-hero">
        <div className="svc-hero-inner" style={{ gridTemplateColumns: "1fr", textAlign: "center", paddingBottom: 64 }}>
          <div>
            <div className="svc-hero-badge" style={{ margin: "0 auto 24px" }}>
              Our Services
            </div>
            <h1 className="svc-hero-title">
              Everything you need to <span className="svc-hero-accent">build and scale</span>
            </h1>
            <p className="svc-hero-sub" style={{ margin: "0 auto" }}>
              Fintech APIs, communication platforms, custom software, and emerging
              tech — all under one roof.
            </p>
          </div>
        </div>
      </section>

      {serviceGroups.map((group) => (
        <section key={group.label} className="svc-section">
          <div className="svc-shared-hd">
            <div className="svc-label">{group.label}</div>
          </div>

          <div
            className="svc-shared-grid"
            style={{
                gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`,
            }}
            >
            {group.items.map((item) => (
              <Link key={item.name} href={item.href} className="svc-shared-card">
                <div className="svc-shared-icon">
                  <item.icon size={20} />
                </div>
                <div className="svc-shared-card-title">{item.name}</div>
                <div className="svc-shared-card-desc">{item.description}</div>
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 6, color: "var(--primary)", fontSize: 13, fontWeight: 600 }}>
                  Learn more <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="svc-cta-section">
        <div className="svc-cta-inner">
          <h2 className="svc-cta-title">
            Not sure which service <span className="svc-cta-accent">fits your needs?</span>
          </h2>
          <p className="svc-cta-sub">
            Tell us what you&apos;re building and we&apos;ll point you to the right solution.
          </p>
          <div className="svc-cta-btns">
            <Link href="/contact" className="svc-cta-btn-primary">
              Talk to us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}