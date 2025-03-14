import React from 'react'
import styles from './_styles/playerBank.module.css'

export default function PlayerBank({ chips }) {
    const num = 123
    return (
        <div className={styles.container}>
            <div className={styles.label}>
                BANK
            </div>
            <div className={styles.currency}>
                {chips.toString().padStart(5, "0")}
            </div>
        </div>
    )
}
