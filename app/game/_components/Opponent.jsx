import PokerCard from './_components/PokerCard'
import ChipLabel from '@/app/_components/ChipLabel'
import Avatar from '@/app/_components/Avatar'
import BlindTag from './_components/BlindTag'

export default function Opponent({
  inTurn,
  flipCard,
  name,
  avatar,
  cards,
  bets,
  blindTag,
}) {
  return (
    <div className="relative grid min-w-[11.5rem] grid-cols-1 grid-rows-[auto_auto_auto] gap-1 lg:grid-cols-[1fr_auto] lg:grid-rows-[1fr_auto_auto]">
      <div className="relative sm:col-1 sm:row-1 lg:col-1 lg:row-[1/3]">
        <Avatar
          className="h-[77px] w-[70px] lg:h-[115.5px] lg:w-[105px]"
          src={avatar}
          name={name}
        />
        <BlindTag>{blindTag}</BlindTag>
      </div>
      <div
        className={`text-light bg-dark ${inTurn ? 'animate-blink' : null} col-[1/3] row-2 grid items-center rounded-sm text-center text-lg font-bold italic lg:col-auto lg:row-3`}
      >
        {name}
      </div>
      <div className="grid grid-cols-[1.5rem_1fr] gap-1 text-[0.81em] lg:col-2 lg:row-1 lg:flex lg:text-[0.98em]">
        {cards.map((item, index) => (
          <div key={index} className="h-[6.75em] w-[5.5em]">
            <PokerCard
              key={index}
              rank={item?.rank}
              suit={item?.suit}
              isFacedown={flipCard}
            />
          </div>
        ))}
      </div>
      <ChipLabel
        className="col-[1/3] row-3 lg:col-2 lg:row-[2/4] text-lg"
        chips={bets}
        digits={3}
      >
        BETS
      </ChipLabel>
    </div>
  )
}
