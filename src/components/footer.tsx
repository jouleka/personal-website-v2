"use client";

import React, { useCallback } from 'react';
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { smoothScrollTo } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      smoothScrollTo(targetId);
    }
  }, []);

  return (
    <footer className="relative border-t border-primary/10">
      {/* Designer Bait: Layered Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/[0.03] rounded-[100%] blur-[120px] animate-pulse" />
        <div className="absolute -top-[250px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/[0.02] rounded-[100%] blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Developer Bait: Binary Rain */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
          <div className="binary-rain font-mono text-[10px] select-none">
            {Array(10).fill('01').join(' ')}
          </div>
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-12">
        {/* Client Bait: Clean Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Navigation */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-lg font-playfair font-bold flex items-center gap-2">
              <span className="inline-block w-8 h-[2px] bg-primary/40" />
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <a href="#about" onClick={smoothScroll} className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1">About</a>
              <a href="#expertise" onClick={smoothScroll} className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1">Experience</a>
              <a href="#portfolio" onClick={smoothScroll} className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1">Portfolio</a>
              <a href="#contact" onClick={smoothScroll} className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1">Contact</a>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-lg font-playfair font-bold flex items-center gap-2">
              <span className="inline-block w-8 h-[2px] bg-primary/40" />
              Contact
            </h3>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground hover:text-primary transition-all cursor-default group">
                <span className="font-mono text-xs text-primary/40 group-hover:text-primary/60">$</span> Tirana, Albania
              </p>
              <p className="text-sm text-muted-foreground hover:text-primary transition-all cursor-default group">
                <span className="font-mono text-xs text-primary/40 group-hover:text-primary/60">@</span> lekacoding@gmail.com
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-lg font-playfair font-bold flex items-center gap-2">
              <span className="inline-block w-8 h-[2px] bg-primary/40" />
              Social
            </h3>
            <div className="flex items-center gap-6">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/jurgen-leka-31470119a/', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://x.com/jou_leka', label: 'Twitter' },
                { icon: Instagram, href: 'https://www.instagram.com/jou_leka/?hl=en', label: 'Instagram' },
                { icon: Github, href: 'https://github.com/jouleka', label: 'GitHub' }
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 hover:text-primary transition-all hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/10">
          <p className="text-sm text-center text-muted-foreground group cursor-default">
            <span className="font-mono text-primary/40 group-hover:text-primary/60">{"/* "}</span>
            &copy; {currentYear} J. Leka. All rights reserved.
            <span className="font-mono text-primary/40 group-hover:text-primary/60">{" */"}</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .binary-rain {
          animation: rain 20s linear infinite;
          transform: translateY(-50%);
        }
        @keyframes rain {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </footer>
  );
} 