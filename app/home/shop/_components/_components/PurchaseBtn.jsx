export default function PurchaseBtn({ onClick, children }) {
  return (
    <button
      className="container-sm group button-container rounded-sm p-[3px] font-bold"
      onClick={onClick}
    >
      <div className="flex-center button flex gap-1 rounded-[3px] px-3 text-lg text-[1.5em] sm:py-2">
        <div className="flex-center animate-pop">{children}</div>
      </div>
    </button>
  )
}
