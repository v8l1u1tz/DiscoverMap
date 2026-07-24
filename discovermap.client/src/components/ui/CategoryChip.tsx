interface CategoryChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const CategoryChip = ({ label, active = false, onClick }: CategoryChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors duration-150 ${
        active
          ? "bg-emerald-500 text-white border-emerald-500"
          : "bg-white text-stone-600 border-stone-200 shadow-sm hover:border-emerald-300 hover:text-emerald-600"
      }`}
    >
      {label}
    </button>
  );
};

export default CategoryChip;