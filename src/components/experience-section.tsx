"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface Experience {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string[];
  tech: string[];
}

interface Expertise {
  category: string;
  skills: string[];
}

const workExperiences: Experience[] = [
  {
    company: "myCicero",
    position: "Frontend Developer",
    period: "Jan 2024 – Present",
    location: "Remote",
    description: [
      "Built a multi-tenant monorepo where each brand gets their own look without maintaining separate codebases",
      "Set up NgRx so state actually makes sense across the whole app",
      "Made the API layer cleaner — less spaghetti, more predictable data flow"
    ],
    tech: ["Angular", "RxJS", "NgRx", "TypeScript", "Monorepo"]
  },
  {
    company: "Gutenberg Technology",
    position: "Full Stack JavaScript Developer",
    period: "Mar 2022 – May 2025",
    location: "Remote (US)",
    description: [
      "Took an AngularJS codebase and migrated it to Angular 15 — the app got noticeably faster",
      "Built features for their e-learning platform that people actually wanted to use",
      "Added proper testing so we stopped shipping bugs every release"
    ],
    tech: ["Angular 15", "React", "Node.js", "HapiJS", "PostgreSQL"]
  },
  {
    company: "Keendoo",
    position: "Full Stack Developer",
    period: "Sep 2021 – Mar 2022",
    location: "Remote (France)",
    description: [
      "Worked on a product data management tool — mostly making it not break",
      "Made the UI actually usable on mobile (it wasn't before)"
    ],
    tech: ["PolymerJS", "SpringBoot", "Java", "PostgreSQL"]
  },
  {
    company: "Rayonit",
    position: "Full Stack Developer",
    period: "Jun 2021 – Sep 2021",
    location: "Tirana",
    description: [
      "First real job — built software for traffic management systems",
      "Got my hands dirty with IoT stuff, collecting real-time data from sensors"
    ],
    tech: ["Angular 11", "TypeScript", "SpringBoot", "MongoDB"]
  }
];

const expertiseAreas: Expertise[] = [
  {
    category: "Frontend",
    skills: ["Angular", "React", "TypeScript", "RxJS", "NgRx", "Tailwind"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Spring Boot", "HapiJS", "Next.js", "REST", "GraphQL"]
  },
  {
    category: "Data & Ops",
    skills: ["PostgreSQL", "MongoDB", "Docker", "CI/CD", "Git"]
  },
  {
    category: "The Rest",
    skills: ["Monorepos", "Multi-tenant", "Testing", "Agile"]
  }
];

const ExpertiseAndWorkSection: React.FC = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [activeExperience, setActiveExperience] = useState(0);

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
    <section id="expertise" ref={sectionRef} className="py-32 bg-background text-foreground overflow-hidden">
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
            <span className="text-sm font-mono text-primary mb-4 block">02 — EXPERTISE</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              What I know &<br />
              <span className="text-primary">where I&apos;ve been</span>
            </h2>
          </motion.div>

          {/* Skills Grid */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.category}
                className="bg-card border border-border p-6 relative group hover:border-primary/30 transition-colors"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <span className="text-xs font-mono text-primary/60 mb-3 block">0{index + 1}</span>
                <h3 className="text-lg font-medium mb-4">{area.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {area.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 bg-secondary text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Experience Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h3 className="text-2xl font-bold mb-12">Work Experience</h3>
            
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Company List */}
              <div className="lg:col-span-4 space-y-2">
                {workExperiences.map((exp, index) => (
                  <button
                    key={exp.company}
                    onClick={() => setActiveExperience(index)}
                    className={`w-full text-left px-4 py-3 border-l-2 transition-all ${
                      activeExperience === index
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    <span className="font-medium block">{exp.company}</span>
                    <span className="text-sm opacity-60">{exp.period}</span>
                  </button>
                ))}
              </div>

              {/* Experience Details */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeExperience}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card border border-border p-8"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-xl font-medium">{workExperiences[activeExperience].position}</h4>
                        <p className="text-primary">{workExperiences[activeExperience].company}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{workExperiences[activeExperience].period}</p>
                        <p>{workExperiences[activeExperience].location}</p>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {workExperiences[activeExperience].description.map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-muted-foreground">
                          <span className="text-primary mt-1.5">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-border">
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-3">
                        Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {workExperiences[activeExperience].tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1 bg-primary/10 text-primary border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseAndWorkSection;
