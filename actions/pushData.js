"use server";

export async function pushData(data) {
    const res = await fetch(process.env.HOST_URL + '/api/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        console.error('failed to push data');
    }
}