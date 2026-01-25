"use client";

import { useGameStore } from "./GameState";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Trophy, MapPin, Moon, Sun } from "lucide-react";

export default function HUD() {
    const { speed, driftScore, nitroActive, currentSection, isNight, toggleDayNight } = useGameStore();

    return (
        <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-8 font-mono">
            {/* Top Bar */}
            <div className="flex justify-between items-start">
                <div className="bg-black/60 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4 text-white">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/50">Current Location</div>
                        <div className="text-xl font-bold tracking-tight">{currentSection}</div>
                    </div>
                </div>

                <button
                    onClick={toggleDayNight}
                    className="pointer-events-auto bg-black/60 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4 text-white hover:bg-white/10 transition-colors"
                >
                    {isNight ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-indigo-400" />}
                </button>
            </div>

            {/* Bottom Section - Repositioned for Mobile to avoid control overlap */}
            <div className="flex justify-between items-end md:mb-0 mb-40">
                {/* Speedometer */}
                <div className="bg-black/60 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-2xl text-white min-w-[140px] md:min-w-[200px]">
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                        <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/50">Velocity</span>
                        {nitroActive && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-1 text-cyan-400 text-[8px] md:text-[10px] font-black"
                            >
                                <Rocket className="w-3 h-3" /> NITRO
                            </motion.div>
                        )}
                    </div>
                    <div className="flex items-baseline gap-1 md:gap-2">
                        <span className="text-4xl md:text-6xl font-black italic tracking-tighter">{speed}</span>
                        <span className="text-sm md:text-xl font-bold text-white/30 italic">KM/H</span>
                    </div>
                </div>

                {/* Score / Drifts */}
                <div className="bg-black/60 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-2xl text-white text-right h-fit">
                    <div className="flex items-center justify-end gap-2 mb-1">
                        <Trophy className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
                        <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/50">Drift Score</span>
                    </div>
                    <div className="text-2xl md:text-4xl font-black">{driftScore.toLocaleString()}</div>
                </div>
            </div>


            {/* Controls Info - Hidden on Mobile */}
            <div className="fixed bottom-32 left-1/2 -translate-x-1/2 hidden md:flex gap-4 text-white/40 text-[10px] tracking-[0.2em] font-bold">
                <span>[W/A/S/D] DRIVE</span>
                <span>[SPACE] BRAKE</span>
                <span>[SHIFT] NITRO</span>
                <span>[R] RESET</span>
            </div>

        </div>
    );
}
