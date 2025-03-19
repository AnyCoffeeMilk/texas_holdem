import { useState } from "react"

const useGamer = () => {
    const [name, setName] = useState()
    const [avatar, setAvatar] = useState()
    const [cards, setCards] = useState([])
    const [bets, setBets] = useState(0)

    const setSB = () => setBets(2) // Small Blind Bets
    const setBB = () => setBets(4) // Big Blind Bets

    const call = (topBets) => {
        setBets(topBets)
        return topBets
    }

    const raise = (topBets) => {
        const new_bets = topBets * 2
        setBets(new_bets)
        return new_bets
    }

    const fold = () => {
        setCards([null, null])
        return bets
    }

    return { 
        name, avatar, cards, bets, 
        setName, setAvatar, setCards, 
        setSB, setBB, 
        call, raise, fold 
    }
}

export default useGamer