import React from 'react'
import styles from './_styles/playerBets.module.css'

export default function PlayerBets({ bets }) {
    return (
        <div className={styles.container}>
            Bets: {bets}
        </div>
    )
}
