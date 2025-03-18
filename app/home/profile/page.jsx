'use client'

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";
import { read_player_profile, set_player_profile } from "@/actions/actions";
import ThemeBtn from "@/app/_components/ThemeBtn";
import ThemeLink from "@/app/_components/ThemeLink";
import GoBackSVG from "@/app/_components/GoBackSVG";

import BishopSVG from "@/public/avatar/bishop.svg";
import KingSVG from "@/public/avatar/king.svg";
import KnightSVG from "@/public/avatar/knight.svg";
import PawnSVG from "@/public/avatar/pawn.svg";
import QueenSVG from "@/public/avatar/queen.svg";
import RookSVG from "@/public/avatar/rook.svg";
import Avatar from "@/app/_components/Avatar";
import { useRouter } from "next/navigation";

const avatar_list = [
    { name: 'bishop', src: BishopSVG },
    { name: 'king', src: KingSVG },
    { name: 'knight', src: KnightSVG },
    { name: 'pawn', src: PawnSVG },
    { name: 'queen', src: QueenSVG },
    { name: 'rook', src: RookSVG },
]

export default function Profile() {
    const [playerName, setPlayerName] = useState('Loading...')
    const [playerAvatar, setPlayerAvatar] = useState()
    const router = useRouter()

    useEffect(() => {
        read_player_profile()
            .then(({ player_name, player_avatar }) => {
                setPlayerName(player_name)
                setPlayerAvatar(player_avatar)
            })
    }, [])

    const handleAvatarClick = (src) => setPlayerAvatar(src)
    const handleSave = () => {
        set_player_profile(playerName, playerAvatar)
        router.back()
    }
    const handleNameChange = (e) => {
        if (e.target.value.length <= 9) {
            setPlayerName(e.target.value)
        }
    }

    const avatarSVGMap = useMemo(() => avatar_list.map((item, index) => (
        <button key={index} onClick={() => handleAvatarClick(item.src)}>
            <Avatar
                className={`${styles.avatar} ${item.src.src === playerAvatar?.src ? styles.selected : null}`}
                src={item.src}
                name={item.name}
            />
        </button>
    )), [playerAvatar])


    return !playerAvatar ? null : (
        <div className={styles.container}>
            <div className={styles.headerArea}>
                <ThemeLink href="/home" className={styles.goback}>
                    HOME <GoBackSVG />
                </ThemeLink>
                <div className={styles.headerText}>
                    EDIT PROFILE
                </div>
            </div>
            <div className={styles.subTitleText}>
                AVATAR
            </div>
            <div className={styles.avatarArea}>
                {avatarSVGMap}
            </div>
            <div className={styles.subTitleText}>
                USERNAME
            </div>
            <div className={styles.inputArea}>
                <input
                    onChange={handleNameChange}
                    value={playerName}
                />
            </div>
            <ThemeBtn onClick={handleSave}>
                Save
            </ThemeBtn>
        </div>
    );
}
