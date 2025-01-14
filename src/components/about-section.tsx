"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AboutSection: React.FC = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [typeIndex, setTypeIndex] = useState(0);
  const roles = [
    "Software Architect",
    "System Designer",
    "Code Craftsman",
    "> sudo make impact"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTypeIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto relative"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
          }}
        >
          {/* Matrix-like Background */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.03] select-none pointer-events-none">
            <div className="font-mono text-xs leading-none whitespace-pre text-primary">
              {Array(50).fill('01').join(' ')}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative">
            {/* Left Column */}
            <motion.div
              className="space-y-8"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <div className="space-y-4">
                <motion.p 
                  className="font-mono text-sm text-primary/60"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                >
                  {roles[typeIndex]}<span className="animate-pulse">_</span>
                </motion.p>
                <motion.p 
                  className="text-5xl md:text-6xl font-playfair"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  Crafting
                </motion.p>
                <motion.p 
                  className="text-6xl md:text-7xl font-playfair text-primary"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  Excellence
                </motion.p>
              </div>

              <motion.div 
                className="h-px w-24 bg-primary/20"
                variants={{
                  hidden: { width: 0 },
                  visible: { width: 96 }
                }}
                transition={{ duration: 1 }}
              />

              <motion.div 
                className="font-mono text-sm space-y-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                <p className="text-primary/60">const approach = {`{`}</p>
                <p className="pl-4">vision: <span className="text-primary">&quot;architectural thinking&quot;</span>,</p>
                <p className="pl-4">execution: <span className="text-primary">&quot;pixel-perfect precision&quot;</span>,</p>
                <p className="pl-4">standard: <span className="text-primary">&quot;excellence || nothing&quot;</span></p>
                <p className="text-primary/60">{`}`};</p>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              className="space-y-12"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <div className="relative">
                <div className="space-y-8">
                  <div className="relative pl-8 border-l-2 border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-primary/60">01</span>
                      <p className="text-2xl font-light">Transforming complexity into clarity</p>
                    </div>
                    <p className="text-sm text-muted-foreground/60 font-mono">git commit -m &quot;refactor: enhanced system architecture&quot;</p>
                    <span className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary/20" />
                  </div>
                  <div className="relative pl-8 border-l-2 border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-primary/60">02</span>
                      <p className="text-2xl font-light">Building systems that define standards</p>
                    </div>
                    <p className="text-sm text-muted-foreground/60 font-mono">git commit -m &quot;feat: implemented next-gen architecture&quot;</p>
                    <span className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary/20" />
                  </div>
                  <div className="relative pl-8 border-l-2 border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-primary/60">03</span>
                      <p className="text-2xl font-light">Creating experiences that leave marks</p>
                    </div>
                    <p className="text-sm text-muted-foreground/60 font-mono">git commit -m &quot;perf: optimized user experience&quot;</p>
                    <span className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary/20" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="mt-24 relative border-t border-primary/10 pt-16 font-mono"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-5xl font-playfair text-primary mb-2">4+</p>
                <p className="text-xs tracking-widest text-muted-foreground/60">UPTIME_YEARS</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-playfair text-primary mb-2">01</p>
                <p className="text-xs tracking-widest text-muted-foreground/60">CORE_VISION</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-playfair text-primary mb-2">∞</p>
                <p className="text-xs tracking-widest text-muted-foreground/60">MAX_POTENTIAL</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;