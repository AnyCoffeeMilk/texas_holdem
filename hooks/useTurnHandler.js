/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import usePokerDeck from "./usePokerDeck"
import useGetWinner from "./useGetWinner"

const useTurnHandler = (gamers_list, gameTable) => {
    const { pokerDeck, drawCard, drawCards, getNewDeck } = usePokerDeck()
    const { getWinner } = useGetWinner()

    const [gamers, setGamers] = useState([...gamers_list])
    const [smallBlind, setSmallBlind] = useState(-1)
    const [gameStateId, setGameStateId] = useState(-1) // -1 mean not initiated
    const [turnQueue, setTurnQueue] = useState([0, 1, 2, 3])
    const [turnCounter, setTurnCounter] = useState(0)

    const roundForward = (actionId, newBets) => {
        let new_turnCounter = turnCounter

        let queue_tmp = [...turnQueue]
        const inTurn_id = queue_tmp.shift()

        switch (actionId) {
            case 0: // Call
                new_turnCounter += 1
                queue_tmp.push(inTurn_id)
                break
            case 1: // Raise
                new_turnCounter = 1
                queue_tmp.push(inTurn_id)
                break
            case 2: // Fold
                new_turnCounter += 1
                // gamers[inTurn_id].setCards([null, null])
                break
        }

        if (new_turnCounter >= queue_tmp.length) {
            setTurnCounter(0)
            setGameStateId(cur => cur + 1)
            if (!gameTable.isFull) {
                setTurnQueue(queue_tmp)
            }
        } else {
            setTurnCounter(new_turnCounter)
            setTurnQueue(queue_tmp)
        }
    }

    useEffect(() => {
        let queue_tmp = []
        switch (gameStateId) {
            case 0: // Draw Hands State
                const new_deck = getNewDeck()
                const cards_tmp = drawCards(new_deck, 8)
                gamers.forEach(gamer => gamer.setCards([cards_tmp.pop(), cards_tmp.pop()]))
                setGameStateId(1)
                break
            case 1: // BB and SB Set Bets State
                queue_tmp = [...turnQueue]

                const new_smallBlind = smallBlind < 4 ? smallBlind + 1 : 0
                setSmallBlind(new_smallBlind)
                gamers[turnQueue[new_smallBlind]].setSB()
                queue_tmp.push(queue_tmp.shift())

                const new_bigBlind = new_smallBlind < 4 ? new_smallBlind + 1 : 0
                gamers[turnQueue[new_bigBlind]].setBB()
                queue_tmp.push(queue_tmp.shift())

                const gamers_tmp = [...gamers_list]
                for (let i = 0; i < new_smallBlind; i++) {
                    gamers_tmp.push(gamers_tmp.shift())
                }
                setGamers(gamers_tmp)
                setTurnQueue(queue_tmp)
                setTurnCounter(2)
                break
            case 2: // Center Draw 3 Cards State
                gameTable.setCards(drawCards(pokerDeck, 3))
                setGameStateId(3)
                break
            case 3: // Round State
                queue_tmp = [...turnQueue]
                if (queue_tmp.includes(smallBlind)) {
                    while (queue_tmp[0] !== smallBlind) {
                        queue_tmp.push(queue_tmp.shift())
                    }
                } else {
                    queue_tmp.push(queue_tmp.shift())
                }
                setTurnQueue(queue_tmp)
                break
            case 4: // Center Draw 1 Card State
                if (!gameTable.isFull) {
                    gameTable.addCard(drawCard(pokerDeck))
                    setGameStateId(3)
                } else {
                    setGameStateId(5)
                }
                break
            case 5: // Check Winner State
                const winner_id = getWinner(turnQueue.map(id => ({ name: id, cards: gamers[id].cards })), gameTable.cards)
                gameTable.showWinner(gamers[winner_id].name)
                break
        }
    }, [gameStateId])

    const inTurnGamer = gamers[turnQueue[0]]

    const newRound = () => {
        setTurnCounter(0)
        setGameStateId(0)
        gameTable.newRound()
        gamers.forEach(gamer => gamer.newRound())
    }

    const sbBetsName = gamers[smallBlind]?.name
    const bbBetsName = gamers[smallBlind < 4 ? smallBlind + 1 : 0]?.name

    return { sbBetsName, bbBetsName, inTurnGamer, roundForward, newRound }
}

export default useTurnHandler