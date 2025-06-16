import { ReactNode } from 'react';
import styles from './Section.module.css';
export default function Section({children}:{children:ReactNode}){
    return <section className={styles.section}>{children}</section>;
}