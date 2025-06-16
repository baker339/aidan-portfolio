import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ScrollGallery, { GalleryCard } from '@/components/ScrollGallery/ScrollGallery';
import { skills } from '@/lib/data';
import styles from './SkillsGrid.module.css';

export const metadata = { title: 'Skills | Aidan' };

export default function SkillsPage() {
    /* card data for the bottom gallery */
    const cards: GalleryCard[] = [
        {
            id: 'experience',
            heading: 'Experience',
            subhead: 'Government • FinTech • Health',
            cta: 'See timeline',
            href: '/experience',
            img: { src: '/memoji_secret.png', alt: 'Modern office at dusk' },
        },
        {
            id: 'projects',
            heading: 'Side Projects',
            subhead: 'Shipping ideas for fun',
            cta: 'Explore apps',
            href: '/projects',
            img: { src: '/memoji_peekaboo.png', alt: 'MacBook on wooden desk' },
            invert: true,
        },
    ];

    return (
        <>
            {/* full-bleed hero */}
            <Hero
                title="My Toolbox"
                subtitle="What I reach for every day."
                icon={"/memoji_computer.png"}
                invert
            />

            {/* main skills grid */}
            <Section>
                <div className={styles.grid}>
                    {Object.entries(skills).map(([group, list]) => (
                        <div key={group} className={styles.category}>
                            <h2>{group}</h2>
                            <ul role="list">
                                {(list as string[]).map(item => (
                                    <li key={item} className={styles.pill}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>

            {/* bottom scroll gallery (optional but very Apple-esque) */}
            <ScrollGallery cards={cards} />
        </>
    );
}