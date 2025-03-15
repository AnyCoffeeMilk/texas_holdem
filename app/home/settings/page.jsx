'use client'

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import ThemeLink from "@/app/_components/ThemeLink";
import GoBackSVG from "@/app/_components/GoBackSVG";

export default function Profile() {
    return (
        <main className={styles.page}>
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
                            <div>DARK</div> / <div>LIGHT</div>
                        </div>
                    </div>
                    <div className={styles.preference}>
                        LANGUAGE
                        <div>
                            <div>ENG</div> / <div>ENG</div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}
