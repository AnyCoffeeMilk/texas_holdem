import { memo } from "react";

const AIMatchSVG = () => (
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
      d="M14 2a2 2 0 0 1-1 1.732V4h7a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h7v-.268A2 2 0 1 1 14 2ZM4 6h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm11 5.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 8a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-9 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM4 11.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Zm6.894 5.053a1 1 0 1 0-1.788.894C9.68 18.597 10.982 19 12 19c1.018 0 2.32-.403 2.894-1.553a1 1 0 1 0-1.788-.894c-.092.183-.457.447-1.106.447s-1.014-.264-1.106-.447Z"
      clipRule="evenodd"
    />
  </svg>
);

export default memo(AIMatchSVG);
