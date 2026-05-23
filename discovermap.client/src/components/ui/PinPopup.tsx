import type { ReactNode } from "react";

interface PinPopupProps {
    children: ReactNode;
}

const PinPopup = ({ children }: PinPopupProps) => {
    return (
        <div className="flex flex-col gap-1 min-w-[160px]">
            {children}
        </div>
    );
};

export default PinPopup;