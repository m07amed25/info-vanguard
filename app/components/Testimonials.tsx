import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  format?: "number" | "decimal" | "percentage" | "compact";
  suffix?: string;
  enabled?: boolean;
}

function AnimatedCounter({
  targetValue,
  duration = 5000,
  format = "number",
  suffix = "",
  enabled = true,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!enabled || hasAnimatedRef.current) {
      if (!enabled) setDisplayValue(targetValue);
      return;
    }

    hasAnimatedRef.current = true;

    let startTime: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = easedProgress * targetValue;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, targetValue, duration]);

  const formatValue = (value: number): string => {
    switch (format) {
      case "decimal":
        return value.toFixed(1);
      case "percentage":
        return value.toFixed(1);
      case "compact":
        if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
        return value.toFixed(0);
      case "number":
      default:
        return Math.round(value).toLocaleString("en-US");
    }
  };

  return (
    <span aria-live="polite">
      {formatValue(displayValue)}
      {suffix}
    </span>
  );
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "TechCorp Solutions",
    content:
      "Vanguard has transformed our security posture. The AI-driven detection caught threats that our previous antivirus completely missed. It's like having a dedicated security team watching 24/7.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "IT Director",
    company: "Global Finance Inc",
    content:
      "We protect over 5,000 endpoints with Vanguard. The minimal system impact combined with comprehensive protection is exactly what we needed. Our incident response time has dropped by 80%.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Founder & CEO",
    company: "StartupX",
    content:
      "As a small business, we can't afford a full security team. Vanguard gives us enterprise-grade protection at a fraction of the cost. The password manager and VPN integration are lifesavers.",
    rating: 5,
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "0.25rem" }}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < rating ? "var(--color-accent)" : "none"}
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      setIsVisible(true);
    }
  }, [isInView, controls]);

  return (
    <section
      id="testimonials"
      className="section testimonials"
      ref={ref}
      style={{
        padding: "var(--spacing-section) 0",
        position: "relative",
        background: "var(--color-bg-elevated)",
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h2
            className="main-heading"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 600,
              margin: "0 0 0.75rem",
              letterSpacing: "0.04em",
              textAlign: "center",
            }}
          >
            Trusted by Security Professionals
          </h2>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              color: "var(--color-text-muted)",
              maxWidth: "520px",
              margin: "1.5rem auto",
            }}
          >
            See what IT leaders and security experts say about Vanguard's
            protection.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "clamp(1.25rem, 3vw, 2rem)",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.1 + index * 0.1 },
                },
              }}
              style={{
                padding: "clamp(1.25rem, 4vw, 2rem)",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                height: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <StarRating rating={testimonial.rating} />
              </div>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "var(--color-text)",
                  marginBottom: "1.5rem",
                  fontStyle: "italic",
                }}
              >
                "{testimonial.content}"
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "var(--color-accent-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--color-accent)",
                    flexShrink: 0,
                  }}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "var(--color-text)",
                      fontSize: "1rem",
                    }}
                  >
                    {testimonial.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
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
            marginTop: "4rem",
            padding: "2rem",
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {[
              {
                value: 100,
                format: "compact" as const,
                suffix: "+",
                label: "Active Users",
              },
              {
                value: 99.9,
                format: "percentage" as const,
                suffix: "",
                label: "Detection Rate",
              },
              {
                value: 30,
                format: "number" as const,
                suffix: "+",
                label: "Countries",
              },
              {
                value: 24,
                format: "number" as const,
                suffix: "/7",
                label: "Support",
              },
            ].map((stat, index) => (
              <div key={index}>
                <div
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                    marginBottom: "0.25rem",
                  }}
                >
                  <AnimatedCounter
                    targetValue={stat.value}
                    duration={5000}
                    format={stat.format}
                    suffix={stat.suffix}
                    enabled={isVisible}
                  />
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
