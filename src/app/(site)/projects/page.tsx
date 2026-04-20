import Image from 'next/image';
import Link from 'next/link';
import { pageHeros, projects, projectsPageGallery } from '@/lib/data';

export const metadata = { title: 'Projects | Aidan' };

export default function ProjectsPage() {
    const hero = pageHeros.projects;
    return (
        <div className="space-y-10">
            <header className="flex flex-col items-center gap-4 rounded-[var(--radius-blob)] border-4 border-ink bg-slime p-8 text-center shadow-[8px_8px_0_0_#1a0f2e] md:flex-row md:text-left">
                <Image src={hero.icon} alt="" width={120} height={120} className="rounded-full border-4 border-ink bg-paper" />
                <div>
                    <h1 className="font-display text-4xl text-ink md:text-5xl">{hero.title}</h1>
                    <p className="mt-2 text-lg text-ink/80">{hero.subtitle}</p>
                </div>
            </header>
            <div className="grid gap-8">
                {projects.map((p, i) => (
                    <article
                        key={p.name}
                        className={`grid gap-6 overflow-hidden rounded-[var(--radius-blob)] border-4 border-ink shadow-[8px_8px_0_0_#1a0f2e] md:grid-cols-[280px_1fr] ${
                            i % 2 === 0 ? 'bg-paper text-ink' : 'bg-grape text-paper'
                        }`}
                    >
                        <div className="relative h-48 border-b-4 border-ink bg-ink/5 md:h-full md:min-h-[240px] md:border-b-0 md:border-r-4">
                            {/* Local assets include PNG + SVG placeholders; plain img keeps SVGs simple */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.image} alt={p.imageAlt} className="h-full w-full object-cover" />
                        </div>
                        <div className="space-y-4 p-6">
                            <h2 className="font-display text-3xl">{p.name}</h2>
                            <p className="text-base opacity-90">{p.description}</p>
                            <ul className="flex flex-wrap gap-2" role="list">
                                {p.tech.split(',').map((t) => (
                                    <li key={t} className="rounded-full border-2 border-ink bg-white/40 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                                        {t.trim()}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={p.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex rounded-full border-2 border-ink bg-splat px-4 py-2 text-sm font-extrabold text-ink"
                                >
                                    Live site
                                </a>
                                <a
                                    href={p.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex rounded-full border-2 border-ink bg-blast px-4 py-2 text-sm font-extrabold text-ink"
                                >
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            <section className="rounded-[var(--radius-blob)] border-4 border-dashed border-paper/40 p-6">
                <h2 className="font-display text-2xl text-paper">Elsewhere</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                    {projectsPageGallery.map((c) => (
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
