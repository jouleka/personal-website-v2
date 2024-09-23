"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  tools: string;
  url: string;
}

const projects: Project[] = [
  {
    name: "Kraken Trading Bot",
    description: "Automated cryptocurrency trading solution leveraging market analysis and risk management.",
    tools: "Python/Flask/Kraken API",
    url: "https://github.com/jouleka/kraken-trading-bot"
  },
  {
    name: "Chat-Application",
    description: "Real-time messaging platform with messaging features using WebSockets.",
    tools: "Angular/SpringBoot/MongoDB",
    url: "https://github.com/jouleka/Chat-Application"
  },
  {
    name: "CV Template",
    description: "Customizable resume builder with modern design and export capabilities.",
    tools: "React/TypeScript/TailwindCSS",
    url: "https://github.com/jouleka/cv-template"
  }
];

const PortfolioSection: React.FC = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
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
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">Curated Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                className="bg-card border border-primary/20 p-6 rounded-sm shadow-lg flex flex-col justify-between"
                variants={itemVariants}
              >
                <div>
                  <h3 className="text-2xl font-playfair font-bold mb-4">{project.name}</h3>
                  <p className="text-muted-foreground mb-4 font-serif italic">{project.description}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {project.tools}
                    </span>
                    <div className="flex space-x-4">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground text-right font-serif">
                    Project No. {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;