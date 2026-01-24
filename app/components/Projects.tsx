'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiExternalLink, FiTerminal, FiLayers, FiMaximize2, FiGithub } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const projects = [
    {
        id: "P_01",
        title: 'Filmox',
        category: 'Social Platform',
        description: 'MERN-based platform for personalized content and contests with real-time chat using WebSockets. Redis caching improved feed loading by ~40%.',
        stack: ['MERN', 'Socket.io', 'Redis', 'AWS'],
        achievement: '40% faster feeds',
        color: '#7000ff'
    },
    {
        id: "P_02",
        title: 'Vaidyog',
        category: 'Healthcare Portal',
        description: 'Healthcare job platform with secure role-based authentication. MongoDB aggregations reduced API latency by 47%.',
        stack: ['MERN', 'MongoDB Aggregation', 'AWS'],
        achievement: '47% reduced latency',
        color: '#4400ff'
    },
    {
        id: "P_03",
        title: 'GOG Eco',
        category: 'Sustainability Platform',
        description: 'Domain-based initiative platform with role-specific interfaces for Admin, Franchise, and Users. Green Coin reward system.',
        stack: ['Next.js', 'API Integration', 'Role-Based UI', 'AWS'],
        achievement: 'Green Coin rewards',
        color: '#00ff88'
    },
    {
        id: "P_04",
        title: 'Samurai',
        category: 'Manufacturing System',
        description: 'Manufacturing workflow system connecting order processing, job tracking, and inventory. Reduced system errors by ~60%.',
        stack: ['MERN', 'WebSockets', 'Inventory Automation', 'AWS'],
        achievement: '60% fewer errors',
        color: '#ff8800'
    }
];

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const staggerItem = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5 }
    }
};

export default function Projects() {
    const { theme } = useTheme();
    if (theme === 'classic') return <ClassicProjects />;
    if (theme === 'animated') return <AnimatedProjects />;
    return <FutureProjects />;
}

// --- Future Theme Layout ---
function FutureProjectCard({ project, index }: { project: any, index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { damping: 50, stiffness: 400 });
    const mouseYSpring = useSpring(y, { damping: 50, stiffness: 400 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative h-[500px] w-full glass hud-border p-1 overflow-hidden"
        >
            <div className="relative h-full w-full bg-[#020202] p-10 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start font-mono text-[9px] text-primary/30 tracking-widest">
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-primary animate-pulse" /> {project.id}</span>
                    <span className="text-primary">{project.achievement}</span>
                </div>

                <div style={{ transform: "translateZ(60px)" }} className="mt-8">
                    <div className="flex items-center gap-4 mb-4 text-primary">
                        <FiTerminal size={14} />
                        <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-60">{project.category}</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none group-hover:gradient-text transition-all">
                        {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light italic">
                        {project.description}
                    </p>
                    <motion.div
                        className="flex flex-wrap gap-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {project.stack.map((t: string, i: number) => (
                            <motion.span
                                key={t}
                                variants={staggerItem}
                                className="px-3 py-1 bg-white/5 font-mono text-[9px] text-primary/60 uppercase tracking-widest border border-white/10"
                            >
                                {t}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/20 hover:text-primary hover:border-primary transition-all cursor-pointer">
                            <FiGithub size={16} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -top-32 -right-32 w-64 h-64 blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: project.color }} />
        </motion.div>
    );
}

function FutureProjects() {
    return (
        <section id="projects" className="py-32 bg-[#020202]">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    className="flex items-center gap-10 mb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <h2 className="text-4xl md:text-8xl font-black uppercase theme-title text-white tracking-tighter">PROJECTS</h2>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {projects.map((p, i) => <FutureProjectCard key={i} project={p} index={i} />)}
                </div>
            </div>
        </section>
    );
}

// --- Classic Theme Layout ---
function ClassicProjects() {
    return (
        <section id="projects" className="py-32 bg-[#fcfbf7] text-black">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="mb-20 border-b border-gray-100 pb-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <h3 className="text-5xl md:text-6xl theme-title leading-[0.9] tracking-tighter">Projects.</h3>
                </motion.div>

                <motion.div
                    className="space-y-16"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {projects.map((p, i) => (
                        <motion.div
                            key={i}
                            variants={staggerItem}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-gray-100 last:border-b-0"
                        >
                            <div className="lg:col-span-1">
                                <span className="text-xs font-mono text-gray-200 font-bold tracking-widest">/0{i + 1}</span>
                            </div>

                            <div className="lg:col-span-5">
                                <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 mb-4">{p.category}</h4>
                                <h3 className="text-5xl md:text-6xl theme-title text-black leading-none tracking-tighter mb-6">
                                    {p.title}
                                </h3>
                                <p className="text-gray-500 font-light text-lg leading-relaxed">
                                    {p.description}
                                </p>
                            </div>

                            <div className="lg:col-span-6 space-y-8">
                                <div className="space-y-4">
                                    <h5 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 border-b border-gray-100 pb-2">Tech Stack</h5>
                                    <motion.div
                                        className="flex flex-wrap gap-2"
                                        variants={staggerContainer}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        {p.stack.map((tech: string, ti: number) => (
                                            <motion.span
                                                key={tech}
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0.8 },
                                                    visible: { opacity: 1, scale: 1, transition: { delay: ti * 0.05 } }
                                                }}
                                                className="text-sm font-mono text-gray-600 border border-gray-100 px-4 py-2"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </div>

                                <div className="space-y-4">
                                    <h5 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 border-b border-gray-100 pb-2">Key Achievement</h5>
                                    <p className="text-xl font-bold theme-title italic text-black">{p.achievement}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// --- Animated Theme Layout ---
function AnimatedProjects() {
    return (
        <section id="projects" className="py-32 bg-[#00f2ff] relative text-black">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="inline-block mb-20"
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    <div className="bg-black text-white px-10 py-6 border-[6px] border-white shadow-[15px_15px_0px_#ff007f]">
                        <h2 className="text-5xl md:text-7xl font-black uppercase theme-title tracking-tight italic">PROJECTS!</h2>
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {projects.map((p, i) => (
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
                            className="bg-white border-[6px] border-black p-10 shadow-[20px_20px_0px_#000] flex flex-col"
                        >
                            <h3 className="text-4xl theme-title text-black mb-4 uppercase leading-tight font-black">{p.title}</h3>
                            <p className="text-gray-800 font-bold italic mb-6">{p.description}</p>

                            <motion.div
                                className="flex flex-wrap gap-2 mb-6"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {p.stack.map((tech: string) => (
                                    <motion.span
                                        key={tech}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0 },
                                            visible: {
                                                opacity: 1,
                                                scale: 1,
                                                transition: { type: "spring", stiffness: 300 }
                                            }
                                        }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="bg-black text-white px-3 py-1 text-xs font-black uppercase border-2 border-black cursor-default"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </motion.div>

                            <motion.div
                                className="mt-auto bg-yellow-400 border-4 border-black p-4 font-black text-center uppercase"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                            >
                                🏆 {p.achievement}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
