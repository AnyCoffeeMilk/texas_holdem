import React from 'react'
import styles from './_styles/playerBets.module.css'

export default function PlayerBets({ bets }) {
    return (
        <div className={styles.container}>
            <div className={styles.label}>
                BETS
            </div>
            <div className={styles.currency}>
                {bets.toString().padStart(3, "0")}
            </div>
        </div>
    )
}
