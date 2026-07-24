import PinCard from "./PinCard";
import type { Pin } from "../../../types/pin";

interface PinListProps {
  pins: Pin[];
}

const PinList = ({ pins }: PinListProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest px-1 mb-1">
        Spots ({pins.length})
      </p>
      {pins.map((pin) => (
        <PinCard key={pin.id}>
          <span className="text-sm font-semibold text-stone-800">{pin.title}</span>
          <span className="text-xs text-stone-500 line-clamp-1">{pin.description}</span>
          <span className="text-xs text-stone-400 font-medium">#{pin.category}</span>
        </PinCard>
      ))}
    </div>
  );
};

export default PinList;