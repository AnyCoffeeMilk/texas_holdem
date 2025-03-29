'use client'

import { useEffect, useState } from 'react'
import pusherClient from '@/lib/pusher'
import { read_player_profile } from '@/actions/actions'
import { updateRoom } from '@/actions/updateRoom'
import ThemeBtn from '@/app/_components/ThemeBtn'

var joinRoomChannel = pusherClient.subscribe('join-room-channel')

export default function PlayerListField({ roomId }) {
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {
    read_player_profile().then(({ player_name }) => {
      setPlayerList([player_name])
    })
  }, [])

  useEffect(() => {
    joinRoomChannel.unbind(roomId)
    joinRoomChannel.bind(roomId, (data) => {
      let tmp = [...playerList]
      tmp.push(data.playerName.trim())
      setPlayerList(tmp)
      updateRoom(roomId, tmp)
    })
  }, [playerList])

  const handleClick = () => redirect(`/match/game/${roomId}`)

  return (
    <>
      <div className="border-dark grid grid-flow-col grid-cols-2 grid-rows-[repeat(4,32px)] gap-4 rounded-sm border-2 p-4">
        {playerList.map((item, index) => (
          <div key={index} className="flex text-xl font-extrabold">
            <span className="w-[1.5em]">{index + 1}:</span>
            <div className="bg-dark text-light w-[180px] rounded-sm py-[0.1em] text-center">
              {item}
            </div>
          </div>
        ))}
      </div>
      <ThemeBtn disabled={playerList.length < 2} onClick={handleClick}>
        Start Game
      </ThemeBtn>
    </>
  )
}
