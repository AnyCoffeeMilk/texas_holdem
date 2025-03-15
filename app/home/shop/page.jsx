'use client'

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import { read_player_profile, set_player_profile } from "@/actions/actions";
import ThemeLink from "@/app/_components/ThemeLink";
import GoBackSVG from "@/app/_components/GoBackSVG";
import ChipLabel from "@/app/_components/ChipLabel";
import LoanItem from "./_components/LoanItem";

const loan_list = [
    { text: 'LOAN A BIT', chips: 50 },
    { text: 'LOAN A LOT', chips: 100 },
    { text: 'BUY ME A COFFEE', chips: -50 },
]

export default function Profile() {
    const [playerBank, setPlayerBank] = useState()
    const [btnDisabled, setBtnDisabled] = useState(false)

    useEffect(() => {
        read_player_profile()
            .then(({ player_bank }) => {
                console.log(player_bank)
                setPlayerBank(player_bank)
            })
    }, [])

    const handlePurchase = (chips) => {
        setBtnDisabled(true)
        set_player_profile(null, null, playerBank + chips)
            .then(({ bank }) => {
                setPlayerBank(bank)
                setBtnDisabled(false)
            })
    }

    const loanItemMap = loan_list.map((item, index) => (
        <LoanItem
            key={index}
            chips={item.chips}
            digits={item.chips.toString().length}
            disabled={btnDisabled}
            onPurchase={() => handlePurchase(item.chips)}
        >
            {item.text}
        </LoanItem>
    ))

    return playerBank === undefined ? null : (
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.headerArea}>
                    <ThemeLink href="/home" className={styles.goback}>
                        HOME <GoBackSVG />
                    </ThemeLink>
                    <div className={styles.headerText}>
                        SHOP
                    </div>
                </div>
                <div className={styles.subTitleText}>
                    MY BANK
                </div>
                <div className={styles.bankArea}>
                    <ChipLabel className={styles.playerBank} chips={playerBank} digits={5}>
                        BANK
                    </ChipLabel>
                </div>
                <div className={styles.subTitleText}>
                    LOAN
                </div>
                <div className={styles.shopArea}>
                    {loanItemMap}
                </div>
            </div>
        </main >
    );
}
