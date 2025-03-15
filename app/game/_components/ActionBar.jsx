import React, { useMemo } from 'react'
import styles from './_styles/actionBar.module.css'
import GoBackSVG from '/app/_components/GoBackSVG'
import SettingsSVG from '@/app/_components/SettingsSVG'
import ThemeLink from '@/app/_components/ThemeLink'

export default function ActionBar() {
    return (
        <div className={styles.container}>
            <ThemeLink href="/home" className={styles.btn}>
                HOME <GoBackSVG />
            </ThemeLink>
            <ThemeLink href="/game" className={styles.btn}>
                SETTINGS <SettingsSVG />
            </ThemeLink>
        </div>
    )
}
