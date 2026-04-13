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
      "Using AI, we identify suspicious or dangerous websites and detect phishing attempts, while providing clear recommendations to help users browse safely.",
  },
  {
    id: "file-scanning",
    filter: "File Scanning",
    image: "/assets/icons/file.svg",
    backgroundImage: "/assets/feature2.jpg",
    title: "File Scanning",
    description:
      "We Use AI to detect malicious files, including new and unknown threats, by analyzing their content.",
  },
  {
    id: "email-scanning",
    filter: "Email Scanning",
    image: "/assets/icons/email.svg",
    backgroundImage: "/assets/feature3.jpg",
    title: "Email Scanning",
    description:
      "We Protect users from phishing emails and malicious attachments by scanning content and links.",
  },
  {
    id: "Code & Library Scan",
    filter: "Code & Library",
    image: "/assets/icons/code.svg",
    backgroundImage: "/assets/feature4.png",
    title: "Code & Library Scan",
    description:
      "We use AI to analyze source code for security vulnerabilities and detect malicious Python libraries before installation.",
  },
  {
    id: "multimedia-scanning",
    filter: "Multimedia",
    image: "/assets/icons/media.svg",
    backgroundImage: "/assets/feature5.png",
    title: "Multimedia Scanning",
    description:
      "Detect hidden payloads and suspicious data inside images, audio, and video.",
  },
  {
    id:"Threat Insight Engine",
    filter: "Threat Insight",
    image: "/assets/icons/code.svg",
    backgroundImage: "/assets/feature8.png",
    title: "Threat Insight Engine",
    description:
      "We leverage external threat intelligence APIs from top security platforms to gather global attack data. This data is used to automatically generate detailed technical reports on attacks, malware behavior, and indicators.",
  },
  {
    id: "Real Time Protection",
    filter: "Real Time",
    image: "/assets/icons/code.svg",
    backgroundImage: "/assets/feature7.png",
    title: "Real Time Protection",
    description:
      "AI-powered desktop protection for malicious files, a VS Code extension that detects code vulnerabilities and malicious libraries, and a browser extension that safeguards URLs and emails in real time.",
  },
  {
    id: "Security Overview Dashboard",
    filter: "Security Overview",
    image: "/assets/icons/code.svg",
    backgroundImage: "/assets/feature6.png",
    title: "Security Overview Dashboard",
    description:
      "One centralized view of all alerts, risk scores, and scan results, backed by real-time global threat intelligence that automatically generates detailed reports on attacks and malwares, so you always know what's happening and what to do next.",
  },
];

const filters = [
  "All",
  "URL Scanning",
  "File Scanning",
  "Email Scanning",
  "Multimedia",
  "Code & Library",
  "Threat Insight",
  "Real Time",
  "Security Overview",
];

const FEATURES_MARQUEE_DURATION_S = 48;

