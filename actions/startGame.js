"use server";

export async function startGame(roomId) {
    const res = await fetch(process.env.HOST_URL + '/api/startGame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId: roomId }),
    });
    if (!res.ok) {
        console.error('failed to start game.');
    }
}