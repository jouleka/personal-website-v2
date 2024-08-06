"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const FadeInText: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const controls = useAnimation();
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          controls.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [controls, isVisible]);

  return (
    <motion.p
      ref={textRef}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 1, delay: delay, ease: "easeOut" }}
      className="mb-4"
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

  // Separate useEffect for smooth scrolling
  useEffect(() => {
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (href?.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll);
      });
    };
  }, []);

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
            <h1 className="text-5xl font-playfair font-bold mb-2 text-foreground">The Elegant Times</h1>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Est. 2024</p>
          </div>
          
          <div className="border-t border-b border-primary/20 py-4 my-6">
            <h2 className="text-3xl font-playfair font-bold text-center text-foreground">J. Leka: Crafting Digital Elegance</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <FadeInText 
                text="In the ever-evolving realm of software engineering, few names resonate with the same level of reverence and admiration as J. Leka. With over a decade of experience, Leka has established himself as a true artisan of code, crafting elegant and scalable solutions to the most intricate of digital challenges."
                delay={0.2}
              />
              <FadeInText 
                text="Leka's approach to software development is akin to that of a master craftsman, blending timeless principles of architecture with cutting-edge technologies. Each project undertaken is not merely completed, but rather, it is meticulously sculpted into a masterpiece of efficiency and innovation."
                delay={0.4}
              />
            </div>
            <div>
              <FadeInText 
                text="What sets Leka apart is not just his technical prowess, but his unwavering commitment to excellence. In an industry often driven by rapid development and quick fixes, Leka stands as a beacon of quality and refinement. His code is not just functional; it is a testament to the art of programming."
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
                text="As the digital landscape continues to evolve, J. Leka remains at the forefront, not just adapting to change, but actively shaping the future of software engineering. His work serves as an inspiration to both seasoned developers and newcomers alike, setting a standard of excellence that elevates the entire field."
                delay={1}
              />
            </div>
          </div>
          
          <div className="text-center mt-8">
            <motion.a
              href="#expertise"
              className="inline-block px-8 py-3 bg-primary/10 text-primary font-semibold border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover the Mastery
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;