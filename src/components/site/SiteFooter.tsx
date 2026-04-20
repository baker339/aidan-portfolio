import Link from 'next/link';

export default function SiteFooter() {
    const year = new Date().getFullYear();
    return (
        <footer className="mt-auto shrink-0 border-t-4 border-ink bg-grape/40 py-10 text-sm text-paper/90">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold">© {year} Aidan Baker</p>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/apple"
                        className="inline-flex items-center gap-0.5 rounded-full border-2 border-paper/30 px-4 py-2 text-lg leading-none text-paper hover:border-ink hover:bg-blast hover:text-ink"
                        title="Classic site — legacy /apple layout"
                        aria-label="Open classic site layout at slash apple"
                    >
                        <span aria-hidden>🍎</span>
                        <span aria-hidden>❓</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
