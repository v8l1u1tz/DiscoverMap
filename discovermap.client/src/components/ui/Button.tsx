import type { ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    ariaLabel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white",
    ghost: "text-stone-500 hover:text-stone-800",
    outline: "border border-stone-200 bg-white hover:bg-stone-50 text-stone-600",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
};

const Button = ({
    children,
    variant = "primary",
    size = "sm",
    onClick,
    type = "button",
    className = "",
    ariaLabel,
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            aria-label={ariaLabel}
            className={`font-medium rounded-lg transition-colors duration-150 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;