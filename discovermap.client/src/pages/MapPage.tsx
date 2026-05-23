import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageBody from "../components/layout/PageBody";
import Sidebar from "../components/layout/Sidebar";
import MapFrame from "../components/map/MapFrame";
import MapView from "../components/map/MapView";
import PinCard from "../components/ui/PinCard";
import Divider from "../components/ui/Divider";
import SearchBar from "../components/ui/SearchBar";
import CategoryChip from "../components/ui/CategoryChip";
import Dropdown from "../components/ui/Dropdown";
import DropdownItem from "../components/ui/DropdownItem";
import usePins from "../hooks/usePins";

const CATEGORIES = ["All", "Cafe", "Gym", "Lounge", "Hidden Gems", "Landmark", "Restaurant"];

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

  const mapOverlay = (
    <div className="flex items-center gap-2 w-full">
      <div className="w-72 shrink-0 bg-white rounded-full shadow-md border border-stone-100">
        <SearchBar placeholder="Search spots..." />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </div>

      <div className="ml-auto shrink-0">
        <Dropdown
          align="right"
          trigger={
            <button
              aria-label="Profile"
              className="w-10 h-10 rounded-full bg-white shadow-md border border-stone-100 flex items-center justify-center hover:bg-stone-50 transition-colors"
            >
              <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
              </svg>
            </button>
          }
        >
          <DropdownItem variant="primary">Register</DropdownItem>
          <DropdownItem>Login</DropdownItem>
        </Dropdown>
      </div>
    </div>
  );

  return (
    <PageLayout>
      <PageBody>
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
          <span className="text-lg font-semibold text-stone-800 tracking-tight px-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Discover<span className="text-emerald-500">Map</span>
          </span>

          <Divider />

          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest px-1">
            Spots ({pins.length})
          </p>
          {pins.map((pin) => (
            <PinCard key={pin.id}>
              <span className="text-sm font-semibold text-stone-800">{pin.title}</span>
              <span className="text-xs text-stone-500">{pin.description}</span>
              <span className="text-xs text-emerald-500 font-medium">#{pin.category}</span>
            </PinCard>
          ))}
        </Sidebar>

        <MapFrame overlay={mapOverlay}>
          <MapView pins={pins} />
        </MapFrame>
      </PageBody>
    </PageLayout>
  );
};

export default MapPage;