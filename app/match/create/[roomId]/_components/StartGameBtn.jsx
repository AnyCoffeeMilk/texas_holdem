'use client'

import ThemeBtn from '@/app/_components/ThemeBtn'
import { redirect } from 'next/navigation'

export default function StartGameBtn({ roomId, disabled }) {
  const handleClick = () => redirect(`/match/${roomId}/game`)
  return <ThemeBtn disabled={disabled} onClick={handleClick}>Start Game</ThemeBtn>
}
