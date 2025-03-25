import React from 'react'

export default function SectionTitle({ children }) {
  return (
    <div className="bg-dark text-light rounded-xs px-4 py-3 text-xl font-bold tracking-wider uppercase">
      {children}
    </div>
  )
}
