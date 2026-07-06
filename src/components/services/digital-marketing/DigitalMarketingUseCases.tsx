import { Store, Rocket, Building2, ShoppingBag, Stethoscope, GraduationCap } from "lucide-react";

const useCases = [
  {
    icon: Store,
    title: "Local & Retail Businesses",
    desc: "Show up when nearby customers search. Local SEO, Google Business Profile optimization, and geo-targeted ad campaigns.",
  },
  {
    icon: Rocket,
    title: "Startups & New Launches",
    desc: "Build visibility from zero. Full-funnel strategy covering SEO foundations, social presence, and early paid acquisition.",
  },
  {
    icon: ShoppingBag,
    title: "D2C & E-commerce Brands",
    desc: "Drive qualified traffic and conversions with performance campaigns, retargeting, and conversion-rate-focused landing pages.",
  },
  {
    icon: Building2,
    title: "B2B & SaaS Companies",
    desc: "Generate qualified leads through content-led SEO, LinkedIn strategy, and account-based paid campaigns.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare & Clinics",
    desc: "Build patient trust online with reputation management, local SEO, and compliant paid healthcare advertising.",
  },
  {
    icon: GraduationCap,
    title: "Education & Institutes",
    desc: "Reach prospective students with admissions-focused SEO, social campaigns, and lead-gen paid funnels.",
  },
];

export default function DigitalMarketingUseCases() {
  return (
    <section className="dm-section dm-section-surface">
      <div className="dm-section-hd">
        <div className="dm-label">Use Cases</div>
        <h2 className="dm-title">
          Built for every kind<br />
          <span className="dm-title-accent">of growth story</span>
        </h2>
        <p className="dm-desc">
          Whether you're a local shop or a funded SaaS company — the channels change, the discipline doesn't.
        </p>
      </div>
      <div className="dm-usecases-grid">
        {useCases.map((u) => (
          <div key={u.title} className="dm-usecase-card">
            <div className="dm-usecase-icon"><u.icon size={20} /></div>
            <h3>{u.title}</h3>
            <p>{u.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}