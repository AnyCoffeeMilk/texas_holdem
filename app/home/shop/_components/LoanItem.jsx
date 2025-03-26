import ChipLabel from '@/app/_components/ChipLabel'
import PurchaseBtn from './_components/PurchaseBtn'
import ChipSVG from '@/app/_svgs/ChipSVG'

export default function LoanItem({ chips, digits, onPurchase, children }) {
  return (
    <div className="flex items-stretch gap-2">
      <ChipLabel
        className="[&>span]:text-light [&>span]:text-sm flex-1 sm:[&>div>div]:text-2xl sm:[&>span]:text-lg"
        chips={chips}
        digits={digits}
      >
        {children}
      </ChipLabel>
      <PurchaseBtn price={0} onClick={onPurchase}>
        <ChipSVG />
        <span className="sm:text-2xl/[1em]">-0</span>
      </PurchaseBtn>
    </div>
  )
}
