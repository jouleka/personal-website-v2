"use client";

import React, { useCallback } from 'react';
import { Github, Instagram, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { smoothScrollTo } from '@/lib/utils';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

const socials = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jurgen-leka-31470119a/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/jou_leka', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/jou_leka/', label: 'Instagram' },
  { icon: Github, href: 'https://github.com/jouleka', label: 'GitHub' }
];

export default function Footer() {
  const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      smoothScrollTo(targetId);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <button 
              onClick={scrollToTop}
              className="text-2xl font-bold mb-4 hover:text-primary transition-colors"
            >
              <span className="text-primary">J</span>LEKA
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building things with Angular &amp; TypeScript. Probably refactoring something right now.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-6">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={smoothScroll}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Tirana, Albania</p>
              <a 
                href="mailto:lekacoding@gmail.com" 
                className="block hover:text-primary transition-colors"
              >
                lekacoding@gmail.com
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
              Social
            </h3>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jurgen Leka. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="p-2 border border-border hover:border-primary/30 hover:text-primary transition-all group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
