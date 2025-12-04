"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhimsicalCelestialToggle from './light-dark-mode-switch';
import { smoothScrollTo } from '@/lib/utils';

const navItems = [
  { label: 'About', href: 'about', num: '01' },
  { label: 'Expertise', href: 'expertise', num: '02' },
  { label: 'Portfolio', href: 'portfolio', num: '03' },
  { label: 'Contact', href: 'contact', num: '04' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollListenerRef = useRef<(() => void) | null>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const sections = ['about', 'expertise', 'portfolio', 'contact'];
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

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

  const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    smoothScrollTo(targetId);
    setMobileMenuOpen(false);
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
    <>
      <motion.header 
        className={`fixed w-full z-50 transition-all duration-700 ${
          scrolled 
            ? 'bg-background/95 backdrop-blur-sm py-3' 
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            {/* Logo - Bold, editorial style */}
            <motion.a 
              href="#"
              className="group relative"
              whileHover="hover"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="text-xl font-bold tracking-tight">
                <span className="text-primary">J</span>
                <span className="text-foreground">LEKA</span>
              </span>
              <motion.span 
                className="absolute -bottom-1 left-0 h-[2px] bg-primary origin-left"
                initial={{ scaleX: 0 }}
                variants={{ hover: { scaleX: 1 } }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              />
            </motion.a>
            
            <div className="flex items-center gap-8">
              {/* Desktop Navigation - Numbered items */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href;
                  return (
                    <motion.a
                      key={item.href}
                      href={`#${item.href}`}
                      className={`relative px-4 py-2 text-sm transition-colors group ${
                        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={(e) => smoothScroll(e, item.href)}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span className="font-mono text-[10px] text-primary/60 mr-1.5 group-hover:text-primary transition-colors">
                        {item.num}
                      </span>
                      <span className="tracking-wide">{item.label}</span>
                      {isActive && (
                        <motion.span
                          className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary"
                          layoutId="activeNav"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <WhimsicalCelestialToggle />
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span 
                  className="w-6 h-[2px] bg-foreground block"
                  animate={{ 
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 5 : 0
                  }}
                />
                <motion.span 
                  className="w-6 h-[2px] bg-foreground block"
                  animate={{ 
                    opacity: mobileMenuOpen ? 0 : 1
                  }}
                />
                <motion.span 
                  className="w-6 h-[2px] bg-foreground block"
                  animate={{ 
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -5 : 0
                  }}
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Subtle bottom border when scrolled */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-border"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="h-full flex flex-col justify-center items-center gap-8 pt-20">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={(e) => smoothScroll(e, item.href)}
                  className="text-3xl font-light text-foreground hover:text-primary transition-colors flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="font-mono text-sm text-primary/60">{item.num}</span>
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
