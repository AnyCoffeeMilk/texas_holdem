'use client'

import { useEffect, useState } from 'react'
import Avatar from '@/app/_components/Avatar'
import ChipLabel from '@/app/_components/ChipLabel'
import EditSVG from '@/app/_svgs/EditSVG'
import ShopSVG from '@/app/_svgs/ShopSVG'
import SettingsSVG from '@/app/_svgs/SettingsSVG'
import OnlineMatchSVG from '@/app/_svgs/OnlineMatchSVG'
import AIMatchSVG from '@/app/_svgs/AIMatchSVG'
import { read_player_profile } from '@/actions/actions'
import ThemeLink from '../_components/ThemeLink'
import GameTitle from './_components/GameTitle'
import PageTitle from '../_components/PageTitle'

export default function Home() {
  const [playerName, setPlayerName] = useState('Loading...')
  const [playerAvatar, setPlayerAvatar] = useState()
  const [playerBank, setPlayerBank] = useState(0)

  useEffect(() => {
    read_player_profile().then(
      ({ player_name, player_avatar, player_bank }) => {
        setPlayerName(player_name)
        setPlayerAvatar(player_avatar)
        setPlayerBank(player_bank)
      }
    )
  }, [])

  return !playerAvatar ? null : (
    <div className="m-1 grid gap-4 sm:m-4 sm:w-auto sm:grid-cols-[auto_1fr] sm:grid-rows-[1fr_auto]">
      <div className="container-md col-1 row-2 grid grid-cols-[auto_1fr] grid-rows-[1fr_auto_auto_auto] gap-2 rounded-sm p-2 sm:col-[1/2] sm:row-[1/3] sm:grid-cols-[1fr_auto] sm:grid-rows-[auto_1fr_auto_auto] sm:p-4">
        <PageTitle className="col-[1/3] row-1 sm:col-1 sm:row-1 justify-center sm:justify-start">PROFILE</PageTitle>
        <div className="col-2 row-4 sm:col-2 sm:row-1">
          <ThemeLink href="/home/profile" className="px-2 py-1">
            Edit <EditSVG />
          </ThemeLink>
        </div>
        <Avatar
          className="col-1 row-[2/5] min-h-full w-[110px] sm:col-[1/3] sm:row-2 sm:h-[240px] sm:min-h-auto sm:w-full md:h-[300px]"
          src={playerAvatar}
          name={playerName}
        />
        <div className="text-light bg-dark col-2 row-2 grid items-center rounded-sm text-center text-[2em] font-bold italic sm:col-[1/3] sm:row-3">
          {playerName}
        </div>
        <ChipLabel
          className="col-2 row-3 text-2xl sm:col-[1/3] sm:row-4"
          chips={playerBank}
          digits={5}
        >
          BANK
        </ChipLabel>
      </div>
      <div className="col-1 row-1 sm:col-[2/3] sm:row-[1/2]">
        <GameTitle />
      </div>
      <div className="col-1 row-3 grid gap-2 sm:col-[2/3] sm:row-[2/3]">
        <ThemeLink href="/match">
          START ONLINE MATCH <OnlineMatchSVG />
        </ThemeLink>
        <ThemeLink href="/match/bots">
          START AI MATCH <AIMatchSVG />
        </ThemeLink>
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <ThemeLink href="/home/shop">
            SHOP <ShopSVG />
          </ThemeLink>
          <ThemeLink href="/home/settings">
            SETTINGS <SettingsSVG />
          </ThemeLink>
        </div>
      </div>
    </div>
  )
}
