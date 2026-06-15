'use client';

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function ProjectBackLink() {
    const { theme } = useTheme();

    if (theme === 'classic') {
        return (
            <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12"
            >
                <FiArrowLeft size={14} />
                Back to Projects
            </Link>
        );
    }

    if (theme === 'animated') {
        return (
            <Link
                href="/#projects"
                className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 font-black text-xs uppercase border-4 border-black shadow-[4px_4px_0px_#ff007f] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all mb-12"
            >
                <FiArrowLeft size={14} />
                Back to Projects
            </Link>
        );
    }

    return (
        <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary/60 hover:text-primary transition-colors mb-12 group"
        >
            <FiArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
        </Link>
    );
}
