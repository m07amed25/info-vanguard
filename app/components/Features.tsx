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

const HOVER_SCROLL_DELAY_MS = 500;

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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [trackTranslatePx, setTrackTranslatePx] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverScrollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  useEffect(() => {
    setCarouselIndex(0);
  }, [activeFilter]);

  const maxIndex = Math.max(0, filteredFeatures.length - 3);
  const goPrev = () =>
    setCarouselIndex((i) => Math.max(0, i - 1));
  const goNext = () =>
    setCarouselIndex((i) => Math.min(maxIndex, i + 1));

  const clearHoverScroll = () => {
    if (hoverScrollRef.current) {
      clearTimeout(hoverScrollRef.current);
      hoverScrollRef.current = null;
    }
  };

  const onCardMouseEnter = (index: number) => {
    clearHoverScroll();
    const isRightCard = index === carouselIndex + 2;
    const isLeftCard = index === carouselIndex;
    if (isRightCard && carouselIndex < maxIndex) {
      hoverScrollRef.current = setTimeout(goNext, HOVER_SCROLL_DELAY_MS);
    } else if (isLeftCard && carouselIndex > 0) {
      hoverScrollRef.current = setTimeout(goPrev, HOVER_SCROLL_DELAY_MS);
    }
  };

  const onCardMouseLeave = () => clearHoverScroll();

  const onChevronMouseEnter = (direction: "prev" | "next") => {
    clearHoverScroll();
    if (direction === "prev" && carouselIndex > 0) {
      hoverScrollRef.current = setTimeout(goPrev, HOVER_SCROLL_DELAY_MS);
    } else if (direction === "next" && carouselIndex < maxIndex) {
      hoverScrollRef.current = setTimeout(goNext, HOVER_SCROLL_DELAY_MS);
    }
  };

  useEffect(() => () => clearHoverScroll(), []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const n = filteredFeatures.length;
    if (!viewport || !track || n === 0) return;
    const update = () => {
      const gapStr = getComputedStyle(track).gap?.trim().split(/\s+/)[0] || getComputedStyle(track).columnGap || "16px";
      const gapPx = parseFloat(gapStr) || 16;
      const vw = viewport.getBoundingClientRect().width;
      const trackWidth = track.getBoundingClientRect().width;
      const stepPx = (trackWidth + gapPx) / n;
      const contentWidth = trackWidth + (n - 1) * gapPx;
      const maxTranslatePx = Math.max(0, contentWidth - vw);
      const translatePx = Math.min(carouselIndex * stepPx, maxTranslatePx);
      setTrackTranslatePx(translatePx);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [carouselIndex, activeFilter, filteredFeatures.length]);

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
            opacity: 0;
            max-height: 0;
            overflow: hidden;
            transition: opacity 0.35s ease, max-height 0.35s ease;
          }
          .feature-card:hover .feature-card-desc {
            opacity: 1;
            max-height: 120px;
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
              opacity: 1;
              max-height: 120px;
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
          .features-carousel-track {
            display: flex;
            gap: var(--features-gap, clamp(1.25rem, 2.5vw, 2rem));
            transition: transform 0.4s ease-out;
            will-change: transform;
          }
          .features-carousel-card {
            flex: 0 0 calc(100% / var(--cards, 8));
            min-width: 0;
          }
          .features-carousel-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 48px;
            height: 48px;
            border: none;
            border-radius: 0;
            background: transparent;
            color: var(--color-text);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5;
            transition: color 0.2s ease;
          }
          .features-carousel-arrow:hover:not(:disabled) {
            color: var(--color-accent);
          }
          .features-carousel-arrow:disabled {
            opacity: 0.4;
            cursor: not-allowed;
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
            .features-carousel-card {
              flex: 0 0 calc(100% / var(--cards-mobile, 4));
            }
            .features-carousel-arrow {
              width: 40px;
              height: 40px;
            }
          }
          @media (max-width: 640px) {
            .features-carousel-card {
              flex: 0 0 100%;
            }
          }
        `}</style>

        <div
          id="features-panel"
          role="tabpanel"
          aria-labelledby={`${activeFilter.toLowerCase()}-tab`}
          className="features-carousel"
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            paddingInline: "clamp(0.5rem, 2vw, 1rem)",
            ["--features-gap" as string]: "clamp(1.25rem, 2.5vw, 2rem)",
          }}
        >
          {activeFilter === "All" ? (
            <>
              <button
                type="button"
                className="features-carousel-arrow"
                aria-label="Previous features"
                onClick={goPrev}
                disabled={carouselIndex === 0}
                style={{ left: 0 }}
                onMouseEnter={() => onChevronMouseEnter("prev")}
                onMouseLeave={onCardMouseLeave}
              >
                <i className="fa-solid fa-chevron-left" />
              </button>
              <button
                type="button"
                className="features-carousel-arrow"
                aria-label="Next features"
                onClick={goNext}
                disabled={carouselIndex >= maxIndex}
                style={{ right: 0 }}
                onMouseEnter={() => onChevronMouseEnter("next")}
                onMouseLeave={onCardMouseLeave}
              >
                <i className="fa-solid fa-chevron-right" />
              </button>

              <div
                ref={viewportRef}
                className="features-carousel-viewport"
                style={{ overflow: "hidden", width: "100%" }}
              >
                <div
                  ref={trackRef}
                  className="features-carousel-track"
                  style={{
                    "--cards": filteredFeatures.length,
                    "--cards-mobile": Math.min(4, Math.max(2, filteredFeatures.length)),
                    transform: trackTranslatePx !== null ? `translateX(-${trackTranslatePx}px)` : `translateX(-${carouselIndex * (100 / Math.max(1, filteredFeatures.length))}%)`,
                    width: filteredFeatures.length ? `calc(${(filteredFeatures.length / 3) * 100}% - ${(2 * filteredFeatures.length / 3)} * var(--features-gap, 1rem))` : "100%",
                  } as React.CSSProperties}
                >
                  {filteredFeatures.map((feature, index) => (
                    <div
                      key={`${activeFilter}-${feature.id}`}
                      className="features-carousel-card"
                      onMouseEnter={() => onCardMouseEnter(index)}
                      onMouseLeave={onCardMouseLeave}
                    >
                      <FeatureCardInner feature={feature} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div
              className="features-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                gap: "clamp(1.25rem, 2.5vw, 2rem)",
              }}
            >
              {filteredFeatures.map((feature, index) => (
                <div key={`${activeFilter}-${feature.id}`}>
                  <FeatureCardInner feature={feature} index={index} />
                </div>
              ))}
            </div>
          )}
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
