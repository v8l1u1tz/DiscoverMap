import type { ReactNode } from "react";

interface PinCardProps {
    children: ReactNode;
    onClick?: () => void;
}

const PinCard = ({ children, onClick }: PinCardProps) => {
    return (
        <div
            onClick={onClick}
            className="flex flex-col gap-1 p-3 rounded-xl border border-stone-100 bg-white hover:bg-stone-50 hover:border-emerald-200 hover:shadow-sm transition-all duration-150 cursor-pointer"
        >
            {children}
        </div>
    );
};

export default PinCard;