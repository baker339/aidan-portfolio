import Image from 'next/image';
import Hero from '@/components/Hero';
import ScrollGallery from '@/components/ScrollGallery/ScrollGallery';
import { pageHeros, projects, projectsPageGallery } from '@/lib/data';
import { LEGACY_SITE_BASE, mapGalleryPaths } from '@/lib/paths';
import styles from './ProjectsPage.module.css';

export const metadata = { title: 'Projects | Aidan' };

export default function AppleProjectsPage() {
    const hero = pageHeros.projects;
    return (
        <>
            <Hero title={hero.title} subtitle={hero.subtitle} icon={hero.icon} invert={hero.invert} />
            <section className={styles.gallery} role="list">
                {projects.map((p, i) => (
                    <article key={p.name} className={`${styles.tile} ${i % 2 ? styles.alt : ''}`} role="listitem">
                        <div className={styles.media}>
                            <Image
                                src={p.image}
                                alt={p.imageAlt}
                                fill
                                sizes="(max-width: 860px) 100vw, 50vw"
                                className="object-cover"
                                unoptimized={p.image.endsWith('.svg')}
                            />
                        </div>
                        <div className={styles.body}>
                            <h2>{p.name}</h2>
                            <p className={styles.desc}>{p.description}</p>
                            <ul className={styles.tech}>
                                {p.tech.split(',').map((t) => (
                                    <li key={t}>{t.trim()}</li>
                                ))}
                            </ul>
                            <div className={styles.cta}>
                                <a href={p.website} target="_blank" rel="noreferrer">
                                    Live site
                                </a>
                                <a href={p.github} target="_blank" rel="noreferrer">
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
            <ScrollGallery cards={mapGalleryPaths(LEGACY_SITE_BASE, projectsPageGallery)} />
        </>
    );
}
