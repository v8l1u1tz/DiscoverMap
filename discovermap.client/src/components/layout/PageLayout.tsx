import type { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <div className="flex flex-col w-full h-screen overflow-hidden">
            {children}
        </div>
    );
};

export default PageLayout;