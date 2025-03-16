import styles from './gameTitle.module.scss'

export default function GameTitle() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.titleText}>
                    TEXAS
                </div>
                <div className={styles.titleText}>
                    HOLD'EM
                </div>
                <div className={styles.subTitleText}>
                    ONLINE
                </div>
            </div>
        </div>
    )
}
