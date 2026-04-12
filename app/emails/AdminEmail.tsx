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
  Row,
  Column,
} from "@react-email/components";
import React from "react";

interface AdminEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const AdminEmail = ({
  name,
  email,
  subject,
  message,
}: AdminEmailProps) => (
  <Html>
    <Head />
    <Preview>System Alert: New Inbound Communication from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <div style={badge}>VANGUARD SECURE OPS</div>
          <Heading style={h1}>New Lead Captured</Heading>
          <Text style={timestamp}>Received: {new Date().toLocaleString()}</Text>
        </Section>
        
        <Section style={card}>
          <Heading style={cardHeading}>SENDER METADATA</Heading>
          <Row style={infoRow}>
            <Column style={columnLabel}><Text style={label}>Name</Text></Column>
            <Column><Text style={value}>{name}</Text></Column>
          </Row>
          <Row style={infoRow}>
            <Column style={columnLabel}><Text style={label}>Email</Text></Column>
            <Column><Link href={`mailto:${email}`} style={accentLink}>{email}</Link></Column>
          </Row>
          <Row style={infoRow}>
            <Column style={columnLabel}><Text style={label}>Subject</Text></Column>
            <Column><Text style={value}>{subject}</Text></Column>
          </Row>
        </Section>

        <Section style={messageCard}>
          <Heading style={cardHeading}>INQUIRY MESSAGE</Heading>
          <Section style={terminalShell}>
            <Text style={terminalLine}>
              <span style={terminalPrompt}>$</span> cat submission.txt
            </Text>
            <Text style={messageContent}>{message}</Text>
          </Section>
        </Section>

        <Hr style={divider} />
        
        <Section style={footer}>
          <Row>
            <Column>
              <Text style={footerText}>Vanguard AI Defensive Systems</Text>
              <Text style={footerSmall}>Internal Communication Layer</Text>
            </Column>
            <Column align="right">
              <Link href="https://vanguard-av.com/admin" style={footerAction}>Team Dashboard</Link>
            </Column>
          </Row>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#0a0c0a",
  padding: "40px 0",
  fontFamily: '"Outfit", "Inter", -apple-system, sans-serif',
};

const container = {
  backgroundColor: "#0a0c0a",
  border: "1px solid #243024",
  borderRadius: "16px",
  margin: "0 auto",
  padding: "40px",
  width: "600px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
};

const header = {
  marginBottom: "32px",
};

const badge = {
  backgroundColor: "rgba(28, 115, 4, 0.15)",
  border: "1px solid #1c7304",
  borderRadius: "4px",
  color: "#1c7304",
  display: "inline-block",
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "0.1em",
  padding: "4px 8px",
  marginBottom: "12px",
  textTransform: "uppercase" as const,
};

const h1 = {
  color: "#e2ebe0",
  fontSize: "28px",
  fontWeight: "600",
  lineHeight: "1.2",
  margin: "0",
  letterSpacing: "-0.02em",
};

const timestamp = {
  color: "#777777",
  fontSize: "12px",
  marginTop: "4px",
};

const card = {
  backgroundColor: "#111411",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "20px",
  border: "1px solid #243024",
};

const messageCard = {
  backgroundColor: "#111411",
  borderRadius: "12px",
  padding: "24px",
  border: "1px solid #243024",
};

const cardHeading = {
  color: "#777777",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.1em",
  margin: "0 0 16px 0",
};

const infoRow = {
  marginBottom: "12px",
};

const columnLabel = {
  width: "120px",
};

const label = {
  color: "#777777",
  fontSize: "13px",
  margin: "0",
};

const value = {
  color: "#e2ebe0",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const accentLink = {
  color: "#1c7304",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
};

const terminalShell = {
  backgroundColor: "#0a0c0a",
  borderRadius: "8px",
  padding: "20px",
  border: "1px solid rgba(28, 115, 4, 0.1)",
};

const terminalPrompt = {
  color: "#1c7304",
  marginRight: "8px",
};

const terminalLine = {
  color: "#777777",
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: "12px",
  margin: "0 0 12px 0",
};

const messageContent = {
  color: "#e2ebe0",
  fontFamily: '"Outfit", sans-serif',
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const divider = {
  borderColor: "#243024",
  margin: "40px 0 24px 0",
};

const footer = {
  paddingTop: "0",
};

const footerText = {
  color: "#e2ebe0",
  fontSize: "13px",
  margin: "0",
  fontWeight: "600",
};

const footerSmall = {
  color: "#777777",
  fontSize: "11px",
  marginTop: "4px",
};

const footerAction = {
  color: "#1c7304",
  fontSize: "13px",
  fontWeight: "700",
  textDecoration: "none",
};

export default AdminEmail;
