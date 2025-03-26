import ChipLabel from '@/app/_components/ChipLabel'
import PurchaseBtn from './_components/PurchaseBtn'
import ChipSVG from '@/app/_svgs/ChipSVG'

export default function LoanItem({ chips, digits, onPurchase, children }) {
  return (
    <div className="flex items-stretch gap-2">
      <ChipLabel
        className="[&>span]:text-light [&>span]:font-extralight flex-1 text-lg"
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
