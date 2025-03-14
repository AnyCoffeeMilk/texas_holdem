import React, { useMemo } from 'react'
import styles from './_styles/actionBar.module.css'
import Image from 'next/image'
import GoBackSVG from '@/public/goBack.svg'
import SettingsSVG from '@/public/settings.svg'
import Link from 'next/link'

export default function ActionBar() {
    const goBackSVG = useMemo(() => (
        <Image
            className={styles.img}
            style={{ transform: "scale(1.3)" }}
            src={GoBackSVG}
            alt='Go Back to Homepage.'
            draggable={false}
        />
    ), [])

    const settingsSVG = useMemo(() => (
        <Image
            className={styles.img}
            style={{ transform: "scale(1.2)" }}
            src={SettingsSVG}
            alt='Open Settings page.'
            draggable={false}
        />
    ), [])

    return (
        <div className={styles.container}>
            <Link draggable={false} href="/" className={styles.btn}>
                HOME
                {goBackSVG}
            </Link>
            <button className={styles.btn}>
                SETTINGS
                {settingsSVG}
            </button>
        </div>
    )
}
