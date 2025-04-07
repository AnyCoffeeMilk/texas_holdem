import Avatar from "@/app/_components/Avatar";
import ChipLabel from "@/app/_components/ChipLabel";
import PokerCard from "@/app/_components/PokerCard";
import ThemeBtn from "@/app/_components/ThemeBtn";
import PlayerBuyIn from "./_components/PlayerBuyIn";
import BuyInDecrement from "./_components/BuyInDecrement";
import BuyInincrement from "./_components/BuyInincrement";

export default function PlayerArea({ state, onCall, onRaise, onFold }) {
  const topBets = Math.max(...state.opponents.map((item) => item.bets));
  const blinkStyle =
    state.inTurnUUID === state.playerUUID || state.winnerUUIDs.includes(state.playerUUID) ? "animate-blink" : null;
  const buyInDecrement = state.playerUUID === state.bbUUID ? 4 : state.playerUUID === state.sbUUID ? 2 : 0;
  const allInExisted = state.opponents.find((item) => item.buyIn === 0) !== undefined;

  return (
    <div className="sm:container-md col-1 row-4 grid min-w-[calc(390px-1rem)] grid-cols-[auto_minmax(120px,auto)_minmax(120px,1fr)] grid-rows-[auto_1fr_auto] gap-1 rounded-sm p-0 sm:grid-cols-[auto_200px_1fr] sm:gap-2 sm:p-4 lg:col-2 lg:row-3">
      <div className="relative col-1 row-[1/4] text-base">
        <Avatar
          className="h-[130px] w-[118px] sm:h-[154px] sm:w-[140px] lg:h-[176px] lg:w-[160px] [&>img]:pt-[2.5%] [&>img]:pb-[15%]"
          src={state.playerAvatar}
          name={state.playerName}
        />
        <div className="text-light bg-dark border-light absolute -top-1 -left-2 rotate-z-[-20deg] rounded-sm border-2 px-2 font-bold">
          {state.sbUUID === state.playerUUID ? "SB" : state.bbUUID === state.playerUUID ? "BB" : null}
        </div>
        <PlayerBuyIn buyIn={state.playerBuyIn} />
        {state.reward > 0 ? <BuyInincrement amount={state.reward} /> : null}
        {state.showBuyInDecrement && buyInDecrement > 0 ? <BuyInDecrement amount={buyInDecrement} /> : null}
      </div>
      <div
        className={`bg-dark text-light ${blinkStyle} border-light z-10 col-2 row-3 self-end rounded-sm border-t-2 py-0.5 text-center text-xl font-bold sm:text-2xl`}
      >
        {state.playerName}
      </div>
      <div className="col-2 row-[2/4] grid grid-cols-[minmax(0,1fr)_1fr] gap-1 px-1 sm:row-[1/4] sm:gap-2">
        {state.playerCards.map((item, index) => (
          <div key={index} className="h-[95px] w-[80px] text-lg sm:h-[135px] sm:w-[115px] sm:text-2xl">
            <PokerCard rank={item?.rank} suit={item?.suit} />
          </div>
        ))}
      </div>
      <div className="col-3 row-[1/4] grid gap-1 text-[1.1em] sm:row-[2/4] sm:grid-cols-2 sm:gap-2 sm:text-xl">
        <ThemeBtn
          onClick={onRaise}
          className="sm:col-[1/3] sm:row-1 [&>div]:py-0"
          disabled={state.disableAction || allInExisted}
        >
          RAISE
        </ThemeBtn>
        <ThemeBtn onClick={onCall} className="sm:col-1 sm:row-2 [&>div]:py-0" disabled={state.disableAction}>
          {state.playerBets < topBets ? "CALL" : "CHECK"}
        </ThemeBtn>
        <ThemeBtn onClick={onFold} className="sm:col-2 sm:row-2 [&>div]:py-0" disabled={state.disableAction}>
          FOLD
        </ThemeBtn>
      </div>
      <ChipLabel className="col-2 row-1 text-lg sm:col-3 sm:text-2xl" chips={state.playerBets} digits={3}>
        BET
      </ChipLabel>
    </div>
  );
}
