import { memo } from "react"

const ShopSVG = () => (
    <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" fill="#2b1e1a" stroke="#2b1e1a" strokeWidth={1} viewBox="0 0 24 24">
        <path
            fillRule="evenodd"
            d="M12 4a3.556 3.556 0 0 0-3.389 2.48L7.811 9h8.378l-.8-2.52A3.556 3.556 0 0 0 12 4Zm6.287 5-.992-3.125a5.555 5.555 0 0 0-10.59 0L5.713 9H3.348a2 2 0 0 0-1.914 2.58l1.124 3.71 1.388 4.58A3 3 0 0 0 6.817 22h10.366a3 3 0 0 0 2.87-2.13l1.389-4.58 1.124-3.71A2 2 0 0 0 20.652 9h-2.365ZM6.444 11H3.348l.909 3h3.78l-.41-3H6.444Zm3.202 0 .409 3h3.89l.41-3h-4.71Zm6.727 0-.41 3h3.78l.909-3h-4.279Zm2.764 5H15.69l-.545 4h2.037a1 1 0 0 0 .957-.71l.997-3.29Zm-6.01 4 .545-4h-3.345l.546 4h2.254Zm-4.273 0-.545-4H4.863l.997 3.29a1 1 0 0 0 .957.71h2.037Z"
            clipRule="evenodd"
        />
    </svg>
)

export default memo(ShopSVG)