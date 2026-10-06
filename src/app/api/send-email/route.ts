import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// Sanitize name for RFC 5322 email header (remove dangerous chars)
function sanitizeName(name: string): string {
  return name
    .replace(/[\r\n]/g, "") // Remove newlines (header injection)
    .replace(/[<>"]/g, "") // Remove angle brackets and quotes
    .trim()
    .slice(0, 100); // Limit length
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { success: false, error: "Name, email, and message are required" },
      { status: 400 },
    );
  }

  const { name, email, message } = body as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    name.length > 100 ||
    email.length > 254 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { success: false, error: "Invalid name, email, or message" },
      { status: 400 },
    );
  }

  const safeName = sanitizeName(name);
  const replyTo = email.trim();
  const messageText = message.trim();
  if (
    !safeName ||
    !messageText ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(replyTo)
  ) {
    return NextResponse.json(
      { success: false, error: "Enter a name, valid email, and message" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.EMAIL_TO;

  if (!apiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      { success: false, error: "Email service is not configured" },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${safeName} <${fromEmail}>`,
      to: toEmail,
      replyTo,
      subject: `New message from ${safeName}`,
      text: `From: ${safeName} <${replyTo}>\n\n${messageText}`,
      html: `<p><strong>From:</strong> ${escapeHtml(safeName)} &lt;${escapeHtml(replyTo)}&gt;</p>
             <p><strong>Message:</strong></p>
             <p>${escapeHtml(messageText).replace(/\r?\n/g, "<br>")}</p>`,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 },
    );
  }
}
