"use server";

export async function updatePlayers(roomId, playerList) {
    const res = await fetch(process.env.HOST_URL + '/api/updatePlayers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId: roomId, playerList: playerList }),
    });
    if (!res.ok) {
        console.error('failed to update players');
    }
}