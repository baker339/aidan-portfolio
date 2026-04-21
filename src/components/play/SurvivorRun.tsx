'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    applyUpgrade,
    createInitialState,
    needsLevelUp,
    rollUpgradeOffers,
    stepGame,
    tryConsumeLevelUp,
    type GameState,
    type MoveInput,
    type UpgradeId,
    type UpgradeOffer,
    WORLD,
} from '@/lib/play/survivorGame';

type Phase = 'title' | 'playing' | 'levelup' | 'dead';

const COLORS = {
    ink: '#1a0f2e',
    paper: '#fff8ef',
    blast: '#ffde59',
    splat: '#ff6b2d',
    grape: '#7b5cff',
    slime: '#5cff7a',
    gem: '#ffde59',
} as const;

function drawGame(ctx: CanvasRenderingContext2D, state: GameState, memoji: HTMLImageElement | null) {
    const { w, h } = WORLD;
    ctx.save();
    ctx.clearRect(0, 0, w, h);

    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#2b0f4a');
    g.addColorStop(0.45, '#1a0f2e');
    g.addColorStop(1, '#120824');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(255,248,239,0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }
    for (let y = 0; y < h; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }

    for (const gem of state.gems) {
        ctx.fillStyle = COLORS.gem;
        ctx.strokeStyle = COLORS.ink;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gem.pos.x, gem.pos.y - 5);
        ctx.lineTo(gem.pos.x + 4, gem.pos.y);
        ctx.lineTo(gem.pos.x, gem.pos.y + 5);
        ctx.lineTo(gem.pos.x - 4, gem.pos.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    for (const e of state.enemies) {
        ctx.fillStyle = COLORS.splat;
        ctx.strokeStyle = COLORS.ink;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(e.pos.x, e.pos.y, e.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        const t = Math.max(0, e.hp / e.maxHp);
        ctx.strokeStyle = COLORS.ink;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(e.pos.x, e.pos.y, e.radius + 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * t);
        ctx.stroke();
    }

    for (const pr of state.projectiles) {
        ctx.fillStyle = COLORS.blast;
        ctx.strokeStyle = COLORS.ink;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pr.pos.x, pr.pos.y, pr.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    const p = state.player;
    ctx.fillStyle = COLORS.paper;
    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(p.pos.x, p.pos.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (memoji && memoji.complete && memoji.naturalWidth) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, p.radius - 3, 0, Math.PI * 2);
        ctx.clip();
        const s = (p.radius - 3) * 2;
        ctx.drawImage(memoji, p.pos.x - s / 2, p.pos.y - s / 2, s, s);
        ctx.restore();
    }

    if (p.invulnMs > 0 && Math.floor(p.invulnMs / 80) % 2 === 0) {
        ctx.strokeStyle = 'rgba(255,222,89,0.55)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, p.radius + 5, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.restore();
}

export default function SurvivorRun() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef = useRef<GameState>(createInitialState());
    const inputRef = useRef<MoveInput>({ x: 0, y: 0 });
    const keysRef = useRef<Set<string>>(new Set());
    const rafRef = useRef<number>(0);
    const lastRef = useRef<number>(0);
    const hudAccRef = useRef(0);
    const memojiRef = useRef<HTMLImageElement | null>(null);
    const phaseRef = useRef<Phase>('title');
    const [phase, setPhase] = useState<Phase>('title');
    const [offers, setOffers] = useState<UpgradeOffer[]>([]);
    const [hud, setHud] = useState({ t: 0, takedowns: 0, level: 1, hp: 100, maxHp: 100 });
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const fn = () => setReduceMotion(mq.matches);
        fn();
        mq.addEventListener('change', fn);
        return () => mq.removeEventListener('change', fn);
    }, []);

    useEffect(() => {
        const img = new window.Image();
        img.src = '/memoji_smile.png';
        img.onload = () => {
            memojiRef.current = img;
        };
    }, []);

    const syncHud = useCallback(() => {
        const s = stateRef.current;
        setHud({
            t: s.t,
            takedowns: s.takedowns,
            level: s.player.level,
            hp: Math.ceil(s.player.hp),
            maxHp: Math.ceil(s.player.maxHp),
        });
    }, []);

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const cssW = rect.width;
        const cssH = (WORLD.h / WORLD.w) * cssW;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        canvas.style.width = `${cssW}px`;
        canvas.style.height = `${cssH}px`;
        canvas.width = Math.floor(cssW * dpr);
        canvas.height = Math.floor(cssH * dpr);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.scale(cssW / WORLD.w, cssH / WORLD.h);
    }, []);

    useEffect(() => {
        resizeCanvas();
        const ro = new ResizeObserver(() => resizeCanvas());
        const el = canvasRef.current?.parentElement;
        if (el) ro.observe(el);
        window.addEventListener('resize', resizeCanvas);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [resizeCanvas]);

    const stopLoop = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = 0;
        }
    }, []);

    const flushDraw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) drawGame(ctx, stateRef.current, memojiRef.current);
    }, []);

    const tickRef = useRef<(now: number) => void>(() => {});

    const openLevelUp = useCallback(() => {
        const s = stateRef.current;
        const next = rollUpgradeOffers(s.stacks, Math.random, 3);
        if (next.length === 0) {
            while (needsLevelUp(s)) {
                tryConsumeLevelUp(s);
            }
            s.player.hp = Math.min(s.player.maxHp, s.player.hp + 10);
            phaseRef.current = 'playing';
            setPhase('playing');
            requestAnimationFrame(flushDraw);
            lastRef.current = 0;
            rafRef.current = requestAnimationFrame((t) => tickRef.current(t));
            return;
        }
        setOffers(next);
        phaseRef.current = 'levelup';
        setPhase('levelup');
        requestAnimationFrame(flushDraw);
    }, [flushDraw]);

    const tick = useCallback(
        (now: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!ctx) {
                rafRef.current = requestAnimationFrame((t) => tickRef.current(t));
                return;
            }

            if (phaseRef.current === 'playing') {
                const last = lastRef.current || now;
                const raw = now - last;
                const dt = reduceMotion ? Math.min(24, raw) : Math.min(32, raw);
                lastRef.current = now;

                const k = keysRef.current;
                let ix = 0;
                let iy = 0;
                if (k.has('arrowleft') || k.has('a')) ix -= 1;
                if (k.has('arrowright') || k.has('d')) ix += 1;
                if (k.has('arrowup') || k.has('w')) iy -= 1;
                if (k.has('arrowdown') || k.has('s')) iy += 1;
                inputRef.current = { x: ix, y: iy };

                stepGame(stateRef.current, inputRef.current, dt, Math.random);

                if (!stateRef.current.alive) {
                    phaseRef.current = 'dead';
                    setPhase('dead');
                    stopLoop();
                    syncHud();
                    drawGame(ctx, stateRef.current, memojiRef.current);
                    return;
                }
                if (needsLevelUp(stateRef.current)) {
                    stopLoop();
                    openLevelUp();
                    syncHud();
                    return;
                }

                hudAccRef.current += dt;
                if (hudAccRef.current > 140) {
                    hudAccRef.current = 0;
                    syncHud();
                }
            }

            drawGame(ctx, stateRef.current, memojiRef.current);

            if (phaseRef.current === 'playing') {
                rafRef.current = requestAnimationFrame((t) => tickRef.current(t));
            }
        },
        [openLevelUp, reduceMotion, stopLoop, syncHud],
    );

    tickRef.current = tick;

    const startRun = useCallback(() => {
        stopLoop();
        stateRef.current = createInitialState();
        lastRef.current = 0;
        hudAccRef.current = 0;
        phaseRef.current = 'playing';
        setPhase('playing');
        syncHud();
        rafRef.current = requestAnimationFrame((t) => tickRef.current(t));
    }, [stopLoop, syncHud]);

    useEffect(() => {
        return () => stopLoop();
    }, [stopLoop]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            const t = e.key.toLowerCase();
            if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(t)) {
                keysRef.current.add(t);
                if (phaseRef.current === 'playing') e.preventDefault();
            }
        };
        const up = (e: KeyboardEvent) => {
            keysRef.current.delete(e.key.toLowerCase());
        };
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        return () => {
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', up);
        };
    }, []);

    const pickUpgrade = (id: UpgradeId) => {
        const s = stateRef.current;
        applyUpgrade(s, id);
        tryConsumeLevelUp(s);
        if (needsLevelUp(s)) {
            const next = rollUpgradeOffers(s.stacks, Math.random, 3);
            if (next.length === 0) {
                while (needsLevelUp(s)) {
                    tryConsumeLevelUp(s);
                }
                s.player.hp = Math.min(s.player.maxHp, s.player.hp + 6);
            } else {
                setOffers(next);
            }
            syncHud();
            requestAnimationFrame(flushDraw);
            if (next.length > 0) return;
        }
        phaseRef.current = 'playing';
        setPhase('playing');
        lastRef.current = 0;
        rafRef.current = requestAnimationFrame((t) => tickRef.current(t));
        syncHud();
    };

    const minutes = Math.floor(hud.t / 60000);
    const seconds = Math.floor((hud.t % 60000) / 1000);

    return (
        <div className="space-y-4">
            <div className="rounded-[var(--radius-blob)] border-4 border-ink bg-ink/40 p-4 text-sm text-paper/90">
                <p className="font-display text-lg text-paper">
                    Survive the swarm. Auto-fire finds targets. Every level-up names a concrete tool from Aidan’s skills lists and ties it to the stat bump.
                </p>
                <p className="mt-2 font-semibold">WASD or arrows · Level-up pauses the run · Game over links to the rest of the site</p>
            </div>

            <div
                className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[var(--radius-blob)] border-4 border-ink bg-ink shadow-[10px_10px_0_0_#1a0f2e]"
                style={{ aspectRatio: `${WORLD.w} / ${WORLD.h}` }}
            >
                <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" aria-label="Survivor playfield" />

                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink/50 bg-ink/70 px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-paper/95 backdrop-blur-sm">
                    <span>
                        Time {minutes}:{seconds.toString().padStart(2, '0')}
                    </span>
                    <span>Takedowns {hud.takedowns}</span>
                    <span>Lv {hud.level}</span>
                    <span className="text-blast">
                        HP {hud.hp}/{hud.maxHp}
                    </span>
                </div>

                {phase === 'title' && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-ink/82 p-6 text-center backdrop-blur-sm">
                        <p className="font-display text-3xl text-paper">Stack survivor</p>
                        <p className="max-w-md text-sm text-paper/85">
                            Hordes close in. Aidan’s memoji auto-shoots. Each perk card labels which slice of Aidan’s skills it came from and names one live entry from{' '}
                            <Link href="/skills" className="font-bold text-blast underline decoration-2 underline-offset-2">
                                /skills
                            </Link>
                            .
                        </p>
                        <button
                            type="button"
                            className="zany-splat-radius border-4 border-ink bg-blast px-8 py-3 text-base font-extrabold text-ink shadow-[6px_6px_0_0_#1a0f2e]"
                            onClick={startRun}
                        >
                            Start run
                        </button>
                    </div>
                )}

                {phase === 'levelup' && offers.length > 0 && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-ink/88 p-4 backdrop-blur-sm">
                        <p className="font-display text-2xl text-blast">Level up</p>
                        <p className="text-center text-xs text-paper/75">
                            Pick one perk — the small line under the title is which part of Aidan’s résumé data the card is using; the paragraph names the exact skill string from{' '}
                            <Link href="/skills" className="font-bold text-blast underline decoration-2 underline-offset-2">
                                /skills
                            </Link>
                            .
                        </p>
                        <div className="grid w-full max-w-lg gap-2 sm:grid-cols-3">
                            {offers.map((o) => (
                                <button
                                    key={o.id}
                                    type="button"
                                    className="zany-mess-card border-4 border-ink bg-paper p-3 text-left text-ink shadow-[6px_6px_0_0_#1a0f2e] transition hover:brightness-105"
                                    onClick={() => pickUpgrade(o.id)}
                                >
                                    <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink/55">{o.source}</p>
                                    <p className="font-display text-lg leading-tight">{o.title}</p>
                                    <p className="mt-2 text-xs leading-snug text-ink/80 md:hidden">{o.blurbShort}</p>
                                    <p className="mt-2 hidden text-xs leading-snug text-ink/80 md:block">{o.blurb}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {phase === 'dead' && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-ink/88 p-6 text-center backdrop-blur-sm">
                        <p className="font-display text-3xl text-blast">Run over</p>
                        <p className="text-paper/90">
                            That run: {minutes}:{seconds.toString().padStart(2, '0')} on the clock · {hud.takedowns} takedowns · level {hud.level}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                type="button"
                                className="zany-splat-radius border-4 border-ink bg-blast px-6 py-2 text-sm font-extrabold text-ink shadow-[6px_6px_0_0_#1a0f2e]"
                                onClick={startRun}
                            >
                                Again
                            </button>
                            <Link
                                href="/experience"
                                className="zany-splat-radius border-4 border-ink bg-grape px-6 py-2 text-sm font-extrabold text-paper shadow-[6px_6px_0_0_#1a0f2e]"
                            >
                                Read for real →
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <div className="mx-auto grid max-w-sm grid-cols-3 gap-2 md:hidden">
                <span />
                <button
                    type="button"
                    className="rounded-xl border-2 border-ink bg-blast py-3 text-ink"
                    onPointerDown={() => keysRef.current.add('arrowup')}
                    onPointerUp={() => keysRef.current.delete('arrowup')}
                    onPointerLeave={() => keysRef.current.delete('arrowup')}
                    aria-label="Move up"
                >
                    ↑
                </button>
                <span />
                <button
                    type="button"
                    className="rounded-xl border-2 border-ink bg-blast py-3 text-ink"
                    onPointerDown={() => keysRef.current.add('arrowleft')}
                    onPointerUp={() => keysRef.current.delete('arrowleft')}
                    onPointerLeave={() => keysRef.current.delete('arrowleft')}
                    aria-label="Move left"
                >
                    ←
                </button>
                <button
                    type="button"
                    className="rounded-xl border-2 border-ink bg-blast py-3 text-ink"
                    onPointerDown={() => keysRef.current.add('arrowdown')}
                    onPointerUp={() => keysRef.current.delete('arrowdown')}
                    onPointerLeave={() => keysRef.current.delete('arrowdown')}
                    aria-label="Move down"
                >
                    ↓
                </button>
                <button
                    type="button"
                    className="rounded-xl border-2 border-ink bg-blast py-3 text-ink"
                    onPointerDown={() => keysRef.current.add('arrowright')}
                    onPointerUp={() => keysRef.current.delete('arrowright')}
                    onPointerLeave={() => keysRef.current.delete('arrowright')}
                    aria-label="Move right"
                >
                    →
                </button>
            </div>
        </div>
    );
}
