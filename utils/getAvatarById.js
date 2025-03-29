import BishopSVG from '@/public/avatar/bishop.svg'
import KingSVG from '@/public/avatar/king.svg'
import KnightSVG from '@/public/avatar/knight.svg'
import PawnSVG from '@/public/avatar/pawn.svg'
import QueenSVG from '@/public/avatar/queen.svg'
import RookSVG from '@/public/avatar/rook.svg'

const avatar_dict = {
  bishop: BishopSVG,
  king: KingSVG,
  knight: KnightSVG,
  pawn: PawnSVG,
  queen: QueenSVG,
  rook: RookSVG,
}

export const getAvatarById = (id) => avatar_dict[id]
