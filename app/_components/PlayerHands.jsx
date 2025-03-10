import React from 'react'
import styles from './_styles/playerHands.module.css'
import PokerCard from './_components/PokerCard'

export default function PlayerHands({ cards }) {
    const cardsMap = cards.map((item, index) => (
        <PokerCard
            key={index}
            rank={item.rank}
            suit={item.suit}
        />
    ))

    return (
        <div className={styles.container}>
            {cardsMap}
        </div>
    )
}
