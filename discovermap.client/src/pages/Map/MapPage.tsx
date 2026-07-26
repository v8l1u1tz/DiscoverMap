import { useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import PageBody from "../../components/layout/PageBody";
import Sidebar from "../../components/layout/Sidebar";
import Divider from "../../components/ui/Divider";
import MapOverlay from "./partials/Map/MapOverlay";
import MapFrame from "./partials/Map/MapFrame";
import MapView from "./partials/Map/MapView";
import PinList from "./partials/Pin/PinList";
import usePins from "../../hooks/usePins";
import type { Pin } from "../../types/pin";
import useSearchedPins from "../../hooks/useSearchedPins";

const MapPage = () => {
  const { pins, loading, error } = usePins();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  const searchedPins = useSearchedPins(pins, searchTerm);

  if (loading) return (
    <div className="flex items-center justify-center h-screen text-stone-400 text-sm">
      Loading map...
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen text-red-400 text-sm">
      {error}
    </div>
  );

  return (
    <PageLayout>
      <PageBody>
        <Sidebar isOpen={sidebarOpen}>
          <span className="text-lg font-semibold text-stone-800 tracking-tight px-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
            DiscoverMap
          </span>
          <Divider />
          <PinList pins={searchedPins} selectedPinId={selectedPin?.id} onPinClick={setSelectedPin} />
        </Sidebar>

        <MapFrame
          overlay={
            <MapOverlay
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sidebarOpen={sidebarOpen}
              onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
            />
          }
        >
          <MapView pins={searchedPins} resizeTrigger={sidebarOpen} selectedPin={selectedPin} />
        </MapFrame>
      </PageBody>
    </PageLayout>
  );
};

export default MapPage;