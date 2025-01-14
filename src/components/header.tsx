"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import WhimsicalCelestialToggle from './light-dark-mode-switch';
import { smoothScrollTo } from '@/lib/utils';

const playfair = Playfair_Display({ subsets: ['latin'] });

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const scrollListenerRef = useRef<(() => void) | null>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    // Update active section based on scroll position
    const sections = ['about', 'expertise', 'portfolio', 'contact'];
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    // Don't update active section if we're in the hero section
    if (scrollPosition < viewportHeight / 2) {
      setActiveSection('');
      return;
    }

    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    setActiveSection(currentSection || '');
  }, []);

  const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.replace('#', '');
    if (targetId) {
      smoothScrollTo(targetId);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    scrollListenerRef.current = handleScroll;
    window.addEventListener('scroll', scrollListenerRef.current);

    return () => {
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current);
      }
    };
  }, [handleScroll]);

  if (!mounted) return null;

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/80 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/60 py-4' 
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className={`text-2xl text-foreground ${playfair.className}`}
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative group cursor-pointer">
              J. Leka
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all group-hover:w-full" />
            </span>
          </motion.div>
          
          <div className="flex items-center space-x-8">
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['About', 'Expertise', 'Portfolio', 'Contact'].map((item) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`relative text-sm uppercase tracking-wider transition-colors ${
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={smoothScroll}
                    whileHover={{ y: -2 }}
                  >
                    {item}
                    {isActive && (
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                        layoutId="activeSection"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* Theme Toggle */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <WhimsicalCelestialToggle />
              </motion.div>
              <motion.div 
                className="absolute -inset-2 bg-primary/5 rounded-full -z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            className="flex justify-center overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <motion.div 
              className="w-16 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;