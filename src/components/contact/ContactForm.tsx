"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { serviceGroups } from "@/lib/site-data";

const serviceReasons = serviceGroups.flatMap((group) =>
  group.items.map((item) => item.name)
);

const reasons = [
  ...serviceReasons,
  "General Inquiry",
  "Partnership / Reseller",
];

interface FormState {
  name: string; email: string; phone: string;
  company: string; reason: string; message: string;
}

const initialForm: FormState = { name: "", email: "", phone: "", company: "", reason: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#contact-form") return;

    const el = document.getElementById("contact-form");
    if (!el) return;

    // slight delay lets layout/fonts settle before measuring scroll position
    const scrollTimer = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlight(true);
    }, 150);

    const highlightTimer = setTimeout(() => setHighlight(false), 2200);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(highlightTimer);
    };
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div id="contact-form" className="contact-form-card">
      {submitted ? (
        <div className="contact-success">
          <div className="contact-success-icon">
            <CheckCircle2 size={32} color="#22c55e" />
          </div>
          <h3>Message Sent!</h3>
          <p>Thanks for reaching out. We&apos;ll review your message and get back to you within one business day.</p>
          <button onClick={() => { setSubmitted(false); setForm(initialForm); }} className="contact-success-btn">
            Send Another Message
          </button>
        </div>
      ) : (
        <>
          <h2 className="contact-form-title">Send Us a Message</h2>
          <p className="contact-form-sub">Fill in the form and we&apos;ll get back to you shortly.</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-row">
              <div className="contact-field">
                <label>Full Name <span>*</span></label>
                <input name="name" type="text" placeholder="Rahul Sharma" value={form.name} onChange={handleChange} required />
              </div>
              <div className="contact-field">
                <label>Email Address <span>*</span></label>
                <input name="email" type="email" placeholder="rahul@company.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="contact-form-row">
              <div className="contact-field">
                <label>Phone Number</label>
                <input name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
              </div>
              <div className="contact-field">
                <label>Company Name</label>
                <input name="company" type="text" placeholder="Your Company Ltd." value={form.company} onChange={handleChange} />
              </div>
            </div>
            <div className="contact-field">
              <label>What are you looking for?</label>
              <select name="reason" value={form.reason} onChange={handleChange}>
                <option value="">Select a service...</option>
                {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="contact-field">
              <label>Message <span>*</span></label>
              <textarea name="message" placeholder="Tell us about your project..." value={form.message} onChange={handleChange} rows={5} required />
            </div>
            {error && <div className="contact-error">{error}</div>}
            <button type="submit" disabled={loading} className="contact-submit">
              {loading ? <><span className="contact-spinner" />Sending...</> : <>Send Message <ArrowRight size={15} /></>}
            </button>
            <p className="contact-form-note">By submitting, you agree to our Privacy Policy. We never share your data.</p>
          </form>
        </>
      )}
    </div>
  );
}