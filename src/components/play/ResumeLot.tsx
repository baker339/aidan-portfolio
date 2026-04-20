'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { experience, projects, skills, summary } from '@/lib/data';

type PortalId = 'about' | 'experience' | 'skills' | 'projects';

type Portal = {
    id: PortalId;
    label: string;
    x: number;
    y: number;
    accent: string;
};

const portals: Portal[] = [
    { id: 'about', label: 'Big intro', x: 48, y: 18, accent: 'bg-blast text-ink' },
    { id: 'experience', label: 'Day jobs', x: 22, y: 42, accent: 'bg-splat text-ink' },
    { id: 'skills', label: 'Tool pile', x: 76, y: 44, accent: 'bg-slime text-ink' },
    { id: 'projects', label: 'Shipped stuff', x: 50, y: 74, accent: 'bg-grape text-paper' },
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function ResumeLot() {
    const [pos, setPos] = useState({ x: 50, y: 68 });
    const [open, setOpen] = useState<PortalId | null>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [visitedCount, setVisitedCount] = useState(0);

    const LOT_VISITS_KEY = 'aidan-portfolio-lot-visits';

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const apply = () => setReduceMotion(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(LOT_VISITS_KEY);
            const visits: string[] = raw ? JSON.parse(raw) : [];
            setVisitedCount(new Set(visits).size);
        } catch {
            /* ignore */
        }
    }, []);

    useEffect(() => {
        if (!open) return;
        try {
            const raw = localStorage.getItem(LOT_VISITS_KEY);
            const visits: string[] = raw ? JSON.parse(raw) : [];
            const next = Array.from(new Set([...visits, open]));
            localStorage.setItem(LOT_VISITS_KEY, JSON.stringify(next));
            setVisitedCount(next.length);
        } catch {
            /* ignore */
        }
    }, [open]);

    const move = useCallback(
        (dx: number, dy: number) => {
            if (open) return;
            setPos((prev) => {
                const step = reduceMotion ? 7 : 5;
                const next = {
                    x: clamp(prev.x + dx * step, 8, 92),
                    y: clamp(prev.y + dy * step, 10, 88),
                };
                const hit = portals.find((p) => Math.hypot(next.x - p.x, next.y - p.y) < 9);
                if (hit) {
                    window.setTimeout(() => setOpen(hit.id), 0);
                }
                return next;
            });
        },
        [open, reduceMotion],
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (open) {
                if (e.key === 'Escape') setOpen(null);
                return;
            }
            const k = e.key.toLowerCase();
            if (['arrowup', 'w'].includes(k)) move(0, -1);
            if (['arrowdown', 's'].includes(k)) move(0, 1);
            if (['arrowleft', 'a'].includes(k)) move(-1, 0);
            if (['arrowright', 'd'].includes(k)) move(1, 0);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [move, open]);

    useEffect(() => {
        if (open) closeRef.current?.focus();
    }, [open]);

    const activePortal = portals.find((p) => p.id === open) ?? null;

    return (
        <div className="space-y-4">
            <div className="rounded-[var(--radius-blob)] border-4 border-ink bg-ink/40 p-4 text-sm text-paper/90">
                <p className="font-semibold">Controls: WASD or arrow keys. Bump a sticker to open it — or tap one. Escape closes.</p>
                <p className="mt-1 text-paper/70">Everything here is wired to the same content module as the rest of the portfolio.</p>
                <p className="mt-2 text-xs text-paper/60">
                    This device remembers: <span className="font-bold text-blast">{visitedCount}</span> / {portals.length} spots opened at least once.
                </p>
            </div>

            <div className="relative mx-auto aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-[var(--radius-blob)] border-4 border-ink bg-gradient-to-br from-grape via-ink to-splat shadow-[10px_10px_0_0_#1a0f2e]">
                <div className="absolute inset-0 opacity-30 motion-reduce:opacity-10">
                    <div className="absolute left-[10%] top-[15%] h-24 w-24 rotate-12 rounded-full border-4 border-dashed border-paper/40" />
                    <div className="absolute right-[8%] bottom-[18%] h-32 w-32 -rotate-6 rounded-[40%] border-4 border-dotted border-blast/50" />
                </div>

                {portals.map((p) => (
                    <button
                        key={p.id}
                        type="button"
                        className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ink px-3 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[4px_4px_0_0_#1a0f2e] transition ${p.accent} ${
                            reduceMotion ? '' : 'hover:scale-105'
                        }`}
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        onClick={() => setOpen(p.id)}
                    >
                        {p.label}
                    </button>
                ))}

                <div
                    className={`absolute z-20 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ink bg-paper shadow-[4px_4px_0_0_#1a0f2e] ${
                        reduceMotion ? '' : 'transition-transform duration-150'
                    }`}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    aria-label="You"
                />

                <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex justify-between text-[10px] font-bold uppercase tracking-widest text-paper/50">
                    <span>Blob map</span>
                    <span>Same data.ts</span>
                </div>
            </div>

            <div className="mx-auto grid max-w-sm grid-cols-3 gap-2 md:hidden">
                <span />
                <button type="button" className="rounded-xl border-2 border-ink bg-blast py-3 text-ink" onClick={() => move(0, -1)} aria-label="Move up">
                    ↑
                </button>
                <span />
                <button type="button" className="rounded-xl border-2 border-ink bg-blast py-3 text-ink" onClick={() => move(-1, 0)} aria-label="Move left">
                    ←
                </button>
                <button type="button" className="rounded-xl border-2 border-ink bg-blast py-3 text-ink" onClick={() => move(0, 1)} aria-label="Move down">
                    ↓
                </button>
                <button type="button" className="rounded-xl border-2 border-ink bg-blast py-3 text-ink" onClick={() => move(1, 0)} aria-label="Move right">
                    →
                </button>
            </div>

            {open && activePortal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4"
                    role="presentation"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) setOpen(null);
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="play-dialog-title"
                        className="zany-mess-card max-h-[85vh] w-full max-w-2xl overflow-y-auto border-4 border-ink bg-paper p-6 text-ink shadow-[12px_12px_0_0_#1a0f2e]"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <h2 id="play-dialog-title" className="font-display text-3xl">
                                {activePortal.label}
                            </h2>
                            <button
                                ref={closeRef}
                                type="button"
                                className="rounded-full border-2 border-ink bg-blast px-3 py-1 text-sm font-extrabold"
                                onClick={() => setOpen(null)}
                            >
                                Close
                            </button>
                        </div>

                        <div className="mt-4 space-y-4 text-sm leading-relaxed md:text-base">
                            {open === 'about' && <p>{summary}</p>}

                            {open === 'experience' && (
                                <div className="space-y-4">
                                    {experience.map((job) => (
                                        <section key={job.company} className="rounded-2xl border-2 border-ink/20 p-4">
                                            <h3 className="font-display text-xl">{job.company}</h3>
                                            <p className="font-semibold">
                                                {job.role} · {job.duration}
                                            </p>
                                            <ul className="mt-2 list-disc space-y-1 pl-5" role="list">
                                                {job.responsibilities.map((r) => (
                                                    <li key={r}>{r}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    ))}
                                </div>
                            )}

                            {open === 'skills' && (
                                <div className="space-y-4">
                                    {Object.entries(skills).map(([group, list]) => (
                                        <section key={group}>
                                            <h3 className="font-display text-xl">{group}</h3>
                                            <ul className="mt-2 flex flex-wrap gap-2" role="list">
                                                {[...list].map((item) => (
                                                    <li key={item} className="rounded-full border border-ink/30 px-2 py-1 text-xs font-semibold">
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    ))}
                                </div>
                            )}

                            {open === 'projects' && (
                                <div className="space-y-4">
                                    {projects.map((p) => (
                                        <section key={p.name} className="rounded-2xl border-2 border-ink/20 p-4">
                                            <h3 className="font-display text-xl">{p.name}</h3>
                                            <p>{p.description}</p>
                                            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-ink/70">{p.tech}</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <a className="rounded-full bg-splat px-3 py-1 text-xs font-extrabold text-ink" href={p.website} target="_blank" rel="noreferrer">
                                                    Live site
                                                </a>
                                                <a className="rounded-full bg-blast px-3 py-1 text-xs font-extrabold text-ink" href={p.github} target="_blank" rel="noreferrer">
                                                    GitHub
                                                </a>
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link href="/" className="rounded-full border-2 border-ink bg-grape px-4 py-2 text-sm font-extrabold text-paper">
                                Open traditional home
                            </Link>
                            <Link
                                href={
                                    open === 'about'
                                        ? '/'
                                        : open === 'experience'
                                          ? '/experience'
                                          : open === 'skills'
                                            ? '/skills'
                                            : '/projects'
                                }
                                className="rounded-full border-2 border-ink bg-paper px-4 py-2 text-sm font-extrabold"
                            >
                                Same section as a page →
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
