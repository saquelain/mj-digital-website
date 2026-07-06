import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactInfo = [
  { icon: Mail,   label: "Email Us",       value: "business@mjdigitalservices.com", sub: "We reply within 24 hours",          href: "mailto:business@mjdigitalservices.com" },
  { icon: Phone,  label: "Call Us",        value: "+91 98765 43210",                sub: "Mon – Sat, 10 AM – 7 PM IST",       href: "tel:+919876543210" },
  { icon: MapPin, label: "Office",         value: "7th Floor AWFIS, Bhutani Techno Park, Sector 127, Noida, UP 201313", sub: "MJ Digital Services Pvt Ltd", href: "https://maps.google.com/?q=Bhutani+Techno+Park+Sector+127+Noida+201313" },
];

export default function ContactInfo() {
  return (
    <div>
      <h2 className="contact-info-title">Contact Information</h2>
      <p className="contact-info-desc">
        Reach us directly or fill in the form and we&apos;ll get back to you within one business day.
      </p>
      <div className="contact-info-list">
        {contactInfo.map((item) => (
          <div key={item.label} className="contact-info-card">
            <div className="contact-info-icon"><item.icon size={18} /></div>
            <div className="contact-info-body">
              <div className="contact-info-label">{item.label}</div>
              {item.href ? (
                <a href={item.href} className="contact-info-value contact-info-value-link">{item.value}</a>
              ) : (
                <div className="contact-info-value">{item.value}</div>
              )}
              <div className="contact-info-sub">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="contact-response">
        <div className="contact-response-dot" />
        <span>Average response time: <strong>under 4 hours</strong> on business days</span>
      </div>
    </div>
  );
}