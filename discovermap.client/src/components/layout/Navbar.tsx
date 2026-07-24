import type { ReactNode } from "react";

interface NavbarProps {
  children?: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  return (
    <header className="z-[1000] flex items-center justify-between px-6 py-3 bg-white border-b border-stone-100">
      {children}
    </header>
  );
};

export default Navbar;