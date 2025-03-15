"use server";

import { cookies } from "next/headers";
import BishopSVG from "@/public/avatar/bishop.svg";
import KingSVG from "@/public/avatar/king.svg";
import KnightSVG from "@/public/avatar/knight.svg";
import PawnSVG from "@/public/avatar/pawn.svg";
import QueenSVG from "@/public/avatar/queen.svg";
import RookSVG from "@/public/avatar/rook.svg";

const avatar_dict = {
    'bishop': BishopSVG,
    'king': KingSVG,
    'knight': KnightSVG,
    'pawn': PawnSVG,
    'queen': QueenSVG,
    'rook': RookSVG,
}

async function set_player_profile() {
    const cookieStore = await cookies()

    if (!cookieStore.has('player_name')) {
        cookieStore.set('player_name', 'Bishop')
    }
    if (!cookieStore.has('player_avatar')) {
        cookieStore.set('player_avatar', 'bishop')
    }
    if (!cookieStore.has('player_bank')) {
        cookieStore.set('player_bank', '100')
    }
}

async function read_player_profile() {
    const cookieStore = await cookies()

    if (!cookieStore.has('player_name')) {
        cookieStore.set('player_name', 'New Comer')
    }
    if (!cookieStore.has('player_avatar')) {
        cookieStore.set('player_avatar', 'pawn')
    }
    if (!cookieStore.has('player_bank')) {
        cookieStore.set('player_bank', '100')
    }

    const player_name = cookieStore.get('player_name').value
    const player_avatar = avatar_dict[cookieStore.get('player_avatar').value]
    const player_bank = cookieStore.get('player_bank').value

    return { player_name, player_avatar, player_bank }
}

export {
    set_player_profile,
    read_player_profile
}