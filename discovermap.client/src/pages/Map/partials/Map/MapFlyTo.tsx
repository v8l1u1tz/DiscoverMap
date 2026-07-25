import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { Pin } from "../../../../types/pin";

interface MapFlyToProps {
  pin: Pin | null;
}

const MapFlyTo = ({ pin }: MapFlyToProps) => {
  const map = useMap();

  useEffect(() => {
    if (!pin) return;
    map.flyTo([pin.latitude, pin.longitude], 16, { duration: 1 });
  }, [pin, map]);

  return null;
};

export default MapFlyTo;