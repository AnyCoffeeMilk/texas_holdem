import React from 'react'

export default function PageTitle({ className, children }) {
  return (
    <div className={`flex items-center rounded-xs text-3xl font-extrabold tracking-wider uppercase ${className}`}>
      {children}
    </div>
  )
}
