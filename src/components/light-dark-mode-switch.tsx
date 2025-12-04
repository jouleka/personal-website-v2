"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';

const ThemeToggle: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  // Show placeholder during SSR and until theme is resolved to avoid flicker
  // Must be same element type (button) to prevent hydration mismatch
  if (!mounted || !resolvedTheme) {
    return (
      <button
        className="relative w-10 h-10 border border-border flex items-center justify-center"
        aria-label="Toggle theme"
        disabled
      >
        <span className="w-5 h-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 border border-border hover:border-foreground/40 transition-colors flex items-center justify-center group active:scale-95"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon */}
      <svg
        viewBox="0 0 24 24"
        className={`w-5 h-5 absolute transition-all duration-300 ${
          isDark ? 'opacity-0 scale-50 -rotate-90' : 'opacity-100 scale-100 rotate-0'
        }`}
      >
        <circle 
          cx="12" 
          cy="12" 
          r="4" 
          className="fill-none stroke-foreground" 
          strokeWidth="1.5"
        />
        {/* Rays */}
        <g className="stroke-foreground" strokeWidth="1.5" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4" y1="12" x2="2" y2="12" />
          <line x1="22" y1="12" x2="20" y2="12" />
          <line x1="5.64" y1="5.64" x2="4.22" y2="4.22" />
          <line x1="19.78" y1="19.78" x2="18.36" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        </g>
      </svg>

      {/* Moon icon */}
      <svg
        viewBox="0 0 24 24"
        className={`w-5 h-5 absolute transition-all duration-300 ${
          isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'
        }`}
      >
        <path
          d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
          className="fill-none stroke-foreground"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default ThemeToggle;
