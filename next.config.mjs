// https://env.t3.gg/docs/nextjs#validate-schema-on-build-(recommended)
import { createJiti } from 'jiti';
import { fileURLToPath } from 'node:url';
const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti.import('./env/server');
jiti.import('./env/client');

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['geist'],
    output: 'standalone',
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "connect-src 'self' https://app.prismreplay.com",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/ph',
                destination: 'https://www.producthunt.com/posts/scira',
                permanent: true,
            },
            {
                source: '/raycast',
                destination: 'https://www.raycast.com/zaidmukaddam/scira',
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/ingest/static/:path*',
                destination: 'https://us-assets.i.posthog.com/static/:path*',
            },
            {
                source: '/ingest/:path*',
                destination: 'https://us.i.posthog.com/:path*',
            },
            {
                source: '/ingest/decide',
                destination: 'https://us.i.posthog.com/decide',
            },
        ];
    },
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.google.com',
                port: '',
                pathname: '/s2/favicons',
            },
            {
                protocol: 'https',
                hostname: 'api.producthunt.com',
                port: '',
                pathname: '/widgets/embed-image/v1/featured.svg',
            },
            {
                protocol: 'https',
                hostname: 'metwm7frkvew6tn1.public.blob.vercel-storage.com',
                port: '',
                pathname: '**',
            },
            // upload.wikimedia.org
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: '',
                pathname: '**',
            },
            // media.theresanaiforthat.com
            {
                protocol: 'https',
                hostname: 'media.theresanaiforthat.com',
                port: '',
                pathname: '**',
            },
            // www.uneed.best
            {
                protocol: 'https',
                hostname: 'www.uneed.best',
                port: '',
                pathname: '**',
            },
            // image.tmdb.org
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/t/p/original/**',
            },
            // image.tmdb.org
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
