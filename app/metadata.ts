import { Metadata } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL('https://applix.digital'),
    title: {
        default: 'APPLIX - Digital Ecosystem Premium',
        template: '%s | APPLIX',
    },
    description: 'Écosystème digital complet: marketplace, automation SaaS, academy, hub communauté, templates. Transformez votre business avec APPLIX.',
    keywords: ['SaaS', 'automation', 'templates', 'academy', 'digital products', 'NFC cards', 'AI tools'],
    authors: [{ name: 'APPLIX Team' }],
    creator: 'APPLIX',
    publisher: 'APPLIX',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://applix.digital',
        siteName: 'APPLIX',
        title: 'APPLIX - Digital Ecosystem Premium',
        description: 'Écosystème digital complet pour créateurs, développeurs, et entrepreneurs',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'APPLIX Platform',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'APPLIX - Digital Ecosystem Premium',
        description: 'Écosystème digital complet pour créateurs, développeurs, et entrepreneurs',
        images: ['/og-image.png'],
        creator: '@applix',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
