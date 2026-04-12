import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { AdminEmail } from "../emails/AdminEmail";
import { UserConfirmationEmail } from "../emails/UserConfirmationEmail";
import React from "react";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface ContactEmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailParams) {
  const fromName = process.env.SMTP_FROM_NAME || "Vanguard AU";
  const fromEmail = process.env.SMTP_USER;

  // 1. Send email to Admin
  const adminHtml = await render(
    React.createElement(AdminEmail, { name, email, subject, message })
  );

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: process.env.SMTP_USER, // Admin email
    replyTo: email,
    subject: `New Contact Submission: ${subject}`,
    html: adminHtml,
  });

  // 2. Send confirmation to User
  const userHtml = await render(
    React.createElement(UserConfirmationEmail, { name, subject, message })
  );

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: email,
    subject: `We received your message: ${subject}`,
    html: userHtml,
  });
}
