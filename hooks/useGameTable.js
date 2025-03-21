import { useState } from "react"

const useGameTable = () => {
    const [cards, setCards] = useState([])
    const [gameText, setGameText] = useState('Press "NEW ROUND" to start.')
    const [isNewGame, setIsNewGame] = useState(true)
    const [noAction, setNoAction] = useState(true)

    const isFull = cards.length === 5

    const addCard = (newCard) => {
        setCards([...cards, newCard])
    }

    const newRound = () => {
        setCards([])
        setIsNewGame(false)
    }

    const showText = {
        drawHand: () => setGameText("Draw two cards to each players..."),
        pickBlind: (name) => setGameText(`${name} is the Small Blind.`),
        drawCenter: () => setGameText("Draw to center..."),
        playerTurn: () => {
            setNoAction(false)
            setGameText("It's your turn now.")
        },
        opponentTurn: (opponent_name) => setGameText(`${opponent_name}'s turn.`),
        calcWinner: () => {
            setNoAction(true)
            setGameText("Checking for winner...")
        },
        winner: (winner_name) => {
            setIsNewGame(true)
            setNoAction(true)
            setGameText(`Winner is ${winner_name}!`)
        },
        winners: (winners_name_list) => {
            setIsNewGame(true)
            setNoAction(true)
            setGameText(`Winners are ${winners_name_list.join(', ')}!`)
        },
    }

    return { 
        isNewGame, cards, gameText, isFull, noAction,
        setCards, addCard, 
        showText, newRound,
    }
}

export default useGameTable