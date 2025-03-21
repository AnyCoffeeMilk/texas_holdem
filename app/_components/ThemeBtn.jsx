import { useMemo } from 'react'
import styles from './themeBtn.module.scss'

export default function ThemeBtn ({ className, disabled, onClick, children }) {
    const inner = useMemo(() => (
        <div className={styles.innerContainer}>
            <div className={styles.textArea}>
                {children}
            </div>
        </div>
    ), [className])

    return (
        <button className={`${styles.container} ${className}`} disabled={disabled} onClick={onClick}>
            {inner}
        </button>
    )
}