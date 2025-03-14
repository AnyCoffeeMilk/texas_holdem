import React from 'react'
import styles from './_styles/themeBtn.module.css'

export default function ThemeBtn({ className, onClick, children }) {
    return (
        <button className={`${styles.container} ${className}`} onClick={onClick}>
            <div className={styles.innerContainer}>
                {children}
            </div>
        </button>
    )
}
