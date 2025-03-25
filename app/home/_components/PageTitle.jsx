import React from 'react'

export default function PageTitle({ children }) {
  return (
    <div className="flex items-center rounded-xs text-2xl font-extrabold tracking-wider uppercase">
      {children}
    </div>
  )
}
