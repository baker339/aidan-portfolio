import Hero from '@/components/Hero';
import ScrollGallery, {GalleryCard} from "@/components/ScrollGallery/ScrollGallery";

const osCards: GalleryCard[] = [
    {
        id: 'skills',
        heading: 'Skills and Languages',
        subhead: 'A polyglot toolbox',
        cta: 'View skills',
        href: '/skills',
        img: { src: '/memoji_computer.png', alt: 'Syntax-highlighted code' },
        // imgText: "</>"
    },
    {
        id: 'experience',
        heading: 'Experience',
        subhead: 'Government → FinTech → Health',
        cta: 'See timeline',
        href: '/experience',
        img: { src: '/memoji_secret.png', alt: 'Modern glass office' },
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

export default function Home(){
  return(
      <>
        <Hero title="Aidan Baker" subtitle="Building delightful software experiences in .NET, React, iOS, and more."
              icon="/memoji_smile.png" />
        <ScrollGallery cards={osCards} />
      </>
  );
}