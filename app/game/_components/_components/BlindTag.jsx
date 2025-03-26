export default function BlindTag({ children }) {
  return (
    <div className="border-light absolute top-[-0.3em] left-[-0.4em] rotate-z-[-20deg] rounded-xs border-2">
      <div className="text-light bg-dark rounded-xs px-[0.5em] font-bold">
        {children}
      </div>
    </div>
  )
}
