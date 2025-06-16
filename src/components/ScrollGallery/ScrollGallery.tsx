'use client';
import { useRef } from 'react';
import styles from './ScrollGallery.module.css';
import Image from 'next/image';

/** ─────── Types ─────── */
export type GalleryCard = {
    id: string;
    heading: string;
    subhead: string;
    cta: string;
    href: string;
    img?: { src: string; alt: string };
    imgText?: string;
    invert?: boolean;               // dark theme card
};

/** ─────── Component ─────── */
export default function ScrollGallery({ cards }: { cards: GalleryCard[] }) {
    const scrollRef = useRef<HTMLUListElement>(null);

    function scrollByDir(dir: 'left' | 'right') {
        if (!scrollRef.current) return;
        const w = scrollRef.current.clientWidth;
        scrollRef.current.scrollBy({ left: dir === 'left' ? -w : w, behavior: 'smooth' });
    }

    return (
        <section className={styles.section}>
            <ul ref={scrollRef} className={styles.track} role="list">
                {cards.map(c => (
                    <li key={c.id} className={`${styles.card} ${c.invert ? styles.dark : ''}`} role="listitem">
                        <a href={c.href} className={styles.link} tabIndex={-1} aria-hidden />
                        <div style={{display: "flex", justifyContent: "center", margin: "1rem"}}>
                            {c.img && <Image src={c.img.src} alt={c.img.alt} width={200} height={200} sizes="(max-width: 768px) 80vw, 50vw" />}
                        </div>
                        <div className={styles.text}>
                            <h3>{c.heading}</h3>
                            <p>{c.subhead}</p>
                            <a className={styles.button} href={c.href}>{c.cta}</a>
                        </div>
                    </li>
                ))}
            </ul>

            {/* paddlenav */}
            <nav className={styles.nav} aria-label="Gallery navigation">
                <button onClick={() => scrollByDir('left')} aria-label="Previous">
                    ‹
                </button>
                <button onClick={() => scrollByDir('right')} aria-label="Next">
                    ›
                </button>
            </nav>
        </section>
    );
}