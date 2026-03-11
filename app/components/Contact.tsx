import { useState, useRef } from "react";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setSubmitStatus("success");

    formRef.current?.reset();

    setTimeout(() => {
      setSubmitStatus("idle");
    }, 2500);
  };

  return (
    <section
      id="contact"
      className="section contact"
      role="region"
      aria-labelledby="contact-heading"
      style={{
        padding: "var(--spacing-section) 0",
        position: "relative",
        minHeight: "clamp(600px, 100vh, 700px)",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          insetInlineStart: 0,
          insetInlineEnd: 0,
          bottom: 0,
          background: "url(/assets/CardFade.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          opacity: 0.8,
          insetInlineStart: 0,
          insetInlineEnd: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, rgba(10, 12, 10, 0.9) 0%, rgba(10, 12, 10, 0.95) 100%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <h2
          id="contact-heading"
          className="main-heading"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 600,
            marginBlockEnd: "2rem",
            letterSpacing: "-0.02em",
            textAlign: "center",
            color: "var(--color-text)",
          }}
        >
          Contact Us
        </h2>

        <p
          style={{
            fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
            color: "var(--color-text-muted)",
            maxWidth: "clamp(280px, 90vw, 520px)",
            marginInline: "auto",
            marginBlockEnd: "2rem",
            textAlign: "center",
          }}
        >
          Questions about Vanguard, licensing, or need help? Get in touch.
        </p>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {isSubmitting
            ? "Submitting your message..."
            : submitStatus === "success"
              ? "Your message has been sent successfully!"
              : submitStatus === "error"
                ? "Failed to send message. Please try again."
                : ""}
        </div>

        <div
          style={{
            maxWidth: "clamp(280px, 90vw, 600px)",
            marginInline: "auto",
            background: "var(--color-bg-card)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            padding: "clamp(1.5rem, 5vw, 2.5rem)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div style={{ marginBlockEnd: "1.25rem" }}>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  marginBlockEnd: "0.5rem",
                  fontWeight: 500,
                  color: "var(--color-text)",
                }}
              >
                Your Name <span aria-hidden="true">*</span>
                <span className="sr-only"> (required)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                aria-required="true"
                placeholder="Your name"
                autoComplete="name"
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  fontSize: "clamp(1rem, 2vw, 1rem)",
                  fontFamily: "var(--font-sans)",
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                  color: "var(--color-text)",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  boxSizing: "border-box",
                  minHeight: "44px",
                }}
              />
            </div>

            <div style={{ marginBlockEnd: "1.25rem" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBlockEnd: "0.5rem",
                  fontWeight: 500,
                  color: "var(--color-text)",
                }}
              >
                Email Address <span aria-hidden="true">*</span>
                <span className="sr-only"> (required)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                aria-required="true"
                placeholder="you@company.com"
                autoComplete="email"
                inputMode="email"
                style={{
                  width: "100%",
                  padding: "clamp(0.75rem, 3vw, 1rem) clamp(1rem, 4vw, 1.25rem)",
                  fontSize: "clamp(1rem, 2vw, 1rem)",
                  fontFamily: "var(--font-sans)",
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                  color: "var(--color-text)",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  boxSizing: "border-box",
                  minHeight: "44px",
                }}
              />
            </div>

            <div style={{ marginBlockEnd: "1.25rem" }}>
              <label
                htmlFor="subject"
                style={{
                  display: "block",
                  marginBlockEnd: "0.5rem",
                  fontWeight: 500,
                  color: "var(--color-text)",
                }}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Sales, support, or feedback"
                autoComplete="off"
                style={{
                  width: "100%",
                  padding: "clamp(0.75rem, 3vw, 1rem) clamp(1rem, 4vw, 1.25rem)",
                  fontSize: "clamp(1rem, 2vw, 1rem)",
                  fontFamily: "var(--font-sans)",
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                  color: "var(--color-text)",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  boxSizing: "border-box",
                  minHeight: "44px",
                }}
              />
            </div>

            <div style={{ marginBlockEnd: "1.5rem" }}>
              <label
                htmlFor="message"
                style={{
                  display: "block",
                  marginBlockEnd: "0.5rem",
                  fontWeight: 500,
                  color: "var(--color-text)",
                }}
              >
                Message <span aria-hidden="true">*</span>
                <span className="sr-only"> (required)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                placeholder="Your question or message..."
                style={{
                  width: "100%",
                  padding: "clamp(0.75rem, 3vw, 1rem) clamp(1rem, 4vw, 1.25rem)",
                  fontSize: "clamp(1rem, 2vw, 1rem)",
                  fontFamily: "var(--font-sans)",
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                  color: "var(--color-text)",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  boxSizing: "border-box",
                  resize: "vertical",
                  minBlockSize: "120px",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "1rem 1.5rem",
                fontSize: "clamp(0.95rem, 2vw, 1rem)",
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                borderRadius: "var(--radius)",
                background:
                  submitStatus === "success"
                    ? "var(--color-success)"
                    : "var(--color-accent)",
                color: "#fff",
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "background 0.2s ease, opacity 0.2s ease",
                opacity: isSubmitting ? 0.7 : 1,
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isSubmitting
                ? "Sending..."
                : submitStatus === "success"
                  ? "Message sent!"
                  : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
