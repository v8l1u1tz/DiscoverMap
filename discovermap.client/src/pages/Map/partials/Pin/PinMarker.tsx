import { Marker, Popup } from "react-leaflet";
import type { Pin } from "../../../../types/pin";
import PinPopup from "./PinPopup";
import { pinIcon } from "../../../../lib/icons";

interface PinMarkerProps {
  pin: Pin;
}

const PinMarker = ({ pin }: PinMarkerProps) => {
  return (
    <Marker position={[pin.latitude, pin.longitude]} icon={pinIcon}>
      <Popup>
        <PinPopup>
          <span className="text-sm font-semibold text-stone-800">{pin.title}</span>
          <span className="text-xs text-stone-500">{pin.description}</span>
          <span className="text-xs text-stone-400 font-medium">#{pin.category}</span>
        </PinPopup>
      </Popup>
    </Marker>
  );
};

export default PinMarker;