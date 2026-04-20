'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Nav.module.css';
import { primaryNav } from '@/lib/data';
import { withSiteBase } from '@/lib/paths';

type NavProps = {
    basePath?: string;
};

export default function Nav({ basePath = '' }: NavProps) {
    const links = primaryNav.map((l) => ({
        href: withSiteBase(basePath, l.href),
        label: l.label,
    }));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Image 
                        src="/memoji_smile.png"
                        alt="Memoji Smile"
                        width={32}
                        height={32}
                    />
                </div>
                <div className={styles.links}>
                    {links.map((l) => (
                        <Link key={l.href} href={l.href}>
                            {l.label}
                        </Link>
                    ))}
                    <Link
                        href="/"
                        className={styles.newSiteLink}
                        title="New portfolio — main site"
                        aria-label="Back to new portfolio design at home"
                    >
                        <span aria-hidden>🫟</span>
                        <span aria-hidden>❓</span>
                    </Link>
                </div>
                <button 
                    className={styles.hamburger}
                    onClick={toggleDrawer}
                    aria-label="Toggle navigation menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {/* Backdrop */}
            <div 
                className={`${styles.backdrop} ${isDrawerOpen ? styles.backdropOpen : ''}`}
                onClick={toggleDrawer}
            />

            {/* Drawer */}
            <div className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ''}`}>
                <div className={styles.drawerLinks}>
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} onClick={toggleDrawer}>
                            {l.label}
                        </Link>
                    ))}
                    <Link
                        href="/"
                        className={`${styles.newSiteLink} ${styles.drawerNewSite}`}
                        title="New portfolio — main site"
                        aria-label="Back to new portfolio design at home"
                        onClick={toggleDrawer}
                    >
                        <span aria-hidden>🫟</span>
                        <span aria-hidden>❓</span>
                    </Link>
                </div>
            </div>
        </>
    );
}