'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return !isClient ? null : (
        <main className={styles.page}>
            
        </main >
    );
}
