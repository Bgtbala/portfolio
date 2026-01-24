'use client';

import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiChevronRight, FiMapPin, FiArrowUpRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
    const { theme } = useTheme();
    if (theme === 'classic') return <ClassicContact />;
    if (theme === 'animated') return <AnimatedContact />;
    return <FutureContact />;
}

// --- Future Theme Layout ---
function FutureContact() {
    return (
        <section id="contact" className="py-32 bg-[#020202] relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-24">
                    <div className="max-w-2xl text-white">
                        <h2 className="text-5xl md:text-8xl font-black uppercase theme-title tracking-tighter mb-12">ESTABLISH <span className="gradient-text italic">LINK</span></h2>
                    </div>
                    <div className="w-full md:w-auto space-y-4">
                        {[
                            { label: "EMAIL", val: "balagangatharan17@gmail.com", href: "mailto:balagangatharan17@gmail.com" },
                            { label: "GITHUB", val: "github.com/Bgtbala", href: "https://github.com/Bgtbala" },
                            { label: "LINKEDIN", val: "ln/balagangatharan17", href: "https://www.linkedin.com/in/balagangatharan17/" }
                        ].map(item => (
                            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="glass hud-border p-8 min-w-[350px] flex justify-between items-center group cursor-pointer hover:border-primary block">
                                <div><span className="font-mono text-[8px] opacity-40 uppercase block mb-1 text-white">{item.label}</span><span className="text-white font-bold">{item.val}</span></div>
                                <FiChevronRight className="group-hover:translate-x-2 transition-transform text-primary" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Classic Theme Layout (Minimalist Contact) ---
function ClassicContact() {
    return (
        <section id="contact" className="py-60 bg-[#fcfbf7] border-t border-gray-100 text-black">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-40">
                    <h3 className="text-7xl md:text-[8vw] theme-title leading-[0.8] tracking-tighter">Talk.</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 px-1 bg-gray-100">
                    {[
                        { label: "Email", val: "balagangatharan17@gmail.com", href: "mailto:balagangatharan17@gmail.com" },
                        { label: "Social", val: "LinkedIn", href: "https://www.linkedin.com/in/balagangatharan17/" },
                        { label: "Project", val: "GitHub", href: "https://github.com/Bgtbala" }
                    ].map((item, i) => (
                        <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="bg-[#fcfbf7] p-16 group hover:bg-black transition-all duration-700">
                            <span className="text-[10px] font-mono uppercase text-gray-300 group-hover:text-gray-500 mb-10 block">{item.label}</span>
                            <div className="flex justify-between items-center text-black group-hover:text-white transition-colors">
                                <span className="text-2xl theme-title italic">{item.val}</span>
                                <FiArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Animated Theme Layout ---
function AnimatedContact() {
    return (
        <section id="contact" className="py-32 bg-[#ff007f] text-black">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="bg-white border-8 border-black p-12 shadow-[20px_20px_0px_#000] inline-block mb-24 transform -rotate-2">
                    <h2 className="text-6xl md:text-9xl font-black theme-title uppercase">CONTACT!</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {[
                        { label: "EMAIL", val: "balagangatharan17@gmail.com", href: "mailto:balagangatharan17@gmail.com", color: "bg-yellow-400" },
                        { label: "LINKEDIN", val: "LET'S CONNECT!", href: "https://www.linkedin.com/in/balagangatharan17/", color: "bg-[#00f2ff]" }
                    ].map((item, i) => (
                        <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className={`${item.color} border-4 border-black p-10 shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all`}>
                            <span className="font-black text-xs text-black/50 block mb-4 uppercase">{item.label}</span>
                            <span className="text-2xl md:text-3xl font-black theme-title uppercase">{item.val}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
