import type { ReactNode } from "react";

interface NavbarProps {
    children?: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
    return (
        <header className="absolute top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border-b border-stone-200/60 shadow-sm">
            <div className="flex items-center gap-2">
                <span className="text-lg tracking-tight font-semibold text-stone-800" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    Discover<span className="text-emerald-500">Map</span>
                </span>
            </div>
            <div className="flex items-center gap-3">
                {children}
            </div>
        </header>
    );
};

export default Navbar;