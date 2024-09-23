"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CodeElegance from './code-elegance';

const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-background text-foreground py-20 px-4 overflow-hidden">
            <CodeElegance />
            <div className="container mx-auto relative z-10">
                <motion.div
                    className="max-w-2xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
                        Crafting Digital
                        <span className="text-primary block">Elegance</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 font-inter">
                        Architecting elegant, scalable web solutions with over 4 years of expertise.
                        Specializing in Angular, TypeScript, and cutting-edge JavaScript technologies.
                    </p>
                    <motion.a
                        href="#portfolio"
                        className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View My Work
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;