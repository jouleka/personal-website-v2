"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Code, Database, Server, Globe, Terminal, Cpu } from 'lucide-react';

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

interface Expertise {
  category: string;
  skills: string[];
  icon: React.ElementType;
}

const workExperiences: Experience[] = [
  {
    company: "myCicero",
    position: "Frontend Developer",
    period: "07/01/2024 – Present",
    description: "Architected a multi-tenant monorepo platform enabling seamless brand-specific customisation via a content-driven UI"
  },
  {
    company: "Gutenberg Technology",
    position: "Full Stack JavaScript Developer",
    period: "07/03/2022 – 07/05/2025",
    description: "Led refactoring, developed key features for e-learning platform, implemented testing strategies."
  },
  {
    company: "Keendoo",
    position: "Full Stack Developer",
    period: "13/09/2021 – 04/03/2022",
    description: "Developed features for product data repository, implemented responsive design, optimized database queries."
  },
  {
    company: "Rayonit",
    position: "Full Stack Developer",
    period: "01/06/2021 – 10/09/2021",
    description: "Developed custom solutions for Intelligent Transportation Systems, implemented IoT integrations."
  }
];

const expertiseAreas: Expertise[] = [
  {
    category: "Front-End",
    skills: ["Angular (2+)", "React", "TypeScript", "JavaScript", "RxJS", "NgRx", "HTML5", "CSS3/SCSS", "MD3", "Tailwind CSS", "UIKit"],
    icon: Code
  },
  {
    category: "Back-End",
    skills: ["Node.js", "Java (Spring Boot)", "RESTful APIs", "GraphQL", "Hapi.js", "Nextjs"],
    icon: Server
  },
  {
    category: "Database & DevOps",
    skills: ["MongoDB", "PostgreSQL", "RethinkDB", "Docker", "CI/CD", "Git", "Webpack"],
    icon: Database
  },
  {
    category: "Other",
    skills: ["Agile/Scrum", "Test-Driven Development (TDD)", "Microservices Architecture", "Monorepo", "Multi-tenant architecture"],
    icon: Globe
  }
];

// Console message styling
const consoleStyle = 'color: #00ff9d; font-family: monospace; font-size: 12px; padding: 4px;';
const consoleData = {
  message: "🚀 Welcome to the matrix! Try these shortcuts:\n" +
           "→ Konami Code (↑↑↓↓←→←→ba)\n" +
           "→ Press 'D' for debug mode\n" +
           "→ Press 'M' for metrics\n" +
           "→ Press 'T' for runtime data",
  art: `
   ________  ___  ___  ________  ________  _______   ________   
  |\\   ____\\|\\  \\|\\  \\|\\   __  \\|\\   ____\\|\\  ___ \\ |\\   ___  \\ 
  \\ \\  \\___|\\ \\  \\\\\\  \\ \\  \\|\\  \\ \\  \\___|\\ \\   __/|\\ \\  \\\\ \\  \\
   \\ \\  \\    \\ \\  \\\\\\  \\ \\   ____\\ \\  \\  __\\ \\  \\_|/_\\ \\  \\\\ \\  \\
    \\ \\  \\____\\ \\  \\\\\\  \\ \\  \\___|\\ \\  \\|\\  \\ \\  \\_|\\ \\ \\  \\\\ \\  \\
     \\ \\_______\\ \\_______\\ \\__\\    \\ \\_______\\ \\_______\\ \\__\\\\ \\__\\
      \\|_______|\\|_______|\\|__|     \\|_______|\\|_______|\\|__| \\|__|
  `
};

