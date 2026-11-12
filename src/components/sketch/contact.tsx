"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { Circled, Eyebrow, Reveal } from "./ink";

const EMAIL = "lekacoding@gmail.com";

type Stage = "writing" | "sending" | "flying" | "sent";

function PaperPlane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden="true" filter="url(#rough)">
      <path d="M4 40 L116 6 L70 84 L52 54 Z" fill="var(--paper-hi)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M116 6 L52 54 L46 76 L62 62" fill="var(--sky)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

export default function Contact() {
  const [stage, setStage] = useState<Stage>("writing");
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setCopyError("");
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError("You can copy the address above or open it in your email app.");
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStage("sending");
    setStatus("");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const result = await response.json();
      if (response.status === 429) {
        setStatus("A few messages came through at once. Please wait a minute and try again.");
        setStage("writing");
        return;
      }
      if (!response.ok || !result || typeof result !== "object" || !("success" in result) || result.success !== true)
        throw new Error("Delivery unavailable");
      setStage("flying");
      window.setTimeout(() => setStage("sent"), 1700);
    } catch {
      setStatus("Email delivery is unavailable right now. Your message is still here, so please email me directly.");
      setStage("writing");
    }
  }

  const sending = stage === "sending";

  return (
    <section id="contact" className="contact">
      <div className="page-width">
        <Reveal className="contact__head">
          <Eyebrow n="04">Got something good?</Eyebrow>
          <h2>
            Let&apos;s build <Circled color="var(--sun)">something.</Circled>
          </h2>
          <p>
            Need an engineer? Got a wild idea? Found a bug on this very website
            (rude, but fair)? Write me a letter. It folds itself into a paper
            plane and flies straight to my inbox.
          </p>
          <div className="contact__email">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button type="button" onClick={copyEmail} aria-label="Copy email address">
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <span className="contact__copied" role="status">
            {copied ? "Copied. Your move." : copyError}
          </span>
          <p className="contact__where">
            <span className="pulse" aria-hidden="true" /> Based in Europe. Available for remote projects.
          </p>
        </Reveal>

        <div className="contact__desk">
          <AnimatePresence mode="wait">
            {stage !== "flying" && stage !== "sent" ? (
              <motion.form
                key="letter"
                onSubmit={sendMessage}
                className="letter"
                aria-label="Send Jurgen a message"
                initial={{ opacity: 0, rotate: -2, y: 30 }}
                animate={{ opacity: 1, rotate: -1, y: 0 }}
                exit={{
                  scaleY: [1, 0.5, 0.15],
                  scaleX: [1, 0.85, 0.3],
                  rotate: [-1, 4, 12],
                  opacity: [1, 1, 0],
                  transition: { duration: 0.5, ease: "easeIn" },
                }}
              >
                <div hidden aria-hidden="true">
                  <label>
                    Leave this field blank
                    <input name="website" autoComplete="off" tabIndex={-1} />
                  </label>
                </div>
                <span className="letter__stamp" aria-hidden="true">
                  <span>JL</span>
                  <small>air mail</small>
                </span>
                <p className="letter__greeting">Dear Jurgen,</p>
                <label className="letter__body">
                  <span className="sr-only">What are you thinking?</span>
                  <textarea
                    name="message"
                    placeholder="I have this idea… (the short version is fine)"
                    rows={5}
                    required
                    maxLength={5000}
                    disabled={sending}
                  />
                </label>
                <div className="letter__sign">
                  <span className="letter__cheers">Cheers,</span>
                  <label>
                    <span className="sr-only">Your name</span>
                    <input
                      name="name"
                      autoComplete="name"
                      placeholder="your name"
                      required
                      maxLength={100}
                      disabled={sending}
                    />
                  </label>
                  <label className="letter__reply">
                    <span>reply to</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@somewhere.com"
                      required
                      maxLength={254}
                      disabled={sending}
                      aria-label="Your email"
                    />
                  </label>
                </div>
                <div className="letter__foot">
                  <p className="letter__status" role="status">
                    {status || "Straight to my inbox. No newsletters, promise."}
                  </p>
                  <button className="btn btn--tomato" type="submit" disabled={sending}>
                    {sending ? "Folding…" : "Fold & send"} <Send size={17} />
                  </button>
                </div>
              </motion.form>
            ) : stage === "flying" ? (
              <motion.div
                key="plane"
                className="plane-flight"
                initial={{ x: "-10%", y: 60, rotate: 10, scale: 0.6 }}
                animate={{
                  x: ["-10%", "20%", "55%", "130%"],
                  y: [60, -40, 30, -260],
                  rotate: [10, -15, 8, -25],
                  scale: [0.6, 1, 0.9, 0.7],
                }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              >
                <PaperPlane className="plane-flight__plane" />
              </motion.div>
            ) : (
              <motion.div
                key="sent"
                className="sent"
                role="status"
                initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
              >
                <PaperPlane className="sent__plane" />
                <h3>Plane’s in the air!</h3>
                <p>Your message is on its way. I’ll get back to you soon.</p>
                <button type="button" className="btn btn--paper" onClick={() => setStage("writing")}>
                  Write another <ArrowUpRight size={17} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
