'use client';

import { createContext, useContext, useCallback, useSyncExternalStore, useEffect } from 'react';

type Theme = 'future' | 'classic' | 'animated';

const DEFAULT_THEME: Theme = 'classic';
const STORAGE_KEY = 'portfolio-theme';
const VALID_THEMES: Theme[] = ['future', 'classic', 'animated'];

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    isReady: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function parseTheme(value: string | null): Theme {
    if (value && VALID_THEMES.includes(value as Theme)) {
        return value as Theme;
    }
    return DEFAULT_THEME;
}

function getThemeSnapshot(): Theme {
    return parseTheme(localStorage.getItem(STORAGE_KEY));
}

function getServerThemeSnapshot(): Theme {
    return DEFAULT_THEME;
}

function subscribeToTheme(callback: () => void) {
    const onStorage = (event: StorageEvent) => {
        if (event.key === STORAGE_KEY) callback();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('portfolio-theme-change', callback);
    return () => {
        window.removeEventListener('storage', onStorage);
        window.removeEventListener('portfolio-theme-change', callback);
    };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const setTheme = useCallback((newTheme: Theme) => {
        localStorage.setItem(STORAGE_KEY, newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        window.dispatchEvent(new Event('portfolio-theme-change'));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isReady: true }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
