import React from 'react'
import styles from './_styles/pokerCard.module.css'

export default function PokerCard({ rank, suit }) {
	return (
		<div className={styles.container}>
			<div>
                {rank}
            </div>
            <div>
                {suit}
            </div>
		</div>
	)
}
