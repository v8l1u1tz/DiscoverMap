import type { ReactNode } from "react";

interface PinCardProps {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
}

const PinCard = ({ children, onClick, active = false }: PinCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-1 p-3 rounded-xl border bg-white hover:bg-stone-50 hover:border-stone-400 hover:shadow-sm transition-all duration-150 cursor-pointer ${
        active ? "border-stone-200 border-l-2 border-l-stone-900" : "border-stone-200"
      }`}
    >
      {children}
    </div>
  );
};

export default PinCard;