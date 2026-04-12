import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Img,
  Row,
  Column,
} from "@react-email/components";
import React from "react";

interface UserConfirmationEmailProps {
  name: string;
  subject: string;
  message: string;
}

export const UserConfirmationEmail = ({
  name,
  subject,
  message,
}: UserConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Inquiry Confirmed: Your message is with the Vanguard team.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logo}>VANGUARD</Text>
          <Heading style={h1}>We've Received Your Message</Heading>
          <Text style={tagline}>
            Your inquiry has been successfully queued for review by our security
            experts.
          </Text>
        </Section>

        <Section style={heroSection}>
          <Text style={heroText}>
            Hello {name}, thank you for reaching out. We're currently processing
            your request regarding <strong>"{subject}"</strong>.
          </Text>
        </Section>

        <Section style={processSection}>
          <Heading style={sectionHeading}>WHAT HAPPENS NEXT?</Heading>
          <Row style={stepRow}>
            <Column style={stepNumberCol}>
              <div style={stepNumber}>1</div>
            </Column>
            <Column>
              <Text style={stepText}>
                <strong>Validation:</strong> Our team reviews your inquiry to
                ensure it's routed to the right specialist.
              </Text>
            </Column>
          </Row>
          <Row style={stepRow}>
            <Column style={stepNumberCol}>
              <div style={stepNumber}>2</div>
            </Column>
            <Column>
              <Text style={stepText}>
                <strong>Analysis:</strong> We prepare detailed information or a
                customized proposal for you.
              </Text>
            </Column>
          </Row>
          <Row style={stepRow}>
            <Column style={stepNumberCol}>
              <div style={stepNumber}>3</div>
            </Column>
            <Column>
              <Text style={stepText}>
                <strong>Consultation:</strong> You'll receive a response from us
                within 12-24 business hours.
              </Text>
            </Column>
          </Row>
        </Section>

        <Section style={messageBackup}>
          <Heading style={sectionHeading}>YOUR MESSAGE COPY</Heading>
          <div style={backupBox}>
            <Text style={backupText}>{message}</Text>
          </div>
        </Section>

        <Section style={ctaSection}>
          <Link href="https://vanguard-av.net" style={button}>
            Visit Our Website
          </Link>
        </Section>

        <Hr style={divider} />

        <Section style={footer}>
          <Text style={footerBrand}>VANGUARD AI-POWERED SECURITY</Text>
          <Text style={footerCopyright}>
            © {new Date().getFullYear()} Vanguard AV Team. All rights reserved.
          </Text>
          <div style={socialLinks}>
            <Link
              href="https://www.linkedin.com/company/vanguard-av/?viewAsMember=true"
              style={socialLink}
            >
              LinkedIn
            </Link>
            <span style={dot}>•</span>
            <Link
              href="https://www.facebook.com/profile.php?id=61585750076884"
              style={socialLink}
            >
              Facebook
            </Link>
            <span style={dot}>•</span>
            <Link
              href="https://www.instagram.com/vanguard_antivirus/"
              style={socialLink}
            >
              Instagram
            </Link>
            <span style={dot}>•</span>
            <Link href="https://x.com/vanguard_AV" style={socialLink}>
              Twitter - X
            </Link>
            <span style={dot}>•</span>
            <Link href="https://vanguard-av.net" style={socialLink}>
              Website
            </Link>
          </div>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#050705",
  padding: "40px 0",
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: "#0a0c0a",
  border: "1px solid #1a221a",
  borderRadius: "20px",
  margin: "0 auto",
  padding: "48px",
  width: "600px",
  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
};

const header = {
  textAlign: "center" as const,
  marginBottom: "40px",
};

const logo = {
  color: "#22c55e",
  fontSize: "14px",
  fontWeight: "800",
  letterSpacing: "0.2em",
  margin: "0 0 16px 0",
};

const h1 = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.2",
  margin: "0 0 12px 0",
  letterSpacing: "-0.02em",
};

const tagline = {
  color: "#4a554a",
  fontSize: "15px",
  lineHeight: "1.5",
  margin: "0 auto",
  maxWidth: "400px",
};

const heroSection = {
  backgroundColor: "#111611",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "32px",
  border: "1px solid #1a221a",
};

const heroText = {
  color: "#e0e0e0",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0",
};

const processSection = {
  marginBottom: "32px",
};

const sectionHeading = {
  color: "#4a554a",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.15em",
  margin: "0 0 20px 0",
};

const stepRow = {
  marginBottom: "16px",
};

const stepNumberCol = {
  width: "40px",
};

const stepNumber = {
  backgroundColor: "#22c55e",
  borderRadius: "50%",
  color: "#050705",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "800",
  height: "24px",
  width: "24px",
  textAlign: "center" as const,
  lineHeight: "24px",
};

const stepText = {
  color: "#b0b0b0",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0",
};

const messageBackup = {
  marginBottom: "40px",
};

const backupBox = {
  backgroundColor: "#050705",
  borderRadius: "8px",
  padding: "20px",
  border: "1px solid #1a221a",
};

const backupText = {
  color: "#808080",
  fontSize: "14px",
  lineHeight: "1.6",
  fontStyle: "italic",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const ctaSection = {
  textAlign: "center" as const,
  marginBottom: "40px",
};

const button = {
  backgroundColor: "#22c55e",
  borderRadius: "8px",
  color: "#050705",
  display: "inline-block",
  fontSize: "15px",
  fontWeight: "700",
  padding: "14px 28px",
  textDecoration: "none",
};

const divider = {
  borderColor: "#1a221a",
  margin: "0 0 32px 0",
};

const footer = {
  textAlign: "center" as const,
};

const footerBrand = {
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.05em",
  margin: "0 0 8px 0",
};

const footerCopyright = {
  color: "#4a554a",
  fontSize: "11px",
  margin: "0 0 16px 0",
};

const socialLinks = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const socialLink = {
  color: "#22c55e",
  fontSize: "12px",
  textDecoration: "none",
};

const dot = {
  color: "#1a221a",
  padding: "0 8px",
};

export default UserConfirmationEmail;
