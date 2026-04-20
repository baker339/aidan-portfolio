import Hero from '@/components/Hero';
import ScrollGallery from '@/components/ScrollGallery/ScrollGallery';
import { homeGallery, homeHero } from '@/lib/data';
import { LEGACY_SITE_BASE, mapGalleryPaths } from '@/lib/paths';

export default function AppleHomePage() {
    return (
        <>
            <Hero title={homeHero.title} subtitle={homeHero.subtitle} icon={homeHero.icon} />
            <ScrollGallery cards={mapGalleryPaths(LEGACY_SITE_BASE, homeGallery)} />
        </>
    );
}
