'use client'

import { useEffect, useState } from 'react'
import pusherClient from '@/lib/pusher'
import { read_player_profile } from '@/actions/actions'
import { joinRoom } from '@/actions/joinRoom'
import { updateRoom } from '@/actions/updateRoom'

var joinRoomChannel = pusherClient.subscribe('join-room-channel')

export default function PlayerListField({ roomId }) {
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {
    read_player_profile().then(({player_name}) => {
      joinRoom(roomId, player_name)
    })
  }, [])

  useEffect(() => {
    joinRoomChannel.unbind(roomId)
    joinRoomChannel.bind(roomId, (data) => {
      let tmp = [...playerList]
      tmp.push(data.playerName.trim())
      console.log("join trigger", tmp)
      setPlayerList(tmp)
      updateRoom(roomId, tmp)
    })
  }, [playerList])

  return (
    <div className="border-dark grid grid-flow-col grid-cols-2 grid-rows-4 gap-4 rounded-sm border-2 p-4">
      {playerList.map((item, index) => (
        <div key={index} className="flex text-xl font-extrabold">
          <span className="w-[1.5em]">{index + 1}:</span>
          <div className="bg-dark text-light w-[180px] rounded-sm py-[0.1em] text-center">
            {item}
          </div>
        </div>
      ))}
    </div>
  )
}
