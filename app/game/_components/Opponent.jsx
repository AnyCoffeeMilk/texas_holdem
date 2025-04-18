import ChipLabel from "@/app/_components/ChipLabel";
import Avatar from "@/app/_components/Avatar";
import BlindTag from "@/app/_components/BlindTag";
import PokerCard from "@/app/_components/PokerCard";
import { getAvatarById } from "@/utils/getAvatarById";
import PlayerBuyIn from "./_components/PlayerBuyIn";

export default function Opponent({ info, isBlinking, blindTag }) {
  return (
    <div className="relative grid min-w-[10.25rem] grid-cols-1 grid-rows-[auto_auto] gap-1 text-lg sm:text-base lg:grid-cols-[1fr_auto] lg:grid-rows-[1fr_auto_auto]">
      <div className="relative sm:col-1 sm:row-1 lg:col-1 lg:row-[1/3] text-xs lg:text-base">
        <Avatar
          className="h-[78.75px] w-[71.5px] sm:h-[77px] sm:w-[70px] lg:h-[115.5px] lg:w-[105px] [&>img]:pt-[2.5%] [&>img]:pb-[25%]"
          src={getAvatarById(info.avatarId)}
          name={info.username}
        />
        <BlindTag>{blindTag}</BlindTag>
        <PlayerBuyIn buyIn={info.buyIn} />
      </div>
      <div
        className={`text-light bg-dark ${isBlinking ? "animate-blink" : null} border-light z-10 col-2 row-1 grid items-center self-end rounded-sm border-t-2 text-center text-lg font-bold italic lg:col-auto lg:row-3 lg:border-0`}
      >
        {info.username}
      </div>
      <div className="col-2 row-1 grid grid-cols-[1.5rem_1fr] h-[6em] overflow-hidden gap-1 text-[0.7em] px-0.5 sm:text-[0.81em] lg:col-2 lg:row-[1/4] lg:grid-cols-[4rem_1fr] lg:text-[0.98em]">
        {info.cards.map((item, index) => (
          <div key={index} className="h-[calc(100%+0.75em)] w-[5.5em]">
            <PokerCard key={index} rank={item?.rank} suit={item?.suit} />
          </div>
        ))}
      </div>
      <ChipLabel className="col-[1/3] row-2 text-xl lg:col-2 lg:row-[2/4]" chips={info.bets} digits={3}>
        BET
      </ChipLabel>
    </div>
  );
}
