import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const whyItems = [
  {
    number: "01",
    title: "All-in-One Cyber Shield",
    description:
      "One intelligent solution that replaces disconnected security tools by scanning file, emails, URLs, code, and hidden threats in media, all from a single place.",
  },
  {
    number: "02",
    title: "Invisible Threat Hunter",
    description:
      "Powered by AI, Vanguard detects zero-day malware, phishing emails, and hidden data inside images, covering attack vectors traditional antivirus often overlooks.",
  },
  {
    number: "03",
    title: "Effortless Security",
    description:
      "Whether you're a developer, freelancer, or small business, Vanguard delivers powerful protection without complicated setups or expensive security stacks.",
  },
  {
    number: "04",
    title: "Instant Threat Vision",
    description:
      "Instant risk scores, prioritized alerts, and detailed reports give you a clear understanding of every threat so you can respond quickly and confidently.",
  },
  {
    number: "05",
    title: "Fortified Code",
    description:
      "Vanguard analyzes your source code, libraries, and files to uncover hidden vulnerabilities before attackers have the chance to exploit them.",
  },
  {
    number: "06",
    title: "24/7 Dedicated",
    description:
      "Our security experts are always on standby to walk you through every alert, answer every question, and resolve every concern, so you never face a threat alone.",
  },

];

const HOVER_SCROLL_DELAY_MS = 500;

export function WhyUs() {
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

  const maxIndex = Math.max(0, whyItems.length - 3);
  const goPrev = () => setCarouselIndex((i) => Math.max(0, i - 1));
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
    if (!viewport || !track) return;
    const gapValue = getComputedStyle(viewport.parentElement ?? document.documentElement).getPropertyValue("--why-gap").trim() || "16px";
    const gapPx = parseFloat(gapValue) || 16;
    const update = () => {
      const vw = viewport.getBoundingClientRect().width;
      const trackWidth = track.getBoundingClientRect().width;
      const n = whyItems.length;
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
  }, [carouselIndex]);

  return (
    <section
      id="why-us"
      className="section why-us"
      role="region"
      aria-labelledby="why-us-heading"
      ref={ref}
      style={{
        padding: "var(--spacing-section) 0",
        position: "relative",
      }}
    >
      <div className="container">
        <motion.h2
          id="why-us-heading"
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
          Why Users Stick With Us
        </motion.h2>

        <style>{`
          .why-us-carousel-track {
            display: flex;
            gap: clamp(1rem, 3vw, 2rem);
            transition: transform 0.4s ease-out;
            will-change: transform;
          }
          .why-us-carousel-card {
            flex: 0 0 calc(100% / var(--why-cards, 6));
            min-width: 0;
            min-height: 200px;
            display: flex;
          }
          .why-us-carousel-card .why-item {
            min-height: 200px;
            height: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .why-us-carousel-arrow {
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
          .why-us-carousel-arrow:hover:not(:disabled) {
            color: var(--color-accent);
          }
          .why-us-carousel-arrow:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
          @media (max-width: 768px) {
            .why-us-carousel-card {
              flex: 0 0 calc(100% / var(--why-cards-mobile, 2));
            }
            .why-us-carousel-arrow {
              width: 40px;
              height: 40px;
            }
          }
          @media (max-width: 640px) {
            .why-us-carousel-card {
              flex: 0 0 100%;
            }
          }
        `}</style>

        <div
          className="why-us-carousel"
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            paddingInline: "clamp(0.5rem, 2vw, 1rem)",
            ["--why-gap" as string]: "clamp(1rem, 3vw, 2rem)",
          }}
        >
          <button
            type="button"
            className="why-us-carousel-arrow"
            aria-label="Previous"
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
            className="why-us-carousel-arrow"
            aria-label="Next"
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
            className="why-us-carousel-viewport"
            style={{ overflow: "hidden", width: "100%" }}
          >
            <div
              ref={trackRef}
              className="why-us-carousel-track"
              style={{
                "--why-cards": whyItems.length,
                "--why-cards-mobile": Math.min(4, Math.max(2, whyItems.length)),
                transform: trackTranslatePx !== null ? `translateX(-${trackTranslatePx}px)` : `translateX(-${carouselIndex * (100 / Math.max(1, whyItems.length))}%)`,
                width: `calc(${(whyItems.length / 3) * 100}% - ${(2 * whyItems.length / 3)} * var(--why-gap, 1rem))`,
              } as React.CSSProperties}
            >
              {whyItems.map((item, index) => (
                <div
                  key={index}
                  className="why-us-carousel-card"
                  onMouseEnter={() => onCardMouseEnter(index)}
                  onMouseLeave={onCardMouseLeave}
                >
                  <motion.article
                    className="why-item"
                    initial={{ opacity: 0, y: 30 }}
                    animate={controls}
                    variants={{
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: index * 0.1 },
                      },
                    }}
                    whileHover={{
                      scale: 1.02,
                      zIndex: 10,
                      boxShadow: "0 8px 24px rgba(28, 115, 4, 0.2)",
                    }}
                    transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
                    style={{
                      background: "var(--color-bg-card)",
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--color-border)",
                      padding: "clamp(1.25rem, 4vw, 2rem)",
                      position: "relative",
                      overflow: "hidden",
                      minHeight: "200px",
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(2.5rem, 6vw, 4rem)",
                        fontWeight: 700,
                        color: "var(--color-accent)",
                        opacity: 0.3,
                        position: "absolute",
                        top: "0.25rem",
                        insetInlineEnd: "0.5rem",
                        fontFamily: "var(--font-gargoyles)",
                        lineHeight: 1,
                      }}
                      aria-hidden="true"
                    >
                      {item.number}
                    </span>
                    <h3
                      style={{
                        fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
                        fontWeight: 600,
                        marginBlockEnd: "0.75rem",
                        color: "var(--color-text)",
                        position: "relative",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        color: "var(--color-text-muted)",
                        lineHeight: 1.6,
                        margin: 0,
                        fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                        position: "relative",
                      }}
                    >
                      {item.description}
                    </p>
                  </motion.article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
