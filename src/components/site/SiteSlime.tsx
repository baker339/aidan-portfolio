'use client';

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react';

type SlimePhase = 'idle' | 'cover' | 'uncover';

type SlimeContextValue = {
    slimed: boolean;
    phase: SlimePhase;
    busy: boolean;
    toggleSlime: () => void;
};

const SlimeContext = createContext<SlimeContextValue | null>(null);

/** Light smoothing so the clip-path reads soft / stringy, not faceted. */
function smoothPulls(values: number[], passes: number): number[] {
    let v = values;
    for (let p = 0; p < passes; p++) {
        v = v.map((_, i) => {
            const a = v[Math.max(0, i - 1)]!;
            const b = v[i]!;
            const c = v[Math.min(v.length - 1, i + 1)]!;
            return 0.22 * a + 0.56 * b + 0.22 * c;
        });
    }
    return v;
}

/** t ∈ [0, 1] along the bottom sample line. Wide σ = fat paint blob, narrow σ = runny tendril. */
function paintDrip(t: number, t0: number, width: number, amp: number): number {
    const z = (t - t0) / width;
    return amp * Math.exp(-z * z);
}

/** Wide hanging bulbs + narrow streams — reads like gravity paint, not sine ripples. */
const PAINT_BLOBS: readonly [number, number, number][] = [
    [0.05, 0.108, 38],
    [0.2, 0.092, 32],
    [0.36, 0.118, 42],
    [0.54, 0.1, 36],
    [0.7, 0.112, 40],
    [0.88, 0.098, 34],
];

const PAINT_MELT: readonly [number, number, number][] = [
    [0.13, 0.062, 18],
    [0.46, 0.068, 20],
    [0.8, 0.065, 17],
];

/** Thin runners under the fat heads (paint breaking loose). */
const PAINT_STREAMS: readonly [number, number, number][] = [
    [0.09, 0.023, 26],
    [0.24, 0.026, 24],
    [0.42, 0.021, 28],
    [0.62, 0.024, 25],
    [0.76, 0.022, 27],
    [0.93, 0.025, 24],
];

/**
 * Paint-drip silhouette — one opaque sheet.
 * Gaussian blobs (wide) + narrow streams + melt overlap; then ~4× vertical stretch.
 */
function buildSlimeSheetClipPath(): string {
    const steps = 120;
    const topInset = 6.5;
    const ti = topInset.toFixed(2);
    const raw: number[] = [];
    const ledge = 56;

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        let dip = 0;
        for (const [t0, w, amp] of PAINT_BLOBS) {
            dip += paintDrip(t, t0, w, amp);
        }
        for (const [t0, w, amp] of PAINT_MELT) {
            dip += paintDrip(t, t0, w, amp) * 0.62;
        }
        for (const [t0, w, amp] of PAINT_STREAMS) {
            dip += paintDrip(t, t0, w, amp);
        }
        /* Slight sag / wobble so it doesn’t feel vector-perfect. */
        dip += Math.sin(t * Math.PI * 2 * 16 + 0.4) * 1.4 + Math.sin(t * Math.PI * 2 * 7.5 + 1.1) * 0.9;

        let pull = ledge - dip;
        pull = Math.min(62, Math.max(1.2, pull));
        raw.push(pull);
    }

    let minP = raw[0]!;
    let maxP = raw[0]!;
    for (const p of raw) {
        minP = Math.min(minP, p);
        maxP = Math.max(maxP, p);
    }
    const span = Math.max(maxP - minP, 1e-6);
    /** Stretch vertical drip range ~4× (keep deepest tips fixed, pull valleys way up). */
    const DRIP_STRETCH = 4;
    const maxSpanPx = 248;
    const targetSpan = Math.min(span * DRIP_STRETCH, maxSpanPx);
    for (let i = 0; i < raw.length; i++) {
        raw[i] = minP + ((raw[i]! - minP) / span) * targetSpan;
        /* Nudge tips slightly past the previous floor for extra hang. */
        raw[i] = Math.min(245, Math.max(0, raw[i]! - 2.5));
    }

    const softened = smoothPulls(raw, 2);
    const pts: string[] = ['0% 0%', '100% 0%', `100% ${ti}%`];
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = (1 - t) * 100;
        pts.push(`${x.toFixed(2)}% calc(100% - ${softened[i]!.toFixed(1)}px)`);
    }
    pts.push(`0% ${ti}%`);
    return `polygon(${pts.join(', ')})`;
}

