import React from 'react'
import ThemeBtn from '../../_components/ThemeBtn'
import styles from './_styles/newGameBtn.module.css'

export default function NewGameBtn({ onClick }) {
    return (
        <div className={styles.container}>
            <ThemeBtn onClick={onClick}>
                NEW GAME
            </ThemeBtn>
        </div>
    )
}
