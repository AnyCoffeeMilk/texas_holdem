'use client'

import { use, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Opponent from "./_components/Opponent";
import TableCards from "./_components/TableCards";
import PlayerHands from "./_components/PlayerHands";
import GameText from "./_components/GameText";
import usePokerDeck from "@/hooks/usePokerDeck";
import useGetWinner from "@/hooks/useGetWinner";
import BishopSVG from "@/public/avatar/bishop.svg";
import KingSVG from "@/public/avatar/king.svg";
import KnightSVG from "@/public/avatar/knight.svg";
import PawnSVG from "@/public/avatar/pawn.svg";
import QueenSVG from "@/public/avatar/queen.svg";
import RookSVG from "@/public/avatar/rook.svg";
import ChipLabel from "../_components/ChipLabel";
import Avatar from "../_components/Avatar";
import ThemeBtn from "../_components/ThemeBtn";
import ActionBar from "./_components/ActionBar";
import { read_player_profile } from "@/actions/actions";

export default function Home() {
    const { pokerDeck, drawCard, drawCards, getNewDeck } = usePokerDeck()
    
    const [playerName, setPlayerName] = useState("Bishop")
    const [playerAvatar, setPlayerAvatar] = useState()
    const [playerBank, setPlayerBank] = useState(0)
    const [playerCards, setPlayerCards] = useState([])
    const [playerBets, setPlayerBets] = useState(0)
    
    const [opponents, setOpponents] = useState([])
    const [tableCards, setTableCards] = useState([])
    const [gameText, setGameText] = useState("Test Text")
    const [topBets, setTopBets] = useState(0)
    
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [turnQueue, setTurnQueue] = useState([])
    const [turnCounter, setTurnCounter] = useState(0)
    const turnTimeout = useRef(null)

    useEffect(() => {
        read_player_profile()
            .then(({ player_name, player_avatar, player_bank }) => {
                setPlayerName(player_name)
                setPlayerAvatar(player_avatar)
                setPlayerBank(player_bank)
            })
        handleNewGame()
    }, [])

    const handleNewGame = () => {
        clearTimeout(turnTimeout.current)
        const new_deck = getNewDeck()
        const cards_tmp = drawCards(new_deck, 11)
        setPlayerCards([cards_tmp.pop(), cards_tmp.pop()])
        setTableCards([cards_tmp.pop(), cards_tmp.pop(), cards_tmp.pop()])
        setOpponents([
            { avatar: PawnSVG, name: 'Pawn', cards: [cards_tmp.pop(), cards_tmp.pop()], bets: 0 },
            { avatar: QueenSVG, name: 'Queen', cards: [cards_tmp.pop(), cards_tmp.pop()], bets: 2 },
            { avatar: KnightSVG, name: 'Knight', cards: [cards_tmp.pop(), cards_tmp.pop()], bets: 4 },
        ])
        setTopBets(4)
        setTurnCounter(0)
        setTurnQueue([playerName, 'Pawn', 'Queen', 'Knight'])
    }

    useEffect(() => {
        if (turnQueue[0] === undefined) return
        let queue_tmp = [...turnQueue]
        const inTurn_gamer = queue_tmp.shift()
        queue_tmp.push(inTurn_gamer)
        if (inTurn_gamer === playerName) {
            setGameText("It's your turn now.")
            setBtnDisabled(false)
        } else {
            setGameText(`${inTurn_gamer}'s turn.`)
            setBtnDisabled(true)
        }
        if (turnCounter >= turnQueue.length) {
            setTurnCounter(1)
            const tableCard_tmp = [...tableCards]
            if (tableCard_tmp.length < 5) {
                tableCard_tmp.push(drawCard(pokerDeck))
                setTableCards(tableCard_tmp)
            } else {
                const winner_name = useGetWinner([
                    { name: playerName, cards: playerCards },
                    { name: opponents[0].name, cards: opponents[0].cards },
                    { name: opponents[1].name, cards: opponents[1].cards },
                    { name: opponents[2].name, cards: opponents[2].cards },
                ].filter(gamer => turnQueue.includes(gamer.name)), tableCards)
                setGameText('Winner: ' + winner_name)
                return
            }
        } else {
            setTurnCounter(cur => cur + 1)
        }
        if (inTurn_gamer !== playerName) {
            turnTimeout.current = setTimeout(() => setTurnQueue(queue_tmp), 1500)
        }
    }, [turnQueue])

    const handleCall = () => {
        setPlayerBets(topBets)
        let queue_tmp = [...turnQueue]
        queue_tmp.push(queue_tmp.shift())
        setTurnQueue(queue_tmp)
    }

    const handleRaise = () => {
        setPlayerBets(topBets * 2)
        setTopBets(topBets * 2)
        setTurnCounter(1)
        let queue_tmp = [...turnQueue]
        queue_tmp.push(queue_tmp.shift())
        setTurnQueue(queue_tmp)
    }

    const handleFold = () => {
        setTurnQueue(turnQueue.filter(name => name !== playerName))
    }

    const opponentsMap = opponents.map((item, index) => (
        <Opponent
            key={index}
            avatar={item.avatar}
            name={item.name}
            cards={item.cards}
            bets={item.bets}
        />
    ))

    return !playerAvatar ? null : (
        <main className={styles.page}>
            <div className={styles.playerArea}>
                <ActionBar />
                <div className={styles.playerInfoArea}>
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
                <PlayerHands cards={playerCards} />
                <div className={styles.playerBtnArea}>
                    <ThemeBtn onClick={handleCall} disabled={btnDisabled}>
                        CALL
                    </ThemeBtn>
                    <ThemeBtn onClick={handleRaise} disabled={btnDisabled}>
                        RAISE
                    </ThemeBtn>
                    <ThemeBtn onClick={handleFold} disabled={btnDisabled}>
                        FOLD
                    </ThemeBtn>
                </div>
                <ChipLabel className={styles.playerBets} chips={playerBets} digits={3}>
                    BETS
                </ChipLabel>
            </div>
            <div className={styles.mainArea}>
                <div className={styles.opponentArea}>
                    {opponentsMap}
                </div>
                <div className={styles.centerArea}>
                    <GameText text={gameText} />
                    <TableCards cards={tableCards} />
                    <ThemeBtn className={styles.newGameBtn} onClick={handleNewGame}>
                        NEW GAME
                    </ThemeBtn>
                    <ChipLabel className={styles.betsPool} chips={6} digits={4}>
                        POOL
                    </ChipLabel>
                </div>
            </div>
        </main >
    );
}
