import { experience, experiencePageGallery, pageHeros } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = { title: 'Experience | Aidan' };

export default function ExperiencePage() {
    const hero = pageHeros.experience;
    return (
        <div className="space-y-10">
            <header className="flex flex-col items-center gap-4 rounded-[var(--radius-blob)] border-4 border-ink bg-splat p-8 text-center shadow-[8px_8px_0_0_#1a0f2e] md:flex-row md:text-left">
                <Image src={hero.icon} alt="" width={120} height={120} className="rounded-full border-4 border-ink bg-paper" />
                <div>
                    <h1 className="font-display text-4xl text-ink md:text-5xl">{hero.title}</h1>
                    <p className="mt-2 text-lg text-ink/80">{hero.subtitle}</p>
                </div>
            </header>
            <div className="space-y-6">
                {experience.map((job, i) => (
                    <article
                        key={job.company}
                        className={`rounded-[var(--radius-blob)] border-4 border-ink p-6 shadow-[8px_8px_0_0_#1a0f2e] ${
                            i % 2 === 0 ? 'bg-paper text-ink' : 'bg-grape text-paper'
                        }`}
                    >
                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                            <div>
                                <h2 className="font-display text-2xl md:text-3xl">{job.company}</h2>
                                <p className="text-lg font-semibold opacity-90">{job.role}</p>
                                <p className="text-sm font-bold uppercase tracking-wide opacity-80">{job.duration}</p>
                            </div>
                        </div>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed md:text-base" role="list">
                            {job.responsibilities.map((r) => (
                                <li key={r}>{r}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
            <section className="rounded-[var(--radius-blob)] border-4 border-dashed border-paper/40 p-6">
                <h2 className="font-display text-2xl text-paper">Keep going</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                    {experiencePageGallery.map((c) => (
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
