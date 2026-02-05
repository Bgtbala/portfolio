import { create } from 'zustand';

interface GameState {
    speed: number;
    driftScore: number;
    nitroActive: boolean;
    isNight: boolean;
    currentSection: string;
    carPosition: [number, number, number];

    setSpeed: (s: number) => void;
    addDriftPoints: (p: number) => void;
    setNitro: (active: boolean) => void;
    toggleDayNight: () => void;
    setCurrentSection: (s: string) => void;
    setCarPosition: (pos: [number, number, number]) => void;
}

export const useGameStore = create<GameState>((set) => ({
    speed: 0,
    driftScore: 0,
    nitroActive: false,
    isNight: false,
    currentSection: 'Start',
    carPosition: [0, 0, 20],

    setSpeed: (s) => set({ speed: s }),
    addDriftPoints: (p) => set((state) => ({ driftScore: state.driftScore + p })),
    setNitro: (active) => set({ nitroActive: active }),
    toggleDayNight: () => set((state) => ({ isNight: !state.isNight })),
    setCurrentSection: (s) => set({ currentSection: s }),
    setCarPosition: (pos) => set({ carPosition: pos }),
}));
