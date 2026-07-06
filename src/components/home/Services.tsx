"use client";
import "./services-showcase.css";

import type { ElementType } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Globe,
  LayoutDashboard,
  MessageSquare,
  Smartphone,
} from "lucide-react";

const SLIDE_DURATION = 5000; // ms each service stays open

// `short` is what shows on the collapsed strips (horizontal, no rotation)
const services = [
  {
    id: "api-solutions",
    icon: Code2,
    label: "APIS",
    short: "APIs",
    title: "API Solutions",
    description:
      "Integrate powerful fintech APIs into your platform — AEPS, DMT, BBPS, KYC, PAN verification, bank account validation, and more. Built for reliability with 99.9% uptime SLA.",
    features: [
      "AEPS Cash Withdrawal",
      "Domestic Money Transfer",
      "BBPS Bill Payments",
      "PAN & Aadhaar KYC",
      "Bank Account Verification",
    ],
    href: "/services/api-solutions",
    image: "/svg/api-solutions.svg",
  },
  {
    id: "cpaas",
    icon: MessageSquare,
    label: "COMMUNICATION",
    short: "CPaaS",
    title: "CPaaS Solutions",
    description:
      "Send transactional messages, marketing campaigns, and real-time alerts via WhatsApp, SMS, RCS, and Voice. Reach your customers on every channel they use.",
    features: [
      "WhatsApp Business API",
      "Bulk SMS Gateway",
      "RCS Messaging",
      "IVR & Voice Calls",
      "Campaign Analytics",
    ],
    href: "/services/cpaas",
    image: "/svg/cpass-solution.svg",
  },
  {
    id: "web-dev",
    icon: Globe,
    label: "DEVELOPMENT",
    short: "Web",
    title: "Web Development",
    description:
      "From corporate websites to complex fintech portals, we build fast, SEO-optimised, and scalable web applications using Next.js, React, and modern tech stacks.",
    features: [
      "Next.js & React",
      "Fintech Portals",
      "Ecommerce Platforms",
      "Admin Dashboards",
      "SEO Optimised",
    ],
    href: "/services/web-development",
    image: "/svg/web-development.svg",
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    label: "DEVELOPMENT",
    short: "Mobile",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps for Android and iOS. We build fintech apps, customer portals, and enterprise tools with Flutter and React Native.",
    features: [
      "Flutter & React Native",
      "iOS & Android",
      "Fintech Mobile Apps",
      "Offline Support",
      "Push Notifications",
    ],
    href: "/services/mobile-apps",
    image: "/svg/mobile-app-development.svg",
  },
  {
    id: "white-label",
    icon: LayoutDashboard,
    label: "FINTECH",
    short: "White Label",
    title: "White Label Fintech",
    description:
      "Launch your own branded fintech platform in weeks. Our white label solutions include merchant portals, digital wallets, and payment aggregation platforms.",
    features: [
      "Merchant Portal",
      "Digital Wallet",
      "Payment Aggregation",
      "Custom Branding",
      "Multi-tenant Architecture",
    ],
    href: "/services/white-label-fintech",
    image: "/svg/white-label-fintech.svg",
  },
  {
    id: "ai",
    icon: Bot,
    label: "EMERGING TECH",
    short: "AI",
    title: "AI Chatbots & Automation",
    description:
      "Deploy intelligent chatbots and AI-powered automation workflows. Reduce support costs, qualify leads automatically, and deliver 24/7 customer service.",
    features: [
      "NLP Chatbots",
      "WhatsApp AI Agent",
      "Lead Qualification",
      "Workflow Automation",
      "Custom LLM Integration",
    ],
    href: "/services/ai-solutions",
    image: "/svg/ai-chatbot-automation.svg",
  },
  {
    id: "crm-erp",
    icon: Database,
    label: "ENTERPRISE",
    short: "CRM / ERP",
    title: "CRM / ERP Development",
    description:
      "Custom CRM and ERP systems built for your exact business processes. Manage leads, inventory, billing, HR, and operations in one unified platform.",
    features: [
      "Custom CRM",
      "Inventory Management",
      "Billing & Invoicing",
      "HR Management",
      "Role-based Access",
    ],
    href: "/services/crm-erp",
    image: "/svg/crm-platform.svg",
  },
  {
    id: "cloud",
    icon: Cloud,
    label: "INFRASTRUCTURE",
    short: "Cloud",
    title: "Cloud & DevOps",
    description:
      "AWS and Azure cloud infrastructure, CI/CD pipelines, containerisation with Docker and Kubernetes, and 24/7 monitoring to keep your systems running.",
    features: [
      "AWS & Azure",
      "CI/CD Pipelines",
      "Docker & Kubernetes",
      "24/7 Monitoring",
      "Auto Scaling",
    ],
    href: "/services/cloud-devops",
    image: "/svg/cloud-devops.svg",
  },
];

