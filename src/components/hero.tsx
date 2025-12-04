"use client";

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
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
      {/* Large background text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <span className="text-[20vw] font-bold text-foreground/[0.02] dark:text-foreground/[0.03] tracking-tighter whitespace-nowrap">
          DEVELOPER
        </span>
      </motion.div>

      {/* Geometric accent shapes */}
      <motion.div 
        className="absolute top-1/4 right-[10%] w-32 h-32 md:w-64 md:h-64 border border-primary/20 rotate-45"
        initial={{ opacity: 0, scale: 0.8, rotate: 30 }}
        animate={{ opacity: 1, scale: 1, rotate: 45 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-[5%] w-16 h-16 md:w-24 md:h-24 bg-primary/10 rotate-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      />
      
      {/* Main content - Asymmetric layout */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-screen py-32">
          
          {/* Left column - Main text */}
          <div className="lg:col-span-7 lg:col-start-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block text-sm font-mono text-primary mb-6 tracking-wider">
                FULL STACK JAVASCRIPT DEVELOPER
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="block">Jurgen</span>
              <span className="block text-primary">Leka</span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I build web apps with Angular &amp; TypeScript. Currently making multi-tenant platforms less painful.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
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
            </motion.div>
          </div>

          {/* Right column - Stats/Info card */}
          <motion.div 
            className="lg:col-span-4 lg:col-start-9"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <button
          onClick={(e) => smoothScroll(e)}
          data-target="about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-xs font-mono tracking-wider">SCROLL</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
