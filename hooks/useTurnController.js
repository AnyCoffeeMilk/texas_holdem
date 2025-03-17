import { useCallback, useEffect, useState } from "react"
import usePokerDeck from "./usePokerDeck"

const useTurnController = (gamers, table) => {
    const { pokerDeck, drawCard, drawCards, getNewDeck } = usePokerDeck()

    const [smallBlind, setSmallBlind] = useState(0)
    const [gameStateId, setGameStateId] = useState(0)
    const [turnQueue, setTurnQueue] = useState([0, 1, 2, 3])

    const turnActionCallBack = useCallback((actionId, newBets) => {
        const bets_type_count = (new Set([...gamers.slice(1).map(gamer => gamer.bets), newBets])).size

        if (bets_type_count === 1) {
            // TODO
        }

        const queue_tmp = [...turnQueue]
        const inTurn_id = queue_tmp.shift()

        if (actionId === 0) { // Call
            queue_tmp.push(inTurn_id)
        } else if (actionId === 1) { // Raise
            queue_tmp.push(inTurn_id)
        } else if (actionId === 2) { // Fold
            gamers[inTurn_id].setCards([null, null])
        }
        setTurnQueue(queue_tmp)
    }, [setTurnQueue, gamers, turnQueue])

    useEffect(() => {
        if (gameStateId === 0) { // Draw Hands State
            const new_deck = getNewDeck()
            const cards_tmp = drawCards(new_deck, 8)
            gamers.forEach(gamer => gamer.setCards([cards_tmp.pop(), cards_tmp.pop()]))
            setGameStateId(1)
        } else if (gameStateId === 1) { // BB and SB Set Bets State
            gamers[turnQueue[0]].setBets(2)
            gamers[turnQueue[1]].setBets(4)
            gamers[turnQueue[0]].turnAction(turnActionCallBack, 4)
        } else if (gameStateId === 2) { // Center 3 Cards Draw State
            const cards_tmp = drawCards(new_deck, 3)
            table.setCards(cards_tmp)
        } else if (gameStateId === 3) { // Main Round State
            const top_bets = Math.max(...gamers.map(gamer => gamer.bets))
            gamers[turnQueue[0]].turnAction(turnActionCallBack, top_bets)
        }


    }, [gameStateId, turnActionCallBack, gamers, table, getNewDeck, drawCards, turnQueue])

    return {}
}

export default useTurnController