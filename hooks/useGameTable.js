import { useState } from "react"

const useGameTable = () => {
    const [cards, setCards] = useState([])
    const [gameText, setGameText] = useState("Loading...")
    const [isNewGame, setIsNewGame] = useState(false)

    const isFull = cards.length === 5

    const addCard = (newCard) => {
        setCards([...cards, newCard])
    }

    const showPlayerTurn = () => {
        setGameText("It's your turn now.")
    }
    const showOpponentTurn = (opponentName) => setGameText(`${opponentName}'s turn.`)
    const showWinner = (winnerName) => {
        setIsNewGame(true)
        setGameText(`Winner is ${winnerName}.`)
    }

    return { 
        isNewGame, cards, gameText, isFull,
        setIsNewGame, setCards, addCard, 
        showPlayerTurn, showOpponentTurn, showWinner 
    }
}

export default useGameTable