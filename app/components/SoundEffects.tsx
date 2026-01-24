'use client';

import { useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

// Sound URLs (using public domain sounds)
const sounds = {
    click: 'data:audio/wav;base64,UklGRl9vT19telegramBOQU1NNOOGGAAAAAAAAAAAAAhCAAAA',
    hover: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ=='
};

export function useSoundEffects() {
    const { theme } = useTheme();
    const audioContextRef = useRef<AudioContext | null>(null);

    const playSound = useCallback((type: 'click' | 'hover') => {
        if (theme !== 'animated') return;

        try {
            // Create a simple beep sound using Web Audio API
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }

            const ctx = audioContextRef.current;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            if (type === 'click') {
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.1;
                oscillator.type = 'sine';
            } else {
                oscillator.frequency.value = 1200;
                gainNode.gain.value = 0.05;
                oscillator.type = 'sine';
            }

            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            oscillator.stop(ctx.currentTime + 0.1);
        } catch (e) {
            // Audio not supported or blocked
        }
    }, [theme]);

    const playClick = useCallback(() => playSound('click'), [playSound]);
    const playHover = useCallback(() => playSound('hover'), [playSound]);

    return { playClick, playHover, isEnabled: theme === 'animated' };
}

// Component to add sound effects to interactive elements
export default function SoundEffectsProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
