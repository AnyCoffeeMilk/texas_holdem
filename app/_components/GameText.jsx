import React from 'react'
import styles from './_styles/gameText.module.css'

export default function GameText({ text }) {
    return (
        <div className={styles.container}>
            {text}
        </div>
    )
}
