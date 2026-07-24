import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-stone-50">
      {children}
    </div>
  );
};

export default PageLayout;