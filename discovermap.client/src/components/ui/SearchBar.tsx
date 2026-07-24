interface SearchBarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

const SearchBar = ({ placeholder = "Search spots...", onChange }: SearchBarProps) => {
  return (
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-stone-200 shadow-md rounded-full px-4 h-10 w-full max-w-md">
      <svg className="w-4 h-4 text-stone-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="bg-transparent text-sm text-stone-700 placeholder-stone-400 outline-none w-full"
      />
    </div>
  );
};

export default SearchBar;