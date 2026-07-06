import { CheckCircle2 } from "lucide-react";

const categories = [
  {
    tag: "Organic Growth",
    title: "SEO — Search Engine Optimization",
    desc: "Rank higher on Google with technical fixes, on-page optimization, and authority-building link strategies that compound over time.",
    features: ["Technical SEO Audits", "On-Page Optimization", "Off-Page & Link Building", "Local SEO & GBP"],
    color: "var(--primary)",
  },
  {
    tag: "Social Growth",
    title: "SMO — Social Media Optimization",
    desc: "Build an audience that actually engages. Content strategy, community management, and paid social campaigns across every major platform.",
    features: ["Content Strategy & Calendars", "Community Management", "Social Media Advertising", "Influencer Coordination"],
    color: "#2563eb",
  },
  {
    tag: "Paid Media",
    title: "Performance Marketing",
    desc: "Google Ads, Meta Ads, and full-funnel paid campaigns optimized for conversions — not just clicks. Every rupee tracked to ROI.",
    features: ["Google Search & Display", "Meta & Instagram Ads", "Conversion Tracking", "A/B Testing & Optimization"],
    color: "#059669",
  },
  {
    tag: "Strategy",
    title: "Digital Consulting",
    desc: "A full audit of your current digital presence, competitive landscape, and channel strategy — before you spend a rupee on execution.",
    features: ["Digital Audits", "Competitor Analysis", "Channel & Budget Strategy", "Growth Roadmapping"],
    color: "#7c3aed",
  },
];

export default function DigitalMarketingCategories() {
  return (
    <section className="dm-section">
      <div className="dm-section-hd">
        <div className="dm-label">Our Approach</div>
        <h2 className="dm-title">
          Four disciplines,<br />
          <span className="dm-title-accent">one growth engine</span>
        </h2>
        <p className="dm-desc">
          Organic and paid, content and strategy — all working together instead of in silos.
        </p>
      </div>

      <div className="dm-categories-grid">
        {categories.map((c) => (
          <div key={c.title} className="dm-category-card">
            <div className="dm-category-top">
              <div
                className="dm-category-tag"
                style={{ color: c.color, background: `${c.color}12`, borderColor: `${c.color}30` }}
              >
                {c.tag}
              </div>
              <h3 className="dm-category-title">{c.title}</h3>
              <p className="dm-category-desc">{c.desc}</p>
            </div>
            <ul className="dm-category-features">
              {c.features.map((f) => (
                <li key={f}>
                  <CheckCircle2 size={12} style={{ color: c.color }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}