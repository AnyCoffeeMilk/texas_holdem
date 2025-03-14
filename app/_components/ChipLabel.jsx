import React, { useMemo } from 'react'
import styles from './_styles/chipLabel.module.css'
import Image from 'next/image'
import ChipSVG from '@/public/chip.svg'

export default function ChipLabel({ className, chips, digits, children }) {
    const chipSVG = useMemo(() => (
        <Image
            className={styles.chipImg}
            src={ChipSVG}
            alt="Icon of Chips"
        />
    ), [])

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.label}>
                {children}
            </div>
            <div className={styles.currency}>
                {chipSVG}
                {chips.toString().padStart(digits, "0")}
            </div>
        </div>
    )
}
