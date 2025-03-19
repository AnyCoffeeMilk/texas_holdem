'use client'

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";

import Opponent from "./_components/Opponent";
import ChipLabel from "../_components/ChipLabel";
import Avatar from "../_components/Avatar";
import ThemeBtn from "../_components/ThemeBtn";
import ThemeLink from "../_components/ThemeLink";
import GoBackSVG from "../_components/GoBackSVG";
import SettingsSVG from "../_components/SettingsSVG";
import PokerCard from "./_components/_components/PokerCard";

import { read_player_profile, read_opponents_profile, get_opponent_action } from "@/actions/actions";
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

    const { turnCounter, inTurnGamer, turnQueue, gameStateId, roundForward, newRound } = useTurnHandler([player, ...opponents], gameTable)

    const [playerBank, setPlayerBank] = useState(0)
    const [btnDisabled, setBtnDisabled] = useState(true)

    const aiTimeout = useRef(null)

    useEffect(() => {
        read_player_profile()
            .then(({ player_name, player_avatar, player_bank }) => {
                player.setName(player_name)
                player.setAvatar(player_avatar)
                setPlayerBank(player_bank)
            })
        read_opponents_profile()
            .then(([gamer_a, gamer_b, gamer_c]) => {
                gamerA.setName(gamer_a.name)
                gamerA.setAvatar(gamer_a.avatar)
                gamerB.setName(gamer_b.name)
                gamerB.setAvatar(gamer_b.avatar)
                gamerC.setName(gamer_c.name)
                gamerC.setAvatar(gamer_c.avatar)
            })
    }, [])

    const handleNewRound = () => {
        clearTimeout(aiTimeout.current)
        gameTable.setIsNewGame(false)
        newRound()
    }

    const getTopBets = () => Math.max(...[...opponents, player].map(gamer => gamer.bets))

    const handleAIAction = (actionId) => {
        clearTimeout(aiTimeout.current)
        const top_bets = getTopBets()
        switch (actionId) {
            case 0:
                aiTimeout.current = setTimeout(() => {
                    roundForward(actionId, inTurnGamer.call(top_bets))
                }, 1000);
                break
            case 1:
                aiTimeout.current = setTimeout(() => {
                    roundForward(actionId, inTurnGamer.raise(top_bets))
                }, 1000)
                break
            case 2:
                aiTimeout.current = setTimeout(() => {
                    roundForward(actionId, inTurnGamer.fold())
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
                setBtnDisabled(false)
            }
        }
    }, [inTurnGamer.name])

    const handleCall = () => {
        setBtnDisabled(true)
        roundForward(0, player.call(getTopBets()))
    }

    const handleRaise = () => {
        setBtnDisabled(true)
        roundForward(1, player.raise(getTopBets()))
    }

    const handleFold = () => {
        setBtnDisabled(true)
        roundForward(2, player.fold())
    }

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
                <div className={styles.playerNameText}>
                    {player.name}
                </div>
                <ChipLabel className={styles.playerBank} chips={playerBank} digits={5}>
                    BANK
                </ChipLabel>
                <div className={styles.playerHandArea}>
                    {player.cards.map((item, index) => (
                        <PokerCard
                            key={index}
                            rank={item?.rank}
                            suit={item?.suit}
                        />
                    ))}
                </div>
                <div className={styles.playerBtnArea}>
                    <ThemeBtn onClick={handleCall} disabled={btnDisabled || gameTable.isNewGame}>
                        CALL
                    </ThemeBtn>
                    <ThemeBtn onClick={handleRaise} disabled={btnDisabled || gameTable.isNewGame}>
                        RAISE
                    </ThemeBtn>
                    <ThemeBtn onClick={handleFold} disabled={btnDisabled || gameTable.isNewGame}>
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
                    />
                ))}
            </div>
            <div className={styles.centerArea}>
                <div className={styles.gameText}>
                    {gameTable.gameText}
                    <div>
                        {turnQueue} :: {inTurnGamer.name}
                    </div>
                    <div>
                        state: {gameStateId} [{turnCounter}]
                    </div>
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
                <ThemeBtn className={styles.newGameBtn} disabled={!gameTable.isNewGame} onClick={handleNewRound}>
                    NEW ROUND
                </ThemeBtn>
            </div>
        </div >
    );
}
