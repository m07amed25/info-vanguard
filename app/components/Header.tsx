import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#why-us", label: "Why Us" },
  { href: "#features", label: "Features" },
  { href: "#channels", label: "Channels" },
  // { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  // { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setScrolled(scrollTop > 20);
    };

    const handleActiveSection = () => {
      const sections = document.querySelectorAll("section[id], #problem");
      const scrollYPos = window.scrollY;
      const headerHeight = 64;

      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop - headerHeight;
        const height = (section as HTMLElement).offsetHeight;
        const id = section.id;
        if (scrollYPos >= top && scrollYPos < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleActiveSection, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    handleScroll();
    handleActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleActiveSection);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMounted]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      firstElement?.focus();
      return () => document.removeEventListener("keydown", handleTab);
    }
  }, [isMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const handleNavClick = () => setIsMenuOpen(false);

  const handleNavLinkClick = (href: string) => {
    const id = href.replace("#", "");
    setActiveSection(id);
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <>
      <style>{`
        .header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(36, 48, 36, 0.4);
          transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .header.scrolled {
          box-shadow: 0 1px 40px rgba(0,0,0,0.5);
          border-bottom-color: rgba(36, 48, 36, 0.8) !important;
        }
        .nav-progress {
          position: absolute;
          top: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--color-accent), #4ade80);
          transition: width 0.15s ease-out;
          z-index: 201;
          border-radius: 0 2px 2px 0;
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 3vw, 1.5rem);
          height: 64px;
          gap: 1rem;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--color-text);
          flex-shrink: 0;
          min-height: 44px;
          gap: 0;
        }
        .nav-logo:hover { text-decoration: none; color: var(--color-text); }
        .nav-logo-icon {
          height: 44px !important;
          width: 44px !important;
          object-fit: contain;
          display: block;
          transition: filter 0.2s ease;
        }
        .nav-logo:hover .nav-logo-icon {
          filter: drop-shadow(0 0 6px rgba(28,115,4,0.6));
        }
        .nav-logo-text {
          font-family: 'Gargoyles', serif;
          font-weight: 700;
          font-size: clamp(1.1rem, 2.5vw, 1.35rem);
          letter-spacing: 0.04em;
          margin-left: -2px;
          line-height: 1;
          user-select: none;
        }
        .nav-links {
          display: flex;
          list-style: none;
          margin: 0; padding: 0;
          gap: 0.125rem;
          align-items: center;
        }
        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color 0.2s ease, background 0.2s ease;
          min-height: 36px;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 2px;
          background: var(--color-accent);
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .nav-link:hover,
        .nav-link.active {
          color: var(--color-text);
          background: rgba(28,115,4,0.13);
          text-decoration: none;
        }
        .nav-link.active {
          font-weight: 600;
        }
        .nav-link.active::after { width: 20px; }
        .nav-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.45rem 1.1rem;
          background: var(--color-accent);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          border: none; cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          white-space: nowrap;
          min-height: 36px;
          letter-spacing: 0.01em;
        }
        .nav-cta:hover {
          background: var(--color-accent-hover);
          color: #fff; text-decoration: none;
          box-shadow: 0 4px 16px rgba(28,115,4,0.4);
          transform: translateY(-1px);
        }
        .nav-cta:active { transform: translateY(0); }
        .nav-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          cursor: pointer;
          padding: 0;
          width: 40px; height: 40px;
          flex-shrink: 0;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .nav-toggle:hover {
          background: rgba(28,115,4,0.1);
          border-color: var(--color-accent);
        }
        .nav-toggle-bar {
          width: 18px; height: 2px;
          background: var(--color-text);
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.2s ease, width 0.2s ease;
          display: block;
        }
        .nav-toggle-bar.bar-2 { width: 13px; }
        .nav-toggle.open .bar-1 { transform: translateY(7px) rotate(45deg); width: 18px; }
        .nav-toggle.open .bar-2 { opacity: 0; transform: translateX(-4px); }
        .nav-toggle.open .bar-3 { transform: translateY(-7px) rotate(-45deg); width: 18px; }

        /* Mobile overlay & drawer — rendered OUTSIDE header to avoid
           backdrop-filter containing block issues with position:fixed */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 198;
          backdrop-filter: blur(2px);
        }
        .mobile-menu {
          position: fixed;
          top: 64px; left: 0; right: 0; bottom: 0;
          z-index: 199;
          display: flex;
          flex-direction: column;
          background: var(--color-bg-elevated);
          border-top: 1px solid var(--color-border);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .mobile-menu-inner {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          gap: 0.25rem;
          flex: 1;
        }
        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.875rem 1rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
          min-height: 52px;
          border: 1px solid transparent;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link:focus-visible {
          color: var(--color-text);
          background: rgba(28,115,4,0.08);
          border-color: rgba(28,115,4,0.2);
          text-decoration: none;
          outline: none;
        }
        .mobile-nav-link.active {
          color: var(--color-accent);
          background: rgba(28,115,4,0.1);
          border-color: rgba(28,115,4,0.25);
          font-weight: 600;
        }
        .mobile-link-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--color-accent);
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .mobile-nav-link.active .mobile-link-dot { opacity: 1; }
        .mobile-menu-footer {
          padding: 1rem;
          border-top: 1px solid var(--color-border);
        }
        .mobile-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.875rem 1.5rem;
          background: var(--color-accent);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.2s ease;
          min-height: 52px;
          letter-spacing: 0.01em;
        }
        .mobile-cta:hover {
          background: var(--color-accent-hover);
          color: #fff; text-decoration: none;
        }

        @media (max-width: 768px) {
          .nav-toggle { display: flex !important; }
          .nav-links, .nav-cta { display: none !important; }
          .nav-logo-text {
            padding-top: 0.7rem;
          }
        }
        @media (min-width: 769px) {
          .nav-toggle { display: none !important; }
          .mobile-menu, .mobile-overlay { display: none !important; }
        }

        .nav-logo:focus-visible,
        .nav-link:focus-visible,
        .nav-cta:focus-visible,
        .nav-toggle:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
        }
      `}</style>

      {/* ── Header ─────────────────────────────────────────── */}
      <header
        role="banner"
        className={`header${scrolled ? " scrolled" : ""}`}
        style={{
          background: scrolled
            ? "rgba(10, 12, 10, 0.97)"
            : "rgba(10, 12, 10, 0.85)",
        }}
      >
        {isMounted && (
          <div
            className="nav-progress"
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Page scroll progress"
            style={{ width: `${scrollProgress}%` }}
          />
        )}

        <nav
          role="navigation"
          aria-label="Main navigation"
          className="nav-inner"
        >
          <Link
            to="#home"
            className="nav-logo"
            aria-label="Vanguard – Go to homepage"
            onClick={handleNavClick}
          >
            <img
              src="/assets/icons/helmet.svg"
              alt=""
              aria-hidden="true"
              className="nav-logo-icon"
              loading="eager"
            />
            <span className="nav-logo-text">ANGUARD</span>
          </Link>

          <ul className="nav-links" role="menubar" aria-label="Primary navigation">
            {navItems.map((item) => (
              <li key={item.href} role="none">
                <a
                  href={item.href}
                  role="menuitem"
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick(item.href);
                  }}
                  className={`nav-link${isActive(item.href) ? " active" : ""}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="nav-cta" onClick={handleNavClick}>
            Get Vanguard
          </a>

          <button
            ref={toggleRef}
            className={`nav-toggle${isMenuOpen ? " open" : ""}`}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="nav-toggle-bar bar-1" aria-hidden="true" />
            <span className="nav-toggle-bar bar-2" aria-hidden="true" />
            <span className="nav-toggle-bar bar-3" aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/*
        ── Mobile menu rendered OUTSIDE <header> ──────────────
        The header has backdrop-filter which creates a new CSS containing
        block, making position:fixed children snap to the header's own
        dimensions (64px tall) instead of the viewport. Rendering them
        as siblings of <header> (not descendants) avoids this entirely.
      */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-backdrop"
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-drawer"
            ref={menuRef}
            id="mobile-menu"
            role="menu"
            aria-label="Mobile navigation"
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="mobile-menu-inner">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick(item.href);
                  }}
                  className={`mobile-nav-link${isActive(item.href) ? " active" : ""}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.04, duration: 0.2 }}
                >
                  <span>{item.label}</span>
                  <span className="mobile-link-dot" aria-hidden="true" />
                </motion.a>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <a
                href="#contact"
                className="mobile-cta"
                onClick={handleNavClick}
              >
                Get Vanguard →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
