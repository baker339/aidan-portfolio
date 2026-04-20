import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/data';

export const metadata: Metadata = {
    title: siteMetadata.title,
    description: siteMetadata.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
