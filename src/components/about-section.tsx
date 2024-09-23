"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FadeInText: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const controls = useAnimation();
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const textElement = textRef.current;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          controls.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.1 }
    );
  
    if (textElement) {
      observer.observe(textElement);
    }
  
    return () => {
      if (textElement) {
        observer.unobserve(textElement);
      }
    };
  }, [controls, isVisible]);

  return (
    <motion.p
      ref={textRef}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 1, delay: delay, ease: "easeOut" }}
      className="mb-4 text-muted-foreground"
    >
      {text}
    </motion.p>
  );
};

const AboutSection: React.FC = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 });
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
    <section id="about" ref={sectionRef} className="py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto bg-card p-8 border border-primary/20 rounded-sm shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-playfair font-bold mb-2 text-foreground">Jurgen Leka</h1>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Full Stack JavaScript Developer</p>
          </div>

          <div className="border-t border-b border-primary/20 py-4 my-6">
            <h2 className="text-3xl font-playfair font-bold text-center text-foreground">Crafting Digital Elegance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <FadeInText
                text="Results-driven Full Stack JavaScript Developer with 4+ years of expertise in architecting and implementing scalable web applications. Specializes in Angular, TypeScript, and RxJS, with a proven track record of spearheading the development of enterprise-grade applications."
                delay={0.2}
              />
              <FadeInText
                text="Successfully refactored legacy systems, reducing technical debt by 40% and enhancing maintainability. Mentored junior developers, leading to a 25% increase in team productivity and code quality."
                delay={0.4}
              />
            </div>
            <div>
              <FadeInText
                text="Implemented cutting-edge technologies to solve complex problems, driving innovation in e-learning and product data management platforms. Expertise spans from frontend frameworks like Angular and React to backend technologies including Node.js and Java Spring Boot."
                delay={0.6}
              />
              <motion.blockquote
                className="text-xl italic border-l-4 border-primary/40 pl-4 py-2 my-4 text-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={controls}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              >
                &ldquo;In the realm of code, elegance is not a luxury, but a necessity.&rdquo;
              </motion.blockquote>
              <FadeInText
                text="Committed to delivering high-quality, performant, and maintainable code. Continuously learning and adapting to new technologies to stay at the forefront of web development."
                delay={1}
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <motion.a
              href="#expertise"
              className="inline-flex items-center px-8 py-3 bg-primary/10 text-primary font-semibold border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;