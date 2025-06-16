'use client';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './Hero.module.css';

interface Props{
    title: string;
    subtitle?: string;
    img?: string;
    invert?: boolean;   // white text on dark image
    href?: string;      // optional CTA link
    children?: ReactNode;
    icon?: string;
}
export default function Hero({title,subtitle,img,invert,href,children, icon}:Props){
    return (
        <section className={`${styles.hero} ${invert?styles.invert:''}`}>
            {img && <Image src={img} alt="" fill priority className={styles.bg}/>}
            <div className={styles.content}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {icon && <Image src={icon} alt="" width={200} height={200} />}
                </div>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
                {href && <a href={href}>Learn more</a>}
                {children}
            </div>
        </section>
    );
}