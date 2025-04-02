import { isRoomIdValid, isAlphaNumeric } from "@/utils/roomIdHandler";
import { useRef, useState } from "react";

export default function JoinInputBox({ value, onChange }) {
  const [isPasted, setCopied] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const timeoutRef = useRef();
  const inputRef = useRef();

  const handleClick = () => {
    clearTimeout(timeoutRef.current);
    navigator.clipboard.readText().then((text) => {
      console.log(isRoomIdValid(text));
      if (isRoomIdValid(text)) {
        onChange(text);
        setCopied(true);
        timeoutRef.current = setTimeout(() => setCopied(false), 2000);
      } else {
        setInvalid(true);
        timeoutRef.current = setTimeout(() => setInvalid(false), 2000);
      }
    });
  };

  const handleChange = (e) => {
    let text = e.target.value;
    if (isAlphaNumeric(text) && text.length <= 6) {
      onChange(text);
    }
  };

  return (
    <div className="border-dark flex-center relative flex-col gap-2 rounded-sm border-2 px-4 pt-4 pb-[4em] sm:px-16 sm:pt-8">
      <div
        className="bg-dark text-light z-10 cursor-text rounded-sm px-[1em] py-[0.1em] text-6xl font-extrabold"
        onClick={() => inputRef.current.focus()}
      >
        <input
          ref={inputRef}
          className="selection:text-dark selection:bg-light w-full text-center"
          onChange={handleChange}
          value={value}
        />
      </div>
      <div
        onClick={handleClick}
        className="group absolute h-full w-full top-0 cursor-pointer flex justify-center items-end pb-[2em]"
      >
        <div className="font-semibold group-hover:underline">
          {isInvalid
            ? "Not a Room Id!"
            : isPasted
              ? "Pasted from Clipboard!"
              : "Click to Paste from Clipboard"}
        </div>
      </div>
    </div>
  );
}
