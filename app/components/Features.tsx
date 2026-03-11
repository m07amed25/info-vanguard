import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const featuresData = [
  {
    id: "url-scanning",
    filter: "URL Scanning",
    image: "/assets/icons/URL Scann.svg",
    backgroundImage: "/assets/feature1.jpg",
    title: "URL Scanning",
    description:
      "Detect phishing, malicious redirects, and dangerous domains before you click.",
  },
  {
    id: "file-scanning",
    filter: "File Scanning",
    image: "/assets/icons/file.svg",
    backgroundImage: "/assets/feature2.jpg",
    title: "File Scanning",
    description:
      "Static-first file inspection to catch malware without executing suspicious content.",
  },
  {
    id: "email-scanning",
    filter: "Email Scanning",
    image: "/assets/icons/email.svg",
    backgroundImage: "/assets/feature3.jpg",
    title: "Email Scanning",
    description:
      "Spot malicious attachments and social‑engineering patterns in emails.",
  },
  {
    id: "vs-extension",
    filter: "VS Extension",
    image: "/assets/icons/code.svg",
    backgroundImage: "/assets/feature4.png",
    title: "VS Extension",
    description:
      "Analyze code and dependencies to reduce supply‑chain and vulnerability risk.",
  },
  {
    id: "multimedia-scanning",
    filter: "Multimedia Scanning",
    image: "/assets/icons/media.svg",
    backgroundImage: "/assets/feature5.png",
    title: "Multimedia Scanning",
    description:
      "Detect hidden payloads and suspicious data inside images, audio, and video.",
  },
];

const filters = [
  "All",
  "URL Scanning",
  "File Scanning",
  "Email Scanning",
  "VS Extension",
  "Multimedia Scanning",
];

export function Features() {
  const [activeFilter, setActiveFilter] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const filteredFeatures =
    activeFilter === "All"
      ? featuresData
      : featuresData.filter((f) => f.filter === activeFilter);

  return (
    <section
      id="features"
      className="section features our-work"
      role="region"
      aria-labelledby="features-heading"
      ref={ref}
      style={{
        padding: "var(--spacing-section) 0",
        position: "relative",
      }}
    >
      <div className="container">
        <motion.h2
          id="features-heading"
          className="main-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 600,
            marginBlockEnd: "2.5rem",
            letterSpacing: "-0.02em",
            textAlign: "center",
            position: "relative",
          }}
        >
          Features
        </motion.h2>

        <motion.ul
          className="our-work-filters"
          role="tablist"
          aria-label="Feature categories"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.1 },
            },
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
            listStyle: "none",
            padding: 0,
            marginBlockEnd: "3rem",
          }}
        >
          {filters.map((filter) => (
            <li key={filter} role="none">
              <button
                role="tab"
                aria-selected={activeFilter === filter}
                aria-controls="features-panel"
                onClick={() => setActiveFilter(filter)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveFilter(filter);
                  }
                }}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius)",
                  border: "none",
                  background:
                    activeFilter === filter
                      ? "var(--color-accent)"
                      : "transparent",
                  color:
                    activeFilter === filter
                      ? "#fff"
                      : "var(--color-text-muted)",
                  cursor: "pointer",
                  fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
                  fontWeight: 500,
                  transition: "0.2s ease",
                  minHeight: "44px",
                  minWidth: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {filter}
              </button>
            </li>
          ))}
        </motion.ul>

        <div
          id="features-panel"
          role="tabpanel"
          aria-labelledby={`${activeFilter.toLowerCase()}-tab`}
          className="features-grid our-work-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(1.25rem, 2.5vw, 2rem)",
          }}
        >
          <style>{`
            @media (max-width: 1024px) {
              .features-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: 768px) {
              .our-work-filters {
                flex-wrap: nowrap !important;
                justify-content: flex-start !important;
                overflow-x: auto;
                padding-bottom: 0.5rem !important;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none;
              }
              .our-work-filters::-webkit-scrollbar {
                display: none;
              }
              .our-work-filters li {
                flex-shrink: 0;
              }
              .feature-card {
                min-height: 200px !important;
              }
              .feature-card-body {
                padding: 1.25rem 1rem !important;
              }
            }
            @media (max-width: 640px) {
              .features-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          {filteredFeatures.map((feature, index) => (
            <motion.article
              key={`${activeFilter}-${feature.id}`}
              className="feature-card"
              data-work={feature.filter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 24px rgba(34, 197, 94, 0.1)",
              }}
              layout
              style={{
                background: "var(--color-bg-card)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                overflow: "hidden",
                transition: "0.3s ease",
                position: "relative",
                minHeight: "clamp(200px, 25vw, 260px)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              {/* Full Rectangular Background Image - More Visible */}
              <div
                className="feature-card-background"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 0,
                  overflow: "hidden",
                }}
              >
                <img
                  src={feature.backgroundImage}
                  alt=""
                  aria-hidden="true"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  loading="lazy"
                />
                {/* Bottom Gradient Fade Effect */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(180deg, rgba(15, 23, 42, 0.3) 0%, rgba(15, 23, 42, 0.6) 40%, var(--color-bg-card) 80%)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Text Content at Bottom */}
              <div
                className="feature-card-body"
                style={{
                  padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1,
                }}
              >
                <h3
                  className="feature-card-title"
                  style={{
                    fontSize: "clamp(1rem, 1.75vw, 1.25rem)",
                    fontWeight: 700,
                    marginBlockEnd: "0.5rem",
                    color: "var(--color-text)",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="feature-card-desc"
                  style={{
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                    margin: 0,
                    fontSize: "clamp(0.8rem, 1.25vw, 0.95rem)",
                    fontWeight: 500,
                    textShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="features-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.5 },
            },
          }}
          style={{
            textAlign: "center",
            marginBlockStart: "clamp(2rem, 5vw, 3rem)",
          }}
        >
          <a
            href="#contact"
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.75rem 1.5rem",
              fontSize: "clamp(0.875rem, 2vw, 0.95rem)",
              fontWeight: 500,
              borderRadius: "var(--radius)",
              background: "var(--color-accent)",
              color: "#fff",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s ease",
              minHeight: "44px",
              minWidth: "140px",
            }}
          >
            Get Vanguard
          </a>
        </motion.div>
      </div>
    </section>
  );
}
