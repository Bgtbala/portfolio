'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ScrollProgress() {
    const { theme } = useTheme();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const isClassic = theme === 'classic';
    const isAnimated = theme === 'animated';

    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 h-1 origin-left z-[200] ${isClassic
                    ? 'bg-black'
                    : isAnimated
                        ? 'bg-[#ff007f]'
                        : 'bg-primary shadow-[0_0_10px_rgba(0,242,255,0.8)]'
                }`}
            style={{ scaleX }}
        />
    );
}
