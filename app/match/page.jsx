import ThemeLink from '@/app/_components/ThemeLink'
import GoBackSVG from '@/app/_svgs/GoBackSVG'
import PageTitle from '@/app/_components/PageTitle'
import SectionTitle from '../_components/SectionTitle'
import JoinRoomField from './_components/JoinRoomField'
import CreateRoomField from './_components/CreateRoomField'

export default function MatchRoom() {
  return (
    <div className="container-md grid max-w-[600px] gap-2 rounded-sm p-4 sm:gap-4">
      <div className="flex justify-between">
        <ThemeLink href="/home" className="px-2 py-1">
          HOME <GoBackSVG />
        </ThemeLink>
        <PageTitle>Match</PageTitle>
      </div>
      <SectionTitle>Join Room by Id</SectionTitle>
      <JoinRoomField />
      <SectionTitle>Create A New Room</SectionTitle>
      <CreateRoomField />
    </div>
  )
}
