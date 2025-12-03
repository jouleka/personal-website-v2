"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Instagram, Linkedin, Twitter, Github } from 'lucide-react';

const ContactSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const controls = useAnimation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [debugMode, setDebugMode] = useState(false);

    // Debug mode toggle
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === '`') {
                setDebugMode(prev => !prev);
                console.log(`%c[DEBUG] Mode ${!debugMode ? 'enabled' : 'disabled'}`, 'color: #00ff9d');
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [debugMode]);

    useEffect(() => {
        if (isSuccess || error) {
            const timer = setTimeout(() => {
                setIsSuccess(false);
                setError('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isSuccess, error]);

    const startAnimation = useCallback(() => {
        controls.start("visible");
    }, [controls]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAnimation();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [startAnimation]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setIsSuccess(false);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.success) {
                setIsSuccess(true);
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setError('Failed to send email. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" ref={sectionRef} className="py-24 bg-background text-foreground overflow-hidden">
            {/* Debug Overlay */}
            {debugMode && (
                <div className="fixed top-4 right-4 bg-black/90 p-4 rounded font-mono text-xs text-primary/60 border border-primary/20 z-50">
                    <div className="space-y-1">
                        <p>Form State: {isLoading ? 'loading' : isSuccess ? 'success' : error ? 'error' : 'idle'}</p>
                        <p>Fields: {[name, email, message].filter(Boolean).length}/3</p>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {/* Header */}
                    <motion.div 
                        className="text-center mb-16"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-primary/5 rounded-full">
                            <Mail className="w-4 h-4 text-primary" />
                            <span className="text-sm font-mono text-primary/80">contact.init()</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold">
                            Let&apos;s Connect
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div 
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            className="relative"
                        >
                            {/* Developer Bait: Binary Background */}
                            <div className="absolute inset-0 overflow-hidden opacity-[0.02] font-mono text-[8px] select-none pointer-events-none">
                                {Array(20).fill(null).map((_, i) => (
                                    <div key={i}>{Math.random().toString(2).slice(2)}</div>
                                ))}
                            </div>

                            <div className="relative space-y-8">
                                <h3 className="text-2xl font-playfair font-bold mb-8">Let&apos;s Talk</h3>
                                
                                {/* Contact Details */}
                                <motion.div 
                                    className="space-y-6"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                                    }}
                                >
                                    <motion.div 
                                        className="group flex items-center space-x-4 p-4 bg-black/20 rounded-sm backdrop-blur-sm border border-primary/10"
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                    >
                                        <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                                            <Mail className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-mono text-primary/60">Email</p>
                                            <p className="font-serif">lekacoding@gmail.com</p>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="group flex items-center space-x-4 p-4 bg-black/20 rounded-sm backdrop-blur-sm border border-primary/10"
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                    >
                                        <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                                            <MapPin className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-mono text-primary/60">Location</p>
                                            <p className="font-serif">Tirana, Albania</p>
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Social Links */}
                                <div className="pt-8 border-t border-primary/10">
                                    <h4 className="text-lg font-playfair font-semibold mb-4">Connect Online</h4>
                                    <div className="flex space-x-4">
                                        {[
                                            { icon: Linkedin, href: 'https://www.linkedin.com/in/jurgen-leka-31470119a/', label: 'LinkedIn' },
                                            { icon: Twitter, href: 'https://x.com/jou_leka', label: 'Twitter' },
                                            { icon: Instagram, href: 'https://www.instagram.com/jou_leka/?hl=en', label: 'Instagram' },
                                            { icon: Github, href: 'https://github.com/jouleka', label: 'GitHub' }
                                        ].map((social, index) => (
                                            <motion.a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative p-2 bg-primary/5 rounded-sm hover:bg-primary/10 transition-colors"
                                                whileHover={{ y: -3 }}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ 
                                                    opacity: 1, 
                                                    y: 0,
                                                    transition: { delay: index * 0.1 } 
                                                }}
                                            >
                                                <social.icon className="w-5 h-5 text-primary" />
                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary text-primary-foreground text-xs font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {social.label}
                                                </span>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.form 
                            onSubmit={handleSubmit} 
                            variants={{
                                hidden: { opacity: 0, x: 20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            className="relative space-y-6"
                        >
                            {/* Designer Bait: Decorative Elements */}
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-3xl" />
                            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />

                            <div className="relative">
                                <motion.div
                                    className="group"
                                    initial={false}
                                    animate={{ y: name ? -20 : 0 }}
                                >
                                    <label htmlFor="name" className="block text-sm font-mono text-primary/60 mb-1 group-focus-within:text-primary transition-colors">
                                        _name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        autoComplete="name"
                                        className="w-full px-4 py-3 bg-black/20 border border-primary/10 rounded-sm font-serif backdrop-blur-sm focus:outline-none focus:border-primary/20 transition-colors"
                                    />
                                </motion.div>
                            </div>

                            <div className="relative">
                                <motion.div
                                    className="group"
                                    initial={false}
                                    animate={{ y: email ? -20 : 0 }}
                                >
                                    <label htmlFor="email" className="block text-sm font-mono text-primary/60 mb-1 group-focus-within:text-primary transition-colors">
                                        _email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                        className="w-full px-4 py-3 bg-black/20 border border-primary/10 rounded-sm font-serif backdrop-blur-sm focus:outline-none focus:border-primary/20 transition-colors"
                                    />
                                </motion.div>
                            </div>

                            <div className="relative">
                                <motion.div
                                    className="group"
                                    initial={false}
                                    animate={{ y: message ? -20 : 0 }}
                                >
                                    <label htmlFor="message" className="block text-sm font-mono text-primary/60 mb-1 group-focus-within:text-primary transition-colors">
                                        _message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-black/20 border border-primary/10 rounded-sm font-serif backdrop-blur-sm focus:outline-none focus:border-primary/20 transition-colors resize-none"
                                    />
                                </motion.div>
                            </div>

                            {/* Status Messages */}
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-sm font-mono text-red-500 bg-red-500/10 border border-red-500/20 rounded-sm p-3"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                {isSuccess && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-sm font-mono text-green-500 bg-green-500/10 border border-green-500/20 rounded-sm p-3"
                                    >
                                        Message sent successfully!
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                className="group relative w-full px-6 py-3 bg-primary text-primary-foreground font-mono rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                disabled={isLoading}
                            >
                                <motion.span
                                    className="inline-flex items-center gap-2"
                                    animate={isLoading ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                                    transition={{ repeat: isLoading ? Infinity : 0, duration: 1 }}
                                >
                                    {isLoading ? (
                                        <>Processing</>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </motion.span>
                            </motion.button>
                        </motion.form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;