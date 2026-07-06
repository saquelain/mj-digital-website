import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function DigitalMarketingHero() {
  return (
    <section className="dm-hero">
      <div className="dm-hero-inner">

        <div className="dm-hero-left">
          <div className="dm-hero-badge">Digital Marketing</div>
          <h1 className="dm-hero-title">
            Growth That<br />
            <span className="dm-hero-accent">Compounds</span>
          </h1>
          <p className="dm-hero-sub">
            SEO, social media, and performance marketing that turns visibility into revenue. Strategy-first, execution-obsessed.
          </p>

          <div className="dm-hero-trust-list">
            {[
              "Data-driven strategy, not guesswork",
              "Dedicated marketing & content team",
              "Transparent monthly reporting",
              "Campaigns live within days, not weeks",
            ].map((t) => (
              <div key={t} className="dm-hero-trust-item">
                <CheckCircle2 size={14} />
                {t}
              </div>
            ))}
          </div>

          <div className="dm-hero-ctas">
            <Link href="/contact" className="dm-btn-primary">
              Get a Free Audit <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="dm-btn-outline">
              Talk to Sales
            </Link>
          </div>
        </div>

        <div className="dm-hero-right">
          <div className="dm-dash-window">
            <div className="dm-dash-titlebar">
              <div className="dm-dash-dots">
                <span /><span /><span />
              </div>
              <div className="dm-dash-filename">growth-dashboard</div>
            </div>
            <div className="dm-dash-body">
              <div className="dm-dash-metrics">
                <div className="dm-dash-metric">
                  <div className="dm-dash-metric-label">Organic Traffic</div>
                  <div className="dm-dash-metric-val">+184%</div>
                  <div className="dm-dash-metric-delta">↑ vs last quarter</div>
                </div>
                <div className="dm-dash-metric">
                  <div className="dm-dash-metric-label">ROAS</div>
                  <div className="dm-dash-metric-val">4.6x</div>
                  <div className="dm-dash-metric-delta">↑ 0.8x this month</div>
                </div>
              </div>
              <div className="dm-dash-chart">
                {[30, 45, 38, 60, 52, 74, 68, 88, 80, 96].map((h, i) => (
                  <div key={i} className="dm-dash-bar" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="dm-dash-footer">
              <div className="dm-dash-status">
                <div className="dm-dash-status-dot" />
                Campaign Live · 12 keywords ranking top 10
              </div>
              <div className="dm-dash-tag">live</div>
            </div>
          </div>
        </div>

      </div>

      <div className="dm-hero-stats">
        <div className="dm-hero-stats-inner">
          {[
            { val: "4",    label: "Marketing Disciplines" },
            { val: "180%", label: "Avg. Traffic Growth" },
            { val: "4.6x", label: "Avg. ROAS" },
            { val: "10+",  label: "Industries Served" },
          ].map((s, i, arr) => (
            <div key={s.label} className="dm-hero-stat">
              <div className="dm-hero-stat-val">{s.val}</div>
              <div className="dm-hero-stat-label">{s.label}</div>
              {i < arr.length - 1 && <div className="dm-hero-stat-div" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}