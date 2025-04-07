import PurchaseBtn from "./_components/PurchaseBtn";

export default function LoanItem({ price, onPurchase, children }) {
  return (
    <div className="flex items-stretch gap-2">
      <div className="border-dark flex flex-1 items-center gap-4 rounded-sm border-2 px-4 py-2 text-xl font-semibold">
        <span className="max-w-[40%] sm:max-w-none">{children}</span>
        <div className="bg-dark h-[1px] flex-1 rounded-full" />
        <span>${price}</span>
      </div>
      <PurchaseBtn price={0} onClick={onPurchase}>
        <span className="text-base sm:text-xl/[1em]">PURCHASE</span>
      </PurchaseBtn>
    </div>
  );
}
