export default function PurchaseBtn({ onClick, children }) {
  return (
    <button
      className="container-sm group button-container font-bold rounded-sm p-0.5"
      onClick={onClick}
    >
      <div className="flex-center button flex gap-1 rounded-xs px-3 sm:py-2 text-lg text-[1.5em]">
        {children}
      </div>
    </button>
  )
}
