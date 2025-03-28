"use server";

export async function updateRoom(roomId, playerList) {
    const res = await fetch(process.env.HOST_URL + '/api/updateRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId: roomId, playerList: playerList }),
    });
    if (!res.ok) {
        console.error('failed to update room');
    }
}