"use client";
import { useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Reveal, MagneticLink } from "./motion-system";
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const curve = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("lekacoding@gmail.com");
      setCopied(true);
      setCopyError("");
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(
        "You can copy the address above or open it in your email app.",
      );
    }
  }
  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error("Delivery unavailable");
      setStatus("Sent. I’ll get back to you soon.");
      form.reset();
    } catch {
      setStatus(
        "Email delivery is unavailable right now. Your message is still here—please email me directly.",
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <motion.div
        className="contact-curve"
        aria-hidden="true"
        style={{ scaleY: curve }}
      />
      <div className="page-width">
        <Reveal className="contact-heading">
          <span className="eyebrow">04 / Got something good?</span>
          <h2>
            Let&apos;s build
            <br />
            <em>something.</em>
          </h2>
          <MagneticLink
            className="contact-orbit"
            href="mailto:lekacoding@gmail.com"
            label="Email Jurgen"
          >
            <ArrowUpRight size={43} />
            <span>Get in touch</span>
          </MagneticLink>
        </Reveal>
        <div className="contact-grid">
          <div className="contact-copy">
            <p>
              Need an engineer? Have a project? Found a bug on this very
              website? My inbox is open.
            </p>
            <div className="email-line">
              <a href="mailto:lekacoding@gmail.com">lekacoding@gmail.com</a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
            <span className="copy-status" role="status">
              {copied ? "Copied. Your move." : copyError}
            </span>
            <div className="contact-location">
              <span className="status-dot" />
              <span>
                Based in Europe
                <br />
                <small>Available for remote projects.</small>
              </span>
            </div>
          </div>
          <form
            onSubmit={sendMessage}
            className="contact-form"
            aria-label="Send Jurgen a message"
          >
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="What should I call you?"
                  required
                  maxLength={100}
                  disabled={sending}
                />
              </label>
              <label>
                Your email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Where can I reply?"
                  required
                  maxLength={254}
                  disabled={sending}
                />
              </label>
            </div>
            <label>
              What are you thinking?
              <textarea
                name="message"
                placeholder="Give me the short version."
                rows={3}
                required
                maxLength={5000}
                disabled={sending}
              />
            </label>
            <div className="form-bottom">
              <span>Straight to my inbox.</span>
              <button className="send-button" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send message"}
                <ArrowUpRight size={18} />
              </button>
            </div>
            <p className="form-status" role="status">
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
