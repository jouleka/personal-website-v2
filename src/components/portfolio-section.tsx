'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  Github,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  MessageCircle,
  Users,
  Zap,
  TrendingUp,
  BarChart3,
  Settings,
  FileText,
  Image as ImageIcon,
  Layout,
} from 'lucide-react';;
import Image from 'next/image';

interface Project {
  name: string;
  description: string;
  tools: string;
  url: string;
  images: string[];
}

const projects: Project[] = [
  {
    name: 'CV Template',
    description: 'Customizable resume builder with modern design and export capabilities.',
    tools: 'React/TypeScript/TailwindCSS',
    url: 'https://github.com/jouleka/cv-template',
    images: ['cv-template-placeholder'],
  },
  {
    name: 'Kraken Trading Bot',
    description: 'Automated cryptocurrency trading solution leveraging market analysis and risk management.',
    tools: 'Python/Flask/Kraken API',
    url: 'https://github.com/jouleka/kraken-trading-bot',
    images: ['kraken-bot-placeholder'],
  },
  {
    name: 'Chat-Application',
    description: 'Real-time messaging platform with advanced features using WebSockets.',
    tools: 'Angular/SpringBoot/MongoDB',
    url: 'https://github.com/jouleka/Chat-Application',
    images: ['chat-placeholder'],
  },
];

const PortfolioSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedProject(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, scale: 0.8 },
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProject.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  const renderPreview = (src: string) => {
    if (src === 'cv-template-placeholder') {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30 rounded">
          <div className="text-center p-4">
            <h3 className="text-2xl font-bold mb-4 font-playfair">CV Template</h3>
            <p className="text-muted-foreground mb-6 font-serif">Customizable resume builder</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <Layout className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm">Modern Layouts</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <ImageIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm">Custom Styling</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm">PDF Export</span>
              </div>
            </div>
            <div className="w-full bg-card rounded-lg shadow-inner p-4 overflow-hidden">
              <div className="flex flex-col items-start space-y-2">
                <div className="w-full h-8 bg-muted rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-muted rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-muted rounded animate-pulse"></div>
                <div className="w-2/3 h-4 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors inline-flex items-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Sample PDF
              </a>
            </div>
          </div>
        </div>
      );
    } else if (src === 'chat-placeholder') {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30 rounded">
          <div className="text-center p-4">
            <h3 className="text-2xl font-bold mb-4 font-playfair">Chat Application</h3>
            <p className="text-muted-foreground mb-6 font-serif">Real-time messaging platform</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <MessageCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm">Instant Messaging</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm">Group Chats</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm">Real-time Updates</span>
              </div>
            </div>
            <div className="w-full h-24 bg-card rounded-lg shadow-inner p-2 overflow-hidden">
              <div className="flex flex-col items-start animate-slide">
                {/* Escaped apostrophes */}
                <div className="bg-muted rounded-lg p-2 mb-2 self-start max-w-[80%]">
                  Hey, how&apos;s it going?
                </div>
                <div className="bg-primary text-primary-foreground rounded-lg p-2 mb-2 self-end max-w-[80%]">
                  Great! Just finished a new feature.
                </div>
                <div className="bg-muted rounded-lg p-2 self-start max-w-[80%]">
                  Awesome! Can&apos;t wait to see it.
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (src === 'kraken-bot-placeholder') {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30 rounded">
          <div className="text-center p-4">
            <h3 className="text-2xl font-bold mb-4 font-playfair">Kraken Trading Bot</h3>
            <p className="text-muted-foreground mb-6 font-serif">Automated cryptocurrency trading solution</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm">Market Analysis</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <BarChart3 className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm">Performance Tracking</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <Settings className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm">Custom Strategies</span>
              </div>
            </div>
            <div className="w-full h-32 bg-card rounded-lg shadow-inner p-2 overflow-hidden">
              <div className="flex justify-between items-end h-full">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1/12 bg-primary"
                    style={{
                      height: `${Math.random() * 100}%`,
                      opacity: 0.5 + Math.random() * 0.5,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full relative rounded">
          <Image
            src={src}
            alt={`${selectedProject?.name} preview`}
            className="object-contain rounded"
            layout="fill" // Makes the image fill the parent container
            objectFit="contain" // Maintains aspect ratio
            priority={false} // Set to true if you want to preload the image
          />
        </div>
      );
    }
  };

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div className="max-w-6xl mx-auto" initial="hidden" animate={controls} variants={containerVariants}>
          <h2 className="text-4xl font-playfair font-bold text-center mb-12">Curated Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                className="bg-card border border-primary/20 p-6 rounded-sm shadow-lg flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setCurrentImageIndex(0);
                        }}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <Search className="w-5 h-5" />
                      </button>
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

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-card rounded-lg shadow-xl max-w-4xl w-full mx-auto overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                {renderPreview(selectedProject.images[currentImageIndex])}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary/80 text-primary-foreground p-2 rounded-full transition-colors hover:bg-primary"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary/80 text-primary-foreground p-2 rounded-full transition-colors hover:bg-primary"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold font-playfair">{selectedProject.name}</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-muted-foreground mb-4 font-serif">{selectedProject.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {selectedProject.tools}
                  </span>
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    View Project
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;