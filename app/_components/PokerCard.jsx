import React, { memo, useMemo } from "react";
import Image from "next/image";
import IconSVG from "@/public/icon.svg";

function PokerCard({ rank, suit, isFacedown }) {
  const container_style = isFacedown || suit === "X" ? { transform: "rotateY(180deg)" } : null;

  const iconSVG = useMemo(
    () => (
      <Image
        className="border-light h-[1.5em] w-[1.5em] -rotate-45 rounded-md border-2 object-contain p-[1px]"
        src={IconSVG}
        alt="Icon of the Poker Card"
        draggable={false}
      />
    ),
    []
  );

  return rank === undefined ? (
    <div className="border-dark bg-light h-full w-full rounded-sm border-2" />
  ) : (
    <div className="h-full w-full bg-transparent perspective-[1000px]">
      <div className="h-full w-full transition-transform duration-500 transform-3d" style={container_style}>
        <div className="bg-light border-dark absolute flex h-full w-full justify-stretch rounded-sm border-2 backface-hidden">
          <div className="text-light bg-dark m-[0.185em] flex flex-1 flex-col items-start rounded-xs p-[0.5em] text-[1.2em]/[1em] font-bold">
            <div>{rank}</div>
            <div className="font-sans">{suit}</div>
          </div>
        </div>
        <div className="bg-light border-dark absolute flex h-full w-full rotate-y-180 rounded-sm border-2 backface-hidden">
          <div className="flex-center bg-dark m-[0.185em] flex-1 rounded-xs">{iconSVG}</div>
        </div>
      </div>
    </div>
  );
}

export default memo(
  PokerCard,
  (prevProps, nextProps) =>
    prevProps.rank === nextProps.rank &&
    prevProps.suit === nextProps.suit &&
    prevProps.isFacedown === nextProps.isFacedown
);
