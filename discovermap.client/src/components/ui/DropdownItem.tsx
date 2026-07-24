import type { ReactNode } from "react";

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary" | "danger";
  icon?: ReactNode;
}

const variantStyles: Record<string, string> = {
  default: "text-stone-700 hover:bg-stone-50 active:bg-stone-100",
  primary: "text-stone-900 hover:bg-stone-50 active:bg-stone-100 font-medium",
  danger: "text-red-500 hover:bg-red-50 active:bg-red-100",
};

const DropdownItem = ({ children, onClick, variant = "default", icon }: DropdownItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 text-left text-sm px-3 py-2 rounded-xl transition-colors duration-150 cursor-pointer ${variantStyles[variant]}`}
    >
      {icon && <span className="w-4 h-4 shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default DropdownItem;