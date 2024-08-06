import React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const WhimsicalCelestialToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.div
      className="relative w-8 h-8 cursor-pointer"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full"
      >
        {/* Background circle */}
        <circle cx="16" cy="16" r="16" fill={theme === 'dark' ? '#1a1a2e' : '#87CEEB'} />

        {/* Sun */}
        <motion.g
          animate={{ 
            opacity: theme === 'dark' ? 0 : 1,
            scale: theme === 'dark' ? 0.5 : 1,
            x: theme === 'dark' ? 8 : 0,
            y: theme === 'dark' ? 8 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <circle cx="16" cy="16" r="7" fill="#FFD700" />
          {/* Sun rays */}
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="16"
              y1="16"
              x2={16 + 6 * Math.cos(i * Math.PI / 4)}
              y2={16 + 6 * Math.sin(i * Math.PI / 4)}
              stroke="#FFD700"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
          {/* Quirky sun face */}
          <circle cx="14" cy="15" r="1" fill="#1a1a2e" />
          <circle cx="18" cy="15" r="1" fill="#1a1a2e" />
          <path d="M14 18 Q16 20 18 18" fill="none" stroke="#1a1a2e" strokeWidth="1" />
        </motion.g>

        {/* Moon */}
        <motion.g
          animate={{ 
            opacity: theme === 'dark' ? 1 : 0,
            scale: theme === 'dark' ? 1 : 0.5,
            x: theme === 'dark' ? 0 : -8,
            y: theme === 'dark' ? 0 : -8,
          }}
          transition={{ duration: 0.5 }}
        >
          <circle cx="16" cy="16" r="7" fill="white" />
          {/* Moon craters */}
          <circle cx="13" cy="14" r="1" fill="#D3D3D3" />
          <circle cx="17" cy="19" r="1.5" fill="#D3D3D3" />
          <circle cx="19" cy="13" r="1" fill="#D3D3D3" />
          {/* Quirky moon face */}
          <circle cx="14" cy="15" r="1" fill="#1a1a2e" />
          <circle cx="18" cy="15" r="1" fill="#1a1a2e" />
          <path d="M14 18 Q16 20 18 18" fill="none" stroke="#1a1a2e" strokeWidth="1" />
        </motion.g>

        {/* Stars */}
        <motion.g
          animate={{ 
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${4 + i * 6} ${4 + (i % 2) * 3} L${5 + i * 6} ${5 + (i % 2) * 3} L${6 + i * 6} ${4 + (i % 2) * 3} L${5 + i * 6} ${3 + (i % 2) * 3} Z`}
              fill="white"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                delay: i * 0.4,
              }}
            />
          ))}
        </motion.g>
      </svg>
    </motion.div>
  );
};

export default WhimsicalCelestialToggle;