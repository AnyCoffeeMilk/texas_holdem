const poker_ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const poker_suits = ['♤', '♡', '♧', '♢']

const getCardRankValue = (cards) => {
    let tmp = []
    cards.forEach(card => tmp.push({
        value: poker_ranks.findIndex(rank => card.rank === rank),
        suit: card.suit,
    }))
    return tmp.sort((a, b) => b.value - a.value) // Descending Sort
}

/**  CAUTION: Run getCardRankValue() before this function */
const getFlush = (sorted_cards) => {
    let kicker_tmp = null
    poker_suits.every(suit => {
        const tmp = sorted_cards.filter(card => card.suit === suit)
        if (tmp.length >= 5) {
            kicker_tmp = tmp[0].value // First card is the biggest card
            return true
        }
    })
    return kicker_tmp
}

/**  CAUTION: Run getCardRankValue() before this function */
const getStraight = (sorted_cards) => {
    let kicker_tmp = sorted_cards[0].value
    let check_count = 0
    for (let i = 0; i < sorted_cards.length - 1; i++) {
        if (sorted_cards[i].value === sorted_cards[i + 1].value + 1) {
            check_count += 1
            if (check_count === 4)
                break
        } else {
            if (i < sorted_cards.length - 5) {
                check_count = 0
                kicker_tmp = sorted_cards[i + 1].value
            } else {
                if (check_count === 3 && sorted_cards[0].value === 12 && sorted_cards[sorted_cards.length - 1].value === 0) {
                    kicker_tmp = sorted_cards[sorted_cards.length - 4].value // Check 'A2345'
                }
                kicker_tmp = null
                break
            }
        }
    }
    return kicker_tmp
}

/**  CAUTION: Run getCardRankValue() before this function */
const getFourCards = (sorted_cards) => {
    let kicker_tmp = sorted_cards[0].value
    let check_count = 0
    for (let i = 0; i < sorted_cards.length - 1; i++) {
        if (sorted_cards[i].value === sorted_cards[i + 1].value) {
            check_count += 1
            if (check_count === 3)
                break
        } else {
            if (i < sorted_cards.length - 4) {
                check_count = 0
                kicker_tmp = sorted_cards[i + 1].value
            } else {
                kicker_tmp = null
                break
            }
        }
    }
    return kicker_tmp
}

/**  CAUTION: Run getCardRankValue() before this function */
const getThreeCards = (sorted_cards) => {
    let kicker_tmp = sorted_cards[0].value
    let check_count = 0
    for (let i = 0; i < sorted_cards.length - 1; i++) {
        if (sorted_cards[i].value === sorted_cards[i + 1].value) {
            check_count += 1
            if (check_count === 2)
                break
        } else {
            if (i < sorted_cards.length - 3) {
                check_count = 0
                kicker_tmp = sorted_cards[i + 1].value
            } else {
                kicker_tmp = null
                break
            }
        }
    }
    return kicker_tmp
}

/**  CAUTION: Run getCardRankValue() before this function */
const getPairs = (sorted_cards) => {
    let pair_tmp = []
    for (let i = 0; i < sorted_cards.length - 1; i++) {
        if (sorted_cards[i].value === sorted_cards[i + 1].value) {
            if (pair_tmp.length === 2) {
                break
            } else {
                pair_tmp.push(sorted_cards[i].value)
                i += 1
            }
        }
    }
    return pair_tmp
}

const getScores = (cards) => {
    const scores_tmp = []
    const sorted_cards = getCardRankValue(cards)
    const straight_kicker = getStraight(sorted_cards)
    const flush_kicker = getFlush(sorted_cards)
    const fourCards_kicker = getFourCards(sorted_cards)
    const threeCards_kicker = getThreeCards(sorted_cards)
    const pair_kicker_list = getPairs(sorted_cards)

    if (straight_kicker && straight_kicker === flush_kicker) {
        scores_tmp.push([8, straight_kicker]) // Straight Flush. Type id: 8
    } else if (fourCards_kicker) {
        scores_tmp.push([7, fourCards_kicker]) // Four Cards. Type id: 7
    } else if (threeCards_kicker && pair_kicker_list.length === 2) { // The cards in Three Cards repeat in pairs so 2
        scores_tmp.push([6, threeCards_kicker]) // Full House. Type id: 6
    } else if (flush_kicker) {
        scores_tmp.push([5, flush_kicker]) // Flush. Type id: 5
    } else if (straight_kicker) {
        scores_tmp.push([4, straight_kicker]) // Straight. Type id: 4
    } else if (threeCards_kicker) {
        scores_tmp.push([3, threeCards_kicker]) // Three Cards. Type id: 3
    }

    if (pair_kicker_list.length === 2) {
        scores_tmp.push([2, pair_kicker_list]) // Two Pairs. Type id: 2
    } else if (pair_kicker_list.length === 1) {
        scores_tmp.push([1, pair_kicker_list[0]]) // One Pair. Type id: 1
    }

    scores_tmp.push([0, [...sorted_cards.map(card => card.value)]]) // High Card. Type id: 0

    return scores_tmp
}

const getWinner = (gamers, TableCards) => {
    let gamers_tmp = []

    console.log('-----------------')
    gamers.forEach(gamer => {
        gamers_tmp.push({
            name: gamer.name,
            scores: getScores(gamer.cards.concat(TableCards)),
        })
    })

    for (let i = 8; i >= 0; i--) { // Loop all 8 type of pattern
        let i_gamer_tmp = []

        gamers_tmp.forEach(gamer => {
            const i_score = gamer.scores.find(score => score[0] === i)
            if (i_score) i_gamer_tmp.push({
                name: gamer.name,
                kicker: i_score[1]
            })
        })

        if (i_gamer_tmp.length > 1) {
            if (i === 2) {
                for (let j = 0; j < 2; j++) {
                    const max_kicker = Math.max(...i_gamer_tmp.map(gamer => gamer.kicker[j]))
                    i_gamer_tmp = i_gamer_tmp.filter(gamer => gamer.kicker[j] === max_kicker)
                }
            } else if (i === 0) {
                for (let j = 0; j < 5; j++) {
                    const max_kicker = Math.max(...i_gamer_tmp.map(gamer => gamer.kicker[j]))
                    i_gamer_tmp = i_gamer_tmp.filter(gamer => gamer.kicker[j] === max_kicker)
                }
            } else {
                const max_kicker = Math.max(...i_gamer_tmp.map(gamer => gamer.kicker))
                i_gamer_tmp = i_gamer_tmp.filter(gamer => gamer.kicker === max_kicker)
            }
            gamers_tmp = gamers_tmp.filter(gamer => i_gamer_tmp.find(i_gamer => i_gamer.name === gamer.name))
        }

        console.log(i, `Gamers: ${[...i_gamer_tmp.map(item => item.name)]}`)
        
        if (i_gamer_tmp.length === 1) {
            return i_gamer_tmp[0].name
        }
    }
    return gamers_tmp.map(gamer => gamer.name)
}

const useGetWinner = () => { 
    return { getWinner } 
}

export default useGetWinner