import MapView from "../components/map/MapView";
import usePins from "../hooks/usePins";

const MapPage = () => {
    const { pins, loading, error } = usePins();

    if (loading) return <p>Loading map...</p>;
    if (error) return <p>{error}</p>;

    return <MapView pins={pins} />;
};

export default MapPage; 