'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiMonitor, FiType, FiZap, FiMenu, FiX } from 'react-icons/fi';
import { useSoundEffects } from './SoundEffects';

const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const { playClick, playHover } = useSoundEffects(); // Use the hook
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hide tooltip after 10 seconds or on first theme change
    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(false), 10000);
        return () => clearTimeout(timer);
    }, []);

    const handleThemeChange = (newTheme: any) => {
        playClick(); // Play sound
        setTheme(newTheme);
        setShowTooltip(false);
    };

    const isClassic = theme === 'classic';
    const isAnimated = theme === 'animated';

    // Theme-specific navbar background
    const getNavBg = () => {
        if (isScrolled) {
            if (isClassic) return 'bg-white/95 backdrop-blur-md border-b border-gray-100';
            if (isAnimated) return 'bg-black/95 backdrop-blur-md border-b-4 border-[#ff007f]';
            return 'bg-[#020202]/95 backdrop-blur-md border-b border-primary/20';
        }
        return 'bg-transparent';
    };

    // Theme-specific text colors
    const getTextColor = () => {
        if (isClassic) return 'text-black';
        return 'text-white';
    };

    const getNavLinkColor = () => {
        if (isClassic) return 'text-gray-500 hover:text-black';
        if (isAnimated) return 'text-white/80 hover:text-[#ff007f]';
        return 'text-white/60 hover:text-primary';
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'} ${getNavBg()}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Brand */}
                <a
                    href="#home"
                    className={`text-2xl font-black theme-title transition-colors duration-500 ${getTextColor()}`}
                    onMouseEnter={playHover}
                >
                    {isClassic ? 'Bala.' : isAnimated ? 'BGT!' : 'B.M'}
                </a>

                {/* Desktop Nav */}
                <nav className={`hidden md:flex items-center gap-10`}>
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onMouseEnter={playHover}
                            className={`text-[11px] font-mono font-bold tracking-[0.15em] transition-colors uppercase ${getNavLinkColor()}`}
                        >
                            {item.name}
                        </a>
                    ))}

                    {/* Theme Buttons with Tooltip */}
                    <div className="relative">
                        {/* Blinking Tooltip */}
                        <AnimatePresence>
                            {showTooltip && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold z-50 ${isClassic
                                        ? 'bg-black text-white'
                                        : isAnimated
                                            ? 'bg-[#ff007f] text-white border-2 border-black'
                                            : 'bg-primary text-black'
                                        }`}
                                >
                                    <motion.span
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        ✨ Try different themes!
                                    </motion.span>
                                    <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${isClassic ? 'bg-black' : isAnimated ? 'bg-[#ff007f]' : 'bg-primary'
                                        }`} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className={`flex items-center gap-1 p-1.5 rounded-full border transition-all ${isClassic
                            ? 'border-gray-200 bg-gray-50'
                            : isAnimated
                                ? 'border-[#ff007f] bg-black'
                                : 'border-white/20 bg-white/5'
                            }`}>
                            {[
                                { id: 'future', icon: FiMonitor, label: 'Future' },
                                { id: 'classic', icon: FiType, label: 'Classic' },
                                { id: 'animated', icon: FiZap, label: 'Animated' }
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => handleThemeChange(t.id)}
                                    onMouseEnter={playHover}
                                    title={t.label}
                                    className={`p-2.5 rounded-full transition-all duration-300 ${theme === t.id
                                        ? isClassic
                                            ? 'bg-black text-white shadow-lg'
                                            : isAnimated
                                                ? 'bg-[#ff007f] text-white shadow-[0_0_20px_rgba(255,0,127,0.5)]'
                                                : 'bg-primary text-black shadow-[0_0_20px_rgba(0,242,255,0.5)]'
                                        : isClassic
                                            ? 'text-gray-400 hover:text-black hover:bg-gray-100'
                                            : 'text-white/40 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    <t.icon size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden p-2 ${getTextColor()}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`md:hidden absolute top-full left-0 right-0 p-6 flex flex-col gap-6 items-center shadow-xl ${isClassic
                            ? 'bg-white text-black'
                            : isAnimated
                                ? 'bg-black text-white border-b-4 border-[#ff007f]'
                                : 'bg-[#020202] text-white border-b border-primary/20'
                            }`}
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-xl font-black theme-title tracking-tighter uppercase"
                            >
                                {item.name}
                            </a>
                        ))}

                        <div className="text-xs font-mono text-center opacity-50 mt-4">Switch Theme</div>
                        <div className={`flex gap-4 pt-2 w-full justify-center`}>
                            {[
                                { id: 'future', icon: FiMonitor, label: 'Future' },
                                { id: 'classic', icon: FiType, label: 'Classic' },
                                { id: 'animated', icon: FiZap, label: 'Animated' }
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => { playClick(); handleThemeChange(t.id); setIsMenuOpen(false); }}
                                    className={`p-4 rounded-xl transition-all ${theme === t.id
                                            ? isClassic
                                                ? 'bg-black text-white'
                                                : isAnimated
                                                    ? 'bg-[#ff007f] text-white'
                                                    : 'bg-primary text-black'
                                            : isClassic
                                                ? 'border border-gray-200'
                                                : 'border border-white/20'
                                        }`}
                                >
                                    <t.icon size={20} />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
