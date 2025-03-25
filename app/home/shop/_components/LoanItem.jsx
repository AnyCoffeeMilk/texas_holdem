import styles from './loanItem.module.scss'
import PurchaseSVG from './_components/PurchaseSVG'
import ChipLabel from '@/app/_components/ChipLabel'
import ThemeBtn from '@/app/_components/ThemeBtn'

export default function LoanItem({
  chips,
  digits,
  disabled,
  onPurchase,
  children,
}) {
  return (
    <div className={styles.container}>
      <ChipLabel className="flex-1 mt-0.5 [&>span]:text-stroke-light" chips={chips} digits={digits}>
        {children}
      </ChipLabel>
      <ThemeBtn className={styles.btn} disabled={disabled} onClick={onPurchase}>
        PURCHASE <PurchaseSVG />
      </ThemeBtn>
    </div>
  )
}
