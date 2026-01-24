'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
    SiNodedotjs, SiExpress, SiMongodb, SiAmazon, SiRedis, SiDocker,
} from 'react-icons/si';
import { FiArrowRight, FiCheck, FiCpu, FiHash } from 'react-icons/fi';

const allSkills = [
    { name: "React", icon: SiReact, color: '#61DAFB' },
    { name: "Next.js", icon: SiNextdotjs, color: '#FFFFFF' },
    { name: "TypeScript", icon: SiTypescript, color: '#3178C6' },
    { name: "Tailwind", icon: SiTailwindcss, color: '#06B6D4' },
    { name: "Node.js", icon: SiNodedotjs, color: '#339933' },
    { name: "Express", icon: SiExpress, color: '#FFFFFF' },
    { name: "MongoDB", icon: SiMongodb, color: '#47A248' },
    { name: "Docker", icon: SiDocker, color: '#2496ED' },
    { name: "AWS", icon: SiAmazon, color: '#FF9900' },
    { name: "Redis", icon: SiRedis, color: '#DC382D' },
];

const categories = [
    { title: "Frontend", skills: ["React 19", "Next.js 16", "TypeScript", "Tailwind 4"], icon: "✨" },
    { title: "Backend", skills: ["Node.js", "Express", "Microservices", "Socket.io"], icon: "⚙️" },
    { title: "Infrastructure", skills: ["AWS", "Docker", "CI/CD", "Redis"], icon: "☁️" }
];

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const staggerItem = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

export default function Skills() {
    const { theme } = useTheme();
    if (theme === 'classic') return <ClassicSkills />;
    if (theme === 'animated') return <AnimatedSkills />;
    return <FutureSkills />;
}

// --- Future Theme Layout ---
function FutureSkills() {
    return (
        <section id="skills" className="py-32 bg-[#020202] overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 mb-24">
                <motion.div
                    className="flex items-center gap-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <h2 className="text-4xl md:text-8xl font-black uppercase theme-title text-white tracking-tighter">THE ENGINE</h2>
                </motion.div>
            </div>

            <div className="relative py-16 animate-marquee whitespace-nowrap flex items-center gap-16 px-8 border-y border-white/5">
                {[...allSkills, ...allSkills].map((skill, i) => (
                    <div key={i} className="flex items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
                        <skill.icon size={40} style={{ color: skill.color }} />
                        <span className="font-mono text-xs uppercase tracking-widest text-white">{skill.name}</span>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-32">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                >
                    {categories.map((cat, i) => (
                        <motion.div
                            key={i}
                            variants={staggerItem}
                            className="glass hud-border p-12 hover:border-primary transition-all"
                        >
                            <h3 className="text-3xl font-black mb-8 theme-title text-white uppercase">{cat.title}</h3>
                            <motion.div
                                className="flex flex-wrap gap-2"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {cat.skills.map((s, si) => (
                                    <motion.span
                                        key={s}
                                        variants={staggerItem}
                                        className="px-4 py-1.5 bg-white/5 text-[10px] font-mono text-gray-500 border border-white/5 uppercase"
                                    >
                                        &gt; {s}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// --- Classic Theme Layout ---
function ClassicSkills() {
    return (
        <section id="skills" className="py-32 bg-[#fcfbf7] text-black">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="mb-20 border-b border-gray-100 pb-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <h3 className="text-5xl md:text-6xl theme-title leading-[0.9] tracking-tighter">Stack.</h3>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-1 px-[1px] bg-gray-100"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                >
                    {categories.map((cat, i) => (
                        <motion.div
                            key={i}
                            variants={staggerItem}
                            className="bg-[#fcfbf7] p-16 group hover:bg-black transition-all duration-700"
                        >
                            <h4 className="text-[10px] font-mono uppercase tracking-[0.6em] text-gray-300 group-hover:text-gray-500 mb-12">{cat.title}</h4>
                            <motion.div
                                className="space-y-10"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {cat.skills.map((s, si) => (
                                    <motion.div
                                        key={si}
                                        variants={staggerItem}
                                        className="flex items-center justify-between"
                                    >
                                        <span className="text-4xl theme-title italic text-black group-hover:text-white transition-colors duration-500">
                                            {s}
                                        </span>
                                        <FiCheck className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" size={20} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// --- Animated Theme Layout ---
function AnimatedSkills() {
    return (
        <section id="skills" className="py-32 bg-[#0d0221] text-black">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    className="inline-block mb-24"
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    <div className="bg-white border-[8px] border-black p-8 shadow-[20px_20px_0px_#ff007f]">
                        <h2 className="text-6xl md:text-8xl font-black theme-title uppercase italic">SKILLS!</h2>
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                >
                    {categories.map((cat, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 50, rotate: i % 2 === 0 ? -5 : 5 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    rotate: 0,
                                    transition: { type: "spring", stiffness: 100, damping: 12 }
                                }
                            }}
                            whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                            className="bg-white border-[8px] border-black p-12 shadow-[25px_25px_0px_#00f2ff]"
                        >
                            <motion.div
                                className="text-7xl mb-10"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                {cat.icon}
                            </motion.div>
                            <h3 className="text-4xl font-black text-black mb-10 theme-title italic uppercase">{cat.title}</h3>
                            <motion.div
                                className="flex flex-wrap gap-4 justify-center"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {cat.skills.map((s, si) => (
                                    <motion.span
                                        key={s}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0 },
                                            visible: {
                                                opacity: 1,
                                                scale: 1,
                                                transition: { type: "spring", stiffness: 300, damping: 15 }
                                            }
                                        }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="px-6 py-2 bg-black text-white text-sm font-black uppercase border-4 border-black hover:bg-[#ff007f] transition-colors cursor-default"
                                    >
                                        {s}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
