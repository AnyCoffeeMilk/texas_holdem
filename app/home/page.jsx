'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Avatar from "@/app/_components/Avatar";
import ChipLabel from "@/app/_components/ChipLabel";
import EditSVG from "./_components/EditSVG";
import ShopSVG from "./_components/ShopSVG";
import SettingsSVG from "../_components/SettingsSVG";
import OnlineMatchSVG from "./_components/OnlineMatchSVG";
import AIMatchSVG from "./_components/AIMatchSVG";
import { read_player_profile, set_player_profile } from "../../actions/actions";
import ThemeLink from "../_components/ThemeLink";

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
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.playerArea}>
                    <div className={styles.playerAreaHeader}>
                        <div className={styles.profileHeaderText}>
                            PROFILE
                        </div>
                        <ThemeLink href="/home/profile" className={styles.editBtn}>
                            Edit <EditSVG />
                        </ThemeLink>
                    </div>
                    <Avatar
                        className={styles.playerAvatar}
                        src={playerAvatar}
                        name={playerName}
                    />
                    <div className={styles.playerDataArea}>
                        <div className={styles.playerNameText}>
                            {playerName}
                        </div>
                        <ChipLabel className={styles.playerBank} chips={playerBank} digits={5}>
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
                            <ThemeLink href="/home/settings" className={styles.settingsBtn}>
                                SETTINGS <SettingsSVG />
                            </ThemeLink>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}
