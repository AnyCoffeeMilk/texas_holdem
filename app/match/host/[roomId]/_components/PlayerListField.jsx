'use client'

import { useEffect, useState } from 'react'
import { read_player_profile } from '@/actions/actions'
import ThemeBtn from '@/app/_components/ThemeBtn'
import { redirect } from 'next/navigation'

export default function PlayerListField({ roomId }) {
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {
    read_player_profile().then(({ player_name, player_uuid }) => {
      setPlayerList([{ name: player_name, uuid: player_uuid }])
    })
  }, [])

  useEffect(() => {

  }, [playerList])

  const handleClick = () => {
    startGame(roomId)
    redirect(`/match/game/${roomId}`)
  }

  return (
    <>
      <div className="border-dark grid grid-flow-col grid-cols-2 grid-rows-[repeat(4,32px)] gap-4 rounded-sm border-2 p-4">
        {playerList.length === 0 ? (
          <span>Loading...</span>
        ) : (
          playerList.map((item, index) => (
            <div
              key={index}
              className="flex items-center text-xl font-extrabold"
            >
              <span className="w-[1.5em]">{index + 1}:</span>
              <div className="bg-dark text-light w-[180px] rounded-sm py-[0.1em] text-center">
                {item.name}
              </div>
            </div>
          ))
        )}
      </div>
      <ThemeBtn disabled={playerList.length < 2} onClick={handleClick}>
        Start Game
      </ThemeBtn>
    </>
  )
}
