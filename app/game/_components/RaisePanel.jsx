import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import PageTitle from "@/app/_components/PageTitle";
import SectionTitle from "@/app/_components/SectionTitle";
import ThemeBtn from "@/app/_components/ThemeBtn";
import RaiseOption from "./_components/RaiseOption";
import ChipLabel from "@/app/_components/ChipLabel";
import Avatar from "@/app/_components/Avatar";
import decreaseSrc from "@/public/decrease.svg";
import downArrowSrc from "@/public/downArrow.svg";

export default function RaisePanel({ playerInfo, minBet, chipPot, onCancel, onConfirm }) {
  const [select, setSelect] = useState(0);
  const containerRef = useRef(null);

  const raiseOptions = useMemo(
    () => [
      { text: "MIN", outlineText: "BET", addBet: minBet },
      { text: "33%", outlineText: "POT", addBet: Math.floor(chipPot * 0.33) },
      { text: "50%", outlineText: "POT", addBet: Math.floor(chipPot * 0.50) },
      { text: "66%", outlineText: "POT", addBet: Math.floor(chipPot * 0.66) },
      { text: "100%", outlineText: "POT", addBet: chipPot },
      { text: "200%", outlineText: "POT", addBet: chipPot * 2 },
      { text: "ALL", outlineText: "IN", addBet: 100 },
    ],
    [minBet, chipPot]
  );

  const DecreaseSVG = useMemo(
    () => (
      <Image className="h-[1em] w-[1em] object-contain p-0.5" src={decreaseSrc} alt="Down arrow" draggable={false} />
    ),
    []
  );

  const DownArrowSVG = useMemo(
    () => <Image className="h-[3em] w-[3em] object-contain" src={downArrowSrc} alt="Down arrow" draggable={false} />,
    []
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onCancel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className="container-md bg-light grid w-full max-w-[480px] gap-2 rounded-sm p-2 sm:w-auto sm:gap-4 sm:p-4"
    >
      <div className="flex items-center justify-center">
        <PageTitle>Raise</PageTitle>
      </div>
      <div className="grid gap-2">
        <SectionTitle>COMMON OPTIONS</SectionTitle>
        <div className="flex flex-col items-center gap-2 rounded-sm border-2 p-2 sm:gap-4 sm:p-4">
          <div className="grid grid-cols-4 gap-2 text-xl sm:grid-cols-5">
            {raiseOptions.map((item, index) => (
              <RaiseOption
                key={index}
                text={item.text}
                outlineText={item.outlineText}
                selected={select === index}
                onSelect={() => setSelect(index)}
              />
            ))}
          </div>
          <ChipLabel className="text-2xl" chips={chipPot} digits={4}>
            POT
          </ChipLabel>
        </div>
      </div>
      <div className="grid gap-2">
        <SectionTitle>Result</SectionTitle>
        <div className="flex gap-2">
          <div className="relative">
            <Avatar
              className="h-[130px] w-[118px] sm:h-[154px] sm:w-[140px] lg:h-[176px] lg:w-[160px]"
              src={playerInfo.avatar}
              name={playerInfo.username}
            />
            <div className="bg-dark border-light text-light absolute bottom-0 m-1 flex w-[calc(100%-0.5rem)] rounded-sm border-2 py-0.5 text-[1.25em]/[1em]">
              <div className="w-full text-center font-bold">$400</div>
            </div>
            <div className="bg-dark border-light text-light absolute right-1 bottom-[1.5em] flex rounded-sm border-2 pr-0.5 text-[1.25em]/[1em]">
              {DecreaseSVG}
              <div className="font-bold">-${raiseOptions[select].addBet}</div>
            </div>
          </div>
          <div className="flex-center flex-1 flex-col">
            <ChipLabel className="text-2xl" chips={playerInfo.bets} digits={4}>
              BET
            </ChipLabel>
            {DownArrowSVG}
            <ChipLabel className="text-2xl" chips={playerInfo.bets + raiseOptions[select].addBet} digits={4}>
              BET
            </ChipLabel>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <ThemeBtn onClick={onCancel} className="flex-1">
          CANCEL
        </ThemeBtn>
        <ThemeBtn onClick={() => onConfirm(playerInfo.bets + raiseOptions[select].addBet)} className="flex-1">
          CONFIRM
        </ThemeBtn>
      </div>
    </div>
  );
}
