import Image from 'next/image';
import Link from 'next/link';
import { HeroSplatHalo } from '@/components/site/HeroSplatHalo';
import { homeGallery, homeHero, homeSection, playModeCopy, summary } from '@/lib/data';

const tilt = ['zany-tilt-a', 'zany-tilt-b', 'zany-tilt-c'] as const;

export default function HomePage() {
    return (
        <div className="space-y-12">
            <section className="motion-reduce:none relative overflow-visible rounded-[var(--radius-blob)] border-[5px] border-ink bg-gradient-to-br from-splat via-blast to-slime p-[1px] shadow-[12px_12px_0_0_#1a0f2e]">
                <div className="zany-mess-card bg-ink/88 p-8 md:p-12">
                    <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                        <div className="relative flex h-[180px] w-[180px] shrink-0 items-center justify-center overflow-visible md:h-[200px] md:w-[200px]">
                            <div className="relative z-10 h-full w-full zany-hero-pop">
                                <HeroSplatHalo />
                                <div className="relative z-10 flex h-full w-full items-center justify-center">
                                    <Image
                                        src={homeHero.icon}
                                        alt=""
                                        width={180}
                                        height={180}
                                        priority
                                        className="zany-splat-radius relative border-[4px] border-ink object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-4">
                            <h1 className="font-display text-4xl leading-[0.95] text-paper drop-shadow-[4px_4px_0_#ff6b2d] md:text-6xl">{homeHero.title}</h1>
                            <p className="max-w-2xl text-lg text-paper/90 md:text-xl">{homeHero.subtitle}</p>
                            <p className="max-w-3xl text-sm leading-relaxed text-paper/75 md:text-base">{summary}</p>
                            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                                <Link
                                    href="/play"
                                    className="zany-splat-radius zany-wobble-hover inline-flex items-center justify-center border-[4px] border-ink bg-splat px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-ink shadow-[8px_8px_0_0_#1a0f2e] transition hover:brightness-105 motion-reduce:hover:animate-none"
                                >
                                    {playModeCopy.ctaLabel}
                                </Link>
                                <Link
                                    href="/projects"
                                    className="zany-splat-radius zany-wobble-hover inline-flex items-center justify-center border-[4px] border-ink bg-paper px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-ink shadow-[8px_8px_0_0_#7b5cff] transition hover:brightness-105 motion-reduce:hover:animate-none"
                                >
                                    See projects
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section aria-labelledby="home-tour" className="space-y-6">
                <h2 id="home-tour" className="font-display text-3xl leading-none text-paper md:text-5xl md:leading-none">
                    <span className="inline-block rotate-[-2deg] text-blast drop-shadow-[3px_3px_0_#1a0f2e]">{homeSection.title}</span>
                </h2>
                <div className="grid gap-6 py-1 md:grid-cols-2 md:gap-x-6 md:gap-y-8 md:py-2">
                    {homeGallery.map((card, idx) => (
                        <Link
                            key={card.id}
                            href={card.href}
                            className={`zany-wobble-hover group relative block overflow-visible border-[4px] border-ink p-7 pb-8 shadow-[10px_10px_0_0_#1a0f2e] transition hover:brightness-105 motion-reduce:hover:animate-none sm:p-8 sm:pb-9 ${tilt[idx % 3]} ${
                                idx % 3 === 0
                                    ? 'bg-grape text-paper'
                                    : idx % 3 === 1
                                      ? 'bg-splat text-paper'
                                      : 'bg-slime text-ink'
                            } zany-splat-radius`}
                        >
                            <span
                                className="pointer-events-none absolute right-2 top-2 h-20 w-20 rounded-full border-4 border-dashed border-ink/25 opacity-50 sm:right-3 sm:top-3"
                                aria-hidden
                            />
                            <div className="relative flex w-full flex-col items-center gap-5 sm:flex-row sm:items-stretch sm:gap-6">
                                {card.img && (
                                    <div className="flex shrink-0 justify-center sm:justify-start">
                                        <div className="relative h-[104px] w-[104px] shrink-0 overflow-hidden rounded-2xl border-[3px] border-ink bg-paper/90 p-1">
                                            <Image
                                                src={card.img.src}
                                                alt={card.img.alt}
                                                width={96}
                                                height={96}
                                                className="h-full w-full object-contain object-center"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="flex w-full min-w-0 flex-1 flex-col justify-between gap-4 sm:min-h-[104px]">
                                    <div className="w-full space-y-2 sm:pr-1">
                                        <h3 className="font-display text-2xl leading-snug sm:text-3xl sm:leading-snug">{card.heading}</h3>
                                        <p
                                            className={`text-sm font-semibold sm:text-base ${
                                                idx % 3 === 2 ? 'text-ink/85' : 'text-paper/90'
                                            }`}
                                        >
                                            {card.subhead}
                                        </p>
                                    </div>
                                    <span className="inline-flex w-fit max-w-full items-center self-start rounded-full border-2 border-ink bg-paper px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink sm:self-end">
                                        {card.cta} →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
