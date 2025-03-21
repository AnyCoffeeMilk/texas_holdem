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
        drawBlind: () => setGameText("Picking a random Small Blind..."),
        passBlind: () => setGameText("Passing Blinds to next players..."),
        blind: (name) => setGameText(`${name} is the Small Blind.`),
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
        playerCheck: () => {
            setNoAction(true)
            setGameText("You CHECK.")
        },
        playerCall: (cost_bets) => {
            setNoAction(true)
            setGameText(`You CALL with ${cost_bets} Bets.`)
        },
        playerRaise: (cost_bets) => {
            setNoAction(true)
            setGameText(`You PRAISE by ${cost_bets} Bets.`)
        },
        playerFold: () => {
            setNoAction(true)
            setGameText("You FOLD.")
        },
        opponentCheck: (opponent_name) => setGameText(`${opponent_name} CHECK.`),
        opponentCall: (opponent_name) => setGameText(`${opponent_name} CALL.`),
        opponentRaise: (opponent_name) => setGameText(`${opponent_name} PRAISE.`),
        opponentFold: (opponent_name) => setGameText(`${opponent_name} FOLD.`),
    }

    return { 
        isNewGame, cards, gameText, isFull, noAction,
        setCards, addCard, 
        showText, newRound,
    }
}

export default useGameTable