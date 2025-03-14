'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Opponent from "./_components/Opponent";
import TableCards from "./_components/TableCards";
import PlayerHands from "./_components/PlayerHands";
import CallBtn from "./_components/CallBtn";
import RaiseBtn from "./_components/RaiseBtn";
import PlayerBank from "./_components/PlayerBank";
import FoldBtn from "./_components/FoldBtn";
import GameText from "./_components/GameText";
import usePokerDeck from "@/hooks/usePokerDeck";
import NewGameBtn from "./_components/NewGameBtn";
import useGetWinner from "@/hooks/useGetWinner";
import Image from "next/image";
import BishopSVG from "@/public/avatar/bishop.svg";
import KingSVG from "@/public/avatar/king.svg";
import KnightSVG from "@/public/avatar/knight.svg";
import PawnSVG from "@/public/avatar/pawn.svg";
import QueenSVG from "@/public/avatar/queen.svg";
import RookSVG from "@/public/avatar/rook.svg";
import ChipLabel from "../_components/ChipLabel";
import Avatar from "../_components/Avatar";

export default function Home() {
    const { pokerDeck, drawCard, drawCards, getNewDeck } = usePokerDeck()

    const [isClient, setIsClient] = useState(false)
    const [playerName, setPlayerName] = useState("Bishop")
    const [playerAvatar, setPlayerIcon] = useState(BishopSVG)
    const [playerCards, setPlayerCards] = useState([])
    const [playerBets, setPlayerBets] = useState(0)
    const [tableCards, setTableCards] = useState([])
    const [opponents, setOpponents] = useState([])
    const [gameText, setGameText] = useState("Test Text")
    const [turnQueue, setTurnQueue] = useState([])
    const [turnCounter, setTurnCounter] = useState(0)
    const [topBets, setTopBets] = useState(0)

    useEffect(() => {
        setIsClient(true)
        handleNewGame()
    }, [])

    const handleNewGame = () => {
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
        console.log(queue_tmp, turnCounter)
        setGameText(`${inTurn_gamer}'s turn.`)
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
                ], tableCards)
                setGameText('Winner: ' + winner_name)
            }
        } else {
            setTurnCounter(cur => cur + 1)
        }
        if (inTurn_gamer !== playerName) {
            setTimeout(() => setTurnQueue(queue_tmp), 1500)
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

    return !isClient ? null : (
        <main className={styles.page}>
            <div className={styles.playerArea}>
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
                        <PlayerBank chips={10} />
                    </div>
                </div>
                <PlayerHands cards={playerCards} />
                <div className={styles.playerBtnArea}>
                    <CallBtn onClick={handleCall} />
                    <RaiseBtn onClick={handleRaise} />
                    <FoldBtn onClick={handleFold} />
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
                    <TableCards cards={tableCards} />
                    <GameText text={gameText} />
                    <ChipLabel className={styles.betsPool} chips={6} digits={4}>
                        POOL
                    </ChipLabel>
                    <NewGameBtn onClick={handleNewGame} />
                </div>
            </div>
        </main >
    );
}
