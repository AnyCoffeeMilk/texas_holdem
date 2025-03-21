import React, { memo, useMemo } from 'react'
import Image from 'next/image'
import styles from './avatar.module.scss'

function Avatar({ className, src, name }) {
    const avatarSVG = useMemo(() => src === undefined ? null : (
        <Image
            priority
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

export default memo(Avatar, (prevProps, nextProps) => (
    prevProps.className === nextProps.className &&
    prevProps?.src?.src === nextProps?.src?.src &&
    prevProps.name === nextProps.name
))