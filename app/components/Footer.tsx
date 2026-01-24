'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiHeart, FiGlobe, FiCommand } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
    const { theme } = useTheme();
    const isClassic = theme === 'classic';
    const isAnimated = theme === 'animated';

    const socials = [
        { icon: FiGithub, href: "https://github.com/Bgtbala", label: "GITHUB" },
        { icon: FiLinkedin, href: "https://www.linkedin.com/in/balagangatharan17/", label: "LINKEDIN" },
        { icon: FiMail, href: "mailto:balagangatharan17@gmail.com", label: "EMAIL" }
    ];

    if (isClassic) return <ClassicFooter socials={socials} />;
    if (isAnimated) return <AnimatedFooter socials={socials} />;

    return <FutureFooter socials={socials} />;
}

// --- Future Theme Layout (Intensified HUD Version) ---
function FutureFooter({ socials }: { socials: any[] }) {
    return (
        <footer className="py-24 border-t border-white/5 bg-[#020202] relative text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-16">
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <div className="text-3xl font-black gradient-text tracking-tighter theme-title uppercase">BALAGANGATHARAN</div>
                            <div className="h-[1px] w-full bg-gradient-to-r from-primary to-transparent opacity-20" />
                        </div>
                        <div className="flex items-center gap-6 text-primary/40 font-mono text-[9px] tracking-[0.5em] uppercase">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,242,255,0.8)]" />
                                <span>SYSTEM_OFFLINE_READY</span>
                            </div>
                            <div className="hidden sm:block">LOCAL_COORD: 12.9716° N</div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-8 text-right">
                        <div className="flex gap-8">
                            {socials.map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="p-4 border border-white/5 hover:border-primary hover:text-primary transition-all group">
                                    <s.icon size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                        <div className="flex items-center gap-6 font-mono text-[9px] text-white/20 uppercase tracking-[1em]">
                            <span>© 2026 // BGT_CORE</span>
                            <div className="h-[10px] w-[1px] bg-white/10" />
                            <span>MADE_IN_INDIA</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// --- Classic Theme Layout (High-Design 'Document Signature') ---
function ClassicFooter({ socials }: { socials: any[] }) {
    return (
        <footer className="py-60 bg-[#fcfbf7] border-t border-gray-100 text-black">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 relative">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="space-y-4">
                            <h4 className="text-3xl theme-title text-black italic font-light italic">Balagangatharan M.</h4>
                            <div className="w-12 h-[1px] bg-black" />
                        </div>
                        <p className="text-gray-400 font-light max-w-sm leading-relaxed text-xl">
                            Engineering thoughtful digital experiences with a relentless commitment to structural integrity and refined design logic.
                        </p>
                    </div>

                    <div>
                        <h5 className="text-[10px] font-mono uppercase tracking-[0.6em] text-gray-300 mb-12 border-b border-gray-50 pb-6">Information_Index</h5>
                        <ul className="space-y-6 font-mono text-xs text-black uppercase tracking-[0.3em]">
                            <li><a href="#home" className="hover:opacity-30 flex items-center gap-4">/ Home Recap <FiGlobe /></a></li>
                            <li><a href="#projects" className="hover:opacity-30 flex items-center gap-4">/ Work Index <FiCommand /></a></li>
                            <li className="text-gray-200">Current Status: Open</li>
                        </ul>
                    </div>

                    <div className="flex flex-col justify-end lg:items-end">
                        <div className="flex flex-col gap-6 lg:text-right">
                            <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-gray-300">Socials_Connect</span>
                            {socials.map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-black theme-title italic hover:opacity-40 transition-all text-2xl">
                                    {s.label}.
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-40 pt-20 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-12 font-mono text-[10px] text-gray-200 uppercase tracking-[1em]">
                    <div className="flex items-center gap-8">
                        <span>© 2026 // Bala</span>
                        <div className="w-24 h-[1px] bg-gray-100" />
                    </div>
                    <span className="italic">Designed for world-class standards</span>
                </div>
            </div>
        </footer>
    );
}

// --- Animated Theme Layout (High-Energy 'Mission Clear') ---
function AnimatedFooter({ socials }: { socials: any[] }) {
    return (
        <footer className="py-24 bg-black text-white relative border-t-[10px] border-white overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,white,white_10px,transparent_10px,transparent_20px)]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                <div className="flex flex-col items-center gap-16">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="bg-[#ff007f] border-[6px] border-white px-12 py-6 shadow-[15px_15px_0px_#00f2ff] font-black text-white text-5xl theme-title italic uppercase tracking-tighter"
                    >
                        THANKS_4_WATCHING! 🎬
                    </motion.div>

                    <div className="flex gap-8">
                        {socials.map((s, i) => (
                            <motion.a
                                key={i}
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                href={s.href} target="_blank" rel="noopener noreferrer"
                                className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center text-black hover:bg-[#00f2ff] transition-all shadow-[8px_8px_0px_#ff007f] active:shadow-none active:translate-x-2 active:translate-y-2"
                            >
                                <s.icon size={32} />
                            </motion.a>
                        ))}
                    </div>

                    <div className="w-full flex flex-col items-center gap-10">
                        <div className="bg-[#00f2ff] text-black px-12 py-4 font-black text-lg uppercase tracking-widest border-[6px] border-black shadow-[10px_10px_0px_#ff007f] transform rotate-1">
                            MADE WITH 🔥 IN INDIA!
                        </div>
                        <div className="space-y-2">
                            <p className="text-white/40 font-mono text-[10px] uppercase tracking-[1.5em] mt-16">MISSION_CLEAR // 2026 // BALA</p>
                            <div className="flex justify-center gap-4 text-white/5 font-black text-9xl">GGWP</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
