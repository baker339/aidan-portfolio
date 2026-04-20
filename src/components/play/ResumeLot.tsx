'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { experience, projects, skills, summary } from '@/lib/data';

type PortalId = 'about' | 'experience' | 'skills' | 'projects';

const PORTAL_IDS: PortalId[] = ['about', 'experience', 'skills', 'projects'];

type Portal = {
    id: PortalId;
    label: string;
    short: string;
    x: number;
    y: number;
    accent: string;
};

const portals: Portal[] = [
    { id: 'about', label: 'Big intro', short: 'Intro', x: 48, y: 20, accent: 'bg-blast text-ink' },
    { id: 'experience', label: 'Day jobs', short: 'Jobs', x: 22, y: 44, accent: 'bg-splat text-ink' },
    { id: 'skills', label: 'Tool pile', short: 'Skills', x: 78, y: 44, accent: 'bg-slime text-ink' },
    { id: 'projects', label: 'Shipped stuff', short: 'Builds', x: 50, y: 76, accent: 'bg-grape text-paper' },
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const LOT_VISITS_KEY = 'aidan-portfolio-lot-visits';

function loadVisits(): Set<PortalId> {
    try {
        const raw = localStorage.getItem(LOT_VISITS_KEY);
        const arr: unknown[] = raw ? JSON.parse(raw) : [];
        return new Set(arr.filter((x): x is PortalId => PORTAL_IDS.includes(x as PortalId)));
    } catch {
        return new Set();
    }
}

export default function ResumeLot() {
    const [pos, setPos] = useState({ x: 50, y: 68 });
    const [open, setOpen] = useState<PortalId | null>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [visited, setVisited] = useState<Set<PortalId>>(new Set());
    const [hydrated, setHydrated] = useState(false);
    const [showMoveHint, setShowMoveHint] = useState(true);

    useEffect(() => {
        setVisited(loadVisits());
        setHydrated(true);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const apply = () => setReduceMotion(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    const recordVisit = useCallback((id: PortalId) => {
        setVisited((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            try {
                localStorage.setItem(LOT_VISITS_KEY, JSON.stringify([...next]));
            } catch {
                /* ignore */
            }
            return next;
        });
    }, []);

    useEffect(() => {
        if (open) recordVisit(open);
    }, [open, recordVisit]);

    const move = useCallback(
        (dx: number, dy: number) => {
            if (open) return;
            setShowMoveHint(false);
            setPos((prev) => {
                const step = reduceMotion ? 6 : 4;
                const next = {
                    x: clamp(prev.x + dx * step, 10, 90),
                    y: clamp(prev.y + dy * step, 14, 86),
                };
                const hit = portals.find((p) => Math.hypot(next.x - p.x, next.y - p.y) < 11);
                if (hit) {
                    window.setTimeout(() => setOpen(hit.id), reduceMotion ? 0 : 80);
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
            if (['arrowup', 'w'].includes(k)) {
                e.preventDefault();
                move(0, -1);
            }
            if (['arrowdown', 's'].includes(k)) {
                e.preventDefault();
                move(0, 1);
            }
            if (['arrowleft', 'a'].includes(k)) {
                e.preventDefault();
                move(-1, 0);
            }
            if (['arrowright', 'd'].includes(k)) {
                e.preventDefault();
                move(1, 0);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [move, open]);

    useEffect(() => {
        if (open) closeRef.current?.focus();
    }, [open]);

    const activePortal = portals.find((p) => p.id === open) ?? null;
    const allFound = hydrated && visited.size >= portals.length;

    return (
        <div className="space-y-4">
            <div className="rounded-[var(--radius-blob)] border-4 border-ink bg-ink/40 p-4 text-sm text-paper/90">
                <p className="font-display text-lg text-paper">Goal: hit all four stickers with your blob.</p>
                <p className="mt-2 font-semibold">WASD or arrows · Tap stickers too · Esc closes a card</p>
                {showMoveHint && !open && (
                    <p className="mt-2 animate-pulse text-xs text-blast motion-reduce:animate-none">Tip: start by rolling up toward the yellow sticker.</p>
                )}
            </div>

            <div className="relative mx-auto aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-[var(--radius-blob)] border-4 border-ink bg-gradient-to-br from-grape via-ink to-splat shadow-[10px_10px_0_0_#1a0f2e]">
                {/* HUD */}
                <div className="absolute inset-x-0 top-0 z-30 border-b-2 border-ink/40 bg-ink/55 px-3 py-2 backdrop-blur-sm">
                    <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-paper/90">Stickers found</p>
                    <div className="mt-1.5 flex justify-center gap-1.5">
                        {portals.map((p) => (
                            <span
                                key={p.id}
                                title={p.label}
                                className={`h-2.5 min-w-[2rem] rounded-full border border-ink/40 transition-colors ${
                                    visited.has(p.id) ? 'bg-blast shadow-[0_0_0_1px_#1a0f2e]' : 'bg-paper/20'
                                }`}
                            />
                        ))}
                    </div>
                    {allFound && (
                        <p className="mt-2 text-center text-xs font-bold text-blast">Full clear — you saw everything in this lot.</p>
                    )}
                </div>

                <div className="absolute inset-0 opacity-25 motion-reduce:opacity-10">
                    <div className="absolute left-[10%] top-[22%] h-20 w-20 rotate-12 rounded-full border-4 border-dashed border-paper/35" />
                    <div className="absolute bottom-[14%] right-[8%] h-28 w-28 -rotate-6 rounded-[40%] border-4 border-dotted border-blast/45" />
                </div>

                {portals.map((p) => {
                    const done = visited.has(p.id);
                    return (
                        <button
                            key={p.id}
                            type="button"
                            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ink px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide shadow-[4px_4px_0_0_#1a0f2e] transition sm:px-3 sm:py-2 sm:text-xs ${p.accent} ${
                                reduceMotion ? '' : 'hover:scale-105 active:scale-95'
                            } ${done ? 'opacity-80 ring-2 ring-paper/50' : ''}`}
                            style={{ left: `${p.x}%`, top: `${p.y}%` }}
                            onClick={() => setOpen(p.id)}
                        >
                            <span className={`flex items-center gap-1 ${!done && !reduceMotion ? 'lot-portal-pulse' : ''}`}>
                                {done && <span aria-hidden>✓</span>}
                                <span className="hidden sm:inline">{p.label}</span>
                                <span className="sm:hidden">{p.short}</span>
                            </span>
                        </button>
                    );
                })}

                <div
                    className={`absolute z-20 h-11 w-11 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-ink bg-paper shadow-[5px_5px_0_0_#1a0f2e] sm:h-12 sm:w-12 ${
                        reduceMotion ? '' : 'transition-[left,top] duration-200 ease-out'
                    }`}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    aria-label="You — move with WASD or arrows"
                >
                    <Image src="/memoji_smile.png" alt="" width={48} height={48} className="h-full w-full object-cover" priority />
                </div>

                <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex justify-between text-[10px] font-bold uppercase tracking-widest text-paper/45">
                    <span>Resume lot</span>
                    <span>data.ts</span>
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
                                className="shrink-0 rounded-full border-2 border-ink bg-blast px-3 py-1 text-sm font-extrabold"
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
