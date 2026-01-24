'use client';

import { motion } from 'framer-motion';
import { FiCpu, FiUser, FiAward, FiTarget, FiHash, FiActivity } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const staggerItem = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4 }
    }
};

export default function About() {
    const { theme } = useTheme();
    if (theme === 'classic') return <ClassicAbout />;
    if (theme === 'animated') return <AnimatedAbout />;
    return <FutureAbout />;
}

// --- Future Theme Layout ---
function FutureAbout() {
    return (
        <section id="about" className="py-32 relative bg-[#020202]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    className="mb-24 flex items-center gap-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <div className="w-24 h-[1px] bg-primary animate-pulse" />
                    <h2 className="text-4xl md:text-7xl font-black uppercase theme-title text-white">ABOUT</h2>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-12 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                >
                    <motion.div
                        className="md:col-span-8 glass hud-border p-12 relative group overflow-hidden"
                        variants={staggerItem}
                    >
                        <div className="flex items-center gap-6 text-primary mb-12">
                            <FiCpu size={24} className="animate-pulse" />
                            <span className="font-mono text-xs tracking-widest uppercase opacity-60">Full_Stack_Protocol</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black mb-10 text-white tracking-tight uppercase">MERN & Next.js Developer</h3>
                        <p className="text-gray-400 text-lg leading-loose font-light italic">
                            Building scalable and secure web applications. Skilled in AWS deployments, API optimization, and real-time features to enhance performance.
                        </p>
                    </motion.div>
                    <motion.div
                        className="md:col-span-4 glass hud-border p-12 flex flex-col justify-center items-center text-center gap-4"
                        variants={staggerItem}
                    >
                        <div className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">Years_Exp</div>
                        <motion.div
                            className="text-9xl font-black text-white tracking-tighter"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                        >
                            1+
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// --- Classic Theme Layout ---
function ClassicAbout() {
    const frontendSkills = ["React.js / Next.js", "Redux / Context API", "TypeScript / SSR", "TailwindCSS"];
    const backendSkills = ["Node.js / Express.js", "RESTful APIs / JWT", "Socket.io / Redis", "MVC Architecture"];
    const dbSkills = ["MongoDB (Aggregation)", "Mongoose / MySQL", "Oracle SQL"];
    const cloudSkills = ["AWS (EC2, S3, SSL)", "Docker / Nginx", "GitHub Actions / CI/CD"];

    return (
        <section id="about" className="py-32 bg-[#fcfbf7] border-t border-gray-100 overflow-hidden text-black">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <motion.div
                        className="lg:col-span-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeInUp}
                    >
                        <div className="classic-frame p-4">
                            <div className="aspect-[4/5] bg-gray-50 border border-gray-100 flex items-center justify-center p-20 text-[12rem] font-black theme-title text-gray-100 italic">
                                B.
                            </div>
                        </div>

                        <motion.div
                            className="mt-12 p-8 border border-gray-100"
                            variants={fadeInUp}
                        >
                            <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 mb-4">Current Role</h4>
                            <p className="text-2xl font-black theme-title italic">Software Engineer (MERN)</p>
                            <p className="text-gray-400 text-sm mt-2">Kods Technology Pvt. Ltd.</p>
                            <p className="text-gray-300 text-xs font-mono mt-1">July 2024 — Present</p>
                        </motion.div>
                    </motion.div>

                    <div className="lg:col-span-7 pt-12">
                        <motion.p
                            className="text-2xl text-gray-500 font-light leading-relaxed italic border-l-2 border-black pl-8 mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            Full Stack Developer with 1+ years of experience in MERN and Next.js, building scalable and secure web applications.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <motion.div
                                className="space-y-12"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 border-b border-gray-100 pb-2">Frontend</h4>
                                    <motion.ul className="space-y-2 text-sm font-bold theme-title uppercase" variants={staggerContainer}>
                                        {frontendSkills.map((skill, i) => (
                                            <motion.li key={i} variants={staggerItem}>• {skill}</motion.li>
                                        ))}
                                    </motion.ul>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 border-b border-gray-100 pb-2">Backend</h4>
                                    <motion.ul className="space-y-2 text-sm font-bold theme-title uppercase" variants={staggerContainer}>
                                        {backendSkills.map((skill, i) => (
                                            <motion.li key={i} variants={staggerItem}>• {skill}</motion.li>
                                        ))}
                                    </motion.ul>
                                </div>
                            </motion.div>

                            <motion.div
                                className="space-y-12"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 border-b border-gray-100 pb-2">Database</h4>
                                    <motion.ul className="space-y-2 text-sm font-bold theme-title uppercase" variants={staggerContainer}>
                                        {dbSkills.map((skill, i) => (
                                            <motion.li key={i} variants={staggerItem}>• {skill}</motion.li>
                                        ))}
                                    </motion.ul>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 border-b border-gray-100 pb-2">Cloud & DevOps</h4>
                                    <motion.ul className="space-y-2 text-sm font-bold theme-title uppercase" variants={staggerContainer}>
                                        {cloudSkills.map((skill, i) => (
                                            <motion.li key={i} variants={staggerItem}>• {skill}</motion.li>
                                        ))}
                                    </motion.ul>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 border-b border-gray-100 pb-2">Education</h4>
                                    <p className="text-lg font-black theme-title italic">B.E in Mechanical Engineering</p>
                                    <p className="text-gray-500 text-sm">Saranathan College of Engineering</p>
                                    <p className="text-gray-400 text-xs font-mono mt-1">CGPA: 8.13 | 2019-2023</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Animated Theme Layout ---
function AnimatedAbout() {
    const stats = [
        { label: "MERN", val: "99%", color: "bg-[#ff007f]" },
        { label: "NEXT.JS", val: "95%", color: "bg-yellow-400" },
        { label: "AWS", val: "90%", color: "bg-green-400" }
    ];

    return (
        <section id="about" className="py-32 bg-[#ff007f] relative overflow-hidden">
            <div className="absolute top-0 left-0 text-[20vw] font-black text-black/5 leading-none select-none uppercase -translate-x-1/4">SKILLS</div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="bg-white border-[8px] border-black p-4 md:p-12 shadow-[30px_30px_0px_#000]"
                    initial={{ opacity: 0, y: 50, rotate: -2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 text-black">
                        <motion.div
                            className="bg-[#00f2ff] p-10 border-4 border-black shadow-[10px_10px_0px_#000] relative"
                            initial={{ scale: 0, rotate: -10 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        >
                            <h3 className="text-4xl font-black mb-8 uppercase theme-title italic mt-4">STATS</h3>
                            <motion.div
                                className="space-y-6"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        className="space-y-2"
                                        variants={staggerItem}
                                    >
                                        <div className="flex justify-between font-black text-xs uppercase italic"><span>{stat.label}</span><span>{stat.val}</span></div>
                                        <div className="w-full h-6 bg-black p-1 border-2 border-black">
                                            <motion.div
                                                className={`h-full ${stat.color} border-r-4 border-black`}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: stat.val }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="lg:col-span-2 space-y-10 py-4"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <h2 className="text-5xl md:text-[6vw] font-black leading-[0.8] uppercase theme-title italic">FULL STACK <br /> <span className="text-[#ff007f]">DEVELOPER!</span></h2>
                            <p className="text-2xl font-black text-gray-800 italic uppercase">"1+ Years of MERN & Next.js experience!"</p>
                            <motion.div
                                className="flex flex-wrap gap-3"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {['React', 'Next.js', 'Node.js', 'MongoDB', 'AWS', 'Docker'].map((tech, i) => (
                                    <motion.span
                                        key={tech}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0, rotate: -10 },
                                            visible: {
                                                opacity: 1,
                                                scale: 1,
                                                rotate: 0,
                                                transition: { type: "spring", stiffness: 300, damping: 15 }
                                            }
                                        }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="bg-black text-white px-4 py-2 font-black text-sm uppercase border-2 border-black cursor-default"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
