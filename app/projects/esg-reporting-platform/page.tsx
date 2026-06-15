import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EsgProjectShowcase from '../../components/projects/EsgProjectShowcase';
import { esgProject } from '../../data/esgProject';

const { title, tagline, summary } = esgProject;

export const metadata: Metadata = {
    title: `${title} | Balagangatharan`,
    description: tagline,
    openGraph: {
        title: `${title} — Case Study`,
        description: summary,
        type: 'article',
    },
};
export default function EsgProjectPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <EsgProjectShowcase />
            <Footer />
        </main>
    );
}
