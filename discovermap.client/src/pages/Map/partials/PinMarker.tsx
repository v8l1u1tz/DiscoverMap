import { Marker, Popup } from "react-leaflet";
import type { Pin } from "../../../types/pin";

interface PinMarkerProps {
    pin: Pin;
}

const PinMarker = ({ pin }: PinMarkerProps) => {
    return (
        <Marker position={[pin.latitude, pin.longitude]}>
            <Popup>
                <strong>{pin.title}</strong>
                <br />
                {pin.description}
                <br />
                <em>#{pin.category}</em>
            </Popup>
        </Marker>
    );
};

export default PinMarker;