import Hero from '@/components/Hero';
import ScrollGallery, { GalleryCard } from '@/components/ScrollGallery/ScrollGallery';
import {experience} from '@/lib/data';
import styles from './ProjectsPage.module.css';

export const metadata = { title: 'Experience | Aidan' };

export default function ExperiencePage() {
    /* gallery cards for bottom carousel */
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
            heading: 'Side Projects',
            subhead: 'Where nights & weekends go',
            cta: 'Explore apps',
            href: '/projects',
            img: { src: '/memoji_peekaboo.png', alt: 'MacBook on desk' },
            invert: true,
        },
    ];

    return (
        <>
            {/* Hero */}
            <Hero
                title="Experience"
                subtitle="Walking the line between enterprise & indie."
                icon={"/memoji_secret.png"}
                invert
            />

            {/* Timeline */}
            <section className={styles.gallery} role="list">
                {experience.map((job, i) => (
                        <article
                            key={i}
                            className={`${styles.tile} ${i % 2 ? '' : styles.alt}`}
                            role="listitem"
                        >
                            <div className={styles.body}>
                                <h2>{job.company}</h2>
                                <p className={styles.desc}>{job.role}</p>
                                <p className={styles.desc}>{job.duration}</p>
                            </div>

                            <ul className={styles.body}>
                                {job.responsibilities.map(r => (
                                    <li key={r}>{r}</li>
                                ))}
                            </ul>
                        </article>
                ))}
            </section>

            {/* Bottom gallery */}
            <ScrollGallery cards={cards} />
        </>

    );
}