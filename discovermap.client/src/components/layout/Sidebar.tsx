import type { ReactNode } from "react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

const Sidebar = ({ isOpen, onToggle, children }: SidebarProps) => {
  return (
    <>
      <aside className={`flex flex-col h-full bg-white border-r border-stone-100 transition-all duration-300 ease-in-out overflow-hidden shrink-0 ${isOpen ? "w-72" : "w-0"}`}>
        <div className="flex flex-col gap-2 p-4 overflow-y-auto h-full w-72">
          {children}
        </div>
      </aside>

      <button
        onClick={onToggle}
        aria-label="Toggle sidebar"
        className="absolute top-1/2 -translate-y-1/2 z-[1000] bg-white border border-stone-200 shadow-sm rounded-r-xl p-1.5 transition-all duration-300 hover:bg-stone-50"
        style={{ left: isOpen ? "288px" : "0px" }}
      >
        <svg
          className={`w-3 h-3 text-stone-400 transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </>
  );
};

export default Sidebar;