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
    <div className="relative grid max-w-[130px] grid-cols-1 grid-rows-[auto_auto_auto] gap-1 sm:max-w-none lg:grid-cols-[1fr_auto] lg:grid-rows-[1fr_auto_auto]">
      <div className="relative sm:col-1 sm:row-1 lg:col-1 lg:row-[1/3]">
        <Avatar
          className="h-[5.9em] w-[4.9em] sm:col-1 sm:row-1 sm:h-[81px] sm:w-[70px] lg:h-[110px] lg:w-[100px]"
          src={avatar}
          name={name}
        />
        <BlindTag>{blindTag}</BlindTag>
      </div>
      <div
        className={`text-light bg-dark ${inTurn ? 'animate-blink' : null} grid items-center rounded-sm text-center text-lg font-bold italic sm:col-[1/3] sm:row-2 lg:col-auto lg:row-3`}
      >
        {name}
      </div>
      <div className="grid grid-cols-[1em_1fr] grid-rows-[1fr] gap-1 text-[0.85em] lg:col-2 lg:row-1 lg:flex lg:text-[0.95em]">
        {cards.map((item, index) => (
          <PokerCard
            key={index}
            rank={item?.rank}
            suit={item?.suit}
            isFacedown={flipCard}
          />
        ))}
      </div>
      <ChipLabel className="col-[1/3] row-3 lg:col-2 lg:row-[2/4]" chips={bets} digits={3}>
        BETS
      </ChipLabel>
    </div>
  )
}
