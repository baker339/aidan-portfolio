import type { GalleryCard } from '@/lib/data';

/** Prefix used for the archived legacy UI. */
export const LEGACY_SITE_BASE = '/apple';

/** Prefix internal links for a mounted site segment (`''` for the main site). */
export function withSiteBase(siteBase: string, href: string): string {
    if (!siteBase) return href;
    if (href === '/') return siteBase;
    if (href.startsWith('/')) return `${siteBase}${href}`;
    return href;
}

export function mapGalleryPaths(siteBase: string, cards: GalleryCard[]): GalleryCard[] {
    if (!siteBase) return cards;
    return cards.map((c) => ({ ...c, href: withSiteBase(siteBase, c.href) }));
}
