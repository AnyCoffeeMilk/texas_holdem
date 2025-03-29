"use server";

import { cookies } from "next/headers";
import BishopSVG from "@/public/avatar/bishop.svg";
import KingSVG from "@/public/avatar/king.svg";
import KnightSVG from "@/public/avatar/knight.svg";
import PawnSVG from "@/public/avatar/pawn.svg";
import QueenSVG from "@/public/avatar/queen.svg";
import RookSVG from "@/public/avatar/rook.svg";
import { randomUUID } from "crypto";

const avatar_dict = {
    'bishop': BishopSVG,
    'king': KingSVG,
    'knight': KnightSVG,
    'pawn': PawnSVG,
    'queen': QueenSVG,
    'rook': RookSVG,
}

async function set_player_profile(name = null, avatar = null, bank = null) {
    const cookieStore = await cookies()

    if (name) {
        cookieStore.set('player_name', name)
    }
    if (avatar) {
        cookieStore.set('player_avatar', Object.keys(avatar_dict).find(key => avatar_dict[key].src === avatar.src))
    }
    if (bank) {
        cookieStore.set('player_bank', Math.min(Math.max(bank, 0), 99999).toString())
    }

    return { name, avatar, bank: Math.min(Math.max(bank, 0), 99999) }
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
    if (!cookieStore.has('player_uuid')) {
        cookieStore.set('player_uuid', randomUUID())
    }

    const player_name = cookieStore.get('player_name').value
    const player_avatar = avatar_dict[cookieStore.get('player_avatar').value]
    const player_bank = parseInt(cookieStore.get('player_bank').value)
    const player_uuid = cookieStore.get('player_uuid').value
    const player_avatar_id = cookieStore.get('player_avatar').value

    return { player_name, player_avatar, player_bank, player_avatar_id, player_uuid }
}

async function add_bank (amount) {
    const cookieStore = await cookies()
    const player_bank = parseInt(cookieStore.get('player_bank').value)
    cookieStore.set('player_bank', Math.min(Math.max(player_bank + amount, 0), 99999).toString())

    return Math.min(Math.max(player_bank + amount, 0), 99999)
}

// TODO
async function read_opponents_profile() {
    return [
        { avatar: PawnSVG, name: 'Pawn', bank: 1000 },
        { avatar: QueenSVG, name: 'Queen', bank: 1000 },
        { avatar: KnightSVG, name: 'Knight', bank: 1000 },
    ]
}

// TODO
async function get_opponent_action() {
    return 0
}

export {
    set_player_profile,
    read_player_profile,
    read_opponents_profile,
    get_opponent_action,
    add_bank
}