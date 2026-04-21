import '../site-globals.css';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import { SiteSlimeProvider } from '@/components/site/SiteSlime';
import { Fredoka } from 'next/font/google';

/** Display font for the zany site. Build needs network access to `fonts.googleapis.com` / `fonts.gstatic.com` once per deploy. */
const display = Fredoka({
    subsets: ['latin'],
    variable: '--font-display',
    weight: ['600', '700'],
});

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <SiteSlimeProvider displayVariableClass={display.variable}>
            <a className="sr-only" href="#site-main">
                Skip to content
            </a>
            <SiteNav />
            <main id="site-main" className="flex flex-1 flex-col px-4 pb-12 pt-6 md:pb-14 md:pt-10 lg:pb-16">
                <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">{children}</div>
            </main>
            <SiteFooter />
        </SiteSlimeProvider>
    );
}
