"use client";

import { useEffect, useState } from "react";

const imageLogos = [
  { name: "Razorpay", src: "/logos/razorpay.svg" },
  { name: "Cashfree", src: "/logos/cashfree.svg" },
  { name: "PhonePe", src: "/logos/phonepe.svg" },
  { name: "Stripe", src: "/logos/stripe.svg" },
  { name: "PayU", src: "/logos/payu.svg" },
  { name: "CCAvenue", src: "/logos/ccavenue.svg" },
  { name: "Bharat BillPay (BBPS)", src: "/logos/bbps.svg" },
  { name: "UPI", src: "/logos/upi.svg" },
  { name: "Decentro", src: "/logos/decentro.svg" },
  { name: "Setu", src: "/logos/setu.png" },
  { name: "Protean", src: "/logos/protean.svg" },
  { name: "DigiLocker", src: "/logos/digilocker.svg" },
  { name: "HyperVerge", src: "/logos/hyperverge.svg" },
  { name: "Signzy", src: "/logos/signzy.svg" },
  { name: "WhatsApp Business API", src: "/logos/whatsapp.svg" },
  { name: "Twilio", src: "/logos/twilio.svg" },
  { name: "MSG91", src: "/logos/msg91.svg" },
  { name: "Gupshup", src: "/logos/gupshup.png" },
  { name: "OpenAI", src: "/logos/openai.svg" },
  { name: "Google Gemini", src: "/logos/gemini.svg" },
  { name: "Zoho", src: "/logos/zoho.svg" },
  { name: "Salesforce", src: "/logos/salesforce.svg" },
  { name: "HubSpot", src: "/logos/hubspot.svg" },
  { name: "Google Maps", src: "/logos/google-maps.svg" },
  { name: "Shopify", src: "/logos/shopify.svg" },
  { name: "WooCommerce", src: "/logos/woocommerce.svg" },
  { name: "WordPress", src: "/logos/wordpress.svg" },
  { name: "Tally", src: "/logos/tally.svg" },
  { name: "Google Workspace", src: "/logos/google-workspace.svg" },
  { name: "Microsoft 365", src: "/logos/microsoft-365.svg" },
];

const allLogos = [...imageLogos, ...imageLogos];

export default function TrustedBy() {
  const [status, setStatus] = useState<Record<string, "ok" | "failed">>({});

  useEffect(() => {
    imageLogos.forEach((logo) => {
      const img = new window.Image();
      img.onload = () => setStatus((prev) => ({ ...prev, [logo.name]: "ok" }));
      img.onerror = () => setStatus((prev) => ({ ...prev, [logo.name]: "failed" }));
      img.src = logo.src;
    });
  }, []);

  return (
    <section className="trustedby-section">
      <p className="trustedby-label">Powering Businesses Through Enterprise Integrations</p>
      <div className="trustedby-track-wrapper">
        <div className="trustedby-fade trustedby-fade-left" />
        <div className="trustedby-track">
          {allLogos.map((logo, i) => {
            const state = status[logo.name];
            return (
              <div key={`${logo.name}-${i}`} className="trustedby-logo">
                {state === "ok" ? (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    height={28}
                    style={{ height: 28, width: "auto", maxWidth: 100, objectFit: "contain", opacity: 0.55, filter: "grayscale(1)" }}
                  />
                ) : state === "failed" ? (
                  <span className="trustedby-logo-text">{logo.name}</span>
                ) : (
                  <span className="trustedby-logo-text" style={{ opacity: 0 }}>{logo.name}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="trustedby-fade trustedby-fade-right" />
      </div>
    </section>
  );
}