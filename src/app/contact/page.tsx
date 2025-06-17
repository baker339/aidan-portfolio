import Hero from '@/components/Hero';
import ScrollGallery, { GalleryCard } from '@/components/ScrollGallery/ScrollGallery';
import styles from './ContactPage.module.css';

export const metadata = { title: 'Contact | Aidan' };

export default function ContactPage() {
    const cards: GalleryCard[] = [
        {
            id: 'skills',
            heading: 'Skills',
            subhead: 'My tech toolbox',
            cta: 'View skills',
            href: '/skills',
            img: { src: '/memoji_computer.png', alt: 'Syntax-highlighted code' },
        },
        {
            id: 'projects',
            heading: 'Projects',
            subhead: 'See what I build',
            cta: 'View projects',
            href: '/projects',
            img: { src: '/memoji_peekaboo.png', alt: 'MacBook on desk' },
        },
        {
            id: 'experience',
            heading: 'Experience',
            subhead: 'My journey so far',
            cta: 'See timeline',
            href: '/experience',
            img: { src: '/memoji_secret.png', alt: 'Modern office at dusk' },
        },
    ];

    return (
        <>
            <Hero
                title="Let's Connect"
                subtitle="Always open to new opportunities and conversations."
                icon="/memoji_wave.png"
            />

            <section className={styles.contact}>
                <div className={styles.grid}>
                    <a href="mailto:aidanbaker.ab@gmail.com" className={styles.card}>
                        <h2>Email</h2>
                        <p>aidanbaker.ab@gmail.com</p>
                    </a>

                    <a href="https://linkedin.com/in/aidanbaker" target="_blank" rel="noreferrer" className={styles.card}>
                        <h2>LinkedIn</h2>
                        <p>Connect with me</p>
                    </a>

                    <a href="https://github.com/baker339" target="_blank" rel="noreferrer" className={styles.card}>
                        <h2>GitHub</h2>
                        <p>Check out my code</p>
                    </a>
                </div>
            </section>

            <ScrollGallery cards={cards} />
        </>
    );
} 