import type { ReactNode } from "react";

interface PageBodyProps {
  children: ReactNode;
}

const PageBody = ({ children }: PageBodyProps) => {
  return (
    <div className="relative flex flex-row flex-1 overflow-hidden">
      {children}
    </div>
  );
};

export default PageBody;