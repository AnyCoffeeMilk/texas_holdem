'use client'

import { useEffect, useState } from 'react'
import pusherClient from '@/lib/pusher'
import { read_player_profile } from '@/actions/actions'
import { joinRoom } from '@/actions/joinRoom'
import { redirect } from 'next/navigation'

var roomChannel = pusherClient.subscribe('room-channel')
var startGameChannel = pusherClient.subscribe('start-game-channel')

export default function PlayerListField({ roomId }) {
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {
    roomChannel.bind(roomId, (data) => setPlayerList(data.playerList))
    read_player_profile().then(({ player_name, player_uuid }) =>
      joinRoom(roomId, player_name, player_uuid)
    )
    startGameChannel.bind(roomId, () => redirect(`/match/game/${roomId}`))
  }, [])

  return (
    <div className="border-dark grid grid-flow-col grid-cols-2 grid-rows-[repeat(4,32px)] gap-4 rounded-sm border-2 p-4">
      {playerList.length === 0 ? (
        <span>Loading...</span>
      ) : (
        playerList.map((item, index) => (
          <div key={index} className="flex text-xl font-extrabold">
            <span className="w-[1.5em]">{index + 1}:</span>
            <div className="bg-dark text-light w-[180px] rounded-sm py-[0.1em] text-center">
              {item.name}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
