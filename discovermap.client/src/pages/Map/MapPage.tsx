import { useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import PageBody from "../../components/layout/PageBody";
import Sidebar from "../../components/layout/Sidebar";
import Divider from "../../components/ui/Divider";
import MapOverlay from "./partials/MapOverlay";
import MapFrame from "./partials/MapFrame";
import MapView from "./partials/MapView";
import PinList from "./partials/PinList";
import usePins from "../../hooks/usePins";

const MapPage = () => {
  const { pins, loading, error } = usePins();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

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
          <PinList pins={pins} />
        </Sidebar>

        <MapFrame
          overlay={
            <MapOverlay
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              sidebarOpen={sidebarOpen}
              onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
            />
          }
        >
          <MapView pins={pins} resizeTrigger={sidebarOpen} />
        </MapFrame>
      </PageBody>
    </PageLayout>
  );
};

export default MapPage;