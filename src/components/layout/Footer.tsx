import Link from "next/link";
import { Mail } from "lucide-react";

const socials = [
  {
    label: "Instagram",
    href: "#",
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: "Twitter / X",
    href: "#",
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: "YouTube",
    href: "#",
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: "WhatsApp",
    href: "#",
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  },
  {
    label: "Telegram",
    href: "#",
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  },
];

const productLinks = [
  { name: "EzeePay",    href: "https://ezeepay.app/" },
  { name: "Zoki",       href: "https://zoki-website.vercel.app/" },
  { name: "Mobilocker", href: "https://mobilocker.app/" },
  { name: "Cashlo",     href: "https://cashlo-final-fxmt.vercel.app/" },
  { name: "Skylist",    href: null },
  { name: "Adkea",      href: "https://adkea.co/" },
  { name: "Creditlo",   href: null },
];

const certifications = [
  { name: "Business Correspondent Federation of India", logo: "/certifications/bcfi1.webp" },
  { name: "D-U-N-S Registered", logo: "/certifications/duns1.webp" },
  { name: "Internet and Mobile Association of India", logo: "/certifications/iamai1.webp" },
  { name: "ISO 27001 Certified", logo: "/certifications/iso-270011.webp" },
  { name: "ISO 9001:2015 Certified", logo: "/certifications/iso-90011.webp" },
];

const serviceLinks = [
  { name: "API Solutions",       href: "/services/api-solutions" },
  { name: "CPaaS Solutions",     href: "/services/cpaas" },
  { name: "Web Development",     href: "/services/web-development" },
  { name: "Mobile App Dev",      href: "/services/mobile-apps" },
  { name: "White Label Fintech", href: "/services/white-label-fintech" },
  { name: "AI Solutions",        href: "/services/ai-solutions" },
  { name: "CRM / ERP",           href: "/services/crm-erp" },
  { name: "Cloud & DevOps",      href: "/services/cloud-devops" },
];

const companyLinks = [
  { name: "About Us",   href: "/about" },
  { name: "Blog",       href: "/blog" },
  { name: "Developers", href: "/developers" },
  { name: "Contact",    href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glowline" />

      <div className="footer-top">
        {/* Brand column */}
        <div>
          <Link href="/" className="footer-logo">
            <img src="/mj-icon.png" alt="" className="footer-logo-icon" />
            <span className="footer-logo-text">
              MJ Digital<br />Services
            </span>
          </Link>
          <p className="footer-brand-motto">
            Building Digital Products · Powering Businesses · Enabling Innovation
          </p>
          <p className="footer-brand-tagline">
            Technology and innovation company delivering software solutions, fintech
            infrastructure, APIs, mobile applications, and digital transformation for
            startups, enterprises, and government-focused organizations.
          </p>

          <div className="footer-certs">
            {certifications.map((c) => (
              <div key={c.name} className="footer-cert-item" title={c.name}>
                <img src={c.logo} alt={c.name} className="footer-cert-logo" />
              </div>
            ))}
          </div>

          <div className="footer-socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="footer-social-btn" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <div className="footer-col-title">Company</div>
          <div className="footer-links">
            {companyLinks.map((l) => (
              <Link key={l.name} href={l.href} className="footer-link">{l.name}</Link>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="footer-col-title">Products</div>
          <div className="footer-links">
            {productLinks.map((l) =>
              l.href ? (
                <Link key={l.name} href={l.href} className="footer-link">{l.name}</Link>
              ) : (
                <span key={l.name} className="footer-link footer-link--soon">{l.name}</span>
              )
            )}
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="footer-col-title">Services</div>
          <div className="footer-links">
            {serviceLinks.map((l) => (
              <Link key={l.name} href={l.href} className="footer-link">{l.name}</Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="footer-col-title">Contact</div>
          <a href="mailto:business@mjdigitalservices.com" className="footer-contact-item">
            <Mail size={14} style={{ flexShrink: 0, color: "var(--primary)" }} />
            business@mjdigitalservices.com
          </a>
          <Link href="/contact" className="footer-start-link">
            Start a project <span>→</span>
          </Link>
          <div className="footer-status">
            <span className="footer-status-dot" />
            All systems operational
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <span className="footer-copyright">
          © {new Date().getFullYear()} MJ Digital Services. All rights reserved.
        </span>
        <div className="footer-bottom-links">
          <Link href="/privacy-policy" className="footer-bottom-link">Privacy Policy</Link>
          <Link href="/terms-of-service" className="footer-bottom-link">Terms &amp; Conditions</Link>
          <Link href="/refund-policy" className="footer-bottom-link">Refund Policy</Link>
          <Link href="/grievance-redressal" className="footer-bottom-link">Grievance Redressal</Link>
          <a href="#" className="footer-bottom-link footer-totop">Back to top ↑</a>
        </div>
      </div>

      <div className="footer-watermark" aria-hidden="true">MJ DIGITAL</div>
    </footer>
  );
}