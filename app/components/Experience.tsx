'use client';

import { motion } from 'framer-motion';
import { FiCalendar, FiZap, FiStar, FiChevronRight, FiMinus, FiCpu, FiActivity } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Experience() {
    const { theme } = useTheme();
    if (theme === 'classic') return <ClassicExperience />;
    if (theme === 'animated') return <AnimatedExperience />;
    return <FutureExperience />;
}

// --- Future Theme Layout ---
function FutureExperience() {
    const responsibilities = [
        'Developed scalable full-stack applications using React, Next.js, Node.js, Express, and MongoDB/SQL.',
        'Implemented secure authentication with JWT and optimized API performance.',
        'Managed CI/CD pipelines and deployed applications on AWS.',
        'Collaborated with cross-functional teams in Agile environments.',
        'Mentored junior developers to ensure timely delivery.'
    ];

    return (
        <section id="experience" className="py-32 bg-[#020202] relative">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    className="mb-32 flex items-center gap-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <div className="w-24 h-[1px] bg-primary opacity-30" />
                    <h2 className="text-4xl md:text-8xl font-black uppercase theme-title text-white tracking-tighter">EXPERIENCE</h2>
                </motion.div>

                <motion.div
                    className="glass hud-border p-12 relative overflow-hidden group hover:border-primary/50 transition-colors duration-700"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                >
                    <div className="flex flex-col lg:flex-row gap-16 relative z-10">
                        <div className="lg:w-1/3">
                            <span className="font-mono text-primary text-xs tracking-widest block mb-4">JUL 2024 — PRESENT</span>
                            <h3 className="text-4xl md:text-5xl font-black theme-title text-white uppercase tracking-tight leading-none mb-6">Software <br /> Engineer</h3>
                            <p className="text-primary font-mono text-sm uppercase tracking-widest">(MERN) @ Kods Tech</p>
                        </div>
                        <motion.div
                            className="lg:w-2/3 space-y-6"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {responsibilities.map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={slideInLeft}
                                    className="flex gap-6 items-start"
                                >
                                    <span className="text-primary font-mono text-xs opacity-40">[0{i + 1}]</span>
                                    <p className="text-gray-400 font-light text-sm leading-relaxed">{item}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// --- Classic Theme Layout ---
function ClassicExperience() {
    const responsibilities = [
        "Developed scalable full-stack applications using React, Next.js, Node.js, Express, and MongoDB/SQL, delivering high-performance solutions.",
        "Implemented secure authentication with JWT and optimized API performance, ensuring reliability and seamless user experience.",
        "Managed CI/CD pipelines and deployed applications on AWS, enhancing deployment efficiency and system uptime.",
        "Collaborated with cross-functional teams in Agile environments to meet project goals and deliver client-ready solutions.",
        "Assisted and mentored junior developers to ensure smooth project progress and timely delivery."
    ];

    return (
        <section id="experience" className="py-32 bg-[#fcfbf7] text-black">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="mb-20 border-b border-gray-100 pb-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <h3 className="text-5xl md:text-6xl theme-title leading-[0.9] tracking-tighter">Experience.</h3>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative group">
                    <motion.div
                        className="lg:col-span-4 lg:border-r lg:border-gray-100 lg:pr-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="flex flex-col gap-6">
                            <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">July 2024 — Present</span>
                            <h4 className="text-5xl theme-title text-black leading-[0.9] italic font-light">Software <br /> Engineer (MERN)</h4>
                            <p className="text-xl font-bold theme-title italic">Kods Technology Pvt. Ltd.</p>
                            <p className="text-gray-400 text-sm">Bengaluru, India</p>
                        </div>

                        <motion.div
                            className="mt-16 space-y-4"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h5 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 border-b border-gray-100 pb-2">Technologies Used</h5>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'AWS', 'Docker'].map((tech, i) => (
                                    <motion.span
                                        key={tech}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.8 },
                                            visible: { opacity: 1, scale: 1, transition: { delay: i * 0.05 } }
                                        }}
                                        className="text-xs font-mono text-gray-500 border border-gray-100 px-3 py-1"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    <div className="lg:col-span-8 lg:pl-16">
                        <h5 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 border-b border-gray-100 pb-2 mb-12">Key Responsibilities</h5>
                        <motion.div
                            className="grid grid-cols-1 gap-y-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {responsibilities.map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={slideInLeft}
                                    className="flex items-start gap-8"
                                >
                                    <span className="text-xs font-mono text-gray-200 font-bold tracking-widest mt-1">/0{i + 1}</span>
                                    <p className="text-lg text-gray-500 font-light leading-relaxed">{item}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Animated Theme Layout ---
function AnimatedExperience() {
    const responsibilities = [
        "Full-stack with MERN & Next.js",
        "JWT Auth & API Optimization",
        "AWS Deployments & CI/CD",
        "Agile Team Collaboration",
        "Mentoring Junior Devs"
    ];

    return (
        <section id="experience" className="py-32 bg-[#0d0221] relative overflow-hidden text-black">
            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
                <motion.div
                    className="mb-24"
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: -1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    <div className="bg-white border-[8px] border-black p-10 shadow-[20px_20px_0px_#ff007f]">
                        <h2 className="text-6xl md:text-8xl font-black theme-title uppercase italic tracking-tighter">EXPERIENCE</h2>
                    </div>
                </motion.div>

                <motion.div
                    className="w-full max-w-5xl bg-white border-[12px] border-black p-14 shadow-[40px_40px_0px_#00f2ff]"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="flex flex-col lg:flex-row gap-16 text-black">
                        <motion.div
                            className="lg:w-1/3 flex flex-col items-center justify-center"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                        >
                            <motion.div
                                className="w-32 h-32 bg-yellow-400 border-[6px] border-black rounded-full flex items-center justify-center text-6xl mb-10 shadow-[10px_10px_0px_#000]"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                💼
                            </motion.div>
                            <h4 className="font-black text-2xl theme-title italic leading-none text-center">SOFTWARE ENGINEER</h4>
                            <span className="text-xs font-black text-[#ff007f] px-4 py-1 bg-black text-white mt-4">@ KODS TECH</span>
                            <span className="text-xs font-mono text-gray-400 mt-2">Jul 2024 — Present</span>
                        </motion.div>

                        <div className="lg:w-2/3 bg-gray-100 border-[6px] border-black p-10">
                            <motion.ul
                                className="space-y-4 font-bold uppercase text-sm"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {responsibilities.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, x: -30 },
                                            visible: {
                                                opacity: 1,
                                                x: 0,
                                                transition: { type: "spring", stiffness: 100 }
                                            }
                                        }}
                                        className="flex gap-4"
                                    >
                                        <motion.div
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: i }}
                                        >
                                            <FiZap className="text-[#ff007f] shrink-0" size={20} />
                                        </motion.div>
                                        {item}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
