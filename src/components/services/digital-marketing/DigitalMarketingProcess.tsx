const steps = [
  {
    num: "01",
    title: "Discovery & Audit",
    desc: "We audit your current digital presence — website, SEO health, social channels, and past ad performance — to find the real opportunities.",
  },
  {
    num: "02",
    title: "Strategy & Roadmap",
    desc: "A channel-by-channel plan with clear priorities, timelines, and budget allocation, tied directly to your business goals.",
  },
  {
    num: "03",
    title: "Execution & Launch",
    desc: "Campaigns go live, content starts publishing, and optimization begins from day one — not after a quarter of \"setup.\"",
  },
  {
    num: "04",
    title: "Report & Optimize",
    desc: "Monthly transparent reporting on what's working. Budgets and strategy shift based on real data, not assumptions.",
  },
];

const results = [
  { label: "180% Avg. Traffic Growth", desc: "Measured across active SEO clients within 6 months" },
  { label: "4.6x Avg. ROAS",           desc: "On managed performance marketing campaigns" },
  { label: "Full Transparency",        desc: "Monthly reports, live dashboards, no black boxes" },
  { label: "Dedicated Strategist",     desc: "A real point of contact, not a rotating account manager" },
  { label: "Cross-Channel Sync",       desc: "SEO, social, and paid working from one shared strategy" },
  { label: "10+ Industries",           desc: "Fintech, D2C, healthcare, education, and more" },
];

export default function DigitalMarketingProcess() {
  return (
    <>
      <section className="dm-section">
        <div className="dm-section-hd">
          <div className="dm-label">Our Process</div>
          <h2 className="dm-title">
            From audit to<br />
            <span className="dm-title-accent">measurable growth</span>
          </h2>
          <p className="dm-desc">
            A clear, repeatable process — no guesswork, no vanity metrics, no surprises.
          </p>
        </div>
        <div className="dm-steps">
          {steps.map((s, i) => (
            <div key={s.num} className="dm-step">
              <div className="dm-step-num">{s.num}</div>
              {i < steps.length - 1 && <div className="dm-step-line" />}
              <div className="dm-step-body">
                <div className="dm-step-title">{s.title}</div>
                <div className="dm-step-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dm-section dm-section-dark">
        <div className="dm-section-hd">
          <div className="dm-label dm-label-light">Why Businesses Choose Us</div>
          <h2 className="dm-title dm-title-light">
            Results you can measure.<br />
            <span className="dm-title-accent-light">Reporting you can trust.</span>
          </h2>
          <p className="dm-desc dm-desc-light">
            No vanity metrics, no locked-in contracts you can't see the numbers behind.
          </p>
        </div>
        <div className="dm-results-grid">
          {results.map((r) => (
            <div key={r.label} className="dm-results-card">
              <div className="dm-results-label">{r.label}</div>
              <div className="dm-results-desc">{r.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}