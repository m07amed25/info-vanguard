import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#why-us", label: "Why Us" },
  { href: "#features", label: "Features" },
  // { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  // { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
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
    };

    const handleActiveSection = () => {
      const sections = document.querySelectorAll("section[id], #problem");
      const scrollYPos = window.scrollY;
      const headerHeight = 70;

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

    handleScroll();
    handleActiveSection();

    const handleResize = () => {
      handleScroll();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleActiveSection);
      window.removeEventListener("resize", handleResize);
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
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

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

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      role="banner"
      className="header"
      style={{
        position: "fixed",
        top: 0,
        insetInlineStart: 0,
        insetInlineEnd: 0,
        zIndex: 100,
        background: "rgba(10, 12, 10, 0.95)",
        backdropFilter: "blur(12px)",
        borderBlockEnd: "1px solid var(--color-border)",
        transition: "background 0.2s ease",
      }}
    >
      {isMounted && (
        <div
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
          style={{
            position: "absolute",
            top: 0,
            insetInlineStart: 0,
            height: "3px",
            width: `${scrollProgress}%`,
            background: "var(--color-accent)",
            transition: "width 0.1s ease-out",
            zIndex: 101,
          }}
        />
      )}

      <nav
        role="navigation"
        aria-label="Main navigation"
        className="nav"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1100px",
          marginInline: "auto",
          padding: "1rem var(--spacing-container)",
        }}
      >
        <button
          ref={toggleRef}
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            marginInlineEnd: "0.5rem",
            minWidth: "44px",
            minHeight: "44px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              width: "22px",
              height: "2px",
              background: "var(--color-text)",
              borderRadius: "1px",
              transition: "0.2s ease",
              transform: isMenuOpen
                ? "rotate(45deg) translate(5px, 5px)"
                : "none",
            }}
            aria-hidden="true"
          />
          <span
            style={{
              width: "22px",
              height: "2px",
              background: "var(--color-text)",
              borderRadius: "1px",
              transition: "0.2s ease",
              opacity: isMenuOpen ? 0 : 1,
            }}
            aria-hidden="true"
          />
          <span
            style={{
              width: "22px",
              height: "2px",
              background: "var(--color-text)",
              borderRadius: "1px",
              transition: "0.2s ease",
              transform: isMenuOpen
                ? "rotate(-45deg) translate(5px, -5px)"
                : "none",
            }}
            aria-hidden="true"
          />
        </button>

        <Link
          to="#home"
          className="logo"
          aria-label="Vanguard - Go to homepage"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0",
            color: "var(--color-text)",
            padding: "0.25rem 0",
            textDecoration: "none",
            minHeight: "44px",
          }}
        >
          <img
            src="/assets/Logo.png"
            alt=""
            role="img"
            aria-hidden="true"
            className="logo-icon"
            style={{
              height: "40px",
              width: "40px",
              display: "inline-block",
              objectFit: "contain",
              flexShrink: 0,
            }}
            loading="eager"
          />
          <span
            className="logo-text"
            style={{
              fontFamily: "'Gargoyles', serif",
              fontWeight: 700,
              fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
              letterSpacing: "0.02em",
            }}
          >
            VANGUARD
          </span>
        </Link>

        <ul
          className="nav-links"
          role="menubar"
          aria-label="Primary navigation"
          style={{
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
            gap: "0.25rem",
          }}
        >
          {navItems.map((item) => (
            <li key={item.href} role="none">
              <a
                href={item.href}
                role="menuitem"
                aria-current={
                  activeSection === item.href.replace("#", "")
                    ? "page"
                    : undefined
                }
                onClick={handleNavClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleNavClick();
                  }
                }}
                style={{
                  color:
                    activeSection === item.href.replace("#", "")
                      ? "var(--color-text)"
                      : "var(--color-text-muted)",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "var(--radius)",
                  fontSize: "clamp(0.85rem, 1.5vw, 0.9rem)",
                  fontWeight: 500,
                  background:
                    activeSection === item.href.replace("#", "")
                      ? "var(--color-accent-soft)"
                      : "transparent",
                  transition: "0.2s ease",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  minHeight: "44px",
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              role="menu"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                top: "57px",
                insetInlineStart: 0,
                insetInlineEnd: 0,
                background: "var(--color-bg-elevated)",
                borderBlockEnd: "1px solid var(--color-border)",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                zIndex: 99,
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  aria-current={
                    activeSection === item.href.replace("#", "")
                      ? "page"
                      : undefined
                  }
                  onClick={handleNavClick}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleNavClick();
                    }
                  }}
                  style={{
                    color:
                      activeSection === item.href.replace("#", "")
                        ? "var(--color-text)"
                        : "var(--color-text-muted)",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius)",
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                    fontWeight: 500,
                    background:
                      activeSection === item.href.replace("#", "")
                        ? "var(--color-accent-soft)"
                        : "transparent",
                    transition: "0.2s ease",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    minHeight: "44px",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-toggle {
            display: flex !important;
            order: -1;
          }
          .nav .logo {
            margin-inline-end: auto;
          }
          .nav-links {
            display: none !important;
          }
        }

        @media (min-width: 769px) {
          .nav-toggle {
            display: none !important;
          }
        }

        /* Ensure focus visible states work correctly */
        .nav-toggle:focus-visible,
        .logo:focus-visible,
        .nav-links a:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
        }

        /* Ensure mobile menu links have proper focus */
        #mobile-menu a:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: -2px;
          background: var(--color-accent-soft);
        }
      `}</style>
    </header>
  );
}
