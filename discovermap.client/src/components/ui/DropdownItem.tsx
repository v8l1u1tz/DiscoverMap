import type { ReactNode } from "react";

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary" | "danger";
}

const variantStyles: Record<string, string> = {
  default: "text-stone-700 hover:bg-stone-50",
  primary: "text-emerald-600 hover:bg-emerald-50 font-medium",
  danger: "text-red-500 hover:bg-red-50",
};

const DropdownItem = ({ children, onClick, variant = "default" }: DropdownItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors duration-150 ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
};

export default DropdownItem;