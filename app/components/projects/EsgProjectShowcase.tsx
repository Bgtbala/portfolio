'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiServer } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { esgProject } from '../../data/esgProject';
import ProjectBackLink from './ProjectBackLink';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

function ArchitectureFlow({ variant }: { variant: 'future' | 'classic' | 'animated' }) {
    const steps = ['React Frontend', 'API Gateway', 'Microservices', 'PostgreSQL'];

    if (variant === 'classic') {
        return (
            <div className="flex flex-wrap items-center gap-3 font-mono text-sm text-gray-600">
                {steps.map((step, i) => (
                    <span key={step} className="flex items-center gap-3">
                        <span className="border border-gray-200 px-4 py-2">{step}</span>
                        {i < steps.length - 1 && <span className="text-gray-300">→</span>}
                    </span>
                ))}
            </div>
        );
    }

    if (variant === 'animated') {
        return (
            <div className="flex flex-wrap items-center gap-2">
                {steps.map((step, i) => (
                    <span key={step} className="flex items-center gap-2">
                        <span className="bg-yellow-400 border-4 border-black px-4 py-2 font-black text-xs uppercase">{step}</span>
                        {i < steps.length - 1 && <span className="font-black">→</span>}
                    </span>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {steps.map((step, i) => (
                <span key={step} className="flex items-center gap-2 md:gap-4">
                    <span className="px-4 py-3 border border-primary/30 bg-primary/5 font-mono text-[10px] uppercase tracking-widest text-white">
                        {step}
                    </span>
                    {i < steps.length - 1 && <span className="text-primary/40 font-mono">→</span>}
                </span>
            ))}
        </div>
    );
}

export default function EsgProjectShowcase() {
    const { theme } = useTheme();
    if (theme === 'classic') return <ClassicCaseStudy />;
    if (theme === 'animated') return <AnimatedCaseStudy />;
    return <FutureCaseStudy />;
}

function FutureCaseStudy() {
    return (
        <article className="pt-32 pb-24 bg-[#020202]">
            <div className="max-w-5xl mx-auto px-6">
                <ProjectBackLink />

                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <span className="font-mono text-primary text-xs tracking-widest uppercase">{esgProject.category}</span>
                    <h1 className="text-4xl md:text-7xl font-black theme-title text-white uppercase tracking-tighter mt-4 mb-6">
                        {esgProject.title}
                    </h1>
                    <p className="text-gray-400 text-lg font-light italic border-l-2 border-primary/30 pl-8 max-w-3xl mb-12">
                        {esgProject.tagline}
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {esgProject.stats.map((s) => (
                        <div key={s.label} className="glass hud-border p-6 text-center">
                            <div className="text-3xl font-black text-primary mb-1">{s.value}</div>
                            <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{s.label}</div>
                        </div>
                    ))}
                </div>

                <section className="mb-16">
                    <h2 className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.35em] mb-6">Overview</h2>
                    <p className="text-gray-400 leading-relaxed">{esgProject.summary}</p>
                </section>

                <section className="mb-16 glass hud-border p-8">
                    <h2 className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.35em] mb-6">Architecture</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">{esgProject.architecture}</p>
                    <ArchitectureFlow variant="future" />
                </section>

                <section className="mb-16">
                    <h2 className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.35em] mb-6">Key Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {esgProject.keyServices.map((svc) => (
                            <div key={svc.name} className="flex gap-4 p-5 border border-white/10 bg-white/[0.02]">
                                <FiServer className="text-primary shrink-0 mt-1" size={16} />
                                <div>
                                    <h3 className="text-white font-bold uppercase text-sm mb-1">{svc.name}</h3>
                                    <p className="text-gray-500 text-sm">{svc.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.35em] mb-6">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {esgProject.techStack.map((t) => (
                            <span key={t} className="px-3 py-1 border border-white/10 font-mono text-[9px] text-primary/60 uppercase tracking-widest">
                                {t}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.35em] mb-6">Highlights</h2>
                    <ul className="space-y-4">
                        {esgProject.highlights.map((item, i) => (
                            <li key={i} className="flex gap-4 text-gray-400 text-sm leading-relaxed">
                                <span className="font-mono text-primary/40 text-xs">[0{i + 1}]</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                <Link
                    href="/#contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-mono font-black uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
                >
                    Discuss This Project <FiArrowRight size={14} />
                </Link>
            </div>
        </article>
    );
}

function ClassicCaseStudy() {
    return (
        <article className="pt-32 pb-24 bg-[#fcfbf7] text-black">
            <div className="max-w-5xl mx-auto px-6">
                <ProjectBackLink />

                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 mb-4">{esgProject.category}</h4>
                    <h1 className="text-5xl md:text-7xl theme-title leading-none tracking-tighter mb-6">{esgProject.title}</h1>
                    <p className="text-gray-500 font-light text-xl leading-relaxed italic border-l-2 border-black pl-8 max-w-3xl mb-12">
                        {esgProject.tagline}
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pb-16 border-b border-gray-100">
                    {esgProject.stats.map((s) => (
                        <div key={s.label}>
                            <div className="text-3xl font-black theme-title">{s.value}</div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-gray-300 mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>

                <section className="mb-16 pb-16 border-b border-gray-100">
                    <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 mb-6">Overview</h2>
                    <p className="text-gray-500 text-lg font-light leading-relaxed">{esgProject.summary}</p>
                </section>

                <section className="mb-16 pb-16 border-b border-gray-100">
                    <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 mb-6">Architecture</h2>
                    <p className="text-gray-500 leading-relaxed mb-8">{esgProject.architecture}</p>
                    <ArchitectureFlow variant="classic" />
                </section>

                <section className="mb-16 pb-16 border-b border-gray-100">
                    <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 mb-8">Key Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {esgProject.keyServices.map((svc) => (
                            <div key={svc.name}>
                                <h3 className="text-lg font-black theme-title italic mb-2">{svc.name}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{svc.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16 pb-16 border-b border-gray-100">
                    <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 mb-6">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {esgProject.techStack.map((t) => (
                            <span key={t} className="text-sm font-mono text-gray-600 border border-gray-100 px-4 py-2">{t}</span>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-300 mb-8">Highlights</h2>
                    <ul className="space-y-6">
                        {esgProject.highlights.map((item, i) => (
                            <li key={i} className="flex items-start gap-8">
                                <span className="text-xs font-mono text-gray-200 font-bold tracking-widest mt-1">/0{i + 1}</span>
                                <p className="text-gray-500 font-light leading-relaxed">{item}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <Link href="/#contact" className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest border-b border-black pb-1 hover:opacity-60 transition-opacity">
                    Discuss This Project <FiArrowRight size={14} />
                </Link>
            </div>
        </article>
    );
}

function AnimatedCaseStudy() {
    return (
        <article className="pt-32 pb-24 bg-[#0d0221]">
            <div className="max-w-5xl mx-auto px-6">
                <ProjectBackLink />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white border-[8px] border-black p-8 md:p-12 shadow-[20px_20px_0px_#ff007f] mb-12"
                >
                    <span className="bg-[#ff007f] text-white px-3 py-1 font-black text-xs uppercase border-2 border-black">{esgProject.category}</span>
                    <h1 className="text-4xl md:text-6xl theme-title text-black uppercase mt-6 mb-4 leading-tight">{esgProject.title}</h1>
                    <p className="text-gray-700 font-bold italic">{esgProject.tagline}</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {esgProject.stats.map((s) => (
                        <div key={s.label} className="bg-[#00f2ff] border-4 border-black p-5 text-center shadow-[6px_6px_0px_#000]">
                            <div className="text-2xl font-black">{s.value}</div>
                            <div className="text-[9px] font-black uppercase mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>

                <section className="bg-white border-[6px] border-black p-8 mb-8 shadow-[10px_10px_0px_#000]">
                    <h2 className="text-2xl theme-title uppercase mb-4">Overview</h2>
                    <p className="font-bold text-gray-700">{esgProject.summary}</p>
                </section>

                <section className="bg-yellow-400 border-[6px] border-black p-8 mb-8 shadow-[10px_10px_0px_#000]">
                    <h2 className="text-2xl theme-title uppercase mb-4">Architecture</h2>
                    <p className="font-bold text-gray-800 mb-6">{esgProject.architecture}</p>
                    <ArchitectureFlow variant="animated" />
                </section>

                <section className="bg-white border-[6px] border-black p-8 mb-8 shadow-[10px_10px_0px_#000]">
                    <h2 className="text-2xl theme-title uppercase mb-6">Key Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {esgProject.keyServices.map((svc) => (
                            <div key={svc.name} className="border-4 border-black p-4 bg-gray-50">
                                <h3 className="font-black uppercase mb-1">{svc.name}</h3>
                                <p className="text-sm font-bold text-gray-600">{svc.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white border-[6px] border-black p-8 mb-8 shadow-[10px_10px_0px_#000]">
                    <h2 className="text-2xl theme-title uppercase mb-4">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {esgProject.techStack.map((t) => (
                            <span key={t} className="bg-black text-white px-3 py-1 text-xs font-black uppercase border-2 border-black">{t}</span>
                        ))}
                    </div>
                </section>

                <section className="bg-[#ff007f] border-[6px] border-black p-8 mb-12 shadow-[10px_10px_0px_#000] text-white">
                    <h2 className="text-2xl theme-title uppercase mb-6">Highlights</h2>
                    <ul className="space-y-3 font-bold uppercase text-sm">
                        {esgProject.highlights.map((item, i) => (
                            <li key={i} className="flex gap-3">
                                <span>⚡</span> {item}
                            </li>
                        ))}
                    </ul>
                </section>

                <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 bg-[#00f2ff] text-black px-8 py-4 font-black uppercase border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                    Discuss This Project <FiArrowRight size={16} />
                </Link>
            </div>
        </article>
    );
}
