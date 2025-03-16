import React, { memo } from 'react'
import Link from 'next/link'
import styles from './themeLink.module.scss'

const ThemeLink = memo(({ className, href, children }) => (
    <Link draggable={false} href={href} className={`${styles.container} ${className}`}>
        <div className={styles.inner}>
            {children}
        </div>
    </Link>
), (prevProps, nextProps) => (
    prevProps.className === nextProps.className &&
    prevProps.href === nextProps.href
))

export default ThemeLink