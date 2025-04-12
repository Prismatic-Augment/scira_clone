import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import 'katex/dist/katex.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Metadata, Viewport } from 'next';
import { Syne } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';
import './globals.css';
import { Providers } from './providers';
import { PostHogProvider } from '../components/PostHogProvider';
import { PrismProvider } from '@prismai/record';

export const metadata: Metadata = {
    title: 'Prism AI',
    description: 'Prism AI is a minimalistic AI-powered search engine that helps you find information on the internet.',
    metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
    openGraph: {
        title: 'Prism AI',
        description:
            'Prism AI is a minimalistic AI-powered search engine that helps you find information on the internet.',
        siteName: 'Prism AI',
        locale: 'en_US',
        type: 'website',
    },
    keywords: [
        'prism ai',
        'Prism AI',
        'prism AI',
        'ai search',
        'ai search engine',
        'ai powered search',
        'prism ai',
        'prism ai app',
        'search engine',
        'Prism AI',
        'artificial intelligence',
        'machine learning',
        'scira.ai',
        'scira ai',
        'Scira AI',
        'scira AI',
        'SCIRA.AI',
        'scira github',
        'scira.app',
        'MiniPerplx',
        'open source ai search engine',
        'minimalistic ai search engine',
        'Scira (Formerly MiniPerplx)',
        'AI Search Engine',
        'mplx.run',
        'mplx ai',
        'zaid mukaddam',
        'scira.how',
    ],
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    ],
};

const syne = Syne({
    subsets: ['latin'],
    variable: '--font-syne',
    preload: true,
    display: 'swap',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${GeistSans.variable} ${syne.variable} font-sans antialiased`} suppressHydrationWarning>
                <PrismProvider
                    config={{
                        apiKey: '7e7c6776-b86e-413a-822e-2d112a3ae8fb',
                        projectId: 'cm9byadia0002lb042ou5xqhi',
                    }}
                >
                    <PostHogProvider>
                        <NuqsAdapter>
                            <Providers>
                                <Toaster position="top-center" />
                                {children}
                            </Providers>
                        </NuqsAdapter>
                    </PostHogProvider>
                </PrismProvider>
                <Analytics />
            </body>
        </html>
    );
}
