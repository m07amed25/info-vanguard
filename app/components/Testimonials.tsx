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
    name: "Mohamed Waheed",
    role: "Cyber Security Team Leader",
    company: "SMART Technology Solutions",
    content:
      "Vanguard stands out because it approaches cybersecurity as a connected ecosystem rather than a set of isolated tools. What impressed me most is the way the platform correlates threats across files, URLs, emails, code, and even multimedia content. From a security leadership perspective, this kind of unified and layered visibility is exactly what modern defense strategies need, especially against multi-vector attacks.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ahmed Mansour",
    role: "Cyber Security Consultant",
    company: "Freelance",
    content:
      "What I appreciate about Vanguard is that it reflects a strong understanding of today’s threat landscape. The combination of AI-driven detection, static-first analysis, and threat intelligence integration makes the solution both practical and forward-looking. It is not just another scanner; it is a well-thought-out security platform that addresses phishing, malware, vulnerable code, and hidden payloads in a more comprehensive way.",
    rating: 5,
  },
  {
    id: 3,
    name: "Maher Elgamil",
    role: "Lead Software Engineering",
    company: "Sudeem",
    content:
      "From a software engineering point of view, Vanguard is a very promising project because it bridges security research with real engineering use cases. The inclusion of source code vulnerability scanning, malicious Python package detection, and developer-focused integration such as browser and coding workflow support shows that the team understands how security should fit naturally into the development lifecycle.",
    rating: 5,
  },
  {
    id: 4,
    name: "Mahmoud Ayman",
    role: "CEO",
    company: "Parmagina",
    content:
      "Vanguard has clear business value because it turns advanced cybersecurity concepts into a solution that is accessible for real users and organizations. What makes it compelling is that it does not target only large enterprises; it can also serve individuals, developers, and small businesses that need strong protection without the complexity of expensive enterprise tools.",
    rating: 5,
  },
  {
    id: 5,
    name: "Ahmed Elbosily",
    role: "Co-Founder",
    company: "CUBE Egypt",
    content:
      "What makes Vanguard impressive is its product vision. The team identified a real problem in the market: fragmented desktop security and the lack of one intelligent platform that covers multiple attack surfaces. By bringing together AI-powered scanning, threat intelligence, and a centralized dashboard, Vanguard shows strong potential as a scalable cybersecurity product.",
    rating: 5,
  },
  {
    id: 6,
    name: "Mahmoud Emad",
    role: "Software Project Manager",
    company: "Code Clouders",
    content:
      "Vanguard reflects solid project thinking in both scope and execution. The platform is not limited to one security feature; it is designed as a coordinated system with multiple specialized modules working together under one architecture. From a project management perspective, this shows good planning, clear product direction, and a strong awareness of both technical challenges and user needs.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "0.25rem" }}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
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

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div
      style={{
        width: "min(350px, 88vw)",
        padding: "1.5rem",
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minHeight: "280px",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
        margin: "0 0.625rem",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, var(--color-accent), var(--color-accent-soft))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "white",
            boxShadow: "0 4px 12px rgba(var(--color-accent-rgb), 0.3)",
          }}
        >
          {testimonial.name.charAt(0)}
        </div>
        <StarRating rating={testimonial.rating} />
      </div>

      <p
        style={{
          fontSize: "0.875rem",
          lineHeight: 1.5,
          color: "rgba(255, 255, 255, 0.8)",
          fontStyle: "italic",
          flexGrow: 1,
        }}
      >
        "{testimonial.content}"
      </p>

      <div
        style={{
          paddingTop: "1rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            color: "white",
            fontSize: "0.95rem",
            marginBottom: "0.15rem",
          }}
        >
          {testimonial.name}
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--color-text-muted)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {testimonial.role} @ {testimonial.company}
        </div>
      </div>
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

  // Merge all testimonials into one row
  const allTestimonials = [...testimonials];
  const marqueeControls = useAnimation();

  useEffect(() => {
    marqueeControls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 40,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [marqueeControls]);

  return (
    <section
      id="testimonials"
      className="section testimonials"
      ref={ref}
      style={{
        padding: "clamp(2rem, 5vw, 4rem) 0",
        position: "relative",
        background: "var(--color-bg)",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(circle, rgba(var(--color-accent-rgb), 0.05) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(circle, rgba(var(--color-accent-rgb), 0.05) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <span
            style={{
              color: "var(--color-accent)",
              fontWeight: 600,
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            Testimonials
          </span>
          <h2
            className="main-heading"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              margin: "0 0 1rem",
              lineHeight: 1.2,
              background:
                "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Trusted by Security Experts
          </h2>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              color: "var(--color-text-muted)",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Insights from industry leaders who have experienced the power of
            Vanguard.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          maskImage:
            "linear-gradient(to right, transparent, black var(--marquee-mask, 15%), black calc(100% - var(--marquee-mask, 15%)), transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black var(--marquee-mask, 15%), black calc(100% - var(--marquee-mask, 15%)), transparent)",
        }}
        onMouseEnter={() => marqueeControls.stop()}
        onMouseLeave={() =>
          marqueeControls.start({
            x: ["0%", "-50%"],
            transition: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          })
        }
      >
        <motion.div
          style={{ display: "flex", width: "fit-content" }}
          animate={marqueeControls}
        >
          {[...allTestimonials, ...allTestimonials].map((testimonial, idx) => (
            <TestimonialCard
              key={`${testimonial.id}-${idx}`}
              testimonial={testimonial}
            />
          ))}
        </motion.div>
      </div>

      <div
        className="container"
        style={{ marginTop: "3.5rem", position: "relative", zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8, delay: 0.4 },
            },
          }}
          style={{
            padding: "2rem",
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "clamp(1rem, 2rem, 2.5rem)",
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
                label: "Global Support",
              },
            ].map((stat, index) => (
              <div key={index}>
                <div
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    fontWeight: 800,
                    color: "var(--color-accent)",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <AnimatedCounter
                    targetValue={stat.value}
                    duration={3000}
                    format={stat.format}
                    suffix={stat.suffix}
                    enabled={isVisible}
                  />
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255, 255, 255, 0.5)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
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
