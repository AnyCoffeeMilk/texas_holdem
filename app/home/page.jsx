'use client'

import styles from "./page.module.css";
import Avatar from "@/app/_components/Avatar";
import ChipLabel from "@/app/_components/ChipLabel";
import Link from "next/link";
import ShopSVG from "./_components/ShopSVG";
import SettingsSVG from "../_components/SettingsSVG";
import OnlineMatchSVG from "./_components/OnlineMatchSVG";
import AIMatchSVG from "./_components/AIMatchSVG";
import { read_player_profile, set_player_profile } from "./actions";
import BishopSVG from "@/public/avatar/bishop.svg";
import KingSVG from "@/public/avatar/king.svg";
import KnightSVG from "@/public/avatar/knight.svg";
import PawnSVG from "@/public/avatar/pawn.svg";
import QueenSVG from "@/public/avatar/queen.svg";
import RookSVG from "@/public/avatar/rook.svg";
import { useEffect, useState } from "react";

const avatar_dict = {
    'bishop': BishopSVG,
    'king': KingSVG,
    'knight': KnightSVG,
    'pawn': PawnSVG,
    'queen': QueenSVG,
    'rook': RookSVG,
}

export default function Home() {
    const [playerName, setPlayerName] = useState('Loading...')
    const [playerAvatar, setPlayerAvatar] = useState()

    useEffect(() => {
        set_player_profile()
        read_player_profile()
            .then(({ player_name, player_avatar }) => {
                setPlayerName(player_name)
                setPlayerAvatar(avatar_dict[player_avatar])
            })
    }, [])

    return (
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
                            START ONLINE MATCH <OnlineMatchSVG />
                        </Link>
                        <Link draggable={false} href="/game" className={styles.btn}>
                            START AI MATCH <AIMatchSVG />
                        </Link>
                        <div className={styles.btnBottomArea}>
                            <Link draggable={false} href="/" className={styles.btn}>
                                SHOP <ShopSVG />
                            </Link>
                            <Link draggable={false} href="/" className={styles.btn} style={{ flex: 1 }}>
                                SETTINGS <SettingsSVG />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}
