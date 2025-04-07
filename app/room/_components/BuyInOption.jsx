export default function BuyInOption({ selected, onSelect }) {
  return (
    <div className="border-dark flex items-center gap-4 rounded-sm border-2 px-4 py-2 text-xl font-semibold">
      <span>Maximum Buy-in</span>
      <div className="bg-dark h-[1px] flex-1 rounded-full" />
      <div className="space-x-2">
        <span className="space-x-2">
          <span
            className={`${selected === 100 ? "underline" : null} cursor-pointer hover:underline`}
            onClick={() => onSelect(100)}
          >
            $100
          </span>
          <span>/</span>
        </span>
        <span className="space-x-2">
          <span
            className={`${selected === 200 ? "underline" : null} cursor-pointer hover:underline`}
            onClick={() => onSelect(200)}
          >
            $200
          </span>
        </span>
      </div>
    </div>
  );
}
