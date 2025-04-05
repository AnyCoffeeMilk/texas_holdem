import Avatar from "@/app/_components/Avatar";
import ChipLabel from "@/app/_components/ChipLabel";
import PokerCard from "@/app/_components/PokerCard";
import ThemeBtn from "@/app/_components/ThemeBtn";

export default function PlayerArea({ state, onCall, onRaise, onFold }) {
  return (
    <div className="sm:container-md col-1 row-4 grid grid-cols-[auto_minmax(130px,auto)_minmax(110px,1fr)] grid-rows-[auto_1fr_auto] gap-1 rounded-sm p-0 sm:grid-cols-[auto_1fr_minmax(100px,1fr)] sm:gap-2 sm:p-4 lg:col-2 lg:row-3">
      <div className="relative col-1 row-[1/3]">
        <Avatar
          className="h-[110px] w-[100px] sm:h-[132px] sm:w-[120px] lg:h-[143px] lg:w-[130px]"
          src={state.playerAvatar}
          name={state.playerName}
        />
        <div className="text-light bg-dark border-light absolute -top-1 -left-2 rotate-z-[-20deg] rounded-sm border-2 px-2 font-bold">
          {state.sbUUID === state.playerUUID ? "SB" : state.bbUUID === state.playerUUID ? "BB" : null}
        </div>
      </div>
      <div
        className={`bg-dark text-light ${state.inTurnUUID === state.playerUUID || state.winnerUUIDs.includes(state.playerUUID) ? "animate-blink" : null} col-1 row-3 rounded-sm py-0.5 text-center text-base font-bold sm:text-xl`}
      >
        {state.playerName}
      </div>
      <div className="col-2 row-[2/4] grid grid-cols-[minmax(0,1fr)_1fr] gap-1 sm:grid-cols-2 sm:gap-2">
        {state.playerCards.map((item, index) => (
          <div key={index} className="flex-center h-[105px] w-[85px] text-xl sm:h-full sm:w-full sm:place-self-center">
            <PokerCard rank={item?.rank} suit={item?.suit} />
          </div>
        ))}
      </div>
      <div className="col-3 row-[1/4] grid gap-2 sm:text-lg">
        <ThemeBtn onClick={onCall} className="[&>div]:py-0" disabled={state.disableAction}>
          CHECK
        </ThemeBtn>
        <ThemeBtn onClick={onRaise} className="[&>div]:py-0" disabled={state.disableAction}>
          RAISE
        </ThemeBtn>
        <ThemeBtn onClick={onFold} className="[&>div]:py-0" disabled={state.disableAction}>
          FOLD
        </ThemeBtn>
      </div>
      <ChipLabel className="col-2 row-1 text-base sm:text-xl [&>span]:px-1" chips={state.playerBets} digits={3}>
        BET
      </ChipLabel>
    </div>
  );
}
