import React from 'react'
import styles from './_styles/betsPool.module.css'

export default function BetsPool({ betsTotal }) {
    return (
        <div className={styles.container}>
            Pool: {betsTotal}
        </div>
    )
}
