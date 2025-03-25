import { memo, useMemo } from 'react'
import styles from './chipLabel.module.scss'
import Image from 'next/image'
import ChipSVG from '@/public/chip.svg'

function ChipLabel({ className, chips, digits, children }) {
    const chipSVG = useMemo(() => (
        <Image
            className={styles.chipImg}
            src={ChipSVG}
            alt="Icon of Chips"
            draggable={false}
        />
    ), [])

    return (
        <div className={`${styles.container} ${className}`}>
            <span className="flex-1 grid items-center text-center text-xl text-dark text-stroke-light py-1 px-2">
                {children}
            </span>
            <div className={styles.currency} style={{ width: `calc(${(digits + 1.4 - 0.3 * digits)}em + ${(digits - 1) * 2}px)` }}>
                {chipSVG}
                {chips.toString().padStart(digits, "0")}
            </div>
        </div>
    )
}

export default memo(ChipLabel, (prevProps, nextProps) => (
    prevProps.className === nextProps.className &&
    prevProps.chips === nextProps.chips &&
    prevProps.digits === nextProps.digits &&
    prevProps.children === nextProps.children
))