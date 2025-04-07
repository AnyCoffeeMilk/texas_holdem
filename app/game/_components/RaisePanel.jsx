import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import PageTitle from "@/app/_components/PageTitle";
import SectionTitle from "@/app/_components/SectionTitle";
import ThemeBtn from "@/app/_components/ThemeBtn";
import RaiseOption from "./_components/RaiseOption";
import ChipLabel from "@/app/_components/ChipLabel";
import Avatar from "@/app/_components/Avatar";
import downArrowSrc from "@/public/downArrow.svg";
import BuyInDecrement from "./_components/BuyInDecrement";
import PlayerBuyIn from "./_components/PlayerBuyIn";
import AjustmentBtn from "./_components/AjustmentBtn";

const delay = 500;

export default function RaisePanel({ playerInfo, minBet, chipPot, onCancel, onConfirm }) {
  const [select, setSelect] = useState(0);
  const [newBet, setNewBet] = useState(playerInfo.bets + minBet);
  const containerRef = useRef(null);
  const changeTimer = useRef(null);

  const raiseOptions = useMemo(
    () => [
      { text: "MIN", outlineText: "BET", addBet: minBet },
      { text: "33%", outlineText: "POT", addBet: Math.floor(chipPot * 0.33) },
      { text: "50%", outlineText: "POT", addBet: Math.floor(chipPot * 0.5) },
      { text: "66%", outlineText: "POT", addBet: Math.floor(chipPot * 0.66) },
      { text: "100%", outlineText: "POT", addBet: chipPot },
      { text: "200%", outlineText: "POT", addBet: chipPot * 2 },
      { text: "ALL", outlineText: "IN", addBet: playerInfo.buyIn },
    ],
    [minBet, chipPot]
  );

  const DownArrowSVG = useMemo(
    () => (
      <Image className="h-[2.5em] w-[2.5em] object-contain" src={downArrowSrc} alt="Down arrow" draggable={false} />
    ),
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

  function onMouseDown(amount) {
    const startPress = Date.now();
    setNewBet((cur) => cur + amount);
    setSelect(null);
    let counter = newBet + amount;
    changeTimer.current = setInterval(() => {
      if (amount + counter >= playerInfo.bets + minBet) {
        if (amount + counter <= playerInfo.buyIn) {
          if (Date.now() - startPress > delay) {
            counter += amount;
            setNewBet((cur) => cur + amount);
            setSelect(null);
          }
        } else {
          clearInterval(changeTimer.current);
          setNewBet(playerInfo.bets + playerInfo.buyIn);
          setSelect(raiseOptions.length - 1);
        }
      } else {
        clearInterval(changeTimer.current);
        setNewBet(playerInfo.bets + minBet);
        setSelect(0);
      }
    }, 35);
  }

  function onMouseUp() {
    clearInterval(changeTimer.current);
  }

  return (
    <div
      ref={containerRef}
      className="container-md bg-light grid w-full max-w-[480px] gap-2 rounded-sm p-2 sm:w-auto sm:max-w-none sm:gap-4 sm:p-4"
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
                disabled={item.addBet < minBet}
                onSelect={() => {
                  setSelect(index);
                  setNewBet(playerInfo.bets + raiseOptions[index].addBet);
                }}
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
        <div className="flex justify-around">
          <div className="relative h-[154px] w-[140px] lg:h-[176px] lg:w-[160px]">
            <Avatar className="h-full w-full" src={playerInfo.avatar} name={playerInfo.username} />
            <PlayerBuyIn buyIn={playerInfo.buyIn} />
            <BuyInDecrement amount={newBet - playerInfo.bets} />
          </div>
          <div className="flex-center flex-col">
            <ChipLabel className="text-2xl" chips={playerInfo.bets} digits={4}>
              BET
            </ChipLabel>
            {DownArrowSVG}
            <ChipLabel className="text-2xl" chips={newBet} digits={4}>
              BET
            </ChipLabel>
            <div className="mt-2 flex items-center gap-2 text-xl font-bold">
              <span>AJUSTMENT:</span>
              <AjustmentBtn
                text="-"
                disabled={select === 0}
                onMouseDown={() => onMouseDown(-1)}
                onMouseUp={() => onMouseUp()}
              />
              <AjustmentBtn
                text="+"
                disabled={select === raiseOptions.length - 1}
                onMouseDown={() => onMouseDown(1)}
                onMouseUp={() => onMouseUp()}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <ThemeBtn onClick={onCancel} className="flex-1">
          CANCEL
        </ThemeBtn>
        <ThemeBtn onClick={() => onConfirm(newBet - playerInfo.bets)} className="flex-1">
          CONFIRM
        </ThemeBtn>
      </div>
    </div>
  );
}
