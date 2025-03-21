import React, { memo, useMemo, useState } from 'react'
import styles from './pokerCard.module.scss'
import Image from 'next/image'
import IconSVG from '@/public/icon.svg'

function PokerCard({ rank, suit, isFacedown }) {
    const container_style = !isFacedown ? null : {
        transform: 'rotateY(180deg)'
    }

    const iconSVG = useMemo(() => (
        <Image
            className={styles.iconImg}
            src={IconSVG}
            alt="Icon of the Poker Card"
            draggable={false}
        />
    ), [])

    return rank === undefined ? <div className={styles.placeholder} /> : (
        <div className={styles.container}>
            <div className={styles.innerContainer} style={container_style}>
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

export default memo(PokerCard, (prevProps, nextProps) => (
    prevProps.rank === nextProps.rank &&
    prevProps.suit === nextProps.suit &&
    prevProps.isFacedown === nextProps.isFacedown
))
