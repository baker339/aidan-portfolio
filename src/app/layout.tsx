import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata:Metadata={
    title:'Aidan | Portfolio',
    description:'Senior Software Engineer portfolio',
};

export default function RootLayout({children}:{children:React.ReactNode}){
    return (
        <html lang="en">
            <body>
                <Nav />
                    <main style={{marginTop:'3.5rem'}}>{children}</main>
                <Footer />
            </body>
        </html>
    );
}