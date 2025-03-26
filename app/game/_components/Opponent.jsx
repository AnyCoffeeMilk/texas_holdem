import styles from './opponent.module.scss'
import PokerCard from './_components/PokerCard'
import ChipLabel from '@/app/_components/ChipLabel'
import Avatar from '@/app/_components/Avatar'
import BlindTag from './_components/BlindTag'

export default function Opponent({
  flipCard,
  name,
  avatar,
  cards,
  bets,
  blindTag,
}) {
  return (
    <div className="md:container-md relative grid max-w-[130px] flex-1 grid-cols-[1fr] grid-rows-[auto_auto] gap-[0.25em] rounded-sm sm:max-w-none sm:gap-[0.5em] md:grid-cols-[1fr_auto] md:grid-rows-[auto_1fr] md:p-[0.5em]">
      <div className="relative grid grid-cols-[1fr] gap-[0.25em] sm:col-1 sm:row-1 sm:grid-cols-[1fr_130px] sm:grid-rows-[auto_auto] md:col-[1/2] md:row-[1/3] md:grid-cols-none md:grid-rows-none md:gap-[0.5em]">
        <Avatar
          className="h-[5.9em] w-[4.9em] sm:col-1 sm:row-1 sm:h-[81px] sm:w-[70px] md:h-[7.5em] md:w-[6.25em]"
          src={avatar}
          name={name}
        />
        <div className="text-light bg-dark rounded-sm text-center font-bold italic sm:col-[1/3] sm:row-2 md:col-auto md:row-auto md:text-[1.2em]">
          {name}
        </div>
        <BlindTag>{blindTag}</BlindTag>
      </div>
      <div className="absolute top-0 right-0 grid grid-cols-[1.7em_1fr] grid-rows-[1fr] gap-[0.5em] text-[0.95em] md:static md:col-[2/3] md:row-[1/2] md:flex">
        {cards.map((item, index) => (
          <PokerCard
            key={index}
            rank={item?.rank}
            suit={item?.suit}
            isFacedown={flipCard}
          />
        ))}
      </div>
      <ChipLabel className="" chips={bets} digits={3}>
        BETS
      </ChipLabel>
    </div>
  )
}
