'use client'

import { useEffect, useMemo, useState } from 'react'
import { read_player_profile, set_player_profile } from '@/actions/actions'
import ThemeBtn from '@/app/_components/ThemeBtn'
import ThemeLink from '@/app/_components/ThemeLink'
import GoBackSVG from '@/app/_svgs/GoBackSVG'

import BishopSVG from '@/public/avatar/bishop.svg'
import KingSVG from '@/public/avatar/king.svg'
import KnightSVG from '@/public/avatar/knight.svg'
import PawnSVG from '@/public/avatar/pawn.svg'
import QueenSVG from '@/public/avatar/queen.svg'
import RookSVG from '@/public/avatar/rook.svg'
import Avatar from '@/app/_components/Avatar'
import { useRouter } from 'next/navigation'
import PageTitle from '../_components/PageTitle'
import SectionTitle from '../_components/SectionTitle'

const avatar_list = [
  { name: 'bishop', src: BishopSVG },
  { name: 'king', src: KingSVG },
  { name: 'knight', src: KnightSVG },
  { name: 'pawn', src: PawnSVG },
  { name: 'queen', src: QueenSVG },
  { name: 'rook', src: RookSVG },
]

export default function Profile() {
  const [playerName, setPlayerName] = useState('Loading...')
  const [playerAvatar, setPlayerAvatar] = useState()
  const router = useRouter()

  useEffect(() => {
    read_player_profile().then(({ player_name, player_avatar }) => {
      setPlayerName(player_name)
      setPlayerAvatar(player_avatar)
    })
  }, [])

  const handleAvatarClick = (src) => setPlayerAvatar(src)
  const handleSave = () => {
    set_player_profile(playerName, playerAvatar, null).then(() => router.back())
  }
  const handleNameChange = (e) => {
    if (e.target.value.length <= 9) {
      setPlayerName(e.target.value)
    }
  }

  const avatarSVGMap = useMemo(
    () =>
      avatar_list.map((item, index) => (
        <button className=' justify-self-center' key={index} onClick={() => handleAvatarClick(item.src)}>
          <Avatar
            className={`h-[96px] w-[80px] p-0 sm:h-[120px] sm:w-[100px] [&>img]:border-none ${item.src.src === playerAvatar?.src ? '' : 'not-hover:border-light'}`}
            src={item.src}
            name={item.name}
          />
        </button>
      )),
    [playerAvatar]
  )

  return !playerAvatar ? null : (
    <div className="container-md grid gap-2 sm:gap-4 rounded-sm p-4">
      <div className="flex items-center justify-between">
        <ThemeLink href="/home" className="px-2 py-1">
          Home <GoBackSVG />
        </ThemeLink>
        <PageTitle>Edit Profile</PageTitle>
      </div>
      <SectionTitle>Avatar</SectionTitle>
      <div className="grid grid-cols-4 gap-1 sm:gap-2 sm:grid-cols-5 md:grid-cols-6">
        {avatarSVGMap}
      </div>
      <SectionTitle>Username</SectionTitle>
      <div className="border-dark flex-center rounded-sm border-2 py-4 sm:py-8">
        <input
          className="text-light bg-dark selection:text-dark selection:bg-light w-[270px] rounded-sm text-center text-3xl font-bold italic"
          onChange={handleNameChange}
          value={playerName}
        />
      </div>
      <ThemeBtn onClick={handleSave}>Save</ThemeBtn>
    </div>
  )
}
