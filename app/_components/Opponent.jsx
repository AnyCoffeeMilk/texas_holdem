import React from 'react'
import styles from './_styles/opponent.module.css'
import PokerCard from './_components/PokerCard'

export default function Opponent({ name, icon, cards, bets }) {
    const cardsMap = cards.map((item, index) => (
        <PokerCard
            key={index}
            rank={item.rank}
            suit={item.suit}
            isFacedown={true}
        />
    ))

    return (
        <div className={styles.container}>
            <div className={styles.infoArea}>
                <div className={styles.iconArea}>
                    {icon}
                </div>
                <div className={styles.nameText}>
                    {name}
                </div>
            </div>
            <div className={styles.gameDataArea}>
                <div className={styles.cardArea}>
                    {cardsMap}
                </div>
                <div className={styles.betsArea}>
                    <div className={styles.label}>
                        BETS
                    </div>
                    <div className={styles.currency}>
                        {bets.toString().padStart(3, "0")}
                    </div>
                </div>
            </div>
        </div>
    )
}