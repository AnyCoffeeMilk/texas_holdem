import React from 'react'
import Link from 'next/link'
import styles from './_styles/themeLink.module.css'

export default function ThemeLink({ className, href, children }) {
    return (
        <Link draggable={false} href={href} className={`${styles.btn} ${className}`}>
            {children}
        </Link>
    )
}
