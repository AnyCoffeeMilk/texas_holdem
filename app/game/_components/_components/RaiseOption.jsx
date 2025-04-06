export default function RaiseOption({ text, outlineText, selected, onSelect }) {
  const selectedStyle = selected ? "mt-[1px] mr-[2px] mb-[2px] ml-[1px] shadow-xs" : null;
  const longStyle = !text.includes("%") ? "sm:w-full sm:col-span-2" : null;

  return (
    <button
      onClick={onSelect}
      className={`${selectedStyle} group container-sm h-[3.75em] w-[3.75em] ${longStyle} cursor-pointer rounded-sm p-[0.1em] active:mt-[1px] active:mr-[2px] active:mb-[2px] active:ml-[1px] active:shadow-xs`}
    >
      <div
        className={`${selected ? "bg-dark text-light" : null} flex-center group-hover:bg-dark group-hover:text-light h-full flex-col gap-[0.25em] rounded-xs p-[0.25em] font-extrabold`}
      >
        <div className="text-[1.2em]/[1em]">{text}</div>
        <div
          className={`${selected ? "text-stroke-light text-dark" : "text-stroke-dark text-light"} group-hover:text-stroke-light group-hover:text-dark text-[1.1em]/[1em]`}
        >
          {outlineText}
        </div>
      </div>
    </button>
  );
}
