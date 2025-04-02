export default function PlayerBlock({ index, username }) {
  return (
    <div className="flex items-center text-xl font-extrabold">
      <span className="w-[1.5em]">{index}:</span>
      <div className="bg-dark text-light w-[180px] rounded-sm py-[0.1em] text-center">
        {username}
      </div>
    </div>
  );
}
