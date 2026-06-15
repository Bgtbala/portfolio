import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
    // Pin workspace root so Turbopack doesn't scan the parent user folder
    turbopack: {
        root: path.resolve(__dirname),
    },
    logging: {
        incomingRequests: false,
    },
};

export default nextConfig;
