import ChipLabel from "@/app/_components/ChipLabel";
import Avatar from "@/app/_components/Avatar";
import BlindTag from "@/app/_components/BlindTag";
import PokerCard from "@/app/_components/PokerCard";

export default function Opponent({ info, inTurn, flipCard, blindTag }) {
  return (
    <div className="relative grid min-w-[10.25rem] grid-cols-1 grid-rows-[auto_auto] gap-1 text-lg sm:text-base lg:grid-cols-[1fr_auto] lg:grid-rows-[1fr_auto_auto]">
      <div className="relative sm:col-1 sm:row-1 lg:col-1 lg:row-[1/3]">
        <Avatar
          className="h-[5em] w-[4.54em] sm:h-[77px] sm:w-[70px] lg:h-[115.5px] lg:w-[105px]"
          src={info.avatar}
          name={info.name}
        />
        <BlindTag>{blindTag}</BlindTag>
      </div>
      <div
        className={`text-light bg-dark ${inTurn ? "animate-blink" : null} z-10 col-2 row-1 grid items-center self-end rounded-sm border-t-2 text-center text-lg font-bold italic lg:col-auto lg:row-3`}
      >
        {info.name}
      </div>
      <div className="col-2 row-1 grid grid-cols-[1.5rem_1fr] gap-1 px-0.5 text-[0.7em] sm:text-[0.81em] lg:col-2 lg:row-[1/4] lg:grid-cols-[4rem_1fr] lg:text-[0.98em]">
        {info.cards.map((item, index) => (
          <div key={index} className="h-[6.75em] w-[5.5em]">
            <PokerCard key={index} rank={item?.rank} suit={item?.suit} isFacedown={flipCard} />
          </div>
        ))}
      </div>
      <ChipLabel className="col-[1/3] row-2 sm:text-lg lg:col-2 lg:row-[2/4]" chips={info.bets} digits={3}>
        BET
      </ChipLabel>
    </div>
  );
}
