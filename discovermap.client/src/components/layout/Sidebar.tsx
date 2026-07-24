import type { ReactNode } from "react";

interface SidebarProps {
  isOpen: boolean;
  children?: ReactNode;
}

const Sidebar = ({ isOpen, children }: SidebarProps) => {
  return (
    <aside
      className={`flex flex-col h-full bg-white border-r border-stone-200 transition-all duration-300 ease-in-out overflow-hidden shrink-0 ${
        isOpen ? "w-72" : "w-0"
      }`}
    >
      <div className="flex flex-col gap-2 p-4 overflow-y-auto h-full w-72">
        {children}
      </div>
    </aside>
  );
};

export default Sidebar;