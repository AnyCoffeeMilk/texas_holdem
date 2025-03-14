import React from 'react'
import styles from './_styles/themeBtn.module.css'

export default function ThemeBtn({ onClick, children }) {
    return (
        <button className={styles.container} onClick={onClick}>
            <div className={styles.innerContainer}>
                {children}
            </div>
        </button>
    )
}
