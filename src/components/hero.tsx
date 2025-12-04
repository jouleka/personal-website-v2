"use client";

import React, { useCallback } from 'react';
import { ArrowDown } from 'lucide-react';
import { smoothScrollTo } from '@/lib/utils';

const Hero: React.FC = () => {
  const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('data-target') || 
                     e.currentTarget.getAttribute('href')?.replace('#', '');
    if (targetId) {
      smoothScrollTo(targetId);
    }
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center bg-background text-foreground overflow-hidden noise-overlay"
    >
      {/* Large background text - CSS animation */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden animate-fade-in-slow"
      >
        <span className="text-[20vw] font-bold text-foreground/[0.02] dark:text-foreground/[0.03] tracking-tighter whitespace-nowrap">
          DEVELOPER
        </span>
      </div>

      {/* Geometric accent shapes - CSS animations */}
      <div 
        className="absolute top-1/4 right-[10%] w-32 h-32 md:w-64 md:h-64 border border-primary/20 rotate-45 animate-fade-scale-in"
        style={{ animationDelay: '0.3s' }}
      />
      <div 
        className="absolute bottom-1/4 left-[5%] w-16 h-16 md:w-24 md:h-24 bg-primary/10 rotate-12 animate-fade-up"
        style={{ animationDelay: '0.5s' }}
      />
      
      {/* Main content - Asymmetric layout */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-screen py-32">
          
          {/* Left column - Main text - LCP CRITICAL: No opacity:0, immediate render */}
          <div className="lg:col-span-7 lg:col-start-1">
            <div className="animate-fade-up" style={{ animationDelay: '0.05s' }}>
              <span className="inline-block text-sm font-mono text-primary mb-6 tracking-wider">
                FULL STACK JAVASCRIPT DEVELOPER
              </span>
            </div>

            {/* LCP Element - Renders immediately, no delay */}
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter mb-8 animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="block">Jurgen</span>
              <span className="block text-primary">Leka</span>
            </h1>

            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed mb-12 animate-fade-up"
              style={{ animationDelay: '0.15s' }}
            >
              I build web apps with Angular &amp; TypeScript. Currently making multi-tenant platforms less painful.
            </p>

            <div
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              <a
                href="#portfolio"
                onClick={smoothScroll}
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                See What I&apos;ve Built
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                onClick={smoothScroll}
                className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 text-sm font-medium hover:border-foreground/40 hover:bg-foreground/5 transition-all"
              >
                Say Hello
              </a>
            </div>
          </div>

          {/* Right column - Stats/Info card */}
          <div 
            className="lg:col-span-4 lg:col-start-9 animate-fade-in-right"
            style={{ animationDelay: '0.25s' }}
          >
            <div className="bg-card border border-border p-8 relative">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary -translate-y-1 translate-x-1" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Status</span>
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Available
                  </span>
                </div>
                
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Location</span>
                  <span className="text-sm">Europe</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Experience</span>
                  <span className="text-sm">4+ Years</span>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-3">Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {['Angular', 'TypeScript', 'RxJS', 'Node.js'].map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs px-2 py-1 bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up"
        style={{ animationDelay: '0.6s' }}
      >
        <button
          onClick={(e) => smoothScroll(e)}
          data-target="about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-xs font-mono tracking-wider">SCROLL</span>
          <div className="animate-bounce-subtle">
            <ArrowDown className="w-4 h-4" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
