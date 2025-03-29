import OnlineGame from './_components/OnlineGame'

export default async function page({ params }) {
  const { roomId } = await params

  return <OnlineGame roomId={roomId} />
}
