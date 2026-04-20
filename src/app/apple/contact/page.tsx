import Hero from '@/components/Hero';
import ScrollGallery from '@/components/ScrollGallery/ScrollGallery';
import { contactLinks, contactPageGallery, pageHeros } from '@/lib/data';
import { LEGACY_SITE_BASE, mapGalleryPaths } from '@/lib/paths';
import styles from './ContactPage.module.css';

export const metadata = { title: 'Contact | Aidan' };

export default function AppleContactPage() {
    const hero = pageHeros.contact;
    return (
        <>
            <Hero title={hero.title} subtitle={hero.subtitle} icon={hero.icon} invert={hero.invert} />
            <section className={styles.contact}>
                <div className={styles.grid}>
                    {contactLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            className={styles.card}
                            {...(link.href.startsWith('http')
                                ? { target: '_blank' as const, rel: 'noreferrer' as const }
                                : {})}
                        >
                            <h2>{link.heading}</h2>
                            <p>{link.body}</p>
                        </a>
                    ))}
                </div>
            </section>
            <ScrollGallery cards={mapGalleryPaths(LEGACY_SITE_BASE, contactPageGallery)} />
        </>
    );
}
