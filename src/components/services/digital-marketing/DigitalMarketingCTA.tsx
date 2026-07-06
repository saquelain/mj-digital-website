import Link from "next/link";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";

export default function DigitalMarketingCTA() {
  return (
    <section className="dm-cta-section">
      <div className="dm-cta-inner">
        <div className="dm-label dm-label-light">Ready to Grow?</div>
        <h2 className="dm-cta-title">
          Let's build your<br />
          <span className="dm-cta-accent">growth strategy</span>
        </h2>
        <p className="dm-cta-sub">
          Get a free audit of your current digital presence. Our team will show you exactly where the opportunity is.
        </p>
        <div className="dm-cta-btns">
          <Link href="/contact" className="dm-cta-btn-primary">
            Get a Free Audit <ArrowRight size={14} />
          </Link>
          <Link href="/contact" className="dm-cta-btn-outline">
            <MessageSquare size={14} /> Talk to Sales
          </Link>
        </div>
        <div className="dm-cta-contact">
          <a href="mailto:business@mjdigitalservices.com" className="dm-cta-contact-item">
            <Phone size={13} /> business@mjdigitalservices.com
          </a>
          <span className="dm-cta-contact-sep">·</span>
          <span className="dm-cta-contact-item">Mon–Sat, 9:30 AM – 6:30 PM IST</span>
        </div>
        <p className="dm-cta-credit">
          Executed by{" "}
          <a href="https://adkea.co" target="_blank" rel="noopener noreferrer" className="dm-cta-credit-link">
            Adkea
          </a>{" "}
          (group companies of MJ)
        </p>
      </div>
    </section>
  );
}