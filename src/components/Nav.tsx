'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Nav.module.css';

const links = [
    { href: '/', label: 'Home' },
    { href: '/skills', label: 'Skills' },
    { href: '/experience', label: 'Experience' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' }
];

export default function Nav() {
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
                    {links.map(l => (
                        <Link key={l.href} href={l.href}>{l.label}</Link>
                    ))}
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
                    {links.map(l => (
                        <Link 
                            key={l.href} 
                            href={l.href}
                            onClick={toggleDrawer}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}