export function useSiteSlime() {
    const ctx = useContext(SlimeContext);
    if (!ctx) {
        throw new Error('useSiteSlime must be used within SiteSlimeProvider');
    }
    return ctx;
}

/** Blob toggle in the nav — slime vs clean. */
export function SlimeNavButton() {
    const { slimed, busy, toggleSlime } = useSiteSlime();
    return (
        <button
            type="button"
            onClick={toggleSlime}
            disabled={busy}
            aria-pressed={slimed}
            aria-label={slimed ? 'Clean off the slime' : 'Slime the whole site'}
            title={slimed ? 'Clean off the slime' : 'Slime mode'}
            className="slime-nav-btn zany-splat-radius relative inline-flex h-11 w-11 shrink-0 items-center justify-center border-[3px] border-ink bg-gradient-to-br from-slime via-[#6ef08f] to-slime-deep text-ink shadow-[4px_4px_0_0_#1a0f2e] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none"
        >
            <svg className="relative h-6 w-6" viewBox="0 0 32 32" fill="none" aria-hidden>
                <path
                    fill="currentColor"
                    stroke="rgb(26, 15, 46)"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                    paintOrder="stroke fill"
                    d="M16 6c4-1 8 1 9 5 3 1 5 5 3 9 2 4-1 8-5 9-1 3-5 5-9 3-4 2-8-1-9-5-3-1-5-5-3-9-2-4 1-8 5-9 1-3 5-5 9-3Z"
                />
                <ellipse cx="10" cy="22" rx="2.2" ry="3" fill="currentColor" stroke="rgb(26, 15, 46)" strokeWidth="1" />
                <ellipse cx="24" cy="24" rx="1.8" ry="2.6" fill="currentColor" stroke="rgb(26, 15, 46)" strokeWidth="1" />
            </svg>
            <span className="sr-only">{slimed ? 'Clean slime' : 'Slime mode'}</span>
        </button>
    );
}

export function SiteSlimeProvider({
    children,
    displayVariableClass,
}: {
    children: ReactNode;
    displayVariableClass: string;
}) {
    const [slimed, setSlimed] = useState(false);
    const [phase, setPhase] = useState<SlimePhase>('idle');
    const [prMotion, setPrMotion] = useState(false);
    const pendingRef = useRef<'cover' | 'uncover' | null>(null);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrMotion(mq.matches);
        const fn = () => setPrMotion(mq.matches);
        mq.addEventListener('change', fn);
        return () => mq.removeEventListener('change', fn);
    }, []);

    const busy = phase !== 'idle';

    const finishCover = useCallback(() => {
        setSlimed(true);
        setPhase('idle');
        pendingRef.current = null;
    }, []);

    const finishUncover = useCallback(() => {
        setPhase('idle');
        pendingRef.current = null;
    }, []);

    const toggleSlime = useCallback(() => {
        if (phase !== 'idle') {
            return;
        }
        if (prMotion) {
            setSlimed((s) => !s);
            return;
        }
        if (!slimed) {
            pendingRef.current = 'cover';
            setPhase('cover');
        } else {
            pendingRef.current = 'uncover';
            setSlimed(false);
            setPhase('uncover');
        }
    }, [phase, prMotion, slimed]);

    const onAnimEnd = useCallback(
        (e: React.AnimationEvent<HTMLDivElement>) => {
            if (e.target !== e.currentTarget) {
                return;
            }
            const p = pendingRef.current;
            if (p === 'cover') {
                finishCover();
            } else if (p === 'uncover') {
                finishUncover();
            }
        },
        [finishCover, finishUncover],
    );

    const value = useMemo(
        () => ({
            slimed,
            phase,
            busy,
            toggleSlime,
        }),
        [slimed, phase, busy, toggleSlime],
    );

    const sheetClipPath = useMemo(() => buildSlimeSheetClipPath(), []);

    const overlay =
        phase !== 'idle' && !prMotion ? (
            <div
                key={phase}
                className={phase === 'cover' ? 'slime-overlay slime-overlay--cover' : 'slime-overlay slime-overlay--uncover'}
                aria-hidden
                role="presentation"
            >
                <div className="slime-overlay__sheet" style={{ clipPath: sheetClipPath }} onAnimationEnd={onAnimEnd} />
            </div>
        ) : null;

    return (
        <SlimeContext.Provider value={value}>
            <div
                className={`${displayVariableClass} site-skin site-scanlines flex min-h-dvh flex-col ${slimed ? 'site-slime-mode' : ''}`}
            >
                {children}
                {overlay}
            </div>
        </SlimeContext.Provider>
    );
}
