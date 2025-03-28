"use server";

export async function joinRoom(roomId, playerName) {
    const res = await fetch(process.env.HOST_URL + '/api/joinRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId: roomId, playerName: playerName }),
    });
    if (!res.ok) {
        console.error('failed to join room');
    }
}