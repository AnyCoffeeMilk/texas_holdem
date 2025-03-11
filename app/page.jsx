'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Opponent from "./_components/Opponent";
import TableCards from "./_components/TableCards";
import BetsPool from "./_components/BetsPool";
import PlayerHands from "./_components/PlayerHands";
import PlayerBets from "./_components/PlayerBets";
import CallBtn from "./_components/CallBtn";
import RaiseBtn from "./_components/RaiseBtn";
import PlayerBank from "./_components/PlayerBank";
import FoldBtn from "./_components/FoldBtn";
import GameText from "./_components/GameText";
import usePokerDeck from "@/hooks/usePokerDeck";
import NewGameBtn from "./_components/NewGameBtn";
import useGetWinner from "@/hooks/useGetWinner";

export default function Home() {
    const { pokerDeck, drawCard, drawCards, getNewDeck } = usePokerDeck()

    const [isClient, setIsClient] = useState(false)
    const [playerName, setPlayerName] = useState("Bishop")
    const [playerIcon, setPlayerIcon] = useState(null)
    const [playerCards, setPlayerCards] = useState([])
    const [tableCards, setTableCards] = useState([])
    const [opponents, setOpponents] = useState([])
    const [gameText, setGameText] = useState("Test Text")

    useEffect(() => {
        setIsClient(true)
        handleNewGame()
    }, [])

    const handleNewGame = () => {
        const new_deck = getNewDeck()
        const cards_tmp = drawCards(new_deck, 11+2)
        setPlayerCards([cards_tmp.pop(), cards_tmp.pop()])
        setTableCards([cards_tmp.pop(), cards_tmp.pop(), cards_tmp.pop(), cards_tmp.pop(), cards_tmp.pop()])
        setOpponents([
            { icon: null, name: 'Pawn', cards: [cards_tmp.pop(), cards_tmp.pop()], bets: 4 },
            { icon: null, name: 'Queen', cards: [cards_tmp.pop(), cards_tmp.pop()], bets: 2 },
            { icon: null, name: 'Knight', cards: [cards_tmp.pop(), cards_tmp.pop()], bets: 0 },
        ])
    }

    useEffect(() => {
        if (opponents.length === 3 && playerCards.length === 2 && tableCards.length === 5) {
            const winner_name = useGetWinner([
                { name: playerName, cards: playerCards },
                { name: opponents[0].name, cards: opponents[0].cards },
                { name: opponents[1].name, cards: opponents[1].cards },
                { name: opponents[2].name, cards: opponents[2].cards },
            ], tableCards)
            setGameText('Winner: ' + winner_name)
        }
    }, [opponents])

    const handleCall = () => {
        const tmp = [...tableCards]
        if (tmp.length < 5) {
            tmp.push(drawCard(pokerDeck))
            setTableCards(tmp)
        }
    }

    const opponentsMap = opponents.map((item, index) => (
        <Opponent
            key={index}
            icon={item.icon}
            name={item.name}
            cards={item.cards}
            bets={item.bets}
        />
    ))

    return !isClient ? null : (
        <main className={styles.page}>
            <div className={styles.playerArea}>
                <div className={styles.playerInfoArea}>
                    <div className={styles.playerIconArea}>
                        {playerIcon}
                    </div>
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
                    <RaiseBtn onClick={null} />
                    <FoldBtn onClick={null} />
                </div>
                <PlayerBets bets={0} />
            </div>
            <div className={styles.mainArea}>
                <div className={styles.opponentArea}>
                    {opponentsMap}
                </div>
                <div className={styles.centerArea}>
                    <TableCards cards={tableCards} />
                    <GameText text={gameText} />
                    <BetsPool betsTotal={6} />
                    <NewGameBtn onClick={handleNewGame} />
                </div>
            </div>
        </main>
    );
}
