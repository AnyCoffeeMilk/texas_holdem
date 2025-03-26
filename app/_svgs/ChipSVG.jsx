import { memo } from 'react'

const ChipSVG = () => (
  <svg
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
    fill="#2b1e1a"
    stroke="#2b1e1a"
    strokeWidth={0.8}
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      d="M3.5 12a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0ZM12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5ZM13 7a1 1 0 1 0-2 0v.1a5.002 5.002 0 0 0 0 9.8v.1a1 1 0 1 0 2 0v-.1a4.998 4.998 0 0 0 2.75-1.592 1 1 0 1 0-1.5-1.324c-.335.38-.764.674-1.25.845V9.17c.486.172.915.466 1.25.846a1 1 0 1 0 1.5-1.324A4.998 4.998 0 0 0 13 7.1V7Zm-4 5c0-1.306.835-2.417 2-2.83v5.66A3.001 3.001 0 0 1 9 12Z"
      clipRule="evenodd"
    />
  </svg>
)

export default memo(ChipSVG)
