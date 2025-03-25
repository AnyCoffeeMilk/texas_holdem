'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Avatar from "@/app/_components/Avatar";
import ChipLabel from "@/app/_components/ChipLabel";
import EditSVG from "@/app/_svgs/EditSVG";
import ShopSVG from "@/app/_svgs/ShopSVG";
import SettingsSVG from "@/app/_svgs/SettingsSVG";
import OnlineMatchSVG from "@/app/_svgs/OnlineMatchSVG";
import AIMatchSVG from "@/app/_svgs/AIMatchSVG";
import { read_player_profile } from "@/actions/actions";
import ThemeLink from "../_components/ThemeLink";
import GameTitle from "./_components/GameTitle";
import { pushData } from "@/actions/pushData";
import pusherClient from "@/lib/pusher";

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

    // useEffect(() => {
    //     var channel = pusherClient.subscribe('my-channel');
    //     channel.bind('my-event', (data) => {
    //         alert(JSON.stringify(data));
    //     });
    //     pushData({ message: 'testing message' })
    // }, [])

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
                <div className="grid grid-cols-[auto_1fr] gap-4">
                    <ThemeLink href="/home/shop">
                        SHOP <ShopSVG />
                    </ThemeLink>
                    <ThemeLink href="/home/settings">
                        SETTINGS <SettingsSVG />
                    </ThemeLink>
                </div>
            </div>
        </div>
    );
}
