import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white border border-stone-200 rounded-2xl p-8 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}