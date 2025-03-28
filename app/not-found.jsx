import ThemeLink from '@/app/_components/ThemeLink'
import GoBackSVG from '@/app/_svgs/GoBackSVG'

export default function NotFound() {
  return (
    <div className="grid rounded-sm gap-8">
      <div className="text-center text-6xl font-extrabold uppercase">
        Not Found
      </div>
      <div className="text-center text-xl font-semibold">
        Bro Why you come here.
      </div>
      <ThemeLink href="/home" className="px-2 py-1">
        Back to Home
        <GoBackSVG />
      </ThemeLink>
    </div>
  )
}
