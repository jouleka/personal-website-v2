"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import WhimsicalCelestialToggle from './light-dark-mode-switch';

const playfair = Playfair_Display({ subsets: ['latin'] });

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollListenerRef = useRef<(() => void) | null>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80; // Adjust this value based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
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

  if (!mounted) {
    return null;
  }

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
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
                  onClick={smoothScroll}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            <WhimsicalCelestialToggle />
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            className="flex justify-center"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-px w-16 bg-foreground/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;