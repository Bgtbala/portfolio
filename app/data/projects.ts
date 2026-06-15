import { ESG_PROJECT_SLUG } from './esgProject';

export type Project = {
    id: string;
    title: string;
    category: string;
    description: string;
    stack: string[];
    achievement: string;
    color: string;
    detailRoute?: string;
    metrics?: { label: string; value: string }[];
};

export const projects: Project[] = [
    {
        id: 'P_01',
        title: 'ESG Reporting Platform',
        category: 'Multi-tenant SaaS',
        description:
            'Enterprise backend for ESG data collection and regulatory sustainability reporting. Monorepo of 10+ Express microservices behind an API gateway, with JWT auth, PostgreSQL multi-schema design, and cross-service PDF report aggregation.',
        stack: ['Node.js', 'Microservices', 'PostgreSQL', 'Prisma', 'Turborepo'],
        achievement: '10+ microservices',
        color: '#00cc66',
        detailRoute: `/projects/${ESG_PROJECT_SLUG}`,
        metrics: [
            { label: 'Services', value: '10+' },
            { label: 'Schemas', value: '10' },
            { label: 'Auth', value: 'JWT + MFA' },
        ],
    },
    {
        id: 'P_02',
        title: 'Social Media Platform',
        category: 'Social Platform',
        description:
            'MERN-based platform for personalized content and contests with real-time chat using WebSockets. Redis caching improved feed loading by ~40%.',
        stack: ['MERN', 'Socket.io', 'Redis', 'AWS'],
        achievement: '40% faster feeds',
        color: '#7000ff',
    },
    {
        id: 'P_03',
        title: 'Healthcare Job Portal',
        category: 'Healthcare',
        description:
            'Healthcare job platform with secure role-based authentication. MongoDB aggregations reduced API latency by 47%.',
        stack: ['MERN', 'MongoDB Aggregation', 'AWS'],
        achievement: '47% reduced latency',
        color: '#4400ff',
    },
    {
        id: 'P_04',
        title: 'Sustainability Rewards Platform',
        category: 'Sustainability',
        description:
            'Domain-based initiative platform with role-specific interfaces for Admin, Franchise, and Users. Token-based reward system for eco-friendly actions.',
        stack: ['Next.js', 'API Integration', 'Role-Based UI', 'AWS'],
        achievement: 'Multi-role onboarding',
        color: '#00ff88',
    },
    {
        id: 'P_05',
        title: 'Manufacturing Workflow System',
        category: 'Manufacturing',
        description:
            'Manufacturing workflow system connecting order processing, job tracking, and inventory. Reduced system errors by ~60%.',
        stack: ['MERN', 'WebSockets', 'Inventory Automation', 'AWS'],
        achievement: '60% fewer errors',
        color: '#ff8800',
    },
];
