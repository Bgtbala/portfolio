'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Preloader() {
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const isClassic = theme === 'classic';
    const isAnimated = theme === 'animated';

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${isClassic
                            ? 'bg-[#fcfbf7]'
                            : isAnimated
                                ? 'bg-[#ffea00]'
                                : 'bg-[#020202]'
                        }`}
                >
                    {/* Future Theme Loader */}
                    {!isClassic && !isAnimated && (
                        <div className="text-center">
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-primary font-mono text-xs tracking-[0.5em] mb-8 uppercase"
                            >
                                Initializing System
                            </motion.div>
                            <motion.h1
                                className="text-6xl md:text-8xl font-black text-white mb-12 tracking-tighter"
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                B.M
                            </motion.h1>
                            <div className="w-64 h-1 bg-white/10 relative overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(progress, 100)}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <div className="text-primary/50 font-mono text-[10px] mt-4 tracking-widest">
                                {Math.floor(Math.min(progress, 100))}%
                            </div>
                        </div>
                    )}

                    {/* Classic Theme Loader */}
                    {isClassic && (
                        <div className="text-center">
                            <motion.h1
                                className="text-8xl md:text-[12rem] font-black text-black/10 mb-8 italic theme-title"
                                animate={{ opacity: [0.05, 0.15, 0.05] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                B.
                            </motion.h1>
                            <div className="w-32 h-[1px] bg-gray-200 mx-auto relative overflow-hidden">
                                <motion.div
                                    className="h-full bg-black"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(progress, 100)}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Animated Theme Loader */}
                    {isAnimated && (
                        <div className="text-center">
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="text-8xl mb-8"
                            >
                                🚀
                            </motion.div>
                            <motion.h1
                                className="text-6xl md:text-8xl font-black text-black mb-8 uppercase italic"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                LOADING!
                            </motion.h1>
                            <div className="w-64 h-4 bg-black border-4 border-black relative overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#ff007f]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(progress, 100)}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
