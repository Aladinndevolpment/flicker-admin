"use client";
import React, { ReactNode } from "react";

export default function CardPrototype({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      // key={pathName}

      className={`bg-background border-border border px-4 py-6 rounded-2xl shadow-md w-full h-full overflow-x-hidden hover:scale-[101%]  transition-all ${className}`}
    >
      {children}
    </div>
  );
}
