"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Briefcase, Code, Database, Server, Globe, Book } from 'lucide-react';

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
    company: "Gutenberg Technology",
    position: "Full Stack JavaScript Developer",
    period: "07/03/2022 – Present",
    description: "Led refactoring, developed key features for e-learning platform, implemented testing strategies."
  },
  {
    company: "Helius Systems",
    position: "Lead Frontend Developer",
    period: "15/09/2021 – Present",
    description: "Designed internal company app, developed reusable component library, optimized front-end performance."
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
    skills: ["Angular (2+)", "React", "TypeScript", "JavaScript", "RxJS", "NgRx", "HTML5", "CSS3/SCSS", "MD3", "Tailwind CSS"],
    icon: Code
  },
  {
    category: "Back-End",
    skills: ["Node.js", "Java (Spring Boot)", "RESTful APIs", "GraphQL"],
    icon: Server
  },
  {
    category: "Database & DevOps",
    skills: ["MongoDB", "PostgreSQL", "RethinkDB", "Docker", "CI/CD", "Git"],
    icon: Database
  },
  {
    category: "Other",
    skills: ["Agile/Scrum", "Test-Driven Development (TDD)", "Microservices Architecture"],
    icon: Globe
  }
];

const ExpertiseAndWorkSection: React.FC = () => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="expertise" ref={sectionRef} className="py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <h2 className="text-4xl font-playfair font-bold text-center mb-16">Expertise & Experience</h2>
          
          <div className="mb-16">
            <h3 className="text-2xl font-playfair font-bold mb-8">Work Experience</h3>
            <div className="space-y-8">
              {workExperiences.map((experience, index) => (
                <motion.div key={index} className="border-l-2 border-primary pl-4" variants={itemVariants}>
                  <h4 className="text-xl font-playfair font-bold">{experience.company}</h4>
                  <p className="text-muted-foreground font-serif">{experience.position}</p>
                  <p className="text-sm text-muted-foreground font-serif italic mb-2">{experience.period}</p>
                  <p className="text-muted-foreground font-serif">{experience.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-8">Technical Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {expertiseAreas.map((area, index) => (
                <motion.div key={index} className="bg-card border border-primary/20 p-6 rounded-sm shadow-lg" variants={itemVariants}>
                  <div className="flex items-center mb-4">
                    <area.icon className="w-6 h-6 text-primary mr-4" />
                    <h4 className="text-xl font-playfair font-bold">{area.category}</h4>
                  </div>
                  <ul className="list-disc list-inside text-muted-foreground font-serif">
                    {area.skills.map((skill, skillIndex) => (
                      <li key={skillIndex}>{skill}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseAndWorkSection;