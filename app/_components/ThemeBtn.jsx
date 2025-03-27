export default function ThemeBtn({ className, disabled, onClick, children }) {
  return (
    <button
      className={`group button-container flex flex-col rounded-sm p-[3px] font-bold ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="button rounded-xs px-5 py-2 flex-1 flex-center">
        <div className="flex-center animate-pop group-disabled:animate-none">{children}</div>
      </div>
    </button>
  )
}
