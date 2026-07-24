import SearchBar from "../../../components/ui/SearchBar";
import CategoryChip from "../../../components/ui/CategoryChip";
import Dropdown from "../../../components/ui/Dropdown";
import DropdownItem from "../../../components/ui/DropdownItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const CATEGORIES = ["All", "Cafe", "Gym", "Lounge", "Hidden Gems", "Landmark", "Restaurant"];

interface MapOverlayProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}

const MapOverlay = ({ activeCategory, onCategoryChange, sidebarOpen, onSidebarToggle }: MapOverlayProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <button
        onClick={onSidebarToggle}
        aria-label="Toggle sidebar"
        className="w-10 h-10 shrink-0 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 hover:shadow-lg transition-all duration-150 cursor-pointer"
      >
        <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {sidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div className="w-72 shrink-0">
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
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 hover:shadow-lg transition-all duration-150 cursor-pointer"
            >
              <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
              </svg>
            </button>
          }
        >
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem variant="danger" onClick={handleLogout}>
            Logout
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
};

export default MapOverlay;