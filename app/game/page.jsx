'use client'

import { useEffect, useRef } from 'react'

import Opponent from './_components/Opponent'
import ChipLabel from '../_components/ChipLabel'
import Avatar from '../_components/Avatar'
import ThemeBtn from '../_components/ThemeBtn'
import ThemeLink from '../_components/ThemeLink'
import GoBackSVG from '../_svgs/GoBackSVG'
import SettingsSVG from '../_svgs/SettingsSVG'
import PokerCard from './_components/_components/PokerCard'

import {
  read_player_profile,
  read_opponents_profile,
  get_opponent_action,
  add_bank,
} from '@/actions/actions'
import useGamer from '@/hooks/useGamer'
import useGameTable from '@/hooks/useGameTable'
import useTurnHandler from '@/hooks/useTurnHandler'
import PageTitle from '../home/_components/PageTitle'

export default function Game() {
  const gameTable = useGameTable()
  const player = useGamer()
  const gamerA = useGamer()
  const gamerB = useGamer()
  const gamerC = useGamer()
  const opponents = [gamerA, gamerB, gamerC]

  const {
    sbBetsName,
    bbBetsName,
    turnQueue,
    inTurnGamer,
    roundForward,
    newRound,
  } = useTurnHandler([player, ...opponents], gameTable)

  const timeoutBin = useRef(null)

  useEffect(() => {
    read_player_profile().then(
      ({ player_name, player_avatar, player_bank }) => {
        player.setInfo(player_name, player_avatar, player_bank)
      }
    )
    read_opponents_profile().then(([gamer_a, gamer_b, gamer_c]) => {
      gamerA.setInfo(gamer_a.name, gamer_a.avatar, gamer_a.bank)
      gamerB.setInfo(gamer_b.name, gamer_b.avatar, gamer_b.bank)
      gamerC.setInfo(gamer_c.name, gamer_c.avatar, gamer_c.bank)
    })
  }, [])

  const top_bets = Math.max(
    ...[...opponents, player].map((gamer) => gamer.bets)
  )

  const handleAIAction = (actionId) => {
    clearTimeout(timeoutBin.current)
    switch (actionId) {
      case 0:
        timeoutBin.current = setTimeout(() => {
          if (inTurnGamer.bets === top_bets) {
            gameTable.showText.opponentCheck(inTurnGamer.name)
          } else {
            gameTable.showText.opponentCall(inTurnGamer.name)
          }
          timeoutBin.current = setTimeout(() => {
            inTurnGamer.gameAction.call(top_bets)
            roundForward(actionId)
          }, 1500)
        }, 1000)
        break
      case 1:
        timeoutBin.current = setTimeout(() => {
          gameTable.showText.opponentRaise(inTurnGamer.name)
          timeoutBin.current = setTimeout(() => {
            inTurnGamer.gameAction.raise(top_bets)
            roundForward(actionId)
          }, 1500)
        }, 1000)
        break
      case 2:
        timeoutBin.current = setTimeout(() => {
          gameTable.showText.opponentFold(inTurnGamer.name)
          timeoutBin.current = setTimeout(() => {
            inTurnGamer.gameAction.fold()
            roundForward(actionId)
          }, 1500)
        }, 1000)
        break
    }
  }

  useEffect(() => {
    if (inTurnGamer?.name !== undefined) {
      if (inTurnGamer.name !== player.name) {
        gameTable.showText.opponentTurn(inTurnGamer.name)
        get_opponent_action().then(handleAIAction)
      } else if (!gameTable.isNewGame) {
        gameTable.showText.playerTurn()
      }
    }
  }, [turnQueue])

  const handleCall = () => {
    const cost = -(player.gameAction.call(top_bets) - player.bets)
    if (cost === 0) {
      gameTable.showText.playerCheck()
    } else {
      gameTable.showText.playerCall(-cost)
    }
    timeoutBin.current = setTimeout(() => {
      if (cost !== 0) {
        add_bank(cost).then((new_bank) => {
          player.setBank(new_bank)
          roundForward(0)
        })
      } else {
        roundForward(0)
      }
    }, 1500)
  }

  const handleRaise = () => {
    const cost = -(player.gameAction.raise(top_bets) - player.bets)
    gameTable.showText.playerRaise(-cost)
    timeoutBin.current = setTimeout(() => {
      if (cost !== 0) {
        add_bank(cost).then((new_bank) => {
          player.setBank(new_bank)
          roundForward(1)
        })
      } else {
        roundForward(1)
      }
    }, 1500)
  }

  const handleFold = () => {
    gameTable.showText.playerFold()
    timeoutBin.current = setTimeout(() => {
      player.gameAction.fold()
      roundForward(2)
    }, 1500)
  }

  const isBtnDisabled = inTurnGamer?.name !== player.name || gameTable.noAction

  return !player.avatar ? null : (
    <div className="grid min-h-[calc(100svh-1rem)] max-w-[480px] min-w-[350px] grid-cols-1 grid-rows-[auto_auto_1fr_auto] gap-2 sm:w-[620px] sm:max-w-none sm:min-w-auto lg:p-4 lg:w-[1024px] lg:grid-cols-[1fr_auto] lg:grid-rows-[auto_1fr_auto] lg:gap-4">
      <div className="col-1 row-1 flex justify-between lg:col-[1/3]">
        <ThemeLink href="/home" className="px-2 py-1">
          HOME <GoBackSVG />
        </ThemeLink>
        <PageTitle>Ai Match</PageTitle>
        <ThemeLink href="/game" className="px-2 py-1">
          RULESETS <SettingsSVG />
        </ThemeLink>
      </div>
      <div className="sm:container-md row-2 flex gap-2 overflow-auto rounded-sm py-1 sm:gap-6 sm:p-4 lg:col-2 lg:row-[2/4] lg:h-[calc(100svh-7rem-3px)] lg:flex-col">
        {opponents.map((item, index) => (
          <Opponent
            key={index}
            inTurn={inTurnGamer?.name === item.name && !gameTable.isNewGame}
            flipCard={!gameTable.isNewGame}
            avatar={item.avatar}
            name={item.name}
            cards={item.cards}
            bets={item.bets}
            blindTag={
              sbBetsName === item.name
                ? 'SB'
                : bbBetsName === item.name
                  ? 'BB'
                  : null
            }
          />
        ))}
      </div>
      <div className="container-sm sm:container-md flex-center px-2 sm:px-4 relative col-1 row-3 rounded-sm lg:row-2">
        <div className="bg-dark text-light absolute top-4 w-full p-2 text-center text-xl font-bold italic lg:text-2xl">
          {gameTable.gameText}
        </div>
        <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_1fr] gap-1 sm:flex-center sm:gap-2 text-xl sm:text-lg">
          {gameTable.cards.map((item, index) => (
            <div className="flex-center h-[6.75em] w-[5.5em]">
              <PokerCard key={index} rank={item?.rank} suit={item?.suit} />
            </div>
          ))}
        </div>
        <ThemeBtn
          className="absolute right-2 bottom-2"
          disabled={!gameTable.isNewGame}
          onClick={newRound}
        >
          NEW ROUND
        </ThemeBtn>
      </div>
      <div className="sm:container-md col-1 row-4 grid grid-cols-[auto_minmax(130px,auto)_minmax(110px,1fr)] grid-rows-[auto_1fr_auto] gap-1 rounded-sm p-0 sm:grid-cols-[auto_1fr_minmax(100px,1fr)] sm:gap-2 sm:p-4 lg:row-3">
        <div className="relative col-1 row-[1/3]">
          <Avatar
            className="h-[110px] w-[100px] sm:h-[132px] sm:w-[120px] lg:h-[143px] lg:w-[130px]"
            src={player.avatar}
            name={player.name}
          />
          <div className="text-light bg-dark border-light absolute -top-1 -left-2 rotate-z-[-20deg] rounded-sm border-2 px-2 font-bold">
            {sbBetsName === player.name
              ? 'SB'
              : bbBetsName === player.name
                ? 'BB'
                : null}
          </div>
        </div>
        <div
          className={`bg-dark text-light ${!isBtnDisabled ? 'animate-blink' : null} col-1 row-3 rounded-sm py-0.5 text-center text-base font-bold sm:text-xl`}
        >
          {player.name}
        </div>
        {/* <ChipLabel className={styles.playerBank} chips={player.bank} digits={5}>
          BANK
        </ChipLabel> */}
        <div className="col-2 row-[2/4] grid grid-cols-[minmax(0,1fr)_1fr] gap-1 sm:grid-cols-2 sm:gap-2">
          {player.cards.map((item, index) => (
            <div
              key={index}
              className="flex-center h-[105px] w-[85px] text-xl sm:h-full sm:w-full sm:place-self-center"
            >
              <PokerCard rank={item?.rank} suit={item?.suit} />
            </div>
          ))}
        </div>
        <div className="col-3 row-[1/4] grid gap-2 sm:text-lg">
          <ThemeBtn
            onClick={handleCall}
            className="[&>div]:py-0"
            disabled={isBtnDisabled}
          >
            {player.bets === top_bets ? 'CHECK' : 'CALL'}
          </ThemeBtn>
          <ThemeBtn
            onClick={handleRaise}
            className="[&>div]:py-0"
            disabled={isBtnDisabled}
          >
            RAISE
          </ThemeBtn>
          <ThemeBtn
            onClick={handleFold}
            className="[&>div]:py-0"
            disabled={isBtnDisabled}
          >
            FOLD
          </ThemeBtn>
        </div>
        <ChipLabel
          className="col-2 row-1 text-base sm:text-xl [&>span]:px-1"
          chips={player.bets}
          digits={3}
        >
          BETS
        </ChipLabel>
      </div>
    </div>
  )
}
