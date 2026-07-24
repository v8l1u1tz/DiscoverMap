import PinCard from "../ui/PinCard";
import type { Pin } from "../../types/pin";

interface PinListProps {
  pins: Pin[];
}

const PinList = ({ pins }: PinListProps) => {
  return (
    <>
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
    </>
  );
};

export default PinList;