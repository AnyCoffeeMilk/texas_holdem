export default function ThemeBtn({ className, disabled, onClick, children }) {
  return (
    <button
      className={`container-sm group button-container rounded-sm p-0.5 font-bold ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="rounded-xs button px-5 py-2">
        <div className="flex-center">{children}</div>
      </div>
    </button>
  )
}
