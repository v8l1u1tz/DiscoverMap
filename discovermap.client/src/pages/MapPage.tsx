import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import PageBody from "../components/layout/PageBody";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PinCard from "../components/ui/PinCard";
import MapView from "../components/map/MapView";
import usePins from "../hooks/usePins";
import Button from "../components/ui/Button";

const MapPage = () => {
  const { pins, loading, error } = usePins();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      <Navbar>
        <Button variant="ghost" size="sm">Login</Button>
        <Button variant="primary" size="sm">Register</Button>
      </Navbar>

      <PageBody>
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
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

        <main className="flex-1 overflow-hidden">
          <MapView pins={pins} />
        </main>
      </PageBody>
    </PageLayout>
  );
};

export default MapPage;