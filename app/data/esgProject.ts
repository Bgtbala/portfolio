export const ESG_PROJECT_SLUG = 'esg-reporting-platform';

export const esgProject = {
    slug: ESG_PROJECT_SLUG,
    title: 'ESG Reporting Platform',
    tagline: 'Multi-tenant SaaS backend for sustainability data collection and regulatory reporting',
    category: 'Multi-tenant SaaS',
    period: '2024 — Present',
    role: 'Backend Developer',

    summary:
        'Enterprise backend for ESG data collection and BRSR-style sustainability reporting. A pnpm + Turborepo monorepo of 10+ Express microservices behind an API gateway, with JWT multi-tenant auth, PostgreSQL multi-schema design, and cross-service PDF report aggregation.',

    stats: [
        { label: 'Microservices', value: '10+' },
        { label: 'DB Schemas', value: '10' },
        { label: 'Auth', value: 'JWT + MFA' },
        { label: 'Reporting', value: 'PDF Export' },
    ],

    architecture:
        'React frontend → API Gateway (security, rate limits, proxy) → domain microservices → PostgreSQL with one schema per service. Report generation orchestrates HTTP calls across auth, emissions, resources, and related services before Puppeteer renders the PDF.',

    keyServices: [
        { name: 'Gateway', detail: 'Single public entry — proxy, rate limiting, security headers' },
        { name: 'Auth', detail: 'JWT sessions, MFA, onboarding, RBAC, multi-tenant companies' },
        { name: 'BRSR', detail: 'Disclosure sections A/B/C, report aggregation, PDF export' },
        { name: 'Emissions', detail: 'Fuel masters, emission factors, carbon calculations' },
        { name: 'Resources', detail: 'Water, waste, and environmental resource metrics' },
        { name: 'Bulk Upload', detail: 'CSV mass import for energy, carbon, water, and more' },
    ],

    techStack: [
        'Node.js',
        'Express',
        'Microservices',
        'PostgreSQL',
        'Prisma',
        'Turborepo',
        'JWT',
        'Docker',
        'Kubernetes',
        'Puppeteer',
    ],

    highlights: [
        'Built Express microservices with a shared middleware package for auth, errors, and validation',
        'Multi-schema Prisma design with per-service migrations on a single PostgreSQL instance',
        'JWT auth with MFA, refresh tokens, and tenant-scoped APIs via companyId',
        'Cross-service BRSR report aggregation and Puppeteer PDF generation pipeline',
    ],
};
