import React from 'react';
import styles from '@styles/Home.module.css';

const Footer = () => {
    return (
        <footer className={`${styles.footer} mt-5`}>
            <a
                href="https://www.jhonsebastianas.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Creado con ❤ por {' '} @jhonsebastianas
                <span className={styles.logo}>
                    {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
                </span>
            </a>
        </footer>
    )
}

export default Footer;