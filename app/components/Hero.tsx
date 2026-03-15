import { motion, useScroll, useTransform } from "framer-motion";
import HexagonBackground from "./HexagonBackground";

export function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className="hero section"
      role="region"
      aria-labelledby="hero-heading"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBlockStart: "clamp(3.5rem, 10vh, 5rem)",
        paddingBlockEnd: "clamp(2rem, 5vh, 4rem)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @media (max-width: 480px) {
          .hero-cta {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1rem !important;
          }
          .hero-cta .btn {
            width: 100% !important;
            min-height: 52px !important;
          }
          .scroll-hint {
            display: none !important;
          }
        }

        @keyframes flame-glow {
          0%, 100% {
            color: #1c7304;
            text-shadow: 0 0 20px #1c7304, 0 0 40px rgba(28, 115, 4, 0.6);
          }
          33% {
            color: #2ea309;
            text-shadow: 0 0 25px #2ea309, 0 0 50px rgba(46, 163, 9, 0.8);
          }
          66% {
            color: #35c20b;
            text-shadow: 0 0 30px #35c20b, 0 0 60px rgba(53, 194, 11, 0.9), 0 0 10px rgba(255, 255, 255, 0.4);
          }
        }
        .text-flame {
          animation: flame-glow 4s infinite alternate ease-in-out;
          display: inline-block;
        }
      `}</style>
      <motion.div
        style={{
          position: "absolute",
          top: "10%",
          insetInlineStart: "5%",
          width: "clamp(150px, 30vw, 300px)",
          height: "clamp(150px, 30vw, 300px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(28, 115, 4, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          y: y1,
        }}
        aria-hidden="true"
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "10%",
          insetInlineEnd: "10%",
          width: "clamp(200px, 40vw, 400px)",
          height: "clamp(200px, 40vw, 400px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(28, 115, 4, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          y: y2,
        }}
        aria-hidden="true"
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(28, 115, 4, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(28, 115, 4, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "clamp(30px, 5vw, 50px) clamp(30px, 5vw, 50px)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div
        className="hero-bg"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <HexagonBackground contained />
      </div>

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "0.03em",
            margin: "0 0 1.25rem",
            color: "#fff",
            textShadow:
              "0 0 20px #1c7304, 0 0 40px rgba(28, 115, 4, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Guardians Of The Digital{" "}
          <span className="text-flame">Frontier.</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            color: "var(--color-text-muted)",
            maxWidth: "clamp(280px, 85vw, 480px)",
            marginInline: "auto",
            marginBlockEnd: "2.5rem",
            lineHeight: 1.7,
          }}
        >
          Next-gen antivirus built with AI — real-time threat detection,
          zero-day protection, and peace of mind for your devices.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{
            display: "flex",
            gap: "clamp(0.75rem, 2vw, 1rem)",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBlockStart: "2.5rem",
            width: "100%",
          }}
        >
          <a
            href="#contact"
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.875rem 2rem",
              fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
              fontWeight: 600,
              borderRadius: "var(--radius)",
              background: "var(--color-accent)",
              color: "#fff",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s ease",
              minHeight: "48px",
              letterSpacing: "0.01em",
            }}
          >
            Get Vanguard
          </a>
          <a
            href="#features"
            className="btn btn-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.875rem 2rem",
              fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
              fontWeight: 500,
              borderRadius: "var(--radius)",
              background: "transparent",
              color: "var(--color-text)",
              textDecoration: "none",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
              transition: "0.2s ease",
              minHeight: "48px",
            }}
          >
            See how it works
          </a>
        </motion.div>
      </div>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          insetInlineStart: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--color-text-muted)",
          fontSize: "0.8rem",
          fontWeight: 500,
        }}
        aria-hidden="true"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, var(--color-border), transparent)",
            borderRadius: "1px",
          }}
        />
      </motion.div>
    </section>
  );
}
