import { useMemo } from "react";
import type { Pin } from "../types/pin";

const useFilteredPins = (pins: Pin[], searchTerm: string, activeCategory: string) => {
  return useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return pins.filter((pin) => {
      const matchesCategory = activeCategory === "All" || pin.category === activeCategory;

      const matchesSearch =
        term === "" ||
        pin.title.toLowerCase().includes(term) ||
        pin.description.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [pins, searchTerm, activeCategory]);
};

export default useFilteredPins;