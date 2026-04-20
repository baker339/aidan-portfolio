import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <p>© {new Date().getFullYear()} Aidan Baker</p>
                <Link
                    href="/"
                    className={styles.newSiteLink}
                    title="New portfolio — main site"
                    aria-label="Back to new portfolio design at home"
                >
                    {/* Pouring liquid / splash — closest standard “splatter” glyph across platforms */}
                    <span aria-hidden>🫟</span>
                    <span aria-hidden>❓</span>
                </Link>
            </div>
        </footer>
    );
}
