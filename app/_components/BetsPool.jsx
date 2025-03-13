import React from 'react'
import styles from './_styles/betsPool.module.css'

export default function BetsPool({ betsTotal }) {
    return (
        <div className={styles.container}>
            <div className={styles.label}>
                BETS POOL
            </div>
            <div className={styles.currency}>
                {betsTotal.toString().padStart(4, "0")}
            </div>
        </div>
    )
}
