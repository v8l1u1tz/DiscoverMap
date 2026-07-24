interface ToggleOption {
  label: string;
  value: string;
}

interface ToggleProps {
  options: [ToggleOption, ToggleOption];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Toggle({ options, value, onChange, className = "" }: ToggleProps) {
  return (
    <div
      className={`inline-flex rounded-lg border border-stone-200 bg-stone-50 p-1 ${className}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
            value === option.value
              ? "bg-emerald-500 text-white"
              : "text-stone-500 hover:text-stone-800"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}