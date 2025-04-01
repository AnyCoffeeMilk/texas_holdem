import { useState } from "react";

export default function CreateOption() {
  const [select, setSelect] = useState(0);

  return (
    <div className="border-dark flex justify-between rounded-sm border-2 px-4 py-2 text-xl font-semibold">
      <span>Maximum Entry Chips</span>
      <div className="space-x-2">
        <span className="space-x-2">
          <span
            className={`${select === 0 ? "underline" : null} cursor-pointer hover:underline`}
            onClick={() => setSelect(0)}
          >
            100
          </span>
          <span>/</span>
        </span>
        <span className="space-x-2">
          <span
            className={`${select === 1 ? "underline" : null} cursor-pointer hover:underline`}
            onClick={() => setSelect(1)}
          >
            200
          </span>
        </span>
      </div>
    </div>
  );
}
