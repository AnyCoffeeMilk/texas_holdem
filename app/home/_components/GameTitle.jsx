export default function GameTitle() {
  return (
    <div className="container-md bg-light flex h-full rounded-sm">
      <div className="bg-dark m-1 flex flex-col flex-1 justify-center rounded-xs p-8">
        <div className="text-light text-6xl/[1em] md:text-7xl/[1em] font-extrabold tracking-widest">
          TEXAS
        </div>
        <div className="text-dark text-stroke-light text-6xl/[1em] md:text-7xl/[1em] font-extrabold tracking-widest">
          HOLD'EM
        </div>
        <div className="text-dark bg-light mt-1 mr-2 rounded-xs pr-1 text-right text-3xl md:text-4xl font-bold">
          ONLINE
        </div>
      </div>
    </div>
  )
}
