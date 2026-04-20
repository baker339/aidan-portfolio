import Image from 'next/image';
import Link from 'next/link';
import { contactLinks, contactPageGallery, pageHeros } from '@/lib/data';

export const metadata = { title: 'Contact | Aidan' };

export default function ContactPage() {
    const hero = pageHeros.contact;
    return (
        <div className="flex min-h-full flex-1 flex-col gap-10 lg:gap-12">
            <header className="flex shrink-0 flex-col items-center gap-4 rounded-[var(--radius-blob)] border-4 border-ink bg-blast p-8 text-center shadow-[8px_8px_0_0_#1a0f2e] md:flex-row md:text-left">
                <Image src={hero.icon} alt="" width={120} height={120} className="rounded-full border-4 border-ink bg-paper" />
                <div>
                    <h1 className="font-display text-4xl text-ink md:text-5xl">{hero.title}</h1>
                    <p className="mt-2 text-lg text-ink/80">{hero.subtitle}</p>
                </div>
            </header>
            <div className="flex min-h-0 flex-1 flex-col gap-5 md:flex-row md:items-stretch md:gap-6">
                {contactLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.href}
                        className="flex min-h-[13rem] flex-col justify-between rounded-[var(--radius-blob)] border-4 border-ink bg-grape p-6 text-paper shadow-[6px_6px_0_0_#1a0f2e] transition hover:-translate-y-1 motion-reduce:hover:translate-y-0 md:min-h-0 md:flex-1 md:p-8"
                        {...(link.href.startsWith('http') ? { target: '_blank' as const, rel: 'noreferrer' as const } : {})}
                    >
                        <h2 className="font-display text-2xl md:text-3xl">{link.heading}</h2>
                        <p className="mt-3 text-sm font-semibold text-paper/85 md:mt-4 md:text-base">{link.body}</p>
                    </a>
                ))}
            </div>
            <section className="shrink-0 rounded-[var(--radius-blob)] border-4 border-dashed border-paper/40 p-6">
                <h2 className="font-display text-2xl text-paper">And also</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                    {contactPageGallery.map((c) => (
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