function FeatureCardInner({
  feature,
  index,
}: {
  feature: (typeof featuresData)[0];
  index: number;
}) {
  return (
    <motion.article
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
      <div
        className="feature-card-body"
        style={{
          padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          minHeight: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <h3
          className="feature-card-title"
          style={{
            fontSize: "clamp(1rem, 1.75vw, 1.25rem)",
            fontWeight: 700,
            margin: 0,
            marginBottom: "0.25rem",
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
            marginTop: "0.5rem",
            fontSize: "clamp(0.8rem, 1.25vw, 0.95rem)",
            fontWeight: 500,
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
          }}
        >
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}

export function Features() {
  const [activeFilter, setActiveFilter] = useState("All");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const marqueeControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const filteredFeatures =
    activeFilter === "All"
      ? featuresData
      : featuresData.filter((f) => f.filter === activeFilter);

  useEffect(() => {
    if (!isInView || activeFilter !== "All") return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    marqueeControls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: FEATURES_MARQUEE_DURATION_S,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [isInView, activeFilter, marqueeControls, filteredFeatures.length]);

  const featuresMarquee =
    activeFilter === "All" ? [...featuresData, ...featuresData] : [];

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
            letterSpacing: "0.04em",
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
                id={`features-${filter.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-tab`}
                role="tab"
                aria-selected={activeFilter === filter}
                aria-controls="features-panel"
                onClick={() => setActiveFilter(filter)}
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

        <style>{`
          .feature-card-desc {
            opacity: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            transition: max-height 0.35s ease;
          }
          .feature-card:hover .feature-card-desc {
            -webkit-line-clamp: unset;
            line-clamp: unset;
            display: block;
            max-height: 200px;
            overflow-y: auto;
          }
          .feature-card-body {
            transition: background 0.35s ease, padding 0.35s ease;
          }
          .feature-card:hover .feature-card-body {
            background: linear-gradient(
              to top,
              rgba(10, 12, 10, 0.97) 0%,
              rgba(10, 12, 10, 0.7) 50%,
              transparent 100%
            ) !important;
            padding-top: 1.5rem !important;
          }
          @media (hover: none) {
            .feature-card-desc {
              -webkit-line-clamp: unset;
              line-clamp: unset;
              display: block;
              max-height: none;
              overflow: visible;
            }
            .feature-card-body {
              background: linear-gradient(
                to top,
                rgba(10, 12, 10, 0.9) 0%,
                rgba(10, 12, 10, 0.6) 40%,
                transparent 100%
              ) !important;
            }
          }
          .features-grid {
            display: grid;
            width: 100%;
            gap: var(--features-gap, clamp(1.25rem, 2.5vw, 2rem));
            grid-template-columns: repeat(
              auto-fill,
              minmax(
                calc((100% - 2 * var(--features-gap, 1rem)) / 3),
                calc((100% - 2 * var(--features-gap, 1rem)) / 3)
              )
            );
            justify-content: start;
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
            .features-grid {
              grid-template-columns: repeat(
                auto-fill,
                minmax(
                  calc((100% - 1 * var(--features-gap, 1rem)) / 2),
                  calc((100% - 1 * var(--features-gap, 1rem)) / 2)
                )
              );
            }
          }
          @media (max-width: 640px) {
            .features-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>

      {activeFilter === "All" ? (
        <div
          id="features-panel"
          role="tabpanel"
          aria-labelledby={`features-${activeFilter.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-tab`}
          className="features-marquee-wrap"
          style={{
            width: "100%",
            overflow: "hidden",
            ["--features-gap" as string]: "clamp(1.25rem, 2.5vw, 2rem)",
            maskImage:
              "linear-gradient(to right, transparent, black var(--marquee-mask, 12%), black calc(100% - var(--marquee-mask, 12%)), transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black var(--marquee-mask, 12%), black calc(100% - var(--marquee-mask, 12%)), transparent)",
          }}
          onMouseEnter={() => marqueeControls.stop()}
          onMouseLeave={() => {
            if (
              typeof window !== "undefined" &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
              return;
            }
            marqueeControls.start({
              x: ["0%", "-50%"],
              transition: {
                duration: FEATURES_MARQUEE_DURATION_S,
                repeat: Infinity,
                ease: "linear",
              },
            });
          }}
        >
          <motion.div
            style={{
              display: "flex",
              width: "fit-content",
              gap: "var(--features-gap, clamp(1.25rem, 2.5vw, 2rem))",
            }}
            animate={marqueeControls}
          >
            {featuresMarquee.map((feature, idx) => {
              const baseIndex = idx % featuresData.length;
              return (
                <div
                  key={`${feature.id}-marquee-${idx}`}
                  style={{
                    width: "min(340px, 88vw)",
                    flexShrink: 0,
                  }}
                >
                  <FeatureCardInner feature={feature} index={baseIndex} />
                </div>
              );
            })}
          </motion.div>
        </div>
      ) : (
        <div
          className="container"
          style={{ ["--features-gap" as string]: "clamp(1.25rem, 2.5vw, 2rem)" }}
        >
          <div
            id="features-panel"
            role="tabpanel"
            aria-labelledby={`features-${activeFilter.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-tab`}
            className="features-grid"
          >
            {filteredFeatures.map((feature, index) => (
              <div key={`${activeFilter}-${feature.id}`}>
                <FeatureCardInner feature={feature} index={index} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="container">
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
