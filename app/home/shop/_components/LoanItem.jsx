import PurchaseBtn from "./_components/PurchaseBtn";

export default function LoanItem({ price, onPurchase, children }) {
  return (
    <div className="flex items-stretch gap-2">
      <div className="border-dark flex flex-1 items-center gap-2 rounded-sm border-2 px-4 py-2 text-xl font-semibold">
        <span>{children}</span>
        <span className="font-bold">${price}</span>
      </div>
      <PurchaseBtn price={0} onClick={onPurchase}>
        <span className="text-base sm:text-xl/[1em]">PURCHASE</span>
      </PurchaseBtn>
    </div>
  );
}
