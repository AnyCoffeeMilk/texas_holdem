'use client'

import styles from "./page.module.scss";
import ThemeLink from "@/app/_components/ThemeLink";
import GoBackSVG from "@/app/_components/GoBackSVG";

export default function Profile() {
    return (
        <div className={styles.container}>
            <div className={styles.headerArea}>
                <ThemeLink href="/home" className={styles.goback}>
                    HOME <GoBackSVG />
                </ThemeLink>
                <div className={styles.headerText}>
                    SETTINGS
                </div>
            </div>
            <div className={styles.subTitleText}>
                PREFERENCES
            </div>
            <div className={styles.preferenceArea}>
                <div className={styles.preference}>
                    THEME
                    <div>
                        <div>DARK</div> / <div style={{ textDecoration: 'underline' }}>LIGHT</div>
                    </div>
                </div>
                <div className={styles.preference}>
                    LANGUAGE
                    <div>
                        <div style={{ textDecoration: 'underline' }}>ENG</div> / <div>CN</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
