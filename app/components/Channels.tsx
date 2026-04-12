import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  useReducedMotion,
} from "framer-motion";

const DESKTOP_BG = "/assets/desktop.png";
const WEBSITE_BG = "/assets/website.png";
const EXTENSIONS_BG = "/assets/extension.jpg";

const CHANNELS_FLEX_TRANSITION_MS = 600;
const CHANNELS_REVEAL_DURATION_MS = 550;

const channelItems = [
  {
    id: "desktop",
    title: "Shield every workstation",
    icon: "fa-solid fa-desktop",
    accent: "#1c7304",
    description:
      "Run Vanguard natively on Windows and macOS with full-system scanning, real-time shields, and policies that still work even offline.",
    backgroundImage: DESKTOP_BG,
  },
  {
    id: "website",
    title: "Browse with clarity",
    icon: "fa-solid fa-globe",
    accent: "#0ea5e9",
    description:
      "Cloud-backed URL intelligence follows your users across the web. Fewer impostor pages and less guesswork for your team.",
    backgroundImage: WEBSITE_BG,
  },
  {
    id: "extensions",
    title: "Protection inside apps",
    icon: "fa-solid fa-puzzle-piece",
    accent: "#8b5cf6",
    description:
      "Bring checks into the tools people use—browsers, mail, and dev workflows—without breaking flow or forcing another portal.",
    backgroundImage: EXTENSIONS_BG,
  },
] as const;

