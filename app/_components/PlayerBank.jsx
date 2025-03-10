import React from 'react'
import styles from './_styles/playerBank.module.css'

export default function PlayerBank({ chips }) {
    return (
        <div className={styles.container}>
            Bank: {chips}
        </div>
    )
}
