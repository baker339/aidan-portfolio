import Hero from '@/components/Hero';
import { projects } from '@/lib/data';
import styles from './ProjectsPage.module.css';
import ScrollGallery, {GalleryCard} from "@/components/ScrollGallery/ScrollGallery";

export const metadata = { title: 'Projects | Aidan' };

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
        id: 'experience',
        heading: 'Experience',
        subhead: 'Government • FinTech • Health',
        cta: 'See timeline',
        href: '/experience',
        img: { src: '/memoji_secret.png', alt: 'Modern office at dusk' },
    },
    {
        id: 'connect',
        heading: 'Connect',
        subhead: "Let's chat!",
        cta: "See links",
        href: '/contact',
        img: { src: '/memoji_wave.png', alt: 'memoji waving' },
        invert: true,
    },
];

export default function Projects() {
    return (
        <>
            <Hero
                title="Projects"
                subtitle="Big experiments. Bigger lessons."
                icon="/memoji_peekaboo.png"
            />

            <section className={styles.gallery} role="list">
                {projects.map((p, i) => (
                    <article
                        key={p.name}
                        className={`${styles.tile} ${i % 2 ? styles.alt : ''}`}
                        role="listitem"
                    >
                        <div className={styles.media}>
                            {/* temp screenshot; drop real one later */}
                            <img src={p.image} alt={`${p.name} screenshot`} />
                        </div>

                        <div className={styles.body}>
                            <h2>{p.name}</h2>
                            <p className={styles.desc}>{p.description}</p>

                            <ul className={styles.tech}>
                                {p.tech.split(',').map(t => (
                                    <li key={t}>{t.trim()}</li>
                                ))}
                            </ul>

                            <div className={styles.cta}>
                                <a href={p.website} target="_blank" rel="noreferrer">Live site</a>
                                <a href={p.github} target="_blank" rel="noreferrer">GitHub</a>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            {/* Bottom gallery */}
            <ScrollGallery cards={cards} />
        </>
    );
}