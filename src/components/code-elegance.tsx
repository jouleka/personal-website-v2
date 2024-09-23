"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CodeElegance: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const controls = useAnimation();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let animationFrame: number;

        const drawElegantLine = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop(0, 'rgba(200, 200, 200, 0)');
            gradient.addColorStop(0.5, 'rgba(200, 200, 200, 0.5)');
            gradient.addColorStop(1, 'rgba(200, 200, 200, 0)');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();

            const amplitude = canvas.height / 4;
            const frequency = 0.001;

            ctx.moveTo(0, canvas.height / 2);

            for (let x = 0; x < canvas.width; x++) {
                const y = Math.sin(x * frequency + time / 1000) * amplitude + canvas.height / 2;
                ctx.lineTo(x, y);
            }

            ctx.stroke();

            animationFrame = requestAnimationFrame(() => drawElegantLine(Date.now()));
        };

        drawElegantLine(Date.now());
        controls.start({ opacity: 1 });

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [controls]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed inset-0 pointer-events-none"
        >
            <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>
    );
};

export default CodeElegance;