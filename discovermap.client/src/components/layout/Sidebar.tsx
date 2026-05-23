import type { ReactNode } from 'react';
import Button from '../ui/Button';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    children?: ReactNode;
}

const Sidebar = ({ isOpen, onToggle, children }: SidebarProps) => {
    return (
        <aside className={`relative flex flex-col h-full bg-white/90 backdrop-blur-md border-r border-stone-200/60 shadow-xl transition-all duration-300 ease-in-out ${isOpen ? "w-72" : "w-0 overflow-hidden"}`}>
            <Button
                variant="outline"
                size="sm"
                onClick={onToggle}
                ariaLabel="Toggle sidebar"
                className="absolute -right-4 top-4 z-10 rounded-full p-1.5 shadow-md"
            >
                <svg
                    className={`w-3 h-3 text-stone-600 transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </Button>
            <div className="flex flex-col gap-3 p-4 overflow-y-auto h-full">
                {children}
            </div>
        </aside>
    );
};

export default Sidebar;