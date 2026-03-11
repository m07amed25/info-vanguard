import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const whyItems = [
  {
    number: "01",
    title: "AI-driven threat detection",
    description:
      "Machine learning identifies new and unknown malware by behavior, not just signatures.",
  },
  {
    number: "02",
    title: "Always learning",
    description:
      "Our models improve with every new threat. You get stronger defense as the landscape evolves.",
  },
  {
    number: "03",
    title: "Support when it matters",
    description:
      "Help with infections, quarantines, and tuning — real support, not just a knowledge base.",
  },
];

export function WhyUs() {
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
            letterSpacing: "-0.02em",
            textAlign: "center",
            position: "relative",
          }}
        >
          Why Users Stick With Us
        </motion.h2>

        <div
          className="why-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "clamp(1rem, 3vw, 2rem)",
          }}
        >
          {whyItems.map((item, index) => (
            <motion.article
              key={index}
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
              style={{
                background: "var(--color-bg-card)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                padding: "clamp(1.25rem, 4vw, 2rem)",
                position: "relative",
                overflow: "hidden",
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
          ))}
        </div>
      </div>
    </section>
  );
}
