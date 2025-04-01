export default function JoinInputBox({ value, onChange }) {
  const handleChange = (e) => {
    if (e.target.value.length <= 6) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="border-dark flex-center rounded-sm border-2 p-8">
      <div className="bg-dark text-light w-[5em] rounded-sm py-[0.1em] text-6xl font-extrabold sm:w-[7em]">
        <input
          className="selection:text-dark selection:bg-light w-full text-center"
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
}
