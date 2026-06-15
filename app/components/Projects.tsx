'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiArrowRight, FiTerminal, FiMaximize2 } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { projects, type Project } from '../data/projects';

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
function ProjectDetailLink({ project, variant = 'future' }: { project: Project; variant?: 'future' | 'classic' | 'animated' }) {
    if (!project.detailRoute) return null;

    const styles = {
        future: 'inline-flex items-center gap-2 px-4 py-2 border border-[#00cc66]/40 text-[#00cc66] font-mono text-[9px] uppercase tracking-widest hover:bg-[#00cc66]/10 transition-all',
        classic: 'inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-black border-b border-black pb-1 hover:opacity-60 transition-opacity',
        animated: 'inline-flex items-center gap-2 bg-[#00cc66] text-black px-4 py-2 font-black text-xs uppercase border-2 border-black hover:bg-yellow-400 transition-colors',
    };

    return (
        <Link href={project.detailRoute} className={`${styles[variant]} interactive`}>
            View Case Study {variant === 'future' ? <FiMaximize2 size={12} /> : <FiArrowRight size={14} />}
        </Link>
    );
}

function ProjectMetrics({ metrics, variant }: { metrics?: Project['metrics']; variant: 'future' | 'classic' }) {
    if (!metrics?.length) return null;

    if (variant === 'future') {
        return (
            <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-white/5">
                {metrics.map((m) => (
                    <div key={m.label}>
                        <div className="text-lg font-black text-white">{m.value}</div>
                        <div className="font-mono text-[8px] text-gray-600 uppercase tracking-widest">{m.label}</div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-gray-100">
            {metrics.map((m) => (
                <div key={m.label}>
                    <div className="text-2xl font-black theme-title text-black">{m.value}</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-gray-300 mt-1">{m.label}</div>
                </div>
            ))}
        </div>
    );
}

function FutureProjectCard({ project, index }: { project: Project; index: number }) {
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
            className="group relative h-[500px] w-full glass hud-border p-1 overflow-hidden cursor-pointer"
        >
            {project.detailRoute && (
                <Link
                    href={project.detailRoute}
                    className="absolute inset-0 z-20 interactive"
                    aria-label={`View ${project.title} case study`}
                />
            )}
            <div className="relative h-full w-full bg-[#020202] p-10 flex flex-col justify-between z-10 pointer-events-none">
                <div className="flex justify-between items-start font-mono text-[9px] text-primary/30 tracking-widest">
                    <span className="flex items-center gap-2"><div className="w-1 h-1 bg-primary animate-pulse" /> {project.id}</span>
                    <span className="text-primary">{project.achievement}</span>
                </div>

                <div className="mt-8">
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
                        className="flex flex-wrap gap-2 mb-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {project.stack.map((t: string) => (
                            <motion.span
                                key={t}
                                variants={staggerItem}
                                className="px-3 py-1 bg-white/5 font-mono text-[9px] text-primary/60 uppercase tracking-widest border border-white/10"
                            >
                                {t}
                            </motion.span>
                        ))}
                    </motion.div>
                    <ProjectMetrics metrics={project.metrics} variant="future" />
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                    {project.detailRoute ? (
                        <span className="inline-flex items-center gap-2 px-4 py-2 border border-[#00cc66]/40 text-[#00cc66] font-mono text-[9px] uppercase tracking-widest group-hover:bg-[#00cc66]/10 transition-all">
                            View Case Study <FiMaximize2 size={12} />
                        </span>
                    ) : null}
                </div>
            </div>
            <div className="absolute -top-32 -right-32 w-64 h-64 blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none" style={{ backgroundColor: project.color }} />
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
                    {projects.map((p, i) => <FutureProjectCard key={p.id} project={p} index={i} />)}
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
                    initial={false}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {projects.map((p, i) => (
                        <motion.div
                            key={p.id}
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
                                <ProjectMetrics metrics={p.metrics} variant="classic" />
                                {p.detailRoute && (
                                    <div className="mt-8">
                                        <ProjectDetailLink project={p} variant="classic" />
                                    </div>
                                )}
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
                            key={p.id}
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
                                className="mt-auto space-y-4"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                            >
                                <div className="bg-yellow-400 border-4 border-black p-4 font-black text-center uppercase">
                                    🏆 {p.achievement}
                                </div>
                                {p.detailRoute && <ProjectDetailLink project={p} variant="animated" />}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
