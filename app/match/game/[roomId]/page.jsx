import OnlineGame from './_components/OnlineGame'

// var joinGameChannel = pusherClient.subscribe('join-game-channel')

export default async function page({ params }) {
  const { roomId } = await params

  return <OnlineGame roomId={roomId} />
}
