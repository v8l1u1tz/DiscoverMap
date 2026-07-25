import type { ReactNode } from "react";

interface MapFrameProps {
  children: ReactNode;
  overlay?: ReactNode;
}

const MapFrame = ({ children, overlay }: MapFrameProps) => {
  return (
    <div className="relative flex-1 p-4 overflow-hidden">
      <div className="relative h-full w-full rounded-2xl overflow-hidden border border-stone-200 shadow-md">
        {children}
        {overlay && (
          <div className="absolute top-4 left-4 right-4 z-[1000] flex items-center gap-3">
            {overlay}
          </div>
        )}
      </div>
    </div>
  );
};
export default MapFrame;