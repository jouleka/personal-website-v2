"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import WhimsicalCelestialToggle from '../light-dark-mode-switch';

const playfair = Playfair_Display({ subsets: ['latin'] });

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (targetId) {
        document.querySelector(targetId)?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });
  
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll);
      });
    };
  }, []);

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className={`text-2xl text-foreground ${playfair.className}`}
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative group">
              J. Leka
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all group-hover:w-full"></span>
            </span>
          </motion.div>
          
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              {['About', 'Expertise', 'Portfolio', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors relative"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            <WhimsicalCelestialToggle />
          </div>
        </div>
      </div>
      
      {scrolled && (
        <div className="flex justify-center">
          <motion.div 
            className="h-px w-16 bg-foreground/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}
    </motion.header>
  );
};

export default Header;