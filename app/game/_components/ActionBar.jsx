import React, { useMemo } from 'react'
import styles from './_styles/actionBar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import GoBackSVG from '/app/_components/GoBackSVG'
import SettingsSVG from '@/app/_components/SettingsSVG'

export default function ActionBar() {
    return (
        <div className={styles.container}>
            <Link draggable={false} href="/home" className={styles.btn}>
                HOME <GoBackSVG />
            </Link>
            <button className={styles.btn}>
                SETTINGS <SettingsSVG />
            </button>
        </div>
    )
}
