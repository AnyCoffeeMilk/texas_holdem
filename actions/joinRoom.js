"use server";

export async function joinRoom(roomId, name, uuid) {
    const res = await fetch(process.env.HOST_URL + '/api/joinRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId: roomId, name: name, uuid: uuid }),
    });
    if (!res.ok) {
        console.error('failed to join room');
    }
}