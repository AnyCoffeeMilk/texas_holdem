"use server";

async function pushData(data) {
    const res = await fetch('/api/message', {
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

export {
    pushData
}