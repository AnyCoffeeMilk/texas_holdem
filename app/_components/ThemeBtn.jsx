export default function ThemeBtn({ className, innerClassName, disabled, onClick, children }) {
  return (
    <button
      className={`group button-container flex flex-col rounded-sm p-[3px] font-bold ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className={`button rounded-xs px-5 py-2 flex-1 flex-center ${innerClassName}`}>
        <div className="flex-center animate-pop group-disabled:animate-none">{children}</div>
      </div>
    </button>
  )
}
