'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { primaryNav, playModeCopy } from '@/lib/data';
import { SlimeNavButton } from '@/components/site/SiteSlime';

const extraNav = [{ href: '/play', label: playModeCopy.navLabel }] as const;

/** Bottom edge sawtooth (tips point down). Coordinates are % width, px depth. */
function navSawClipPath(teeth: number, depthPx: number) {
    const pts: string[] = ['0% 0%', '100% 0%', `100% calc(100% - ${depthPx}px)`];
    for (let i = 0; i <= teeth; i++) {
        const x = ((teeth - i) / teeth) * 100;
        const y = i % 2 === 0 ? '100%' : `calc(100% - ${depthPx}px)`;
        pts.push(`${x}% ${y}`);
    }
    pts.push(`0% calc(100% - ${depthPx}px)`);
    return `polygon(${pts.join(', ')})`;
}

export default function SiteNav() {
    const [open, setOpen] = useState(false);
    const links = [...primaryNav, ...extraNav];

    const sawShellStyle = useMemo(() => {
        const clip = navSawClipPath(32, 9);
        return {
            clipPath: clip,
            filter: [
                'drop-shadow(0 1px 0 rgb(26, 15, 46))',
                'drop-shadow(0 1px 0 rgb(26, 15, 46))',
                'drop-shadow(0 1px 0 rgb(26, 15, 46))',
                'drop-shadow(0 1px 0 rgb(26, 15, 46))',
                'drop-shadow(0 1px 0 rgb(26, 15, 46))',
                'drop-shadow(0 10px 0 rgba(26, 15, 46, 0.45))',
            ].join(' '),
        } satisfies CSSProperties;
    }, []);

    return (
        <header className="sticky top-0 z-40 shrink-0">
            <div
                className="site-nav-saw-shell rounded-b-[1.5rem_2.25rem_1.25rem_2rem] bg-grape/90 pb-[10px] backdrop-blur-md"
                style={sawShellStyle}
            >
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
                    <Link href="/" className="flex items-center gap-2 font-display text-lg tracking-wide text-paper" onClick={() => setOpen(false)}>
                        <span className="zany-splat-radius relative inline-flex h-10 w-10 items-center justify-center overflow-hidden border-2 border-ink bg-blast shadow-[4px_4px_0_0_#1a0f2e]">
                            <Image src="/memoji_smile.png" alt="" width={40} height={40} className="object-cover" />
                        </span>
                        <span className="hidden sm:inline">Aidan Baker</span>
                    </Link>
                    <div className="flex flex-1 items-center justify-end gap-2 md:gap-3">
                        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
                            {links.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="zany-splat-radius border-2 border-transparent px-3 py-2 text-sm font-semibold text-paper transition hover:border-ink hover:bg-splat hover:text-ink"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                        <SlimeNavButton />
                        <button
                            type="button"
                            className="zany-splat-radius inline-flex h-11 w-11 flex-col items-center justify-center gap-1 border-2 border-ink bg-blast text-ink shadow-[4px_4px_0_0_#1a0f2e] md:hidden"
                            aria-expanded={open}
                            aria-controls="site-drawer"
                            onClick={() => setOpen((v) => !v)}
                        >
                            <span className="block h-0.5 w-5 bg-ink" />
                            <span className="block h-0.5 w-5 bg-ink" />
                            <span className="block h-0.5 w-5 bg-ink" />
                            <span className="sr-only">Toggle menu</span>
                        </button>
                    </div>
                </div>
            </div>
            {open && (
                <div id="site-drawer" className="border-t-2 border-ink bg-ink/95 px-4 py-3 md:hidden">
                    <div className="mx-auto flex max-w-6xl flex-col gap-2.5">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="block w-full rounded-2xl border-2 border-paper/30 bg-paper/5 px-4 py-3.5 text-left text-base font-semibold text-paper shadow-[4px_4px_0_0_rgba(26,15,46,0.55)] transition hover:border-ink hover:bg-splat hover:text-ink hover:shadow-[6px_6px_0_0_#1a0f2e] active:translate-y-px motion-reduce:active:translate-y-0"
                                onClick={() => setOpen(false)}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
