import { memo } from "react";

const PurchaseSVG = () => (
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
      d="M12 3a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3Zm5 3A5 5 0 1 0 7 6H5.105a2 2 0 0 0-1.99 2.199l.875 8.752-.731 3.657A2 2 0 0 0 5.219 23H18.78a2 2 0 0 0 1.961-2.392l-.731-3.657.875-8.752A2 2 0 0 0 18.895 6H17ZM8 8H5.105l.89 8.9.015.15-.03.146L5.22 21h13.56l-.76-3.804-.03-.147.015-.148.89-8.901.995.1-.995-.1H8Zm-1 9a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
      clipRule="evenodd"
    />
  </svg>
);

export default memo(PurchaseSVG);
