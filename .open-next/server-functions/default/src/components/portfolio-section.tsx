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
  Lightbulb,
  Share2,
  UserPlus,
  Globe,
} from 'lucide-react';
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
    name: 'Great Wall of Ideas',
    description: 'A community-driven platform for sharing and discovering innovative ideas. A space where shower thoughts transform into potential projects, connecting visionaries with builders.',
    tools: 'Next.js/TailwindCSS/Supabase',
    url: 'https://www.greatwallofideas.xyz/',
    images: ['great-wall-ideas-placeholder'],
  },
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
  const [debugMode, setDebugMode] = useState(false);
  const sectionRef = useRef(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Debug mode toggle
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '`') {
        setDebugMode(prev => !prev);
        console.log(`%c[DEBUG] Mode ${!debugMode ? 'enabled' : 'disabled'}`, 'color: #00ff9d');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [debugMode]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
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

  // Modal click outside
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
    if (src === 'great-wall-ideas-placeholder') {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30 rounded">
          <div className="text-center p-4">
            <h3 className="text-2xl font-bold mb-4 font-playfair">Great Wall of Ideas</h3>
            <p className="text-muted-foreground mb-6 font-serif">Where innovative ideas find their builders</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <Lightbulb className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm">Idea Sharing</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <Share2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm">Community Driven</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <UserPlus className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm">Builder Connect</span>
              </div>
            </div>
            <div className="w-full bg-card rounded-lg shadow-inner p-4 overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 animate-slide">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="w-3/4 h-4 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="w-full h-16 bg-muted/50 rounded p-3">
                      <div className="w-5/6 h-3 bg-muted rounded animate-pulse mb-2"></div>
                      <div className="w-4/6 h-3 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="px-2 py-1 bg-primary/10 rounded text-xs">Innovation</div>
                      <div className="px-2 py-1 bg-primary/10 rounded text-xs">Community</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (src === 'cv-template-placeholder') {
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
            fill
            className="object-contain rounded"
            priority={currentImageIndex === 0}
            placeholder="blur"
            blurDataURL="/path/to/low-res-image.jpg"
          />
        </div>
      );
    }
  };

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 bg-background text-foreground overflow-hidden">
      {/* Debug Overlay */}
      {debugMode && (
        <div className="fixed top-4 right-4 bg-black/90 p-4 rounded font-mono text-xs text-primary/60 border border-primary/20 z-50">
          <div className="space-y-1">
            <p>Projects: {projects.length}</p>
            <p>Selected: {selectedProject?.name || 'none'}</p>
            <p>Debug: enabled</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-primary/5 rounded-full">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-primary/80">portfolio.show()</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold">
              Curated Works
            </h2>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                className="group relative bg-black/20 border border-primary/10 p-6 rounded-sm overflow-hidden h-[400px] flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Hover Gradient Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0"
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ 
                    x: '100%', 
                    opacity: 1,
                    transition: { 
                      duration: 1.5, 
                      ease: "easeInOut",
                      repeat: Infinity
                    }
                  }}
                />

                {/* Content Container */}
                <div className="relative flex flex-col flex-1">
                  {/* Title with underline effect */}
                  <div className="relative inline-block mb-4">
                    <h3 className="text-2xl font-playfair font-bold">{project.name}</h3>
                    <motion.div 
                      className="absolute -bottom-1 left-0 h-px bg-primary origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <p className="text-muted-foreground font-serif italic relative z-10 line-clamp-4 mb-4">
                    {project.description}
                  </p>

                  {/* Tools and Actions - Now pushed to bottom */}
                  <div className="mt-auto space-y-4">
                    <span className="inline-block text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full transition-colors group-hover:bg-primary/20">
                      {project.tools}
                    </span>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground font-mono">
                        Project {String(index + 1).padStart(2, '0')}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <motion.a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:text-primary transition-all"
                          whileHover={{ 
                            scale: 1.1,
                            transition: { type: "spring", stiffness: 400, damping: 10 }
                          }}
                        >
                          {project.name === 'Great Wall of Ideas' ? (
                            <Globe className="w-5 h-5" />
                          ) : (
                            <Github className="w-5 h-5" />
                          )}
                        </motion.a>
                        <motion.button
                          onClick={() => {
                            setSelectedProject(project);
                            setCurrentImageIndex(0);
                          }}
                          className="p-2 hover:text-primary transition-all"
                          whileHover={{ 
                            scale: 1.1,
                            transition: { type: "spring", stiffness: 400, damping: 10 }
                          }}
                        >
                          <Search className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
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
              className="bg-card rounded-sm shadow-xl max-w-4xl w-full mx-auto overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { type: 'spring', stiffness: 300, damping: 30 }
              }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                {renderPreview(selectedProject.images[currentImageIndex])}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold font-playfair mb-2">{selectedProject.name}</h3>
                    <p className="text-muted-foreground">{selectedProject.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-primary/60 hover:text-primary transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-primary/10">
                  <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {selectedProject.tools}
                  </span>
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <span className="text-sm font-mono">
                      {selectedProject.name === 'Great Wall of Ideas' ? 'Visit Website' : 'View Repository'}
                    </span>
                    <ExternalLink className="w-4 h-4" />
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