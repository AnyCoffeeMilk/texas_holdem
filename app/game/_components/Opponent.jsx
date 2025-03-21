import React from 'react'
import styles from './opponent.module.scss'
import PokerCard from './_components/PokerCard'
import ChipLabel from '@/app/_components/ChipLabel'
import Avatar from '@/app/_components/Avatar'

export default function Opponent({ flipCard, name, avatar, cards, bets, blindTag }) {
    return (
        <div className={styles.container}>
            <div className={styles.infoArea}>
                <Avatar
                    className={styles.avatar}
                    src={avatar}
                    name={name}
                />
                <div className={styles.nameText}>
                    {name}
                </div>
                <div className={styles.blindTag}>
                    {blindTag}
                </div>
            </div>
            <div className={styles.cardArea}>
                {cards.map((item, index) => (
                    <PokerCard
                        key={index}
                        rank={item?.rank}
                        suit={item?.suit}
                        isFacedown={flipCard}
                    />
                ))}
            </div>
            <ChipLabel className={styles.bets} chips={bets} digits={3}>
                BETS
            </ChipLabel>
        </div>
    )
}