function ServiceVisual({
  image,
  title,
  icon: Icon,
}: {
  image?: string;
  title: string;
  icon: ElementType;
}) {
  return image ? (
    <img src={image} alt={title} className="swb-img" />
  ) : (
    <div className="swb-img-empty">
      <Icon size={42} />
      <span>{title}</span>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: "some" });

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const progressRef = useRef(0);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Latest flags readable by the loop without restarting it
  const flags = useRef({ paused: false, inView: false, reduceMotion: false });
  useEffect(() => {
    flags.current = { paused, inView, reduceMotion };
  }, [paused, inView, reduceMotion]);

  // One persistent autoplay loop
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;

      const { paused, inView, reduceMotion } = flags.current;
      if (inView && !paused && !reduceMotion) {
        let next = progressRef.current + (dt / SLIDE_DURATION) * 100;
        if (next >= 100) {
          next = 0;
          setActive((a) => (a + 1) % services.length);
        }
        progressRef.current = next;
        setProgress(next);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const goTo = (index: number) => {
    progressRef.current = 0;
    setProgress(0);
    setActive(index);
  };

  return (
    <section ref={sectionRef} className="swb-section">
      <div className="swb-inner">
        {/* ── Header ── */}
        <div className="swb-header">
          <div className="swb-header-left">
            <div className="swb-badge">
              <span className="swb-badge-dot" />
              What We Build
            </div>
            <h2 className="swb-headline">
              Services that <span className="swb-headline-accent">drive growth</span>
            </h2>
          </div>
          <div className="swb-header-right">
            <p className="swb-subtext">
              From fintech APIs to AI solutions — everything your business needs
              to scale in the digital economy.
            </p>
            <div className="swb-counter" aria-hidden="true">
              <span className="swb-counter-current">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="swb-counter-total">
                / {String(services.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* ── Expanding accordion (desktop) ── */}
        <div
          className="swb-acc"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isOpen = active === index;
            const fill =
              isOpen ? `${progress}%` : index < active ? "100%" : "0%";

            return (
              <div
                key={service.id}
                className={`swb-panel${isOpen ? " open" : ""}`}
                onClick={() => !isOpen && goTo(index)}
              >
                {/* Collapsed face */}
                <button
                  type="button"
                  className="swb-closed"
                  onClick={() => goTo(index)}
                  tabIndex={isOpen ? -1 : 0}
                  aria-label={`Show ${service.title}`}
                  title={service.title}
                >
                  <span className="swb-closed-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="swb-closed-icon">
                    <Icon size={19} />
                  </span>
                  <span className="swb-closed-label">{service.short}</span>
                </button>

                {/* Open content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="swb-open"
                      initial={{ opacity: 0, x: reduceMotion ? 0 : 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="swb-open-copy">
                        <div className="swb-step-badge">
                          <Icon size={13} />
                          {service.label}
                        </div>
                        <h3 className="swb-step-title">{service.title}</h3>
                        <p className="swb-step-desc">{service.description}</p>

                        <div className="swb-features">
                          {service.features.map((feature) => (
                            <div key={feature} className="swb-feature">
                              <CheckCircle2 size={12} />
                              {feature}
                            </div>
                          ))}
                        </div>

                        <Link
                          href={service.href}
                          className="swb-link"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`View ${service.title} details`}
                        >
                          Explore service <ArrowUpRight size={15} />
                        </Link>
                      </div>

                      <div className="swb-open-visual">
                        <span className="swb-ghost" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="swb-visual-frame">
                          <ServiceVisual
                            image={service.image}
                            title={service.title}
                            icon={service.icon}
                          />
                          <span
                            key={`shine-${active}`}
                            className="swb-shine"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Progress */}
                <span className="swb-track" aria-hidden="true">
                  <span className="swb-fill" style={{ width: fill }} />
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Mobile — stacked cards (no autoplay) ── */}
        <div className="swb-mobile-list">
          {services.map((service, index) => (
            <article key={service.id} className="swb-mobile-card">
              <div className="swb-mobile-frame">
                <span className="swb-mobile-ghost" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ServiceVisual
                  image={service.image}
                  title={service.title}
                  icon={service.icon}
                />
              </div>

              <div className="swb-mobile-body">
                <div className="swb-step-badge">
                  <service.icon size={13} />
                  {service.label}
                </div>
                <h3 className="swb-step-title">{service.title}</h3>
                <p className="swb-step-desc">{service.description}</p>

                <div className="swb-features">
                  {service.features.map((feature) => (
                    <div key={feature} className="swb-feature">
                      <CheckCircle2 size={12} />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link
                  href={service.href}
                  className="swb-link"
                  aria-label={`View ${service.title} details`}
                >
                  Explore service <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}