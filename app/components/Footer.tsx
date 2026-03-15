import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  {
    href: "https://instagram.com/vanguard_antivirus",
    label: "Instagram",
    icon: "fa-brands fa-instagram",
  },
  {
    href: "https://x.com/vanguard_AV",
    label: "X (Twitter)",
    icon: "fa-brands fa-x-twitter",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61585750076884",
    label: "Facebook",
    icon: "fa-brands fa-facebook-f",
  },
  {
    href: "https://www.linkedin.com/company/vanguard-av/?viewAsMember=true",
    label: "LinkedIn",
    icon: "fa-brands fa-linkedin-in",
  },
];

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer"
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .footer-grid-container {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 2rem 2rem;
          padding-top: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }
        .footer-heading {
          color: var(--color-text);
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.75rem;
          letter-spacing: 0.02em;
        }
        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-link-item {
          color: var(--color-text-muted);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.2s ease;
          display: inline-block;
        }
        .footer-link-item:hover {
          color: var(--color-accent);
        }
        .footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          transition: all 0.2s ease;
        }
        .footer-social-link:hover {
          background: var(--color-accent);
          color: #fff;
          border-color: var(--color-accent);
          transform: translateY(-2px);
        }
        
        @media (max-width: 1024px) {
          .footer-grid-container {
            grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
            gap: 2.5rem 1.5rem;
          }
        }
        @media (max-width: 768px) {
          .footer-grid-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem 1.5rem;
            padding-top: 2.5rem;
          }
          .footer-brand-col {
            grid-column: 1 / -1;
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-brand-col p {
            max-width: 100% !important;
          }
          .footer-newsletter-col {
            grid-column: 1 / -1;
            margin-top: 0.25rem;
          }
        }
        @media (max-width: 640px) {
          .footer-grid-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.25rem 0.5rem;
            padding-top: 1rem;
          }
          .footer-newsletter-form {
            flex-direction: column;
            gap: 0.75rem !important;
          }
          .footer-newsletter-form input,
          .footer-newsletter-form button {
            width: 100%;
          }
        }
        
        /* Bottom bar responsiveness */
        .footer-bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          color: var(--color-text-muted);
          font-size: 0.875rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .footer-bottom-container {
            flex-direction: column-reverse;
            align-items: flex-start;
            text-align: left;
            gap: 0.5rem;
            padding: 0.5rem 0 2rem;
          }
          .footer-legal-links {
            justify-content: flex-start;
            margin-top: 0;
            flex-wrap: wrap;
            gap: 1rem !important;
          }
        }
      `}</style>
      <div
        className="footer-accent"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background:
            "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
        }}
      />
      <div
        className="footer-bg"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--color-bg-elevated)",
          zIndex: -1,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          className="footer-grid-container"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          {/* Column 1: Brand */}
          <div className="footer-brand-col">
            <a
              href="#home"
              className="nav-logo"
              style={{
                marginBottom: "1.25rem",
              }}
            >
              <img
                src="/assets/icons/helmet.svg"
                alt=""
                aria-hidden="true"
                className="nav-logo-icon"
              />
              <span className="nav-logo-text">ANGUARD</span>
            </a>
            <p
              style={{
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
                maxWidth: "280px",
                fontSize: "0.95rem",
              }}
            >
              Next-generation AI antivirus built for the modern threat
              landscape. Your first line of defense in the digital world.
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
              }}
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="footer-social-link"
                >
                  <i className={link.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#features" className="footer-link-item">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="footer-link-item">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="footer-link-item">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#testimonials" className="footer-link-item">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#integrations" className="footer-link-item">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#about" className="footer-link-item">
                  About Us
                </a>
              </li>
              <li>
                <a href="#blog" className="footer-link-item">
                  Security Blog
                </a>
              </li>
              <li>
                <a href="#careers" className="footer-link-item">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link-item">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#partners" className="footer-link-item">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-newsletter-col">
            <h4 className="footer-heading">Stay Protected</h4>
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.95rem",
                marginBottom: "1.25rem",
                lineHeight: 1.5,
              }}
            >
              Subscribe to our security newsletter to get the latest threat
              intelligence and product updates.
            </p>
            <form
              className="footer-newsletter-form"
              onSubmit={handleSubscribe}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "stretch",
                minHeight: "44px",
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                transition: "border-color 0.2s ease",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  padding: "0.75rem 1rem 0.75rem 1rem",
                  paddingRight: "6.5rem",
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-sans)",
                  background: "transparent",
                  border: "none",
                  borderRadius: "var(--radius)",
                  color: "var(--color-text)",
                  outline: "none",
                  flex: "1 1 0",
                  minWidth: "0",
                  minHeight: "42px",
                }}
                onFocus={(e) =>
                  (e.target.parentElement!.style.borderColor =
                    "var(--color-accent)")
                }
                onBlur={(e) =>
                  (e.target.parentElement!.style.borderColor =
                    "var(--color-border)")
                }
              />
              <button
                type="submit"
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  bottom: "4px",
                  padding: "0 1rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  background: "var(--color-accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "calc(var(--radius) - 2px)",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-accent-hover)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-accent)")
                }
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="footer-bottom-container">
          <div>
            © {currentYear} Vanguard Security, Inc. All rights reserved.
          </div>
          <div
            className="footer-legal-links"
            style={{
              display: "flex",
              gap: "1.5rem",
            }}
          >
            <a href="/privacy" className="footer-link-item">
              Privacy Policy
            </a>
            <a href="/terms" className="footer-link-item">
              Terms of Service
            </a>
            <a href="/cookies" className="footer-link-item">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
