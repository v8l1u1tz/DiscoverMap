interface CategoryChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const CategoryChip = ({ label, active = false, onClick }: CategoryChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer ${
        active
          ? "bg-stone-900 text-white border-stone-900 shadow-sm"
          : "bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-800 hover:shadow-sm"
      }`}
    >
      {label}
    </button>
  );
};

export default CategoryChip;