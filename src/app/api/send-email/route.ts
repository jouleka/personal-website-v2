import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Sanitize name for RFC 5322 email header (remove dangerous chars)
function sanitizeName(name: string): string {
  return name
    .replace(/[\r\n]/g, '') // Remove newlines (header injection)
    .replace(/[<>"]/g, '')  // Remove angle brackets and quotes
    .trim()
    .slice(0, 100);         // Limit length
}

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  const safeName = sanitizeName(name);

  try {
    const { error } = await resend.emails.send({
      from: `${safeName} <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.EMAIL_TO!,
      replyTo: email,
      subject: `New message from ${safeName}`,
      text: `From: ${safeName} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${safeName} &lt;${email}&gt;</p>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    if (error) {
      return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}