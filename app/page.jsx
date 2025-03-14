'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import BishopSVG from "@/public/avatar/bishop.svg";
import KingSVG from "@/public/avatar/king.svg";
import KnightSVG from "@/public/avatar/knight.svg";
import PawnSVG from "@/public/avatar/pawn.svg";
import QueenSVG from "@/public/avatar/queen.svg";
import RookSVG from "@/public/avatar/rook.svg";
import Avatar from "./_components/Avatar";
import ChipLabel from "./_components/ChipLabel";
import Link from "next/link";

export default function Home() {
    const [isClient, setIsClient] = useState(false)
    const [playerName, setPlayerName] = useState("Bishop")
    const [playerAvatar, setPlayerIcon] = useState(BishopSVG)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return !isClient ? null : (
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.playerArea}>
                    <Avatar
                        className={styles.playerAvatar}
                        src={playerAvatar}
                        name={playerName}
                    />
                    <div className={styles.playerDataArea}>
                        <div className={styles.playerNameText}>
                            {playerName}
                        </div>
                        <ChipLabel className={styles.playerBank} chips={10} digits={5}>
                            BANK
                        </ChipLabel>
                    </div>
                </div>
                <div className={styles.gameArea}>
                    <div className={styles.titleArea}>
                        <div className={styles.innerTitleArea}>
                            <div className={styles.titleText}>
                                TEXAS
                            </div>
                            <div className={styles.titleText}>
                                HOLD'EM
                            </div>
                            <div className={styles.subTitleText}>
                                ONLINE
                            </div>
                        </div>
                    </div>
                    <div className={styles.btnArea}>
                        <Link draggable={false} href="/game" className={styles.btn}>
                            START ONLINE MATCH
                        </Link>
                        <Link draggable={false} href="/game" className={styles.btn}>
                            START AI MATCH
                        </Link>
                        <div className={styles.btnBottomArea}>
                            <Link draggable={false} href="/" className={styles.btn}>
                                SHOP
                            </Link>
                            <Link draggable={false} href="/" className={styles.btn} style={{ flex: 1 }}>
                                SETTINGS
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}
