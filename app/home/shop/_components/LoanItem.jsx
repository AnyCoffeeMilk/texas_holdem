import styles from "./loanItem.module.css";
import PurchaseSVG from './_components/PurchaseSVG'
import ChipLabel from '@/app/_components/ChipLabel'
import ThemeBtn from '@/app/_components/ThemeBtn'

export default function LoanItem({ chips, digits, disabled, onPurchase, children }) {
    return (
        <div className={styles.container}>
            <ChipLabel className={styles.label} chips={chips} digits={digits}>
                {children}
            </ChipLabel>
            <ThemeBtn className={styles.btn} disabled={disabled} onClick={onPurchase}>
                PURCHASE <PurchaseSVG />
            </ThemeBtn>
        </div>
    )
}
