import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";

const faqData = [
  {
    question: "How is Vanguard different from traditional antivirus software?",
    answer: `Traditional antivirus solutions mainly rely on signature-based detection and focus on executable files only.<br><br>Vanguard goes beyond that by using AI-driven analysis to detect unknown threats, analyze code, scan URLs and emails, inspect Python libraries, and even detect hidden malicious data inside media files — all without executing suspicious content.`,
  },
  {
    question: "Does Vanguard rely on running files to detect threats?",
    answer: `No. Vanguard follows a static-first analysis approach.<br><br>Files, code, emails, and media are analyzed without execution, preventing accidental activation of malicious payloads and keeping the user's system safe during inspection.`,
  },
  {
    question: "Can Vanguard detect zero-day and previously unseen attacks?",
    answer: `Yes. Vanguard uses a hybrid AI framework combining deep learning and traditional machine learning.<br><br>This allows the system to recognize malicious patterns and anomalies rather than relying only on known signatures, making it effective against zero-day and emerging threats.`,
  },
  {
    question: "What types of threats can Vanguard detect?",
    answer: `Vanguard protects against a wide range of threats, including:<br><br>• Malware and malicious executables<br>• Phishing and malicious URLs<br>• Email-based attacks and social engineering<br>• Vulnerable and malicious code<br>• Compromised Python libraries (supply-chain attacks)<br>• Hidden data and steganographic payloads in images, audio, and video<br><br>All results are correlated through a centralized analysis system for deeper insight.`,
  },
  {
    question: "Who is Vanguard designed for?",
    answer: `Vanguard is built for users who need more than basic protection:<br><br>• Developers and IT professionals dealing with code and dependencies<br>• Security-conscious individuals handling sensitive data<br>• Small and medium-sized businesses (SMBs) that need enterprise-level protection without enterprise complexity.`,
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="questions"
      className="section questions"
      ref={ref}
      style={{
        padding: "var(--spacing-section) 0",
        position: "relative",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .faq-accordion {
            max-width: 100%;
            padding: 0 1rem;
          }
        }
      `}</style>
      <div className="container questions-container">
        <motion.div
          className="questions-header"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h2
            className="main-heading"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 600,
              marginBlockEnd: "3rem",
              letterSpacing: "0.04em",
              textAlign: "center",
              position: "relative",
            }}
          >
            How It Works
          </h2>
          <p
            className="section-lead"
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              color: "var(--color-text-muted)",
              maxWidth: "520px",
              margin: "0 auto 2.5rem",
              textAlign: "center",
            }}
          >
            Security is a process, not a product. Learn everything you need to
            know about taking the right steps to reach your destination.
          </p>
        </motion.div>

        <div
          className="faq-accordion"
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {faqData.map((item, index) => (
              <motion.div
                key={index}
                className="faq-accordion-item"
                data-faq-index={index}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.1 + index * 0.1,
                    },
                  },
                }}
                style={{
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg-card)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  className="faq-accordion-trigger"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-trigger-${index}`}
                  onClick={() => toggleItem(index)}
                  style={{
                    width: "100%",
                    padding:
                      "clamp(1rem, 3vw, 1.25rem) clamp(1rem, 4vw, 1.5rem)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "transparent",
                    border: "none",
                    color: "var(--color-text)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    className="faq-accordion-question"
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color:
                        openIndex === index
                          ? "var(--color-accent)"
                          : "var(--color-text)",
                      flex: 1,
                      paddingRight: "1rem",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.question}
                  </span>
                  <span
                    className="faq-accordion-icon"
                    aria-hidden="true"
                    style={{
                      color: "var(--color-accent)",
                      transition: "transform 0.3s ease",
                      transform:
                        openIndex === index
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          height: "1px",
                          background: "var(--color-border)",
                          margin: "0 1.5rem 1rem",
                        }}
                        aria-hidden="true"
                      />
                      <div
                        className="faq-accordion-answer"
                        style={{
                          padding:
                            "0 clamp(1rem, 4vw, 1.5rem) clamp(1rem, 3vw, 1.25rem)",
                          color: "var(--color-text-muted)",
                          lineHeight: 1.6,
                        }}
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
