import React from 'react'
import styles from './_styles/pokerCard.module.css'

export default function PokerCard({ rank, suit, isFacedown }) {
    console.log(isFacedown)
    const container_style = !isFacedown ? null : {
        transform: 'rotateY(180deg)'
    }
    return (
        <div className={styles.container}>
            <div className={styles.innerArea}>
                <div className={styles.facedownArea} style={container_style}>
                    <div className={styles.cardFront}>
                        <div>
                            {rank}
                        </div>
                        <div>
                            {suit}
                        </div>
                    </div>
                    <div className={styles.cardBack}>

                    </div>
                </div>
            </div>
        </div>
    )
}
