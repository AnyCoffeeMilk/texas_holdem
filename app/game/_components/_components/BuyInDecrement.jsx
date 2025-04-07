import { useMemo } from "react";
import decreaseSrc from "@/public/decrease.svg";
import Image from "next/image";

export default function BuyInDecrement({ amount }) {
  const DecreaseSVG = useMemo(
    () => (
      <Image className="h-[1em] w-[1em] object-contain p-0.5" src={decreaseSrc} alt="Down arrow" draggable={false} />
    ),
    []
  );

  return (
    <div className="bg-dark border-light animate-blink text-light absolute right-[0.3125em] bottom-[1.5625em] flex rounded-sm border-[0.125em] pr-0.5 text-[1.25em]/[1em]">
      {DecreaseSVG}
      <div className="font-bold">-${Math.floor(amount)}</div>
    </div>
  );
}
