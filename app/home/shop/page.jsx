'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.scss'
import { read_player_profile, set_player_profile } from '@/actions/actions'
import ThemeLink from '@/app/_components/ThemeLink'
import GoBackSVG from '@/app/_svgs/GoBackSVG'
import ChipLabel from '@/app/_components/ChipLabel'
import LoanItem from './_components/LoanItem'
import PageTitle from '../_components/PageTitle'
import SectionTitle from '../_components/SectionTitle'

const loan_list = [
  { text: 'LOAN A BIT', chips: 50 },
  { text: 'LOAN A LOT', chips: 100 },
  { text: 'BUY ME A COFFEE', chips: -50 },
]

export default function Profile() {
  const [playerBank, setPlayerBank] = useState()
  const [btnDisabled, setBtnDisabled] = useState(false)

  useEffect(() => {
    read_player_profile().then(({ player_bank }) => {
      setPlayerBank(player_bank)
    })
  }, [])

  const handlePurchase = (chips) => {
    setBtnDisabled(true)
    set_player_profile(null, null, playerBank + chips).then(({ bank }) => {
      setPlayerBank(bank)
      setBtnDisabled(false)
    })
  }

  return playerBank === undefined ? null : (
    <div className={styles.container}>
      <div className="flex items-center justify-between">
        <ThemeLink href="/home" className="px-2 py-1">
          HOME <GoBackSVG />
        </ThemeLink>
        <PageTitle>Shop</PageTitle>
      </div>
      <SectionTitle>My Bank</SectionTitle>
      <div className="flex-center border-dark border-2 px-8 py-6 text-3xl">
        <ChipLabel chips={playerBank} digits={5}>
          BANK
        </ChipLabel>
      </div>
      <SectionTitle>Loan</SectionTitle>
      <div className="grid gap-2">
        {loan_list.map((item, index) => (
          <LoanItem
            key={index}
            chips={item.chips}
            digits={item.chips.toString().length}
            disabled={btnDisabled}
            onPurchase={() => handlePurchase(item.chips)}
          >
            {item.text}
          </LoanItem>
        ))}
      </div>
    </div>
  )
}
