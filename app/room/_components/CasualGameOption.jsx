import { useState } from "react";

export default function CasualGameOption() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="border-dark grid gap-2 rounded-sm border-2 p-4">
      <div className="flex items-center gap-4 text-xl/[1em] font-semibold">
        <span>Casual Game Room</span>
        <div className="bg-dark h-[1px] flex-1 rounded-full" />
        <button
          onClick={() => setChecked((cur) => !cur)}
          className="border-dark h-[1em] w-[1em] cursor-pointer rounded-sm border-2"
        >
          {checked ? <span className="flex-center bg-dark text-light h-full w-full text-[0.75em]">✓</span> : ""}
        </button>
      </div>
      <div className="text-base/[1em]">
        Join for free, receive play chips, and enjoy risk-free poker. No real rewards or losses.
      </div>
    </div>
  );
}
