"use client";

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import CodeElegance from './code-elegance';
import { smoothScrollTo } from '@/lib/utils';

const Hero: React.FC = () => {
    const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href')?.replace('#', '');
        if (targetId) {
            smoothScrollTo(targetId);
        }
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center bg-background text-foreground py-20 px-4 overflow-hidden">
            <CodeElegance />
            <div className="container mx-auto relative z-10">
                <motion.div
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div 
                        className="mb-8 flex items-center justify-center space-x-2 text-primary/60"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Terminal className="h-4 w-4" />
                        <span className="text-sm font-mono">while(true) improve()</span>
                    </motion.div>
                    
                    <motion.div
                        className="text-center space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold">
                            <span className="sr-only">Jurgen Leka</span>
                            <span className="block" aria-hidden="true">{"{ jurgen: leka }"}</span>
                        </h1>
                        
                        <p className="text-lg text-muted-foreground/80 font-light max-w-md mx-auto">
                            Writing code that makes other developers question their implementations.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="mt-16 grid grid-cols-3 gap-4 text-center text-sm font-mono text-muted-foreground/60"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="space-y-1">
                            <p>type</p>
                            <p className="text-primary">architect</p>
                        </div>
                        <div className="space-y-1">
                            <p>status</p>
                            <p className="text-primary">available</p>
                        </div>
                        <div className="space-y-1">
                            <p>location</p>
                            <p className="text-primary">Europe</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="mt-12 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <a
                            href="#portfolio"
                            onClick={smoothScroll}
                            className="inline-flex items-center text-sm font-mono hover:text-primary transition-colors duration-300"
                        >
                            <span className="border-b border-primary/20 hover:border-primary">cd /portfolio</span>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;