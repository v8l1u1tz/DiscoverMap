import SearchBar from "../ui/SearchBar";
import CategoryChip from "../ui/CategoryChip";
import Dropdown from "../ui/Dropdown";
import DropdownItem from "../ui/DropdownItem";

const CATEGORIES = ["All", "Cafe", "Gym", "Lounge", "Hidden Gems", "Landmark", "Restaurant"];

interface MapOverlayProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

const MapOverlay = ({ activeCategory, onCategoryChange }: MapOverlayProps) => {
  return (
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
            onClick={() => onCategoryChange(cat)}
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
};

export default MapOverlay;