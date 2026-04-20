import '../legacy-globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function AppleLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Nav basePath="/apple" />
            <main style={{ marginTop: '3.5rem' }}>{children}</main>
            <Footer />
        </>
    );
}
