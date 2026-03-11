import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Zero-Day Attacks and How to Protect Against Them",
    excerpt:
      "Zero-day vulnerabilities are among the most dangerous threats in cybersecurity. Learn how Vanguard's AI-driven detection protects against these unknown attacks.",
    category: "Security Guide",
    date: "Mar 5, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Rise of Ransomware: Prevention Strategies for 2026",
    excerpt:
      "Ransomware attacks have evolved significantly. Discover the latest trends and how Vanguard's multi-layered protection keeps your data safe.",
    category: "Threat Analysis",
    date: "Feb 28, 2026",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Vanguard 3.0: Introducing Advanced Cloud Threat Intelligence",
    excerpt:
      "We're excited to announce our latest update with enhanced cloud-based threat detection, faster scanning, and improved performance.",
    category: "Product Update",
    date: "Feb 20, 2026",
    readTime: "3 min read",
  },
  {
    id: 4,
    title: "Password Security Best Practices: Beyond the Basics",
    excerpt:
      "Strong passwords are just the start. Learn how Vanguard's integrated password manager helps you create, store, and manage secure credentials.",
    category: "Security Guide",
    date: "Feb 15, 2026",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Phishing Attacks in 2026: New Tactics and Defense Strategies",
    excerpt:
      "Phishing remains the #1 attack vector. Explore the latest phishing techniques and how Vanguard's email protection blocks these threats.",
    category: "Threat Analysis",
    date: "Feb 8, 2026",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "How AI is Revolutionizing Antivirus Protection",
    excerpt:
      "Traditional antivirus can't keep up with modern threats. Discover how machine learning and behavioral analysis power Vanguard's detection.",
    category: "Technology",
    date: "Jan 30, 2026",
    readTime: "8 min read",
  },
];

const categories = [
  "All",
  "Security Guide",
  "Threat Analysis",
  "Product Update",
  "Technology",
];

export function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <section
      id="blog"
      className="section blog"
      ref={ref}
      style={{
        padding: "var(--spacing-section) 0",
        position: "relative",
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
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            Latest Security Insights
          </h2>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              color: "var(--color-text-muted)",
              maxWidth: "520px",
              margin: "0 auto 2rem",
            }}
          >
            Stay informed about the latest cybersecurity threats, tips, and
            Vanguard product updates.
          </p>

          {/* Category Filter */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius)",
                  border: "none",
                  background:
                    activeCategory === category
                      ? "var(--color-accent)"
                      : "transparent",
                  color:
                    activeCategory === category
                      ? "#fff"
                      : "var(--color-text-muted)",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  transition: "0.2s ease",
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
            gap: "clamp(1.25rem, 3vw, 2rem)",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                style={{
                  background: "var(--color-bg-card)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div
                  style={{
                    height: "180px",
                    background:
                      "linear-gradient(135deg, var(--color-accent-soft) 0%, var(--color-bg-elevated) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.5"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  {/* Category & Date */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                      fontSize: "0.8rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        background: "var(--color-accent-soft)",
                        color: "var(--color-accent)",
                        borderRadius: "4px",
                        fontWeight: 500,
                      }}
                    >
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      margin: "0 0 0.75rem",
                      color: "var(--color-text)",
                      lineHeight: 1.4,
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.6,
                      margin: "0 0 1.5rem",
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <a
                    href="#contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "var(--color-accent)",
                      textDecoration: "none",
                      transition: "gap 0.2s ease",
                    }}
                  >
                    Read more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.4 },
            },
          }}
          style={{
            textAlign: "center",
            marginTop: "3rem",
          }}
        >
          <a
            href="#contact"
            className="btn btn-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 2rem",
              fontSize: "0.95rem",
              fontWeight: 500,
              borderRadius: "var(--radius)",
              background: "transparent",
              color: "var(--color-text)",
              textDecoration: "none",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
            }}
          >
            View All Posts
          </a>
        </motion.div>
      </div>
    </section>
  );
}
