import React, { useMemo, useState } from 'react'
import styles from './_styles/pokerCard.module.css'
import Image from 'next/image'
import IconSVG from '@/public/icon.svg'

export default function PokerCard({ rank, suit, isFacedown }) {
    const [flip, setFlip] = useState(isFacedown)

    const container_style = !flip ? null : {
        transform: 'rotateY(180deg)'
    }

    const handleFlip = () => setFlip(cur => !cur)

    const iconSVG = useMemo(() => (
        <Image
            className={styles.iconImg}
            src={IconSVG}
            alt="Icon of the Poker Card"
            draggable={false}
        />
    ), [])

    return (
        <div className={styles.container} onClick={handleFlip}>
            <div className={styles.innerArea} style={container_style}>
                <div className={styles.cardFront}>
                    <div className={styles.textArea}>
                        <div>
                            {rank}
                        </div>
                        <div>
                            {suit}
                        </div>
                    </div>
                </div>
                <div className={styles.cardBack}>
                    <div className={styles.cardBackInner}>
                        {iconSVG}
                    </div>
                </div>
            </div>
        </div>
    )
}
