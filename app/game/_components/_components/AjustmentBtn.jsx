export default function AjustmentBtn({ disabled, onMouseDown, onMouseUp, text }) {
  const disabledStyle = disabled ? "mt-[1px] mr-[2px] mb-[2px] ml-[1px] shadow-xs text-stroke-dark text-light" : null;

  return (
    <button
      disabled={disabled}
      onDrag={onMouseDown}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={`${disabledStyle} container-sm group h-[1.25em] w-[1.25em] flex-1 cursor-pointer disabled:cursor-not-allowed rounded-sm p-[0.1em] text-2xl/[1em] font-bold active:mt-[1px] active:mr-[2px] active:mb-[2px] active:ml-[1px] active:shadow-xs`}
    >
      <div className="group-hover:bg-dark group-hover:text-light group-disabled:group-hover:bg-light rounded-xs">
        {text}
      </div>
    </button>
  );
}
