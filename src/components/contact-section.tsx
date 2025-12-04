"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Instagram, Linkedin, Twitter, Github, ArrowUpRight } from 'lucide-react';

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const controls = useAnimation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isSuccess || error) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, error]);

  const startAnimation = useCallback(() => {
    controls.start("visible");
  }, [controls]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [startAnimation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setIsSuccess(false);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError('Failed to send email. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const socials = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/jurgen-leka-31470119a/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/jou_leka', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/jou_leka/', label: 'Instagram' },
    { icon: Github, href: 'https://github.com/jouleka', label: 'GitHub' }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          {/* Section Header */}
          <motion.div 
            className="mb-20"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <span className="text-sm font-mono text-primary mb-4 block">04 — CONTACT</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Say<br />
              <span className="text-primary">hello</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Info */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="space-y-8"
            >
              <p className="text-xl text-muted-foreground leading-relaxed">
                Got a project? Need help with Angular? Just want to chat about code?
                Drop me a line — I don&apos;t bite.
              </p>

              {/* Contact Details */}
              <div className="space-y-4">
                <a 
                  href="mailto:lekacoding@gmail.com"
                  className="group flex items-center gap-4 p-4 bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="p-3 bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                    <p className="group-hover:text-primary transition-colors">lekacoding@gmail.com</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>

                <div className="flex items-center gap-4 p-4 bg-card border border-border">
                  <div className="p-3 bg-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                    <p>Tirana, Albania</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-border">
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">Connect</h3>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-card border border-border hover:border-primary/30 hover:text-primary transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.form 
              onSubmit={handleSubmit} 
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 bg-card border border-border focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-card border border-border focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-card border border-border focus:border-primary/50 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 p-3"
                  >
                    {error}
                  </motion.p>
                )}
                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-green-500 bg-green-500/10 border border-green-500/20 p-3"
                  >
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
