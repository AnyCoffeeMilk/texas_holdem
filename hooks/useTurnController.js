import { useCallback, useEffect, useState } from "react"
import usePokerDeck from "./usePokerDeck"
import useGetWinner from "./useGetWinner"

const useTurnController = (gamers, table) => {
    const { pokerDeck, drawCard, drawCards, getNewDeck } = usePokerDeck()
    const { getWinner } = useGetWinner()

    const [smallBlind, setSmallBlind] = useState(0)
    const [gameStateId, setGameStateId] = useState(0)
    const [turnQueue, setTurnQueue] = useState([0, 1, 2, 3])
    const [turnCounter, setTurnCounter] = useState(0)

    const turnActionCallBack = useCallback((actionId, newBets) => {
        const new_turnCounter = turnCounter + 1
        setTurnCounter(new_turnCounter)

        const queue_tmp = [...turnQueue]
        const inTurn_id = queue_tmp.shift()

        switch (actionId) {
            case 0: // Call
                queue_tmp.push(inTurn_id)
                setTurnQueue(queue_tmp)
            case 1: // Raise
                queue_tmp.push(inTurn_id)
                setTurnQueue(queue_tmp)
            case 2: // Fold
                gamers[inTurn_id].setCards([null, null])
                setTurnQueue(queue_tmp)
        }

        const bets_type_count = (new Set([...gamers.slice(1).map(gamer => gamer.bets), newBets])).size

        if (bets_type_count === 1 && new_turnCounter >= 4) {
            setGameStateId(cur => cur + 1)
        } else if (new_turnCounter < 4) {
            const top_bets = Math.max(...gamers.map(gamer => gamer.bets))
            gamers[queue_tmp[0]].turnAction(turnActionCallBack, top_bets)
        }
    }, [setTurnQueue, gamers, turnQueue, turnCounter, setTurnCounter])

    useEffect(() => {
        switch (gameStateId) {
            case 0: // Draw Hands State
                const new_deck = getNewDeck()
                const cards_tmp = drawCards(new_deck, 8)
                gamers.forEach(gamer => gamer.setCards([cards_tmp.pop(), cards_tmp.pop()]))
                setGameStateId(1)
                break
            case 1: // BB and SB Set Bets State
                gamers[turnQueue[0]].setBets(2)
                gamers[turnQueue[1]].setBets(4)
                gamers[turnQueue[0]].turnAction(turnActionCallBack, 4)
                break
            case 2: // Center Draw 3 Cards State
                table.setCards(drawCards(new_deck, 3))
            case 3: // Round State
                const top_bets = Math.max(...gamers.map(gamer => gamer.bets))
                gamers[turnQueue[0]].turnAction(turnActionCallBack, top_bets)
            case 4: // Center Draw 1 Card State
                if (!table.isFull) {
                    const cards_tmp = drawCards(new_deck, 1)
                    table.addCards(cards_tmp)
                    setGameStateId(3)
                } else {
                    setGameStateId(5)
                }
            case 5: // Check Winner State
                const winner_name = getWinner(turnQueue.map(id => ({ name: id, cards: gamers[id].cards })), table.cards)
                table.setWinner(winner_name)
        }
    }, [gameStateId, turnActionCallBack, gamers, table, getNewDeck, drawCards, getWinner, turnQueue])

    return {}
}

export default useTurnController