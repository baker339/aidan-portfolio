import Link from 'next/link';
import SurvivorRun from '@/components/play/SurvivorRun';
import { playModeCopy } from '@/lib/data';

export const metadata = { title: `${playModeCopy.title} | Aidan` };

export default function PlayPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-blast">{playModeCopy.eyebrow}</p>
                    <h1 className="font-display text-4xl text-paper md:text-5xl">{playModeCopy.title}</h1>
                    <p className="mt-2 max-w-2xl text-paper/80">{playModeCopy.subtitle}</p>
                </div>
                <Link
                    href="/"
                    className="zany-splat-radius inline-flex items-center justify-center border-[4px] border-ink bg-paper px-5 py-3 text-center text-sm font-extrabold text-ink shadow-[6px_6px_0_0_#7b5cff]"
                >
                    {playModeCopy.skipToSiteLabel}
                </Link>
            </div>
            <SurvivorRun />
        </div>
    );
}
