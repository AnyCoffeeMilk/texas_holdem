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
                gamers_list.forEach(gamer => gamer.setCards([cards_tmp.pop(), cards_tmp.pop()]))
                setGameStateId(1)
                break
            case 1: // BB and SB Set Bets State
                queue_tmp = [0, 1, 2, 3]
                const new_smallBlind = smallBlind < 3 ? smallBlind + 1 : 0
                while (queue_tmp[0] !== new_smallBlind) {
                    queue_tmp.push(queue_tmp.shift())
                }

                setSmallBlind(new_smallBlind)
                gamers_list[new_smallBlind].setSB()
                queue_tmp.push(queue_tmp.shift())
                
                const new_bigBlind = new_smallBlind < 3 ? new_smallBlind + 1 : 0
                gamers_list[new_bigBlind].setBB()
                queue_tmp.push(queue_tmp.shift())
                
                setTurnQueue(queue_tmp)
                setTurnCounter(2)
                break
            case 2: // Center Draw 3 Cards State
                gameTable.setCards(drawCards(pokerDeck, 3))
                setGameStateId(3)
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
                console.log(gamers_list, turnQueue, smallBlind)
                const winner_id = getWinner(turnQueue.map(id => ({ name: id, cards: gamers_list[id].cards })), gameTable.cards)
                gameTable.showWinner(gamers_list[winner_id].name)
                break
        }
    }, [gameStateId])

    const inTurnGamer = gamers_list[turnQueue[0]]

    const newRound = () => {
        setTurnCounter(0)
        setGameStateId(0)
        gameTable.newRound()
        gamers_list.forEach(gamer => gamer.newRound())
    }

    const sbBetsName = gamers_list[smallBlind]?.name
    const bbBetsName = smallBlind !== -1 ? gamers_list[smallBlind < 3 ? smallBlind + 1 : 0]?.name : null

    return { sbBetsName, bbBetsName, turnQueue, inTurnGamer, roundForward, newRound }
}

export default useTurnHandler