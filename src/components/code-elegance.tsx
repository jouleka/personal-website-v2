"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from 'next-themes';

interface GridLine {
  x: number;
  y: number;
  length: number;
  horizontal: boolean;
  opacity: number;
  speed: number;
}

const CodeElegance: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useAnimation();
  const linesRef = useRef<GridLine[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initLines();
    };

    const initLines = () => {
      linesRef.current = [];
      const lineCount = Math.floor((canvas.width * canvas.height) / 50000);
      
      for (let i = 0; i < lineCount; i++) {
        linesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: 40 + Math.random() * 120,
          horizontal: Math.random() > 0.5,
          opacity: 0.015 + Math.random() * 0.04,
          speed: 0.08 + Math.random() * 0.2
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = resolvedTheme === 'dark';
      
      // More distinct colors for each theme
      const lineColor = isDark ? '245, 158, 11' : '194, 65, 12'; // Amber in dark, burnt sienna in light
      const accentColor = isDark ? '255, 200, 100' : '220, 100, 50';
      const baseAlpha = isDark ? 1 : 0.6; // Reduce opacity in light mode

      linesRef.current.forEach((line, index) => {
        const dx = mouseRef.current.x - line.x;
        const dy = mouseRef.current.y - line.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 250;
        const influence = Math.max(0, 1 - distance / maxDist);
        
        if (line.horizontal) {
          line.x += line.speed;
          if (line.x > canvas.width + line.length) {
            line.x = -line.length;
            line.y = Math.random() * canvas.height;
          }
        } else {
          line.y += line.speed;
          if (line.y > canvas.height + line.length) {
            line.y = -line.length;
            line.x = Math.random() * canvas.width;
          }
        }

        const baseOpacity = line.opacity * baseAlpha;
        const finalOpacity = baseOpacity + influence * 0.2;
        
        ctx.strokeStyle = influence > 0.1 
          ? `rgba(${accentColor}, ${finalOpacity})` 
          : `rgba(${lineColor}, ${finalOpacity})`;
        ctx.lineWidth = influence > 0.1 ? 1.5 : 1;
        ctx.beginPath();

        if (line.horizontal) {
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x + line.length, line.y);
        } else {
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x, line.y + line.length);
        }

        ctx.stroke();

        // Intersection nodes
        if (index % 4 === 0) {
          ctx.fillStyle = `rgba(${lineColor}, ${baseOpacity * 2.5})`;
          ctx.beginPath();
          ctx.arc(line.x, line.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    controls.start({ opacity: 1 });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [controls, resolvedTheme]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 2, ease: "easeOut" }}
      className="fixed inset-0 pointer-events-none z-0"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
};

export default CodeElegance;
