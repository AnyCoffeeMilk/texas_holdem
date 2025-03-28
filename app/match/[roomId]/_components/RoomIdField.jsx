'use client'

import { useRef, useState } from 'react'

export default function RoomIdField({ roomId }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef()

  const handleClick = () => {
    clearTimeout(timeoutRef.current)
    navigator.clipboard.writeText(roomId)
    setCopied(true)
    timeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      onClick={handleClick}
      className="border-dark flex-center cursor-pointer group flex-col gap-2 rounded-sm border-2 p-8"
    >
      <div className="bg-dark text-light rounded-sm px-[1em] py-[0.1em] text-6xl font-extrabold">
        {roomId}
      </div>
      <div className="font-semibold group-hover:underline">
        {copied ? 'Copied to Clipboard!' : 'Click to Copy to Clipboard'}
      </div>
    </div>
  )
}
