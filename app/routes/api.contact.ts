import { data, type ActionFunctionArgs } from "react-router";
import { sendContactEmail } from "../utils/mailer.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return data({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const subject = formData.get("subject")?.toString();
    const message = formData.get("message")?.toString();

    if (!name || !email || !message) {
      return data({ error: "Missing required fields" }, { status: 400 });
    }

    await sendContactEmail({
      name,
      email,
      subject: subject || "No Subject",
      message,
    });

    return data({ success: true });
  } catch (error) {
    console.error("Email API Error:", error);
    return data(
      { error: "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}
