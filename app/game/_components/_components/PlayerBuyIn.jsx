export default function PlayerBuyIn({ buyIn }) {
  return (
    <div className="bg-dark border-light text-light absolute bottom-0 m-[0.3125em] flex w-[calc(100%-0.625em)] rounded-sm border-[0.125em] py-[0.2em] text-[1.25em]/[0.7em]">
      <span className="w-full text-center font-bold">${Math.floor(buyIn)}</span>
    </div>
  );
}
