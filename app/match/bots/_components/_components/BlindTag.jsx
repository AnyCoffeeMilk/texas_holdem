export default function BlindTag({ children }) {
  return children === null ? null : (
    <div className="border-light absolute top-[-0.15em] right-[-0.2em] sm:right-auto rotate-z-[20deg] rounded-xs border-2 sm:top-[-0.3em] sm:left-[-0.4em] sm:rotate-z-[-20deg]">
      <div className="text-light bg-dark flex-center rounded-xs px-[0.5em] text-xs font-bold sm:text-sm pt-0.5">
        {children}
      </div>
    </div>
  )
}
