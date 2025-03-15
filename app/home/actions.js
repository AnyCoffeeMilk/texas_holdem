"use server";

import { cookies } from "next/headers";

async function set_player_profile() {
    const cookieStore = await cookies()

    if (!cookieStore.has('player_name')) {
        cookieStore.set('player_name', 'Bishop')
    }

    if (!cookieStore.has('player_avatar')) {
        cookieStore.set('player_avatar', 'bishop')
    }
    return 0
}

async function read_player_profile() {
    const cookieStore = await cookies()
    const player_name = cookieStore.get('player_name').value
    const player_avatar = cookieStore.get('player_avatar').value

    return { player_name, player_avatar }
}

export {
    set_player_profile,
    read_player_profile
}