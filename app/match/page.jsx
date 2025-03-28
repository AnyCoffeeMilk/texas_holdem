'use client'

import { useEffect, useRef } from 'react'

import Opponent from './bots/_components/Opponent'
import ChipLabel from '../_components/ChipLabel'
import Avatar from '../_components/Avatar'
import ThemeBtn from '../_components/ThemeBtn'
import ThemeLink from '../_components/ThemeLink'
import GoBackSVG from '../_svgs/GoBackSVG'
import SettingsSVG from '../_svgs/SettingsSVG'
import PokerCard from './bots/_components/_components/PokerCard'

import {
  read_player_profile,
  read_opponents_profile,
  get_opponent_action,
  add_bank,
} from '@/actions/actions'
import useGamer from '@/hooks/useGamer'
import useGameTable from '@/hooks/useGameTable'
import useTurnHandler from '@/hooks/useTurnHandler'
import pusherClient from '@/lib/pusher'
import { pushData } from '@/actions/pushData'
import PageTitle from '../_components/PageTitle'

var channel = pusherClient.subscribe('chat-channel')

export default function MatchRoom() {
  const handleClick = () => {
    pushData({ message: 'testing message' })
  }

  useEffect(() => {
    channel.bind('message', (data) => {
      console.log(JSON.stringify(data))
    })
  }, [])

  return (
    <div className="container-md min-w-[500px] grid gap-2 sm:gap-4 rounded-sm p-4">
      <div className="col-1 row-1 flex justify-between lg:col-[1/3]">
        <ThemeLink href="/home" className="px-2 py-1">
          HOME <GoBackSVG />
        </ThemeLink>
        <PageTitle>
          Create Room
        </PageTitle>
      </div>
      
    </div>
  )
}