const ExpertiseAndWorkSection: React.FC = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [hoveredSkill, setHoveredSkill] = useState<{ skill: string; area: string } | null>(null);
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [debugMode, setDebugMode] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseTrail, setMouseTrail] = useState<{ x: number; y: number }[]>([]);

  // Console welcome message
  useEffect(() => {
    console.log('%c' + consoleData.art, consoleStyle);
    console.log('%c' + consoleData.message, consoleStyle);
  }, []);

  // Simplified mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setMouseTrail(prev => [...prev.slice(-2), { x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key.toLowerCase()) {
        case 'd':
          setDebugMode(prev => !prev);
          console.log('%cDebug Mode: ' + (!debugMode ? 'Enabled' : 'Disabled'), consoleStyle);
          break;
        case 'm':
          setShowMetrics(prev => !prev);
          console.log('%cMetrics View: ' + (!showMetrics ? 'Enabled' : 'Disabled'), consoleStyle);
          break;
        case 't':
          console.table({
            'Runtime Version': `${easterEggCount}.0.0`,
            'Debug Mode': debugMode,
            'Metrics Active': showMetrics,
            'Memory Usage': `${Math.random() * 100 + 400}MB`,
            'Render Count': Math.floor(Math.random() * 100),
            'System Status': 'Optimal'
          });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [debugMode, showMetrics, easterEggCount]);

  // Easter egg: Konami code
  useEffect(() => {
    const keys: string[] = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.push(e.key);
      if (keys.length > konamiCode.length) {
        keys.shift();
      }
      if (JSON.stringify(keys) === JSON.stringify(konamiCode)) {
        setEasterEggCount(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
    <section id="expertise" ref={sectionRef} className="py-24 bg-background text-foreground overflow-hidden">
      {/* Reduced Mouse Trail Effect */}
      {mouseTrail.map((pos, i) => (
        <motion.div
          key={i}
          className="fixed w-6 h-6 rounded-full pointer-events-none"
          style={{
            background: `rgba(var(--primary-rgb), ${0.05 - i * 0.02})`,
            mixBlendMode: 'plus-lighter',
          }}
          animate={{
            x: pos.x - 12,
            y: pos.y - 12,
            scale: [1, 1.2, 1],
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
        />
      ))}

      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto relative"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 0.5,
                staggerChildren: 0.2 
              } 
            }
          }}
        >
          {/* Enhanced Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.2) 0%, rgba(var(--primary-rgb), 0) 70%)',
                mixBlendMode: 'plus-lighter',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 0.2, 0.4],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-40 right-20 w-40 h-40 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.2) 0%, rgba(var(--primary-rgb), 0) 70%)',
                mixBlendMode: 'plus-lighter',
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Header - Client Bait */}
          <motion.div 
            className="text-center mb-20 relative"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-primary/5 rounded-full"
              whileHover={{ scale: 1.02 }}
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-primary/80">system.expertise</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              Experience & Expertise
            </h2>
          </motion.div>

          {/* Skills Grid - Developer Bait */}
          <motion.div className="mb-24 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-black/20 border border-primary/10 p-8 rounded-sm overflow-hidden backdrop-blur-sm hover:border-primary/20 transition-all duration-500"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Easter Egg: Binary in Background */}
                  <div className="absolute inset-0 opacity-[0.02] font-mono text-[10px] leading-none overflow-hidden pointer-events-none select-none">
                    {Array(100).fill(null).map((_, i) => (
                      <div key={i}>{Math.random().toString(2).slice(2)}</div>
                    ))}
                  </div>

                  <div className="absolute top-3 right-3 font-mono text-xs text-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {`v${index + 1}.${easterEggCount}.0`}
                  </div>

                  <div className="flex items-center mb-6">
                    <area.icon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold ml-3">{area.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-sm text-sm font-mono cursor-pointer hover:border-primary/30 transition-all duration-300"
                        onHoverStart={() => setHoveredSkill({ skill, area: area.category })}
                        onHoverEnd={() => setHoveredSkill(null)}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Easter Egg: Skill Details on Hover - Fixed to show only in current box */}
                  <AnimatePresence>
                    {hoveredSkill && hoveredSkill.area === area.category && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-2 right-2 text-xs font-mono text-primary/60"
                      >
                        {`import { ${hoveredSkill.skill} } from 'expertise'`}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Timeline - Branch Style */}
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <div className="relative">
              {/* Main Branch Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/20" />
              
              {workExperiences.map((experience, index) => (
                <motion.div
                  key={index}
                  className="relative pl-16 mb-16 last:mb-0 group"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  {/* Branch Connection */}
                  <div className="absolute left-8 top-3 w-8 h-px bg-primary/20" />

                  {/* Branch Node */}
                  <div className="absolute left-8 top-3 -translate-x-1/2 w-2 h-2">
                    <div className="w-full h-full rounded-full bg-background border border-primary/40" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                        {experience.company}
                      </h3>
                      <span className="font-mono text-sm text-primary/60">{experience.period}</span>
                    </div>
                    <p className="font-mono text-sm text-primary/80">{experience.position}</p>
                    <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
                  </div>
                </motion.div>
              ))}

              {/* Root Node */}
              <motion.div 
                className="absolute left-8 bottom-0 -translate-x-1/2 translate-y-full mt-8"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                <div className="font-mono text-xs text-primary/40 select-none">
                  <div className="w-2 h-2 rounded-full bg-background border border-primary/40 mx-auto mb-2" />
                  init
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Debug Overlay */}
        {debugMode && (
          <div className="fixed top-4 right-4 bg-black/90 p-4 rounded-lg border border-primary/20 font-mono text-xs text-primary/60 z-50">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4" />
              <span>Debug Console</span>
            </div>
            <div className="space-y-1">
              <p>Mouse X: {mousePosition.x}</p>
              <p>Mouse Y: {mousePosition.y}</p>
              <p>Easter Eggs: {easterEggCount}</p>
              <p>Viewport: {window.innerWidth}x{window.innerHeight}</p>
              <p>Render Time: {Math.random() * 100 + 10}ms</p>
            </div>
          </div>
        )}

        {/* Metrics Overlay */}
        {showMetrics && (
          <motion.div 
            className="fixed bottom-4 left-4 right-4 bg-black/90 p-4 rounded-lg border border-primary/20 font-mono text-xs"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="grid grid-cols-4 gap-4">
              {expertiseAreas.map((area, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-primary/60">{area.category}</p>
                  <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary/40"
                      initial={{ width: 0 }}
                      animate={{ width: `${(area.skills.length / 10) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                  <p className="text-right text-primary/40">{area.skills.length} skills</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ExpertiseAndWorkSection;