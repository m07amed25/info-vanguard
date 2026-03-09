import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ElementType,
  type ReactNode,
} from "react";

type EasingFunction = (t: number) => number;

const easings: Record<string, EasingFunction> = {
  linear: (t) => t,
  easeOutQuad: (t) => t * (2 - t),
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeOutElastic: (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
        ? 1
        : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

export type NumberFormat =
  | "number"
  | "decimal"
  | "currency"
  | "percentage"
  | "compact";

export interface StatItem {
  value: number;
  label: string;
  duration?: number;
  easing?: string | EasingFunction;
  format?: NumberFormat;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  repeat?: boolean;
  icon?: ReactNode;
}
export interface StatsProps {
  stats?: StatItem[];
  as?: ElementType;
  className?: string;
  title?: string;
  animate?: boolean;
  gap?: string | number;
  columns?: number;
  "aria-label"?: string;
}

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  easing?: string | EasingFunction;
  format?: NumberFormat;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  enabled?: boolean;
}

function AnimatedCounter({
  targetValue,
  duration = 3000,
  easing = "easeOutCubic",
  format = "number",
  decimals = 0,
  prefix = "",
  suffix = "",
  enabled = true,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  const formatNumber = useCallback(
    (value: number): string => {
      const easingFn =
        typeof easing === "function"
          ? easing
          : easings[easing] || easings.easeOutCubic;

      switch (format) {
        case "decimal":
          return value.toFixed(decimals);
        case "currency":
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }).format(value);
        case "percentage":
          return `${value.toFixed(decimals)}%`;
        case "compact":
          if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
          if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
          if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
          return value.toFixed(0);
        case "number":
        default:
          return Math.round(value).toLocaleString("en-US");
      }
    },
    [easing, format, decimals],
  );

  useEffect(() => {
    if (!enabled || hasAnimatedRef.current) {
      if (!enabled) setDisplayValue(targetValue);
      return;
    }

    setIsAnimating(true);
    hasAnimatedRef.current = true;

    const easingFn =
      typeof easing === "function"
        ? easing
        : easings[easing] || easings.easeOutCubic;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);
      const currentValue = easedProgress * targetValue;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, targetValue, duration, easing]);

  const formattedValue = formatNumber(displayValue);

  return (
    <span
      aria-live="polite"
      aria-busy={isAnimating}
      className="stats-number"
      style={{
        display: "block",
        fontSize: "2.5rem",
        fontWeight: 700,
        color: "var(--color-text)",
        marginBottom: "0.75rem",
      }}
    >
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

interface StatCardProps {
  stat: StatItem;
  index: number;
  animate: boolean;
  isVisible: boolean;
}

function StatCard({ stat, index, animate, isVisible }: StatCardProps) {
  const animationDelay = index * 150;

  return (
    <div
      className="stats-box"
      style={{
        textAlign: "center",
        padding: "2.5rem 2rem",
        background: "var(--color-bg-card)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        flex: "1 1 0",
        minWidth: "280px",
        maxWidth: "400px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease-out ${animationDelay}ms, transform 0.6s ease-out ${animationDelay}ms`,
      }}
      role="group"
      aria-label={`${stat.label}: ${stat.value}`}
    >
      {stat.icon && (
        <div
          className="stats-icon"
          style={{
            display: "block",
            marginBottom: "1.5rem",
            color: "var(--color-accent)",
          }}
        >
          {stat.icon}
        </div>
      )}
      <AnimatedCounter
        targetValue={stat.value}
        duration={stat.duration}
        easing={stat.easing}
        format={stat.format}
        decimals={stat.decimals}
        prefix={stat.prefix}
        suffix={stat.suffix}
        enabled={animate && isVisible}
      />
      <span
        className="stats-label"
        style={{
          display: "block",
          color: "var(--color-text-muted)",
          fontSize: "1rem",
          lineHeight: 1.5,
          marginTop: "0.75rem",
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}

/**
 * Stats component - displays animated counting statistics
 */
export function Stats({
  stats = [],
  as: Component = "section",
  className = "",
  title = "Statistics",
  animate = true,
  gap = "3rem",
  columns = 3,
  "aria-label": ariaLabel = "Statistics",
}: StatsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimatedRef = useRef(false);

  // Intersection Observer to trigger animation when stats come into view
  useEffect(() => {
    const element = containerRef.current;
    if (!element || !animate) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            setIsVisible(true);
            hasAnimatedRef.current = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "-100px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animate]);

  // Default stats data if none provided
  const displayStats =
    Array.isArray(stats) && stats.length > 0
      ? stats
      : [
          {
            value: 860000,
            label: "Internet Crimes",
            format: "compact" as NumberFormat,
          },
          {
            value: 1300000000,
            label: "Data Breaches",
            format: "compact" as NumberFormat,
          },
          {
            value: 10000000,
            label: "Financial Costs",
            format: "compact" as NumberFormat,
            prefix: "$",
          },
        ];

  return (
    <>
      <style>{`
        #problem::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(10, 12, 10, 0.88);
          z-index: 0;
        }
      `}</style>
      <Component
        id="problem"
        className={`stats ${className}`.trim()}
        ref={containerRef}
        aria-label={ariaLabel}
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
          position: "relative",
          background: "url(/assets/map2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "320px",
        }}
      >
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {title && (
            <h2
              className="section-title main-heading"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 600,
                margin: "0 auto 4rem",
                color: "var(--color-text)",
                textAlign: "center",
                position: "relative",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              }}
            >
              {title}
            </h2>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: typeof gap === "number" ? `${gap}px` : gap,
              flexWrap: "wrap",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 1rem",
            }}
            role="list"
            aria-label="Statistical data"
          >
            {displayStats.map((stat, index) => (
              <div
                key={index}
                style={{
                  flex: `1 1 calc(${100 / columns}% - ${typeof gap === "number" ? gap : parseInt(gap) || 24}px)`,
                  minWidth: "280px",
                  maxWidth: "400px",
                }}
              >
                <StatCard
                  stat={stat}
                  index={index}
                  animate={animate}
                  isVisible={isVisible}
                />
              </div>
            ))}
          </div>
        </div>
      </Component>
    </>
  );
}

export default Stats;
