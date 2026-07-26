import { useMemo } from "react";
import type { Pin } from "../types/pin";

const useSearchedPins = (pins: Pin[], searchTerm: string) => {
  return useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return pins;

    return pins.filter(
      (pin) =>
        pin.title.toLowerCase().includes(term) ||
        pin.description.toLowerCase().includes(term)
    );
  }, [pins, searchTerm]);
};

export default useSearchedPins;