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

export default function Home() {
    const { pokerDeck, setPokerDeck, drawCard, drawCards, getNewDeck } = usePokerDeck()

    const [isClient, setIsClient] = useState(false)
    const [playerName, setPlayerName] = useState("Bishop")
    const [playerIcon, setPlayerIcon] = useState(null)
    const [playerCards, setPlayerCards] = useState(() => drawCards(pokerDeck, 2))
    const [tableCards, setTableCards] = useState(() => drawCards(pokerDeck, 3))
    const [opponents, setOpponents] = useState(() => [
        { icon: null, name: 'Pawn', cards: drawCards(pokerDeck, 2), bets: 4 },
        { icon: null, name: 'Queen', cards: drawCards(pokerDeck, 2), bets: 2 },
        { icon: null, name: 'Knight', cards: drawCards(pokerDeck, 2), bets: 0 },
    ])

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleNewGameBtn = () => {
        const new_deck = getNewDeck()
        const cards_tmp = drawCards(new_deck, 11)
        setPokerDeck(new_deck)
        setPlayerCards([cards_tmp.pop(), cards_tmp.pop()])
        setTableCards([cards_tmp.pop(), cards_tmp.pop(), cards_tmp.pop()])
        setOpponents([
            { icon: null, name: 'Pawn', cards: [cards_tmp.pop(), cards_tmp.pop()], bets: 4 },
            { icon: null, name: 'Queen', cards: [cards_tmp.pop(), cards_tmp.pop()], bets: 2 },
            { icon: null, name: 'Knight', cards: [cards_tmp.pop(), cards_tmp.pop()], bets: 0 },
        ])
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
                    <CallBtn onClick={() => console.log(drawCard())} />
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
                    <GameText text={"Test text"} />
                    <BetsPool betsTotal={6} />
                    <NewGameBtn onClick={handleNewGameBtn} />
                </div>
            </div>
        </main>
    );
}
