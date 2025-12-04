'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, FileText } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  tools: string[];
  url: string;
  type: 'live' | 'github';
  featured?: boolean;
  demoUrl?: string;
  demoLabel?: string;
}

const projects: Project[] = [
  {
    name: 'Great Wall of Ideas',
    description: 'A place to dump your random ideas and see if anyone else thinks they\'re worth building.',
    tools: ['Next.js', 'Tailwind', 'Supabase'],
    url: 'https://www.greatwallofideas.com/',
    type: 'live',
    featured: true
  },
  {
    name: 'CV Template',
    description: 'Got tired of formatting resumes in Word, so I built this. Pick a template, fill in your stuff, export to PDF.',
    tools: ['React', 'TypeScript', 'Tailwind'],
    url: 'https://github.com/jouleka/cv-template',
    type: 'github',
    demoUrl: '/resume.pdf',
    demoLabel: 'View My Resume'
  },
  {
    name: 'Kraken Trading Bot',
    description: 'A crypto trading bot I built to automate some strategies on Kraken. Lost less money than expected.',
    tools: ['Python', 'Flask', 'Kraken API'],
    url: 'https://github.com/jouleka/kraken-trading-bot',
    type: 'github'
  },
  {
    name: 'Chat Application',
    description: 'My university project — a WhatsApp-like chat app. Real-time messaging, group chats, the whole thing.',
    tools: ['Angular', 'SpringBoot', 'MongoDB'],
    url: 'https://github.com/jouleka/Chat-Application',
    type: 'github'
  },
];

const PortfolioSection: React.FC = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
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

  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="portfolio" ref={sectionRef} className="py-32 bg-background text-foreground overflow-hidden">
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
            <span className="text-sm font-mono text-primary mb-4 block">03 — PORTFOLIO</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Stuff I&apos;ve<br />
              <span className="text-primary">built</span>
            </h2>
          </motion.div>

          {/* Featured Project */}
          {featuredProject && (
            <motion.div
              className="mb-16"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <a 
                href={featuredProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-card border border-border p-8 lg:p-12 relative overflow-hidden hover:border-primary/30 transition-all"
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-primary -translate-y-1 translate-x-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="text-xs font-mono text-primary mb-4 block">FEATURED PROJECT</span>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredProject.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {featuredProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProject.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs px-3 py-1 bg-primary/10 text-primary border border-primary/20"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
                      Visit Website
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                  
                  <div className="relative aspect-video bg-secondary/50 border border-border flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">💡</div>
                      <p className="text-sm text-muted-foreground">Post your idea, find your builder</p>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          )}

          {/* Other Projects Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.name}
                className="group bg-card border border-border p-6 relative hover:border-primary/30 transition-all flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-mono text-muted-foreground">0{index + 1}</span>
                  <div className="flex items-center gap-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        title={project.demoLabel || 'View Demo'}
                      >
                        <FileText className="w-5 h-5" />
                      </a>
                    )}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {project.type === 'github' ? (
                        <Github className="w-5 h-5" />
                      ) : (
                        <ExternalLink className="w-5 h-5" />
                      )}
                    </a>
                  </div>
                </div>
                
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow"
                >
                  <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                </a>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      {project.demoLabel || 'Demo'}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View More Link */}
          <motion.div 
            className="mt-12 text-center"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            <a
              href="https://github.com/jouleka"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>View more on GitHub</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
