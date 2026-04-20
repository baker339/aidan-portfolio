import { pageHeros, skills, skillsPageGallery } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = { title: 'Skills | Aidan' };

export default function SkillsPage() {
    const hero = pageHeros.skills;
    return (
        <div className="space-y-10">
            <header className="zany-mess-card flex flex-col items-center gap-4 border-4 border-ink bg-grape p-8 text-center shadow-[8px_8px_0_0_#1a0f2e] md:flex-row md:text-left">
                <Image src={hero.icon} alt="" width={120} height={120} className="zany-splat-radius border-[4px] border-ink bg-paper object-cover zany-sticker-ring" />
                <div>
                    <h1 className="font-display text-4xl text-paper md:text-5xl">{hero.title}</h1>
                    <p className="mt-2 text-lg text-paper/85">{hero.subtitle}</p>
                </div>
            </header>
            <div className="grid gap-8 py-1 md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:py-2">
                {Object.entries(skills).map(([group, list], i) => (
                    <section
                        key={group}
                        className={`zany-mess-card relative overflow-hidden border-4 border-ink shadow-[6px_6px_0_0_#1a0f2e] ${i % 2 === 0 ? 'bg-paper text-ink' : 'bg-splat text-ink'}`}
                    >
                        {/* zany-mess-card uses rem-based radii — tall chip stacks no longer hit % superellipse pinch like zany-splat-panel */}
                        <div className="flex w-full flex-col items-center px-8 pb-11 pt-10 text-center sm:px-10 sm:pb-12 sm:pt-11 md:px-11 md:pb-14 md:pt-12">
                            <h2 className="font-display max-w-full text-balance text-2xl leading-snug">{group}</h2>
                            <ul
                                className="mt-5 flex w-full max-w-[min(100%,36rem)] flex-wrap justify-center gap-2.5 px-1 sm:gap-3"
                                role="list"
                            >
                                {[...list].map((item) => (
                                    <li
                                        key={item}
                                        className="rounded-2xl border-2 border-ink bg-white/70 px-3 py-1.5 text-center text-[0.8125rem] font-semibold leading-snug sm:px-3.5 sm:text-sm [overflow-wrap:anywhere]"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ))}
            </div>
            <section className="rounded-[var(--radius-blob)] border-4 border-dashed border-paper/40 p-6">
                <h2 className="font-display text-2xl text-paper">More pages</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                    {skillsPageGallery.map((c) => (
                        <Link
                            key={c.id}
                            href={c.href}
                            className="rounded-full border-2 border-ink bg-blast px-4 py-2 text-sm font-bold text-ink shadow-[4px_4px_0_0_#1a0f2e]"
                        >
                            {c.heading}
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
