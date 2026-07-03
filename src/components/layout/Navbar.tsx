"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { serviceGroups, products } from "@/lib/site-data";

const staticLinks = [
  { name: "Developers", href: "/services/api-solutions" },
  { name: "About", href: "/about" },
];

const resourceLinks = [
  { name: "Blog", href: "/blog", description: "Insights, updates & how-tos" },
  { name: "News & Articles", href: "/news", description: "Company news & press coverage" },
  { name: "Wall of Love", href: "/wall-of-love", description: "What our customers say about us" },
];

// Flattened sub-groups (used by the mega menu detail panel)
const flatSubs = serviceGroups.flatMap((group) =>
  group.items.map((sub) => ({
    category: group.label,
    sub,
    slug: sub.href.replace("/services/", ""),
  }))
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileServiceCat, setMobileServiceCat] = useState<string | null>(null);
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const [vw, setVw] = useState(0);
  const [shrunkWidth, setShrunkWidth] = useState<number | null>(null);

  useEffect(() => {
    let rafId: number;
    const update = () => {
      setVw(window.innerWidth);
      rafId = requestAnimationFrame(() => {
        const content =
          (logoRef.current?.offsetWidth ?? 0) +
          (rightRef.current?.offsetWidth ?? 0) +
          (toggleRef.current?.offsetWidth ?? 0);
        setShrunkWidth(content + 24 /* row gap */ + 56 /* 2 × 28px scrolled padding */);
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const expandedPad = Math.min(150, Math.max(24, vw * 0.104));

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };
  const close = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };
  const keep = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };
  const openServices = () => {
    open("services");
    setHoveredSub(null);
  };

  // Resolve which sub-group the detail panel shows (defaults to the first)
  const activeSubSlug = hoveredSub ?? flatSubs[0]?.slug;
  const activeSub =
    flatSubs.find((s) => s.slug === activeSubSlug) ?? flatSubs[0];

  return (
    <>
      {/* Fixed full-width container — transparent, just for positioning */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pointerEvents: "none",
        backgroundColor: scrolled ? "transparent" : "var(--navbar-bg)",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.15s ease",
      }}>
        <motion.div
          animate={{
            marginTop: scrolled ? 12 : 0,
            width: scrolled ? (shrunkWidth ?? "auto") : vw || "100vw",
            borderRadius: scrolled ? 16 : 0,
            boxShadow: scrolled
              ? "0 4px 30px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)"
              : "0 1px 0 0 rgba(0,0,0,0.07)",
          }}
          transition={{ type: "spring", stiffness: 160, damping: 36 }}
          style={{
            backgroundColor: "var(--navbar-bg)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            overflow: "visible",
            pointerEvents: "auto",
            minWidth: scrolled ? "unset" : "unset",
            maxWidth: "95vw",
          }}
        >
          {/* Inner row — height animates separately for smoothness */}
          <motion.div
            animate={{
              height: scrolled ? 56 : 72,
              paddingLeft: scrolled ? 28 : expandedPad,
              paddingRight: scrolled ? 28 : expandedPad,
            }}
            transition={{ type: "spring", stiffness: 160, damping: 36 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            {/* Logo */}
            <Link href="/" className="navbar-logo" ref={logoRef}>
              <img src="/mj-logo1.webp" alt="MJ Digital Services" className="navbar-logo-img" fetchPriority="high" />
            </Link>

            {/* Right side */}
            <div className="navbar-right" ref={rightRef}>
              <nav className="navbar-nav">

                {/* Products */}
                <div className="nav-dropdown" onMouseEnter={() => open("products")} onMouseLeave={close}>
                  <button className={`nav-link${activeDropdown === "products" ? " active" : ""}`}>
                    Our Brands
                    <ChevronDown size={13} className={`nav-chevron${activeDropdown === "products" ? " open" : ""}`} />
                  </button>
                  {activeDropdown === "products" && (
                    <div className="dropdown-simple" onMouseEnter={() => keep("products")} onMouseLeave={close}>
                      {products.map((item) => {
                        const hasLink = !!item.href && item.href !== "#";

                        const inner = (
                          <>
                            <div className="dropdown-simple-icon">
                              <img src={item.logo} alt={item.name} />
                            </div>
                            <div>
                              <div className="dropdown-simple-name">
                                {item.name}
                                {!hasLink && <span className="dropdown-simple-badge">Coming soon</span>}
                              </div>
                              <div className="dropdown-simple-desc">{item.description}</div>
                            </div>
                          </>
                        );

                        return hasLink ? (
                          <Link
                            key={item.name}
                            href={item.href as string}
                            className="dropdown-simple-item"
                            onClick={() => setActiveDropdown(null)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {inner}
                          </Link>
                        ) : (
                          <div key={item.name} className="dropdown-simple-item dropdown-simple-item--soon">
                            {inner}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Services — trigger only; panel is portalled below */}
                <div className="nav-dropdown" onMouseEnter={openServices} onMouseLeave={close}>
                  <button className={`nav-link${activeDropdown === "services" ? " active" : ""}`}>
                    Services
                    <ChevronDown size={13} className={`nav-chevron${activeDropdown === "services" ? " open" : ""}`} />
                  </button>
                </div>

                {staticLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="nav-link">{link.name}</Link>
                ))}

                {/* Resources */}
                <div className="nav-dropdown" onMouseEnter={() => open("resources")} onMouseLeave={close}>
                  <button className={`nav-link${activeDropdown === "resources" ? " active" : ""}`}>
                    Resources
                    <ChevronDown size={13} className={`nav-chevron${activeDropdown === "resources" ? " open" : ""}`} />
                  </button>
                  {activeDropdown === "resources" && (
                    <div className="dropdown-simple dropdown-simple--text-only" onMouseEnter={() => keep("resources")} onMouseLeave={close}>
                      {resourceLinks.map((item) => (
                        <Link key={item.name} href={item.href} className="dropdown-simple-item" onClick={() => setActiveDropdown(null)}>
                          <div>
                            <div className="dropdown-simple-name">{item.name}</div>
                            <div className="dropdown-simple-desc">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>

              <div className="navbar-divider" />

              <Link href="/contact#contact-form" className="navbar-cta">
                Let&apos;s Talk <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button ref={toggleRef} className="navbar-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </motion.div>

          {/* Mobile menu */}
          <div className={`navbar-mobile-menu${mobileOpen ? " open" : ""}`}>
            <button className="mobile-nav-link" onClick={() => setMobileExpanded(mobileExpanded === "products" ? null : "products")}>
              Products
              <ChevronDown size={16} style={{ color: "var(--text-muted)", transform: mobileExpanded === "products" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>
            {mobileExpanded === "products" && (
              <div className="mobile-dropdown-items">
                {products.map((item) => {
                  const hasLink = !!item.href && item.href !== "#";
                  const inner = (
                    <>
                      <img src={item.logo} alt={item.name} style={{ width: 16, height: 16, borderRadius: 3, objectFit: "contain", backgroundColor: "white", flexShrink: 0 }} />
                      {item.name}
                      {!hasLink && <span className="dropdown-simple-badge">Soon</span>}
                    </>
                  );

                  return hasLink ? (
                    <Link
                      key={item.name}
                      href={item.href as string}
                      className="mobile-dropdown-item"
                      onClick={() => setMobileOpen(false)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div key={item.name} className="mobile-dropdown-item mobile-dropdown-item--soon">
                      {inner}
                    </div>
                  );
                })}
              </div>
            )}

            <button className="mobile-nav-link" onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}>
              Services
              <ChevronDown size={16} style={{ color: "var(--text-muted)", transform: mobileExpanded === "services" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>
            {mobileExpanded === "services" && (
              <div className="mobile-dropdown-items">
                {serviceGroups.map((group) => {
                  const catOpen = mobileServiceCat === group.label;
                  return (
                    <div key={group.label} className="mobile-svc-group">
                      <button
                        className="mobile-svc-cat"
                        onClick={() => setMobileServiceCat(catOpen ? null : group.label)}
                      >
                        {group.label}
                        <ChevronDown size={14} style={{ color: "var(--text-muted)", transform: catOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }} />
                      </button>
                      {catOpen && (
                        <div className="mobile-svc-subs">
                          {group.items.map((item) => (
                            <Link key={item.name} href={item.href} className="mobile-dropdown-item" onClick={() => setMobileOpen(false)}>
                              <item.icon size={14} style={{ color: "var(--primary)", flexShrink: 0 }} />{item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {staticLinks.map((link) => (
              <Link key={link.name} href={link.href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>{link.name}</Link>
            ))}

            <button className="mobile-nav-link" onClick={() => setMobileExpanded(mobileExpanded === "resources" ? null : "resources")}>
              Resources
              <ChevronDown size={16} style={{ color: "var(--text-muted)", transform: mobileExpanded === "resources" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>
            {mobileExpanded === "resources" && (
              <div className="mobile-dropdown-items">
                {resourceLinks.map((item) => (
                  <Link key={item.name} href={item.href} className="mobile-dropdown-item" onClick={() => setMobileOpen(false)}>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
            <div className="mobile-cta-wrap">
              <Link href="/contact" className="mobile-cta" onClick={() => setMobileOpen(false)}>
                Let&apos;s Talk <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="navbar-spacer" />

      {/* ── Services mega menu — full-viewport portal ── */}
      {mounted && activeDropdown === "services" &&
        createPortal(
          <div
            className="mm-portal"
            style={{ top: scrolled ? 70 : 72 }}
            onMouseEnter={() => keep("services")}
            onMouseLeave={close}
          >
            <div className="mm-panel">
              <div className="mm-inner">
                {/* Categories + sub-group links */}
                <div className="mm-cats">
                  {serviceGroups.map((group) => (
                    <div className="mm-cat" key={group.label}>
                      <div className="mm-cat-label">{group.label}</div>
                      <div className="mm-cat-subs">
                        {group.items.map((item) => {
                          const slug = item.href.replace("/services/", "");
                          const isActive = activeSub?.slug === slug;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`mm-sub${isActive ? " active" : ""}`}
                              onMouseEnter={() => setHoveredSub(slug)}
                              onFocus={() => setHoveredSub(slug)}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="mm-sub-icon"><item.icon size={15} /></span>
                              <span className="mm-sub-name">{item.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detail panel (hovered sub-group's tooltipItems) */}
                {activeSub && (() => {
                  const detailItems = activeSub.sub.tooltipItems ?? [];
                  const detailFallback = (activeSub.sub as { tooltip?: string }).tooltip;
                  return (
                    <div className="mm-detail" key={activeSub.slug}>
                      <div className="mm-detail-cat">{activeSub.category}</div>
                      <div className="mm-detail-title">
                        <span className="mm-detail-icon"><activeSub.sub.icon size={20} /></span>
                        {activeSub.sub.fullName ?? activeSub.sub.name}
                      </div>
                      <p className="mm-detail-desc">{activeSub.sub.description}</p>

                      {detailItems.length > 0 ? (
                        <div className="mm-detail-list">
                          {detailItems.map((t) => (
                            <p className="mm-detail-row" key={t.term}>
                              <span className="mm-detail-term">{t.term}</span>
                              {t.desc}
                            </p>
                          ))}
                        </div>
                      ) : detailFallback ? (
                        <p className="mm-detail-desc" style={{ marginBottom: 18 }}>{detailFallback}</p>
                      ) : null}

                      <Link
                        href={activeSub.sub.href}
                        className="mm-detail-cta"
                        onClick={() => setActiveDropdown(null)}
                      >
                        View {activeSub.sub.name} <ArrowRight size={14} />
                      </Link>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}