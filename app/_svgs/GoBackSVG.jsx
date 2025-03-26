import { memo } from 'react'

const GoBackSVG = () => (
  <svg
    width="1.2em"
    height="1.2em"
    xmlns="http://www.w3.org/2000/svg"
    fill="#2b1e1a"
    stroke="#2b1e1a"
    strokeWidth={1}
    viewBox="0 -1 24 24"
  >
    <path
      fillRule="evenodd"
      d="M10.707 4.293a1 1 0 0 1 0 1.414L8.414 8H13.5a5.5 5.5 0 1 1 0 11H11a1 1 0 1 1 0-2h2.5a3.5 3.5 0 1 0 0-7H8.414l2.293 2.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0Z"
      clipRule="evenodd"
    />
  </svg>
)

export default memo(GoBackSVG)
