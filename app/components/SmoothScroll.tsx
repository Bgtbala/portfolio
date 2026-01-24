'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    const [currentSection, setCurrentSection] = useState('home');

    useEffect(() => {
        // Add smooth scroll behavior to the document
        document.documentElement.style.scrollBehavior = 'smooth';

        // Intersection Observer for section tracking
        const sections = document.querySelectorAll('section[id]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrentSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={theme}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
