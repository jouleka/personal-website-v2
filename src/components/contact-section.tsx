"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

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
            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                >
                    <h2 className="text-4xl font-playfair font-bold text-center mb-12">Get in Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div variants={itemVariants} className="space-y-8">
                            <h3 className="text-2xl font-playfair font-bold mb-4">Contact Information</h3>
                            <div className="flex items-center space-x-4">
                                <Mail className="w-5 h-5 text-primary" />
                                <span className="font-serif">lekacoding@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MapPin className="w-5 h-5 text-primary" />
                                <span className="font-serif">Tirana, Albania</span>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-lg font-playfair font-semibold">Socials</h4>
                                <div className="flex space-x-4">
                                    <motion.a href="https://www.linkedin.com/in/jurgen-leka-31470119a/" target="_blank" rel="noopener noreferrer"
                                        whileHover={{ y: -3 }} className="text-primary hover:text-primary/80">
                                        <Linkedin className="w-6 h-6" />
                                    </motion.a>
                                    <motion.a href="https://x.com/jou_leka" target="_blank" rel="noopener noreferrer"
                                        whileHover={{ y: -3 }} className="text-primary hover:text-primary/80">
                                        <Twitter className="w-6 h-6" />
                                    </motion.a>
                                    <motion.a href="https://www.instagram.com/jou_leka/?hl=en" target="_blank" rel="noopener noreferrer"
                                        whileHover={{ y: -3 }} className="text-primary hover:text-primary/80">
                                        <Instagram className="w-6 h-6" />
                                    </motion.a>
                                    <motion.a href="https://github.com/jouleka" target="_blank" rel="noopener noreferrer"
                                        whileHover={{ y: -3 }} className="text-primary hover:text-primary/80">
                                        <Github className="w-6 h-6" />
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                        <motion.form onSubmit={handleSubmit} variants={itemVariants} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="name"
                                    className="w-full px-3 py-2 border border-primary/20 rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="w-full px-3 py-2 border border-primary/20 rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                ></textarea>
                            </div>
                            {error && (
                                <p className="text-sm font-medium text-red-600 bg-red-100 border border-red-200 rounded-sm p-2">
                                    {error}
                                </p>
                            )}

                            {isSuccess && (
                                <p className="text-sm font-medium text-green-600 bg-green-100 border border-green-200 rounded-sm p-2">
                                    Message sent successfully!
                                </p>
                            )}
                            <motion.button
                                type="submit"
                                className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send Message'}
                                {!isLoading && <Send className="w-4 h-4 inline-block ml-2" />}
                            </motion.button>
                        </motion.form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;