"use server";

export async function createRoom() {
    let roomId = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 6; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        roomId += characters.charAt(randomInd);
    }

    return roomId;
}