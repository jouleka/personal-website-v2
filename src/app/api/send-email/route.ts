import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { contactBodyError, contactError, limitContactDelivery, readContactBody, validateContactHeaders } from "@/lib/contact-security";

export const runtime = "nodejs";

// Sanitize name for RFC 5322 email header (remove dangerous chars)
function sanitizeName(name: string): string {
  return name
    .replace(/[\x00-\x1f\x7f]/g, "") // Remove header control characters
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
  const invalidHeaders = validateContactHeaders(req);
  if (invalidHeaders) return invalidHeaders;
  let body: unknown;
  try {
    body = JSON.parse(await readContactBody(req));
  } catch (error) {
    return contactBodyError(error);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { success: false, error: "Name, email, and message are required" },
      { status: 400 },
    );
  }

  const { name, email, message, website } = body as Record<string, unknown>;
  if (website !== undefined && typeof website !== "string") {
    return contactError(400, "Invalid request body.");
  }
  // Bots filling the hidden field get a harmless success without an email.
  if (website) return NextResponse.json({ success: true });
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
    /[\x00-\x1f\x7f]/.test(replyTo) ||
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
    const { env } = getCloudflareContext();
    // Email keys are hashes; addresses/messages are never logged or stored here.
    const limited = await limitContactDelivery(replyTo, env.CONTACT_EMAIL_LIMITER, env.CONTACT_SITE_LIMITER);
    if (limited) return limited;
  } catch {
    return contactError(503, "Message delivery is temporarily unavailable.");
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
