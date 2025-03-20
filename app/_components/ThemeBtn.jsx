import React from 'react'
import styles from './themeBtn.module.scss'

export default function ThemeBtn({ className, disabled, onClick, children }) {
    return (
        <button className={`${styles.container} ${className}`} disabled={disabled} onClick={onClick}>
            <div className={styles.innerContainer}>
                <div className={styles.textArea}>
                    {children}
                </div>
            </div>
        </button>
    )
}
