import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ScrollGallery from '@/components/ScrollGallery/ScrollGallery';
import { pageHeros, skills, skillsPageGallery } from '@/lib/data';
import { LEGACY_SITE_BASE, mapGalleryPaths } from '@/lib/paths';
import styles from './SkillsGrid.module.css';

export const metadata = { title: 'Skills | Aidan' };

export default function AppleSkillsPage() {
    const hero = pageHeros.skills;
    return (
        <>
            <Hero title={hero.title} subtitle={hero.subtitle} icon={hero.icon} invert={hero.invert} />
            <Section>
                <div className={styles.grid}>
                    {Object.entries(skills).map(([group, list]) => (
                        <div key={group} className={styles.category}>
                            <h2>{group}</h2>
                            <ul role="list">
                                {[...list].map((item) => (
                                    <li key={item} className={styles.pill}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>
            <ScrollGallery cards={mapGalleryPaths(LEGACY_SITE_BASE, skillsPageGallery)} />
        </>
    );
}
