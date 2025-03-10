import { useState } from "react"

const poker_ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const poker_suits = ['♤', '♡', '♧', '♢']

const getNewDeck = () => {
    const tmp = []
    poker_ranks.forEach(rank => {
        poker_suits.forEach(suit => {
            tmp.push({
                rank: rank,
                suit: suit,
            })
        })
    })
    return tmp
}

const usePokerDeck = () => {
    const [pokerDeck, setPokerDeck] = useState(getNewDeck)

    console.log(pokerDeck)

    const drawCard = (deck) => {
        const tmpDeck = [...deck]
        const index = Math.floor(Math.random() * deck.length)
        const card = deck[index]
        tmpDeck.splice(index, 1)
        setPokerDeck(tmpDeck)
        return card
    }

    const drawCards = (deck, count) => {
        const tmpDeck = [...deck]
        const cards = []
        for (let i = count; i > 0; i--) {
            const index = Math.floor(Math.random() * tmpDeck.length)
            cards.push(deck[index])
            tmpDeck.splice(index, 1)
        }
        setPokerDeck(tmpDeck)
        return cards
    }

    return { pokerDeck, drawCard, drawCards, getNewDeck }
}

export default usePokerDeck