export default function RaiseOption({ text, outlineText, selected, disabled, onSelect }) {
  const selectedStyle = selected ? "mt-[1px] mr-[2px] mb-[2px] ml-[1px] shadow-xs" : null;
  const disabledStyle = disabled ? "mt-[1px] mr-[2px] mb-[2px] ml-[1px] shadow-xs text-stroke-dark text-light" : null;
  const longStyle = text === "ALL" ? "w-[8em] col-span-2 sm:col-[3/5]" : null
  const placeCenter = text === "200%" ? "sm:col-2" : null

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`${selectedStyle} ${disabledStyle} group container-sm h-[3.75em] w-[3.75em] ${longStyle} ${placeCenter} cursor-pointer disabled:cursor-not-allowed rounded-sm p-[0.1em] active:mt-[1px] active:mr-[2px] active:mb-[2px] active:ml-[1px] active:shadow-xs`}
    >
      <div
        className={`${selected ? "bg-dark text-light" : null} flex-center group-hover:bg-dark group-hover:text-light group-disabled:group-hover:bg-light h-full flex-col gap-[0.25em] rounded-xs p-[0.25em] font-extrabold`}
      >
        <div className="text-[1.2em]/[1em]">{text}</div>
        <div
          className={`${selected ? "text-stroke-light text-dark" : "text-stroke-dark text-light"} group-hover:text-stroke-light group-hover:text-dark group-disabled:group-hover:text-stroke-dark group-disabled:group-hover:text-light text-[1.1em]/[1em]`}
        >
          {outlineText}
        </div>
      </div>
    </button>
  );
}
