import ThemeLink from '@/app/_components/ThemeLink'
import GoBackSVG from '@/app/_svgs/GoBackSVG'
import PageTitle from '@/app/_components/PageTitle'

import SectionTitle from '@/app/_components/SectionTitle'
import PlayerListField from './_components/PlayerListField'

export default async function Room({ params }) {
  const { roomId } = await params

  return (
    <div className="container-md flex-1 grid max-w-[600px] gap-2 rounded-sm p-4 sm:gap-4">
      <div className="flex justify-between">
        <ThemeLink href="/match" className="px-2 py-1">
          Match
          <GoBackSVG />
        </ThemeLink>
        <PageTitle>Room</PageTitle>
      </div>
      <SectionTitle>Room Id</SectionTitle>
      <div className="border-dark flex-center rounded-sm border-2 p-4 sm:p-8">
        <div className="bg-dark text-light rounded-sm px-[1em] py-[0.1em] text-6xl font-extrabold">
          {roomId}
        </div>
      </div>
      <SectionTitle>Players</SectionTitle>
      <PlayerListField roomId={roomId} />
    </div>
  )
}
