import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section
      id="about"
      className="section about"
      ref={ref}
      style={{
        padding: "var(--spacing-section) 0",
        position: "relative",
      }}
    >
      <div className="container">
        <motion.h2
          className="main-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 600,
            marginBlockEnd: "3rem",
            letterSpacing: "-0.02em",
            textAlign: "center",
            position: "relative",
          }}
        >
          About Us
        </motion.h2>

        <motion.div
          className="about-inner"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.2 },
            },
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "center",
          }}
        >
          <div className="about-content">
            <p
              className="about-lead"
              style={{
                fontSize: "1.05rem",
                fontWeight: 500,
                color: "var(--color-text)",
                marginBottom: "1.25rem",
                lineHeight: 1.65,
              }}
            >
              Vanguard is a next-generation antivirus built with the
              contribution of AI — to stay ahead of threats, not just react to
              them.
            </p>
            <p
              className="about-p"
              style={{
                color: "var(--color-text-muted)",
                marginBottom: "1.5rem",
                lineHeight: 1.7,
              }}
            >
              We combine proven security engineering with machine learning and
              behavioral analysis. Our AI continuously learns from global threat
              data to detect malware, ransomware, and zero-day attacks before
              they harm your device.
            </p>
            <ul
              className="about-list"
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {[
                "AI-driven threat detection and classification",
                "Real-time protection with minimal impact on performance",
                "Privacy-first: analysis happens locally where possible",
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                    color: "var(--color-text)",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background: "var(--color-accent)",
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="about-visual"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.img
              src="/assets/icons/Big Logo.svg"
              alt="Vanguard"
              className="about-logo-img"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 1, delay: 0.4 },
                },
              }}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-inner {
            gap: 1.5rem !important;
          }
          .about-visual {
            max-width: 220px !important;
            width: 100% !important;
            margin: 1rem auto 0 !important;
            height: auto !important;
          }
          .about-logo-img {
            width: 100% !important;
            height: auto !important;
            min-height: 100px; /* fallback against collapse */
          }
          .about-list li {
            font-size: 0.95rem;
          }
          .about-lead {
            font-size: 1rem !important;
            margin-bottom: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
