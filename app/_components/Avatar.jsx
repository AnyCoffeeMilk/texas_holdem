import React, { memo, useMemo } from "react";
import Image from "next/image";

function Avatar({ className, src, name }) {
  const avatarSVG = useMemo(
    () =>
      src === undefined ? null : (
        <Image
          className="border-dark bg-light h-full w-full rounded-xs border-2 object-contain py-4"
          src={src}
          draggable={false}
          alt={`Avatar of ${name}`}
        />
      ),
    [src, name],
  );

  return (
    <div
      className={`border-dark flex-center rounded-sm border-2 p-0.5 ${className}`}
    >
      {avatarSVG}
    </div>
  );
}

export default memo(
  Avatar,
  (prevProps, nextProps) =>
    prevProps.className === nextProps.className &&
    prevProps?.src?.src === nextProps?.src?.src &&
    prevProps.name === nextProps.name,
);