function ChannelCardForeground({
  item,
  isActive,
}: {
  item: (typeof channelItems)[number];
  isActive: boolean;
}) {
  return (
    <div
      className={`channels-card-fg transition-all duration-500 flex flex-col justify-end p-6 h-full z-10 relative ${isActive ? "opacity-100" : "opacity-80"}`}
    >
      <motion.div layout className="flex items-center gap-4 mb-4">
        <div
          className="channels-icon-box w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10 transition-all duration-300"
          style={{
            background: isActive
              ? `${item.accent}33`
              : "rgba(255,255,255,0.05)",
            boxShadow: isActive ? `0 0 20px ${item.accent}33` : "none",
          }}
        >
          <i
            className={`${item.icon} text-xl transition-colors duration-300`}
            style={{ color: isActive ? item.accent : "#94a3b8" }}
          />
        </div>
        <h3 className="text-xl font-semibold text-white leading-tight transition-all duration-300">
          {item.title}
        </h3>
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}

export function Channels() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const [activeChannelId, setActiveChannelId] = useState<string>("desktop");
  const [suppressChannelForeground, setSuppressChannelForeground] =
    useState(false);
  const [revealChannelForeground, setRevealChannelForeground] = useState(false);
  const skipNextForegroundTransition = useRef(true);
  const columnRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (skipNextForegroundTransition.current) {
      skipNextForegroundTransition.current = false;
      return;
    }
    setSuppressChannelForeground(true);
    setRevealChannelForeground(false);

    const revealMs = reduceMotion ? 0 : CHANNELS_REVEAL_DURATION_MS;

    const showTimer = window.setTimeout(() => {
      setSuppressChannelForeground(false);
      if (revealMs > 0) {
        setRevealChannelForeground(true);
      }
    }, CHANNELS_FLEX_TRANSITION_MS);

    const clearRevealTimer =
      revealMs > 0
        ? window.setTimeout(() => {
            setRevealChannelForeground(false);
          }, CHANNELS_FLEX_TRANSITION_MS + revealMs)
        : null;

    return () => {
      window.clearTimeout(showTimer);
      if (clearRevealTimer !== null) window.clearTimeout(clearRevealTimer);
    };
  }, [activeChannelId, reduceMotion]);

  useEffect(() => {
    // Mobile scroll sync
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.innerWidth <= 900) {
            setActiveChannelId(
              (entry.target as HTMLElement).dataset.id || "desktop",
            );
          }
        });
      },
      { threshold: 0.6, rootMargin: "0px" },
    );

    Object.values(columnRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const activeIndex = Math.max(
    0,
    channelItems.findIndex((c) => c.id === activeChannelId),
  );

  function goTo(id: (typeof channelItems)[number]["id"]) {
    setActiveChannelId(id);
    columnRefs.current[id]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <section
      id="channels"
      className={`section channels${
        suppressChannelForeground ? " channels--suppress-foreground" : ""
      }${revealChannelForeground ? " channels--reveal-foreground" : ""}`}
      role="region"
      aria-labelledby="channels-heading"
      ref={ref}
      style={{
        padding: "var(--spacing-section) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <motion.h2
          id="channels-heading"
          className="main-heading"
          initial={{ opacity: 0 }}
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
          Our channels
        </motion.h2>

        <style>{`
          .channels-columns {
            display: flex;
            flex-direction: row;
            gap: 1.5rem;
            width: 100%;
            align-items: stretch;
          }

          .channels-column {
            position: relative;
            min-width: 0;
            flex: 1;
            transition: flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s ease, background-color 0.3s ease;
            overflow: hidden;
            border-radius: 24px;
            cursor: pointer;
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.05);
          }

          @media (min-width: 901px) {
            .channels-column.is-active {
              flex: 2.5;
              border-color: rgba(255, 255, 255, 0.15);
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            .channels-column.is-folded {
              flex: 0.8;
            }
            .channels-column:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px var(--color-accent-glow);
              z-index: 5;
            }
            .channels-column:hover:not(.is-active) {
              flex: 1;
              background: var(--color-bg-card);
              border-color: rgba(28, 115, 4, 0.3);
            }
            .channels-column:hover .channels-card-fg h3 {
              transform: translateX(4px);
              color: var(--color-accent);
            }
            .channels-column:hover .channels-icon-box {
              transform: scale(1.1) rotate(5deg);
              box-shadow: 0 0 15px var(--color-accent-glow);
            }
          }

          .channels-article {
            position: relative;
            width: 100%;
            height: 500px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .channels-bg-layer {
            position: absolute;
            inset: 0;
            background-size: cover; 
            background-position: center;
            background-repeat: no-repeat;
            z-index: 0;
            transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease, opacity 0.5s ease;
          }

          .channels-column.is-active .channels-bg-layer {
            transform: scale(1.05);
          }

          .holographic-overlay {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
            background-size: 24px 24px;
            z-index: 1;
            pointer-events: none;
            opacity: 0.3;
          }

          @media (max-width: 900px) {
            .channels-columns {
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              gap: 1rem;
              padding: 1rem 0 2rem;
              scrollbar-width: none;
            }
            .channels-columns::-webkit-scrollbar {
              display: none;
            }
            .channels-column {
              flex: 0 0 calc(100% - 2rem);
              scroll-snap-align: center;
            }
            .channels-article {
              height: 450px;
            }
          }

          .channels-bullets {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            margin-block-start: 1rem;
          }

          .channels-bullet {
            width: 8px;
            height: 8px;
            border-radius: 99px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            padding: 0;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .channels-bullet.is-active {
            width: 24px;
            background: var(--color-accent);
          }

          @media (min-width: 901px) {
            .channels-bullets {
              display: none;
            }
          }
        `}</style>

        <motion.div
          layout
          className="channels-columns"
          initial={{ opacity: 0, y: 24 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.1 },
            },
          }}
        >
          {channelItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`channels-column group ${
                activeChannelId === item.id ? " is-active" : " is-folded"
              }`}
              data-id={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? "visible" : "hidden"}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 },
                },
                hidden: { opacity: 0, y: 20 },
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              onMouseEnter={() => {
                if (window.innerWidth > 900) {
                  setActiveChannelId(item.id);
                }
              }}
              ref={(el) => {
                columnRefs.current[item.id] = el;
              }}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.15 + index * 0.08 },
                },
              }}
            >
              <article className="channels-article">
                <motion.div
                  aria-hidden
                  className="channels-bg-layer"
                  animate={{
                    scale: activeChannelId === item.id ? 1.1 : 1,
                    filter:
                      activeChannelId === item.id
                        ? "grayscale(0) saturate(1.2) brightness(1.1)"
                        : "grayscale(1) saturate(0) brightness(0.35)",
                    opacity: activeChannelId === item.id ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    backgroundImage: `url(${item.backgroundImage})`,
                  }}
                />
                <div className="holographic-overlay" />
                <div className="absolute inset-0 z-2 pointer-events-none">
                  {/* Default/Inactive Overlay */}
                  <motion.div
                    animate={{ opacity: activeChannelId === item.id ? 0 : 1 }}
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(10, 12, 10, 0.5) 0%, rgba(10, 12, 10, 0.85) 100%)",
                    }}
                  />
                  {/* Active Overlay */}
                  <motion.div
                    animate={{ opacity: activeChannelId === item.id ? 1 : 0 }}
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(10, 12, 10, 0) 40%, rgba(10, 12, 10, 0.95) 100%)",
                    }}
                  />
                </div>
                {activeChannelId === item.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-1 pointer-events-none"
                    style={{
                      border: `1px solid ${item.accent}33`,
                      boxShadow: `inset 0 0 40px ${item.accent}11`,
                    }}
                  />
                )}
                <ChannelCardForeground
                  item={item}
                  isActive={activeChannelId === item.id}
                />
              </article>
            </motion.div>
          ))}
        </motion.div>

        <div className="channels-bullets" aria-label="Channels slider">
          {channelItems.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`channels-bullet${i === activeIndex ? " is-active" : ""}`}
              aria-label={`Go to ${item.title}`}
              onClick={() => goTo(item.id)}
            />
          ))}
        </div>

        <motion.div
          className="channels-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.5 },
            },
          }}
          style={{ textAlign: "center", marginBlockStart: "3rem" }}
        >
          <a
            href="#contact"
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.75rem 2rem",
              fontSize: "0.95rem",
              fontWeight: 500,
              borderRadius: "8px",
              background: "#1c7304",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Get Vanguard
          </a>
        </motion.div>
      </div>
    </section>
  );
}
