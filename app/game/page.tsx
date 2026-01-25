"use client";

import Link from "next/link";
import Scene from "../components/game/Scene";
import { ArrowLeft } from "lucide-react";

export default function GamePage() {
    return (
        <div className="w-full h-screen bg-neutral-900 relative">
            {/* UI Overlay */}
            <div className="absolute top-0 left-0 p-6 z-10 w-full flex justify-between pointer-events-none">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-white/80 hover:text-white pointer-events-auto bg-black/30 p-2 rounded-lg backdrop-blur-sm transition-all"
                >
                    <ArrowLeft size={20} />
                    <span>Exit Explorer</span>
                </Link>
                <div className="flex flex-col items-end gap-2 text-right">
                    <span className="bg-yellow-500/80 text-black px-3 py-1 rounded font-bold text-xs uppercase tracking-wider backdrop-blur-sm">
                        🚧 Beta / Under Development
                    </span>
                    <div className="text-white/80 bg-black/30 p-4 rounded-lg backdrop-blur-sm text-sm hidden md:block">
                        <p className="font-bold mb-1">Controls:</p>
                        <ul className="space-y-1">
                            <li>⬆️ / W : Accelerate</li>
                            <li>⬇️ / S : Reverse</li>
                            <li>⬅️ / A : Turn Left</li>
                            <li>➡️ / D : Turn Right</li>
                            <li>SPACE : Brake</li>
                            <li>R : Reset Car</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mobile Controls */}
            <div className="absolute bottom-6 w-full px-4 z-20 flex justify-between md:hidden pointer-events-none">
                {/* Steering & Nitro */}
                <div className="flex flex-col gap-4 pointer-events-auto">
                    <button
                        className="w-14 h-14 bg-cyan-500/40 backdrop-blur-md rounded-full flex items-center justify-center text-white active:bg-cyan-500/80 transition-all border-2 border-white/30 text-[10px] font-black"
                        onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }))}
                        onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift' }))}
                        onPointerLeave={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift' }))}
                    >
                        NITRO
                    </button>
                    <div className="flex gap-2">
                        <button
                            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white active:bg-white/30 transition-all border-2 border-white/20 text-2xl"
                            onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))}
                            onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }))}
                            onPointerLeave={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }))}
                        >
                            ←
                        </button>
                        <button
                            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white active:bg-white/30 transition-all border-2 border-white/20 text-2xl"
                            onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'd' }))}
                            onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'd' }))}
                            onPointerLeave={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'd' }))}
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Pedals & Reset */}
                <div className="flex flex-col gap-4 pointer-events-auto items-end">
                    <button
                        className="w-12 h-12 bg-red-500/30 backdrop-blur-md rounded-full flex items-center justify-center text-white active:bg-red-500/60 transition-all border-2 border-white/20 text-[8px] font-bold"
                        onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'r' }))}
                        onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'r' }))}
                    >
                        RESET
                    </button>
                    <div className="flex gap-2">
                        <button
                            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white active:bg-white/30 transition-all border-2 border-white/20 text-2xl"
                            onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }))}
                            onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 's' }))}
                            onPointerLeave={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 's' }))}
                        >
                            ↓
                        </button>
                        <button
                            className="w-16 h-16 bg-blue-500/30 backdrop-blur-md rounded-full flex items-center justify-center text-white active:bg-blue-500/60 transition-all border-2 border-white/20 text-2xl"
                            onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }))}
                            onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'w' }))}
                            onPointerLeave={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'w' }))}
                        >
                            ↑
                        </button>
                    </div>
                </div>
            </div>


            {/* 3D Scene */}
            <Scene />
        </div>
    );
}
