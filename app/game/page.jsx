'use client'

import { useEffect, useRef } from "react";
import styles from "./page.module.scss";

import Opponent from "./_components/Opponent";
import ChipLabel from "../_components/ChipLabel";
import Avatar from "../_components/Avatar";
import ThemeBtn from "../_components/ThemeBtn";
import ThemeLink from "../_components/ThemeLink";
import GoBackSVG from "../_components/GoBackSVG";
import SettingsSVG from "../_components/SettingsSVG";
import PokerCard from "./_components/_components/PokerCard";

import { read_player_profile, read_opponents_profile, get_opponent_action, add_bank } from "@/actions/actions";
import useGamer from "@/hooks/useGamer";
import useGameTable from "@/hooks/useGameTable";
import useTurnHandler from "@/hooks/useTurnHandler";

export default function Game() {
    const gameTable = useGameTable()
    const player = useGamer()
    const gamerA = useGamer()
    const gamerB = useGamer()
    const gamerC = useGamer()
    const opponents = [gamerA, gamerB, gamerC]

    const { sbBetsName, bbBetsName, turnQueue, inTurnGamer, roundForward, newRound } = useTurnHandler([player, ...opponents], gameTable)

    const aiTimeout = useRef(null)

    useEffect(() => {
        read_player_profile()
            .then(({ player_name, player_avatar, player_bank }) => {
                player.setInfo(player_name, player_avatar, player_bank)
            })
        read_opponents_profile()
            .then(([gamer_a, gamer_b, gamer_c]) => {
                gamerA.setInfo(gamer_a.name, gamer_a.avatar, gamer_a.bank)
                gamerB.setInfo(gamer_b.name, gamer_b.avatar, gamer_b.bank)
                gamerC.setInfo(gamer_c.name, gamer_c.avatar, gamer_c.bank)
            })
    }, [])

    const getTopBets = () => Math.max(...[...opponents, player].map(gamer => gamer.bets))

    const handleAIAction = (actionId) => {
        clearTimeout(aiTimeout.current)
        const top_bets = getTopBets()
        switch (actionId) {
            case 0:
                aiTimeout.current = setTimeout(() => {
                    roundForward(actionId, inTurnGamer.gameAction.call(top_bets))
                }, 1000);
                break
            case 1:
                aiTimeout.current = setTimeout(() => {
                    roundForward(actionId, inTurnGamer.gameAction.raise(top_bets))
                }, 1000)
                break
            case 2:
                aiTimeout.current = setTimeout(() => {
                    roundForward(actionId, inTurnGamer.gameAction.fold())
                }, 1000)
                break
        }
    }

    useEffect(() => {
        if (inTurnGamer.name !== undefined) {
            if (inTurnGamer.name !== player.name) {
                gameTable.showOpponentTurn(inTurnGamer.name)
                get_opponent_action()
                    .then(handleAIAction)
            } else if (!gameTable.isNewGame) {
                gameTable.showPlayerTurn()
            }
        }
    }, [turnQueue])

    const handleCall = () => roundForward(0, player.gameAction.call(getTopBets()))
    const handleRaise = () => roundForward(1, player.gameAction.raise(getTopBets()))
    const handleFold = () => roundForward(2, player.gameAction.fold())

    return !player.avatar ? null : (
        <div className={styles.container}>
            <div className={styles.headerArea}>
                <ThemeLink href="/home" className={styles.link}>
                    HOME <GoBackSVG />
                </ThemeLink>
                <ThemeLink href="/game" className={styles.link}>
                    SETTINGS <SettingsSVG />
                </ThemeLink>
            </div>
            <div className={styles.playerArea}>
                <Avatar
                    className={styles.playerAvatar}
                    src={player.avatar}
                    name={player.name}
                />
                <div className={styles.blindTag}>
                    {sbBetsName === player.name ? "SB" : bbBetsName === player.name ? "BB" : null}
                </div>
                <div className={styles.playerNameText}>
                    {player.name}
                </div>
                <ChipLabel className={styles.playerBank} chips={player.bank} digits={5}>
                    BANK
                </ChipLabel>
                <div className={styles.playerHandArea}>
                    {player.cards.map((item, index) => (
                        <div key={index} className={styles.cardArea}>
                            <PokerCard
                                rank={item?.rank}
                                suit={item?.suit}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.playerBtnArea}>
                    <ThemeBtn onClick={handleCall} disabled={inTurnGamer.name !== player.name}>
                        CALL
                    </ThemeBtn>
                    <ThemeBtn onClick={handleRaise} disabled={inTurnGamer.name !== player.name}>
                        RAISE
                    </ThemeBtn>
                    <ThemeBtn onClick={handleFold} disabled={inTurnGamer.name !== player.name}>
                        FOLD
                    </ThemeBtn>
                </div>
                <ChipLabel className={styles.playerBets} chips={player.bets} digits={3}>
                    BETS
                </ChipLabel>
            </div>
            <div className={styles.opponentArea}>
                {opponents.map((item, index) => (
                    <Opponent
                        key={index}
                        avatar={item.avatar}
                        name={item.name}
                        cards={item.cards}
                        bets={item.bets}
                        blindTag={sbBetsName === item.name ? "SB" : bbBetsName === item.name ? "BB" : null}
                    />
                ))}
            </div>
            <div className={styles.centerArea}>
                <div className={styles.gameText}>
                    {gameTable.gameText}
                </div>
                <div className={styles.tableCardsArea}>
                    {gameTable.cards.map((item, index) => (
                        <PokerCard
                            key={index}
                            rank={item?.rank}
                            suit={item?.suit}
                        />
                    ))}
                </div>
                <ThemeBtn className={styles.newGameBtn} disabled={!gameTable.isNewGame} onClick={newRound}>
                    NEW ROUND
                </ThemeBtn>
            </div>
        </div >
    );
}
