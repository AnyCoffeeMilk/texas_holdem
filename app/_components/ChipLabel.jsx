import { memo } from 'react'
import ChipSVG from '../_svgs/ChipSVG'

function ChipLabel({ className, chips, digits, children }) {
  return (
    <div className={`bg-dark flex rounded-sm p-1 font-bold ${className}`}>
      <span className="text-dark text-stroke-light grid flex-1 items-center px-2 text-center text-[1.1em] tracking-widest">
        {children}
      </span>
      <div className="bg-light text-dark flex items-center gap-1 rounded-xs px-1 py-1 text-[1.3em]">
        <ChipSVG />
        <div className="flex flex-1 gap-0.5">
          {chips
            .toString()
            .padStart(digits, '0')
            .split('')
            .map((digit, index) => (
              <div
                className="bg-dark text-light w-[0.8em] text-[1em] flex-1 rounded-xs text-center text-[1em]/[1em]"
                key={index}
              >
                {digit}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default memo(
  ChipLabel,
  (prevProps, nextProps) =>
    prevProps.className === nextProps.className &&
    prevProps.chips === nextProps.chips &&
    prevProps.digits === nextProps.digits &&
    prevProps.children === nextProps.children
)
