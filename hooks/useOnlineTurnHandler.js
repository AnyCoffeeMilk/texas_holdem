/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import usePokerDeck from './usePokerDeck'
import useGetWinner from './useGetWinner'
import { add_bank } from '@/actions/actions'

const useOnlineTurnHandler = (gameTable) => {
   const { pokerDeck, drawCard, drawCards, getNewDeck } = usePokerDeck()
   const { getWinner } = useGetWinner()

   const [playerList, setPlayerList] = useState([])
   const [smallBlind, setSmallBlind] = useState(-1)
   const [gameStateId, setGameStateId] = useState(-1) // -1 mean not initiated
   const [turnQueue, setTurnQueue] = useState([])
   const [turnCounter, setTurnCounter] = useState(0)

   const timeoutBin = useRef()

   const addPlayer = (playerObject) => {
      setPlayerList([...playerList, playerObject])
   }

   const roundForward = (actionId) => {
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
         if (!gameTable.isFull) {
            setTurnQueue([])
            gameTable.showText.drawCenter()
         } else {
            gameTable.showText.calcWinner()
         }
         timeoutBin.current = setTimeout(() => {
            setGameStateId((cur) => cur + 1)
            timeoutBin.current = setTimeout(() => {
               if (!gameTable.isFull) {
                  while (queue_tmp[0] !== smallBlind) {
                     queue_tmp.push(queue_tmp.shift())
                  }
                  setTurnQueue(queue_tmp)
               }
            }, 1500)
         }, 1500)
      } else {
         setTurnCounter(new_turnCounter)
         setTurnQueue(queue_tmp)
      }
   }

   useEffect(() => {
      let queue_tmp = []
      switch (gameStateId) {
         case 0: // BB and SB Set Bets State
            const new_smallBlind =
               smallBlind !== -1
                  ? smallBlind < 3
                     ? smallBlind + 1
                     : 0
                  : Math.floor(Math.random() * 4)
            gameTable.showText.blind(playerList[new_smallBlind].name)
            setSmallBlind(new_smallBlind)
            if (new_smallBlind === 0) {
               // TODO, now only reduce the bank of player
               add_bank(-2).then((new_bank) => playerList[0].setBank(new_bank))
            }
            playerList[new_smallBlind].setSB()

            const new_bigBlind = new_smallBlind < 3 ? new_smallBlind + 1 : 0
            if (new_bigBlind === 0) {
               // TODO, now only reduce the bank of player
               add_bank(-4).then((new_bank) => playerList[0].setBank(new_bank))
            }
            playerList[new_bigBlind].setBB()

            timeoutBin.current = setTimeout(() => {
               gameTable.showText.drawHand()
               timeoutBin.current = setTimeout(() => setGameStateId(1), 1500)
            }, 1500)
            break
         case 1: // Draw Hands State
            queue_tmp = [0, 1, 2, 3]
            while (queue_tmp[0] !== smallBlind) {
               queue_tmp.push(queue_tmp.shift())
            }
            queue_tmp.push(queue_tmp.shift())
            queue_tmp.push(queue_tmp.shift())

            const new_deck = getNewDeck()
            const cards_tmp = drawCards(new_deck, 8)
            playerList.forEach((gamer) =>
               gamer.setCards([cards_tmp.pop(), cards_tmp.pop()])
            )

            timeoutBin.current = setTimeout(() => {
               setTurnQueue(queue_tmp)
               setTurnCounter(0)
            }, 1500)
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
            const winner_id = getWinner(
               turnQueue.map((id) => ({
                  name: id,
                  cards: playerList[id].cards,
               })),
               gameTable.cards
            )
            let total_bets = 0
            for (let i = 0; i < 4; i++) {
               total_bets += playerList[i].bets
            }
            if (winner_id.length > 1) {
               // When there is two or more winners
               let winners_name_list = [playerList[winner_id[0]].name]
               for (let i = 1; i < winner_id.length; i++) {
                  winners_name_list.push(playerList[winner_id[i]].name)
               }
               gameTable.showText.winners(winners_name_list)
               if (winner_id === 0) {
                  // TODO, now only add to the bank of player
                  add_bank(total_bets / winner_id.length).then((new_bank) =>
                     playerList[0].setBank(new_bank)
                  )
               }
            } else {
               // When there is only one winner
               gameTable.showText.winner(playerList[winner_id].name)
               if (winner_id === 0) {
                  // TODO, now only add to the bank of player
                  add_bank(total_bets).then((new_bank) =>
                     playerList[0].setBank(new_bank)
                  )
               }
            }
            break
      }
   }, [gameStateId])

   const inTurnGamer = playerList[turnQueue[0]]

   const newRound = () => {
      setTurnCounter(0)
      setTurnQueue([])
      gameTable.newRound()
      if (smallBlind === -1) {
         gameTable.showText.drawBlind()
      } else {
         gameTable.showText.passBlind()
      }
      playerList.forEach((gamer) => gamer.newRound())
      timeoutBin.current = setTimeout(() => setGameStateId(0), 1500)
   }

   const sbBetsName = playerList[smallBlind]?.name
   const bbBetsName =
      smallBlind !== -1
         ? playerList[smallBlind < 3 ? smallBlind + 1 : 0]?.name
         : null

   return {
      sbBetsName,
      bbBetsName,
      turnQueue,
      inTurnGamer,
      roundForward,
      newRound,
      addPlayer,
   }
}

export default useOnlineTurnHandler
