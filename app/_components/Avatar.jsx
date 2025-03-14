import React, { useMemo } from 'react'
import Image from 'next/image'
import styles from './_styles/avatar.module.css'

export default function Avatar({ className, src, name }) {
    const avatarSVG = useMemo(() => (
        <Image
            className={styles.img}
            src={src}
            alt={`Avatar of ${name}`}
            draggable={false}
        />
    ), [src, name])

    return (
        <div className={`${styles.container} ${className}`}>
            {avatarSVG}
        </div>
    )
}
