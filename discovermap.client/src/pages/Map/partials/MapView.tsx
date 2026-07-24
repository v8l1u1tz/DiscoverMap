import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Pin } from "../../../types/pin";
import PinMarker from "./PinMarker";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface MapViewProps {
    pins: Pin[];
}

const MapView = ({ pins }: MapViewProps) => {
  return (
    <div className="h-full w-full">
      <MapContainer center={[14.5995, 120.9842]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map((pin) => (
          <PinMarker key={pin.id} pin={pin} />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;