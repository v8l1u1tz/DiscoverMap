import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapResizeHandlerProps {
  trigger: unknown;
}

const MapResizeHandler = ({ trigger }: MapResizeHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => clearTimeout(timeout);
  }, [trigger, map]);

  return null;
};

export default MapResizeHandler;