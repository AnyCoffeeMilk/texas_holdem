import React, { memo } from "react";
import Link from "next/link";

const ThemeLink = ({ className, href, children }) => (
  <Link
    className="container-sm group rounded-sm p-0.5"
    draggable={false}
    href={href}
  >
    <div
      className={`flex-center active:bg-dark active:text-light gap-1 rounded-xs p-2 text-lg font-bold group-hover:underline ${className} `}
    >
      {children}
    </div>
  </Link>
);

export default memo(
  ThemeLink,
  (prevProps, nextProps) =>
    prevProps.className === nextProps.className &&
    prevProps.href === nextProps.href,
);
