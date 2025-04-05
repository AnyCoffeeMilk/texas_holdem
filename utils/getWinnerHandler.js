const poker_suits = ["♤", "♡", "♧", "♢"];

const toValueDescending = (cards) => {
  const poker_ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  let tmp = [];
  cards.forEach((card) =>
    tmp.push({
      value: poker_ranks.findIndex((rank) => card.rank === rank),
      suit: card.suit,
    })
  );
  return tmp.sort((a, b) => b.value - a.value); // Descending Sort
};

/**  CAUTION: Run toValueDescending() before this function */
const getFlush = (sorted_cards) => {
  let kicker_tmp = null;
  poker_suits.every((suit) => {
    const tmp = sorted_cards.filter((card) => card.suit === suit);
    if (tmp.length >= 5) {
      kicker_tmp = tmp[0].value; // First card is the biggest card
      return true;
    }
  });
  return kicker_tmp;
};

/**  CAUTION: Run toValueDescending() before this function */
const getStraight = (sorted_cards) => {
  let kicker_tmp = sorted_cards[0].value;
  let check_count = 0;
  for (let i = 0; i < sorted_cards.length - 1; i++) {
    if (sorted_cards[i].value === sorted_cards[i + 1].value + 1) {
      check_count += 1;
      if (check_count === 4) break;
    } else {
      if (i < sorted_cards.length - 5) {
        check_count = 0;
        kicker_tmp = sorted_cards[i + 1].value;
      } else {
        if (check_count === 3 && sorted_cards[0].value === 12 && sorted_cards[sorted_cards.length - 1].value === 0) {
          kicker_tmp = sorted_cards[sorted_cards.length - 4].value; // Check 'A2345'
        }
        kicker_tmp = null;
        break;
      }
    }
  }
  return kicker_tmp;
};

/**  CAUTION: Run toValueDescending() before this function */
const getFourCards = (sorted_cards) => {
  let kicker_tmp = sorted_cards[0].value;
  let check_count = 0;
  for (let i = 0; i < sorted_cards.length - 1; i++) {
    if (sorted_cards[i].value === sorted_cards[i + 1].value) {
      check_count += 1;
      if (check_count === 3) break;
    } else {
      if (i < sorted_cards.length - 4) {
        check_count = 0;
        kicker_tmp = sorted_cards[i + 1].value;
      } else {
        kicker_tmp = null;
        break;
      }
    }
  }
  return kicker_tmp;
};

/**  CAUTION: Run toValueDescending() before this function */
const getThreeCards = (sorted_cards) => {
  let kicker_tmp = sorted_cards[0].value;
  let check_count = 0;
  for (let i = 0; i < sorted_cards.length - 1; i++) {
    if (sorted_cards[i].value === sorted_cards[i + 1].value) {
      check_count += 1;
      if (check_count === 2) break;
    } else {
      if (i < sorted_cards.length - 3) {
        check_count = 0;
        kicker_tmp = sorted_cards[i + 1].value;
      } else {
        kicker_tmp = null;
        break;
      }
    }
  }
  return kicker_tmp;
};

/**  CAUTION: Run toValueDescending() before this function */
const getPairs = (sorted_cards) => {
  let pair_tmp = [];
  for (let i = 0; i < sorted_cards.length - 1; i++) {
    if (sorted_cards[i].value === sorted_cards[i + 1].value) {
      if (pair_tmp.length === 2) {
        break;
      } else {
        pair_tmp.push(sorted_cards[i].value);
        i += 1;
      }
    }
  }
  return pair_tmp;
};

/**  CAUTION: Run toValueDescending() before this function */
const getHighCards = (sorted_cards) => {
  return [...sorted_cards.map((card) => card.value).slice(0, 5)];
};

/** Get the best 5 cards score and kicker among player cards + center cards. */
const getBestHand = (playerCards, centerCards) => {
  const cards = toValueDescending(playerCards.concat(centerCards));
  const straightKicker = getStraight(cards);
  const flushKicker = getFlush(cards);

  if (straightKicker && straightKicker === flushKicker) {
    return {
      score: 8,
      kicker: straightKicker,
    }; // Straight Flush
  } else {
    const fourCardsKicker = getFourCards(cards);
    if (fourCardsKicker) {
      return {
        score: 7,
        kicker: fourCardsKicker,
      }; // Four Cards
    } else {
      const threeCardsKicker = getThreeCards(cards);
      const pairKickerList = getPairs(cards);
      if (threeCardsKicker && pairKickerList.length === 2) {
        // The cards in Three Cards repeat in pairs so length === 2
        return {
          score: 6,
          kicker: threeCardsKicker,
        }; // Full House
      } else if (flushKicker) {
        return {
          score: 5,
          kicker: flushKicker,
        }; // Flush
      } else if (straightKicker) {
        return {
          score: 4,
          kicker: straightKicker,
        }; // Straight
      } else {
        const highCardList = getHighCards(cards);
        if (threeCardsKicker) {
          return {
            score: 3,
            kicker: [threeCardsKicker, ...highCardList.filter((item) => item.value !== threeCardsKicker).slice(0, 2)],
          }; // Three Cards + 2 High Cards
        } else if (pairKickerList.length === 2) {
          return {
            score: 2,
            kicker: [...pairKickerList, highCardList.find((item) => !pairKickerList.includes(item.value))],
          }; // Two Pairs + 1 High Card
        } else if (pairKickerList.length === 1) {
          return {
            score: 1,
            kicker: [pairKickerList[0], ...highCardList.filter((item) => item.value !== pairKickerList[0]).slice(0, 3)],
          }; // One Pairs + 3 High Cards
        } else {
          return {
            score: 0,
            kicker: highCardList,
          }; // 5 High Cards
        }
      }
    }
  }
};

/** Return a list of winners(if there is more than one) */
export const getWinner = (players, centerCards) => {
  let winnerUUIDs = [];
  let winnerHand = undefined;
  players.forEach((player) => {
    const bestHand = getBestHand(player.cards, centerCards);
    if (winnerUUIDs.length === 0 || bestHand.score > winnerHand.score) {
      winnerUUIDs = [player.uuid];
      winnerHand = bestHand;
    } else if (winnerUUIDs && bestHand.score === winnerHand.score) {
      if (bestHand.kicker > winnerHand.kicker) {
        winnerUUIDs = [player.uuid];
        winnerHand = bestHand;
      } else if (bestHand.kicker.toString() === winnerHand.kicker.toString()) {
        winnerUUIDs.push(player.uuid);
      }
    }
  });
  return winnerUUIDs;
};