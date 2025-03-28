import ThemeLink from '@/app/_components/ThemeLink'
import GoBackSVG from '@/app/_svgs/GoBackSVG'
import PageTitle from '@/app/_components/PageTitle'
import ThemeBtn from '@/app/_components/ThemeBtn'

import pusherClient from '@/lib/pusher'
import { pushData } from '@/actions/pushData'
import SectionTitle from '@/app/_components/SectionTitle'

var channel = pusherClient.subscribe('chat-channel')

const test = [
  'New Comer1',
  'New Comer2',
  'New Comer3',
  'New Comer4',
  'New Comer5',
  'New Comer5',
  'New Comer5',
]

export default async function Room({ params }) {
  const { roomId } = await params

  const handleClick = () => {
    pushData({ message: 'testing message' })
  }

  channel.bind('message', (data) => {
    console.log(JSON.stringify(data))
  })

  return (
    <div className="container-md grid min-w-[600px] gap-2 rounded-sm p-4 sm:gap-4">
      <div className="flex justify-between">
        <ThemeLink href="/match" className="px-2 py-1">
          Match
          <GoBackSVG />
        </ThemeLink>
        <PageTitle>Room</PageTitle>
      </div>
      <SectionTitle>Room Id</SectionTitle>
      <div className="border-dark flex-center rounded-sm border-2 p-8">
        <div className="bg-dark text-light rounded-sm px-[1em] py-[0.1em] text-6xl font-extrabold">
          {roomId}
        </div>
      </div>
      <SectionTitle>Players</SectionTitle>
      <div className="border-dark grid grid-cols-2 grid-flow-col grid-rows-4 rounded-sm border-2 p-4 gap-4">
        {test.map((item, index) => (
          <div key={index} className="text-xl font-extrabold flex">
            <span className='w-[1.5em]'>{index+1}:</span>
            <div className="bg-dark text-light w-[180px] py-[0.1em] rounded-sm text-center">
              {item}
            </div>
          </div>
        ))}
      </div>
      <ThemeLink href="/match/online">Start Game</ThemeLink>
    </div>
  )
}
