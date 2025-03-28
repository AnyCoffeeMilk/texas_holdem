'use client'

import { useState } from 'react'
import ThemeBtn from '@/app/_components/ThemeBtn'
import { redirect } from 'next/navigation'

export default function JoinRoomField() {
  const [roomId, setRoomId] = useState('')

  const handleChange = (e) => {
    if (e.target.value.length <= 6) {
      setRoomId(e.target.value)
    }
  }

  const handleClick = () => {
    if (roomId.length === 6) {
      redirect(`/match/join/${roomId}`)
    } else {
      
    }
  }

  return (
    <>
      <div className="border-dark flex-center rounded-sm border-2 p-8">
        <div className="bg-dark text-light w-[7em] rounded-sm py-[0.1em] text-6xl font-extrabold">
          <input
            className="w-full selection:text-dark selection:bg-light text-center"
            onChange={handleChange}
            value={roomId}
          />
        </div>
      </div>
      <ThemeBtn disabled={roomId.length !== 6} onClick={handleClick}>Join Room</ThemeBtn>
    </>
  )
}
