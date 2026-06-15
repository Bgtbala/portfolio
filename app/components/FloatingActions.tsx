'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiArrowUp, FiDownload } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

import { usePathname } from 'next/navigation';

export default function FloatingActions() {
    const { theme } = useTheme();
    const pathname = usePathname();
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Hide on game and project detail pages
    if (pathname === '/game' || pathname.startsWith('/projects/')) return null;

    const isClassic = theme === 'classic';
    const isAnimated = theme === 'animated';

    const resumeLink = "https://drive.google.com/file/d/1BtRKRVdik1QobaDPs_qz7lszKVY3CuGv/view";

    return (
        <div className="fixed bottom-6 right-[5.25rem] sm:bottom-8 sm:right-[5.75rem] z-[150] flex flex-col gap-3 items-center">
            {/* Download Resume Button */}
            <motion.a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all group ${isClassic
                    ? 'bg-black text-white hover:bg-gray-800'
                    : isAnimated
                        ? 'bg-[#ff007f] text-white border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                        : 'bg-primary text-black hover:shadow-[0_0_30px_rgba(0,242,255,0.5)]'
                    }`}
                title="Download Resume"
            >
                <FiDownload size={24} className="group-hover:animate-bounce" />
            </motion.a>

            {/* Back to Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToTop}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isClassic
                            ? 'bg-white text-black border border-gray-200 hover:bg-gray-50'
                            : isAnimated
                                ? 'bg-[#00f2ff] text-black border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-primary'
                            }`}
                        title="Back to Top"
                    >
                        <FiArrowUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
