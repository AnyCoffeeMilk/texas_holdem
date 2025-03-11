import React, { useState } from 'react'
import styles from './_styles/pokerCard.module.css'

export default function PokerCard({ rank, suit, isFacedown }) {
    const [flip, setFlip] = useState(isFacedown)

    const container_style = !flip ? null : {
        transform: 'rotateY(180deg)'
    }

    const handleFlip = () => setFlip(cur => !cur)

    return (
        <div className={styles.container} onClick={handleFlip}>
            <div className={styles.innerArea} style={container_style}>
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
    )
}
