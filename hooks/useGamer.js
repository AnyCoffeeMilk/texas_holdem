import { useState } from "react"

const useGamer = () => {
    const [name, setName] = useState()
    const [avatar, setAvatar] = useState()
    const [bank, setBank] = useState()
    const [cards, setCards] = useState([null, null])
    const [bets, setBets] = useState(0)

    const setSB = () => setBets(2) // Small Blind Bets
    const setBB = () => setBets(4) // Big Blind Bets

    const gameAction = {
        call: (topBets) => {
            setBets(topBets)
            return topBets
        },
        raise: (topBets) => {
            const new_bets = topBets * 2
            setBets(new_bets)
            return new_bets
        },
        fold: () => {
            setCards([null, null])
            return bets
        },
    }

    const setInfo = (newName, newAvatar, newBank) => {
        setName(newName)
        setAvatar(newAvatar)
        setBank(newBank)
    }

    const newRound = () => {
        setCards([null, null])
        setBets(0)
    }

    return {
        name, avatar, cards, bets, bank,
        setInfo, setCards, setSB, setBB,
        gameAction, newRound
    }
}

export default useGamer