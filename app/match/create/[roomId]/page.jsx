import ThemeLink from '@/app/_components/ThemeLink'
import GoBackSVG from '@/app/_svgs/GoBackSVG'
import PageTitle from '@/app/_components/PageTitle'

import SectionTitle from '@/app/_components/SectionTitle'
import PlayerListField from './_components/PlayerListField'
import RoomIdField from './_components/RoomIdField'

export default async function Room({ params }) {
  const { roomId } = await params

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
      <RoomIdField roomId={roomId} />
      <SectionTitle>Players</SectionTitle>
      <PlayerListField roomId={roomId} />
    </div>
  )
}
