'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Avatar from "@/app/_components/Avatar";
import ChipLabel from "@/app/_components/ChipLabel";
import EditSVG from "./_components/EditSVG";
import ShopSVG from "./_components/ShopSVG";
import SettingsSVG from "../_components/SettingsSVG";
import OnlineMatchSVG from "./_components/OnlineMatchSVG";
import AIMatchSVG from "./_components/AIMatchSVG";
import { read_player_profile, set_player_profile } from "../../actions/actions";
import ThemeLink from "../_components/ThemeLink";
import GameTitle from "./_components/GameTitle";

export default function Home() {
    const [playerName, setPlayerName] = useState('Loading...')
    const [playerAvatar, setPlayerAvatar] = useState()
    const [playerBank, setPlayerBank] = useState(0)

    useEffect(() => {
        read_player_profile()
            .then(({ player_name, player_avatar, player_bank }) => {
                setPlayerName(player_name)
                setPlayerAvatar(player_avatar)
                setPlayerBank(player_bank)
            })
    }, [])

    return !playerAvatar ? null : (
        <div className={styles.container}>
            <div className={styles.playerArea}>
                <div className={styles.header}>
                    <div className={styles.headerText}>
                        PROFILE
                    </div>
                    <ThemeLink href="/home/profile" className={styles.link}>
                        Edit <EditSVG />
                    </ThemeLink>
                </div>
                <Avatar
                    className={styles.avatar}
                    src={playerAvatar}
                    name={playerName}
                />
                <div className={styles.textArea}>
                    <div className={styles.nameText}>
                        {playerName}
                    </div>
                    <ChipLabel className={styles.bankText} chips={playerBank} digits={5}>
                        BANK
                    </ChipLabel>
                </div>
            </div>
            <div className={styles.titleArea}>
                <GameTitle />
            </div>
            <div className={styles.btnArea}>
                <ThemeLink href="/game">
                    START ONLINE MATCH <OnlineMatchSVG />
                </ThemeLink>
                <ThemeLink href="/game">
                    START AI MATCH <AIMatchSVG />
                </ThemeLink>
                <div className={styles.btnBottomArea}>
                    <ThemeLink href="/home/shop">
                        SHOP <ShopSVG />
                    </ThemeLink>
                    <ThemeLink href="/settings" className={styles.settingsBtn}>
                        SETTINGS <SettingsSVG />
                    </ThemeLink>
                </div>
            </div>
        </div>
    );
}
