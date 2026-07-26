import { useMemo } from "react";
import type { Pin } from "../types/pin";

const useCategoryFilteredPins = (pins: Pin[], activeCategory: string) => {
  return useMemo(() => {
    if (activeCategory === "All") return pins;
    return pins.filter((pin) => pin.category === activeCategory);
  }, [pins, activeCategory]);
};

export default useCategoryFilteredPins;