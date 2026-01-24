'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
    const { theme } = useTheme();
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('button, a, .interactive');
            setIsHovering(!!isClickable);
        };

        const handleDown = () => setIsClicking(true);
        const handleUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);
        window.addEventListener('mousedown', handleDown);
        window.addEventListener('mouseup', handleUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
            window.removeEventListener('mousedown', handleDown);
            window.removeEventListener('mouseup', handleUp);
        };
    }, [cursorX, cursorY]);

    if (theme === 'classic') {
        return (
            <>
                <motion.div
                    className="fixed top-0 left-0 w-10 h-10 border-2 border-black rounded-full pointer-events-none z-[9999]"
                    style={{
                        x: cursorXSpring,
                        y: cursorYSpring,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                />
                <motion.div
                    className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full pointer-events-none z-[10000]"
                    style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
                />
            </>
        );
    }


    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                {theme === 'future' ? (
                    <>
                        <motion.div animate={{ rotate: isHovering ? 90 : 0 }} className="absolute inset-0">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-primary" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-primary" />
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-primary" />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-primary" />
                        </motion.div>
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40" />
                    </>
                ) : (
                    <motion.div
                        animate={{
                            scale: isHovering ? 1.5 : 1,
                            borderRadius: isHovering ? "0%" : "50%"
                        }}
                        className="absolute inset-0 border-4 border-[#ff007f] shadow-[4px_4px_0px_#000]"
                    />
                )}
            </motion.div>
            <motion.div className={`fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[10000] ${theme === 'future' ? 'bg-white' : 'bg-[#ff007f]'}`}
                style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }} />
        </>
    );
}
