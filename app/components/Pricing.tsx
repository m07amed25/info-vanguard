import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    monthlyPrice: 4.99,
    annualPrice: 39.99,
    features: [
      "Real-time malware scanning",
      "URL & link protection",
      "Email threat detection",
      "Basic firewall",
      "5 device protection",
      "24/7 customer support",
    ],
    buttonText: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 9.99,
    annualPrice: 79.99,
    highlighted: true,
    features: [
      "Everything in Basic",
      "Advanced AI threat detection",
      "Zero-day attack protection",
      "VPN integration (limited)",
      "Password manager",
      "Priority support",
      "Unlimited device protection",
      "Cloud threat intelligence",
    ],
    buttonText: "Get Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 24.99,
    annualPrice: 199.99,
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom security policies",
      "Advanced VPN (unlimited)",
      "API access",
      "Team management dashboard",
      "White-label options",
      "Compliance reporting",
    ],
    buttonText: "Contact Sales",
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const getPrice = (plan: Plan) => {
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const getPriceLabel = () => {
    return isAnnual ? "/year" : "/month";
  };

  const getSavings = (plan: Plan) => {
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - plan.annualPrice;
    return Math.round(savings);
  };

  return (
    <section
      id="pricing"
      className="section pricing"
      role="region"
      aria-labelledby="pricing-heading"
      ref={ref}
      style={{
        padding: "var(--spacing-section) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <motion.h2
          id="pricing-heading"
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
          Pricing Plans
        </motion.h2>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            color: "var(--color-text-muted)",
            maxWidth: "clamp(280px, 90vw, 560px)",
            marginInline: "auto",
            marginBlockEnd: "2rem",
            textAlign: "center",
          }}
        >
          Select the perfect plan for your security needs. All plans include a
          30-day money-back guarantee.
        </p>

        {/* Pricing Toggle - Mobile Responsive */}
        <motion.div
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
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(0.5rem, 2vw, 1rem)",
            padding: "clamp(0.75rem, 3vw, 1rem)",
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            marginBlockEnd: "clamp(2rem, 5vw, 3rem)",
            maxWidth: "fit-content",
            marginInline: "auto",
          }}
        >
          <span
            style={{
              fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
              fontWeight: 500,
              color: !isAnnual
                ? "var(--color-text)"
                : "var(--color-text-muted)",
              transition: "color 0.2s ease",
              order: 1,
            }}
          >
            Monthly
          </span>

          {/* Toggle Button - 44x44px minimum touch target */}
          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            aria-label={
              isAnnual
                ? "Switch to monthly billing"
                : "Switch to annual billing"
            }
            aria-pressed={isAnnual}
            style={{
              position: "relative",
              width: "clamp(52px, 12vw, 56px)",
              height: "clamp(28px, 7vw, 32px)",
              minWidth: "44px",
              minHeight: "44px",
              background: "var(--color-accent)",
              borderRadius: "clamp(14px, 4vw, 16px)",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              order: 2,
              padding: "6px",
            }}
          >
            <span
              style={{
                position: "absolute",
                width: "clamp(18px, 5vw, 22px)",
                height: "clamp(18px, 5vw, 22px)",
                background: "#fff",
                borderRadius: "50%",
                left: isAnnual ? "auto" : "6px",
                right: isAnnual ? "6px" : "auto",
                transition: "left 0.2s ease, right 0.2s ease",
              }}
            />
          </button>

          <span
            style={{
              fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
              fontWeight: 500,
              color: isAnnual ? "var(--color-text)" : "var(--color-text-muted)",
              transition: "color 0.2s ease",
              order: 3,
              display: "flex",
              alignItems: "center",
              gap: "clamp(0.25rem, 1vw, 0.5rem)",
              flexWrap: "wrap",
            }}
          >
            Annual
            <span
              style={{
                display: "inline-block",
                padding:
                  "clamp(0.15rem, 0.5vw, 0.2rem) clamp(0.4rem, 1vw, 0.5rem)",
                fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
                fontWeight: 600,
                color: "#fff",
                background: "var(--color-accent)",
                borderRadius: "4px",
                whiteSpace: "nowrap",
              }}
            >
              Save 33%
            </span>
          </span>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "clamp(1rem, 3vw, 2rem)",
            maxWidth: "1100px",
            marginInline: "auto",
          }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.1 + index * 0.15 },
                },
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{
                position: "relative",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                background: plan.highlighted
                  ? "linear-gradient(135deg, var(--color-accent-soft) 0%, var(--color-bg-card) 100%)"
                  : "var(--color-bg-card)",
                borderRadius: "var(--radius-lg)",
                border: `2px solid ${
                  plan.highlighted
                    ? "var(--color-accent)"
                    : hoveredPlan === plan.id
                      ? "var(--color-accent)"
                      : "var(--color-border)"
                }`,
                transition: "border-color 0.3s ease, transform 0.3s ease",
                transform: "none",
              }}
            >
              {plan.highlighted && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    insetInlineStart: "50%",
                    transform: "translateX(-50%)",
                    padding: "0.4rem 1rem",
                    background: "var(--color-accent)",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    borderRadius: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Most Popular
                </div>
              )}

              <h3
                style={{
                  fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
                  fontWeight: 600,
                  marginBlockEnd: "0.5rem",
                  color: "var(--color-text)",
                }}
              >
                {plan.name}
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.25rem",
                  marginBlockEnd: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(2rem, 5vw, 2.5rem)",
                    fontWeight: 700,
                    color: "var(--color-text)",
                  }}
                >
                  ${getPrice(plan)}
                </span>
                <span
                  style={{
                    fontSize: "clamp(0.875rem, 2vw, 1rem)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {getPriceLabel()}
                </span>
              </div>

              {isAnnual && (
                <p
                  style={{
                    fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
                    color: "var(--color-success)",
                    marginBlockEnd: "1.5rem",
                  }}
                >
                  Save ${getSavings(plan)}/year
                </p>
              )}

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  marginBlockEnd: "1.5rem",
                }}
              >
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      padding: "0.5rem 0",
                      fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--color-accent)",
                        fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`btn ${plan.highlighted ? "btn-primary" : "btn-ghost"}`}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.75rem 1.5rem",
                  fontSize: "clamp(0.875rem, 2vw, 0.95rem)",
                  fontWeight: 500,
                  borderRadius: "var(--radius)",
                  textDecoration: "none",
                  minHeight: "44px",
                }}
              >
                {plan.buttonText}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
