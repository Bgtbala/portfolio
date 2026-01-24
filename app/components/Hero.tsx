'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub, FiLinkedin, FiArrowRight, FiCpu, FiGlobe, FiShield, FiTerminal, FiZap, FiActivity, FiLayers } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useSoundEffects } from './SoundEffects';

export default function Hero() {
    const { theme } = useTheme();
    const isClassic = theme === 'classic';
    const isAnimated = theme === 'animated';

    if (isClassic) return <ClassicHero />;
    if (isAnimated) return <AnimatedHero />;
    return <FutureHero />;
}

// --- Future Theme Layout (Technical Command Center) ---
function FutureHero() {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#020202]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 scanline-intensified opacity-20 pointer-events-none" />

            <div className="absolute inset-0 p-10 pointer-events-none opacity-20">
                <div className="w-full h-full border border-primary/20 relative">
                    <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-primary space-y-1">
                        <div>LAT: 12.9716° N</div>
                        <div>LNG: 77.5946° E</div>
                        <div>NODE_STABILITY: 100%</div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4 text-primary bg-primary/5 w-fit px-4 py-2 border border-primary/20">
                                <FiTerminal size={14} className="animate-pulse" />
                                <span className="font-mono text-xs tracking-[0.4em] uppercase">System_Active // Port_17</span>
                            </div>

                            <div className="relative">
                                <h1 className="text-5xl md:text-[8vw] font-black text-white leading-none tracking-tighter uppercase inline-block">
                                    BALA<br />GANGATHARAN
                                </h1>
                                <div className="absolute -bottom-4 left-0 w-24 h-1 bg-primary shadow-[0_0_20px_rgba(0,242,255,1)]" />
                            </div>

                            <p className="text-gray-400 text-xl font-light max-w-2xl leading-relaxed italic border-l-2 border-primary/30 pl-8">
                                Architecting high-integrity systems.
                            </p>

                            <div className="flex flex-wrap gap-6 pt-8">
                                <a href="#projects" className="group relative px-10 py-5 bg-primary overflow-hidden">
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                                    <span className="relative z-10 font-mono text-black font-black uppercase tracking-[0.2em] flex items-center gap-4 transition-transform group-hover:translate-x-2">
                                        Initialize_Projects <FiArrowRight />
                                    </span>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="glass hud-border p-10 space-y-12 bg-black/40 relative">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <motion.div
                                    animate={{ y: ['-100%', '200%'] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-20 bg-primary/10 blur-xl"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-mono text-primary/60">
                                    <span>CORE_STATUS</span>
                                    <span>98.4%</span>
                                </div>
                                <div className="w-full h-1 bg-white/5"><motion.div initial={{ width: 0 }} animate={{ width: '98%' }} transition={{ duration: 2 }} className="h-full bg-primary" /></div>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { icon: FiCpu, label: "Processing", val: "Full_Stack" },
                                    { icon: FiLayers, label: "Structure", val: "Microservices" },
                                    { icon: FiActivity, label: "Heartbeat", val: "Active_24/7" }
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                                        <div className="w-12 h-12 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                            <stat.icon size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.3em]">{stat.label}</span>
                                            <span className="text-sm font-bold text-white uppercase tracking-widest">{stat.val}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Classic Theme Layout (Name-Focused) ---
function ClassicHero() {
    return (
        <section id="home" className="min-h-screen flex items-center relative px-6 md:px-24 bg-[#fcfbf7] overflow-hidden text-black">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vw] font-black text-black/[0.02] select-none pointer-events-none family-serif z-0 italic">
                B.
            </div>

            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                <div className="lg:col-span-8 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Small Job Title */}
                        <span className="text-sm font-mono uppercase tracking-[0.4em] text-gray-400 mb-6 block">Full Stack Developer</span>

                        {/* Large Name - The Focus */}
                        <h1 className="text-6xl md:text-[10vw] theme-title leading-[0.85] tracking-tighter mb-8">
                            Balagangatharan <br />
                            <span className="italic font-light text-gray-300">M.</span>
                        </h1>

                        <p className="text-xl text-gray-500 font-light leading-relaxed max-w-lg mb-10">
                            Building scalable web applications with MERN & Next.js. 1+ years of experience.
                        </p>

                        <a href="#projects" className="group inline-flex items-center gap-8 border-t border-black pt-6 transition-all hover:opacity-50">
                            <span className="text-lg theme-title italic tracking-tight">View Projects</span>
                            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                                <FiArrowRight size={20} />
                            </div>
                        </a>
                    </motion.div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-end pb-16">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="space-y-8 border-l border-gray-100 pl-12 py-8"
                    >
                        {[
                            { label: "Location", val: "Bengaluru, India" },
                            { label: "Experience", val: "1+ Years" },
                            { label: "Stack", val: "MERN / Next.js" }
                        ].map((item, i) => (
                            <div key={i} className="space-y-1">
                                <span className="text-[9px] font-mono uppercase text-gray-300 tracking-[0.3em]">{item.label}</span>
                                <p className="text-sm font-bold uppercase tracking-wide">{item.val}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}


// --- Animated Theme Layout (Maximum Neobrutalist Impact) ---
function AnimatedHero() {
    const { playClick, playHover } = useSoundEffects();

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#ffea00] p-6 lg:p-20">
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-5%] text-[30vw] opacity-10 leading-none select-none"
                >
                    ✱
                </motion.div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#ff007f] rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#00f2ff] rounded-full blur-3xl opacity-20" />
            </div>

            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="space-y-12"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            onMouseEnter={playHover}
                            className="bg-black text-white px-8 py-4 border-4 border-black shadow-[8px_8px_0px_#ff007f] w-fit transform -rotate-1 cursor-default"
                        >
                            <h2 className="text-2xl font-black theme-title italic uppercase tracking-tighter">BGT_BALA_v2.0</h2>
                        </motion.div>

                        <h1 className="text-7xl md:text-[11vw] font-black text-black leading-[0.8] tracking-tighter uppercase italic text-black">
                            FULL STACK<br /><span className="text-[#ff007f]">OVERPOWERED.</span>
                        </h1>

                        <div className="bg-white border-[6px] border-black p-10 shadow-[20px_20px_0px_#000] max-w-2xl transform rotate-1">
                            <p className="text-2xl md:text-4xl font-black text-black leading-none uppercase italic border-l-[12px] border-black pl-8 mb-10">
                                "Slaying bugs since 2024!"
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <a
                                    href="#projects"
                                    onMouseEnter={playHover}
                                    onClick={playClick}
                                    className="bg-[#ff007f] text-white px-10 py-6 font-black text-2xl shadow-[8px_8px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all active:scale-95 uppercase border-4 border-black inline-block flex items-center gap-4"
                                >
                                    Start Quest! <FiZap />
                                </a>
                                <div className="flex gap-4">
                                    <a
                                        href="https://github.com/Bgtbala"
                                        target="_blank"
                                        onMouseEnter={playHover}
                                        onClick={playClick}
                                        className="w-16 h-16 bg-[#00f2ff] border-4 border-black flex items-center justify-center text-black shadow-[5px_5px_0px_#000] hover:rotate-6 transition-transform cursor-pointer"
                                    >
                                        <FiGithub size={32} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="lg:col-span-4 hidden lg:block">
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-full aspect-square bg-white border-[12px] border-black shadow-[40px_40px_0px_#ff007f] relative flex items-center justify-center"
                    >
                        <div className="grid grid-cols-2 gap-4 p-8 w-full h-full text-9xl">
                            <motion.div whileHover={{ scale: 1.1 }} onMouseEnter={playHover} className="bg-yellow-400 border-[6px] border-black flex items-center justify-center">🔥</motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} onMouseEnter={playHover} className="bg-[#00f2ff] border-[6px] border-black flex items-center justify-center">💎</motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} onMouseEnter={playHover} className="bg-black text-white border-[6px] border-black flex items-center justify-center">🚀</motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} onMouseEnter={playHover} className="bg-[#ff007f] border-[6px] border-black flex items-center justify-center">✨</motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

