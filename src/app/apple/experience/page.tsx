import Hero from '@/components/Hero';
import ScrollGallery from '@/components/ScrollGallery/ScrollGallery';
import { experience, experiencePageGallery, pageHeros } from '@/lib/data';
import { LEGACY_SITE_BASE, mapGalleryPaths } from '@/lib/paths';
import styles from './ProjectsPage.module.css';

export const metadata = { title: 'Experience | Aidan' };

export default function AppleExperiencePage() {
    const hero = pageHeros.experience;
    return (
        <>
            <Hero title={hero.title} subtitle={hero.subtitle} icon={hero.icon} invert={hero.invert} />
            <section className={styles.gallery} role="list">
                {experience.map((job, i) => (
                    <article key={job.company} className={`${styles.tile} ${i % 2 ? '' : styles.alt}`} role="listitem">
                        <div className={styles.body}>
                            <h2>{job.company}</h2>
                            <p className={styles.desc}>{job.role}</p>
                            <p className={styles.desc}>{job.duration}</p>
                        </div>
                        <ul className={styles.body}>
                            {job.responsibilities.map((r) => (
                                <li key={r}>{r}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>
            <ScrollGallery cards={mapGalleryPaths(LEGACY_SITE_BASE, experiencePageGallery)} />
        </>
    );
}
