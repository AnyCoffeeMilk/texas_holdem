import { NextResponse } from 'next/server'
import Pusher from 'pusher'

const pusher = new Pusher({
	appId: process.env.PUSHER_APP_ID,
	key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
	secret: process.env.PUSHER_APP_SECRET,
	cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
	useTLS: true,
})

export async function POST(request) {
	const { roomId, playerName } = await request.json()

	await pusher.trigger('join-room-channel', roomId, {
		playerName,
	})

	return NextResponse.json({ success: true })
}