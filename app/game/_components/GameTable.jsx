import ChipLabel from "@/app/_components/ChipLabel";
import PokerCard from "@/app/_components/PokerCard";
import ThemeBtn from "@/app/_components/ThemeBtn";

export default function GameTable({ gameText, onNewRound, centerCards, chipPot, showNewRound }) {
  return (
    <div className="container-sm min-w-[calc(390px-1.5rem)] sm:container-md flex-center relative col-1 row-3 rounded-sm px-2 sm:px-4 lg:col-2 lg:row-2">
      <div className="bg-dark text-light absolute top-4 w-full p-2 text-center text-xl font-bold italic lg:text-2xl">
        {gameText}
      </div>
      <div className="sm:flex-center grid grid-cols-[repeat(4,minmax(0,1fr))_1fr] gap-1 text-xl sm:gap-2 sm:text-lg">
        {centerCards.map((item, index) => (
          <div key={index} className="flex-center h-[6.75em] w-[5.5em]">
            <PokerCard rank={item?.rank} suit={item?.suit} />
          </div>
        ))}
      </div>
      <ChipLabel className="absolute left-2 bottom-2 text-xl" chips={chipPot} digits={4}>
        POT
      </ChipLabel>
      {showNewRound ? (
        <ThemeBtn className="absolute right-2 bottom-2" onClick={onNewRound}>
          NEW ROUND
        </ThemeBtn>
      ) : null}
    </div>
  );
}
