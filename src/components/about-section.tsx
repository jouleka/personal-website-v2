"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AboutSection: React.FC = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-background text-foreground overflow-hidden">
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
            <span className="text-sm font-mono text-primary mb-4 block">01 — ABOUT</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Writing code that<br />
              <span className="text-primary">actually works</span>
            </h2>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column - Bio */}
            <motion.div
              className="lg:col-span-7 space-y-8"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                I&apos;m a Full Stack JavaScript Developer who&apos;s been deep in the Angular/TypeScript 
                ecosystem for 4+ years. I enjoy turning messy legacy code into something maintainable.
              </p>
              
              <p className="text-lg text-muted-foreground/80 leading-relaxed">
                Most of my work has been remote, building everything from multi-tenant platforms 
                to e-learning systems. I care about clean architecture, reactive patterns, and 
                shipping code that doesn&apos;t wake anyone up at 3am. Currently based in Albania, 
                working with teams across Europe and the US.
              </p>

              <div className="pt-8 border-t border-border">
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <span className="text-4xl md:text-5xl font-bold text-primary">4+</span>
                    <p className="text-sm text-muted-foreground mt-2">Years<br />Shipping</p>
                  </div>
                  <div>
                    <span className="text-4xl md:text-5xl font-bold text-primary">100%</span>
                    <p className="text-sm text-muted-foreground mt-2">Remote<br />Experience</p>
                  </div>
                  <div>
                    <span className="text-4xl md:text-5xl font-bold text-primary">∞</span>
                    <p className="text-sm text-muted-foreground mt-2">Coffee<br />Consumed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Details */}
            <motion.div
              className="lg:col-span-5 space-y-8"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              {/* What I Do */}
              <div className="bg-card border border-border p-8 relative">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary -translate-y-1 -translate-x-1" />
                
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">
                  Day to Day
                </h3>
                
                <ul className="space-y-4">
                  {[
                    'Building Angular apps that scale',
                    'Refactoring legacy code without breaking things',
                    'Setting up monorepos & CI/CD pipelines',
                    'Hunting down performance bottlenecks',
                    'Making state management less painful'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary font-mono text-sm">0{index + 1}</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div className="bg-card border border-border p-8">
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                  Education
                </h3>
                <p className="font-medium mb-1">Bachelor&apos;s in Computer Engineering</p>
                <p className="text-sm text-muted-foreground">Canadian Institute of Technology</p>
                <p className="text-sm text-muted-foreground">2018 — 2021 · GPA: 3.8/4.0</p>
              </div>

              {/* Languages */}
              <div className="bg-card border border-border p-8">
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                  Languages
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Albanian</span>
                    <span className="text-primary ml-2">Native</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">English</span>
                    <span className="text-primary ml-2">C1/C2</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Italian</span>
                    <span className="text-primary ml-2">B2/C1</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">German</span>
                    <span className="text-primary ml-2">A2/B1</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
