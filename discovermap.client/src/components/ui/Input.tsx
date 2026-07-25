import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightSlot?: ReactNode;
}

export default function Input({ label, error, id, className = "", rightSlot, ...rest }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm text-stone-600 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          className={`w-full rounded-lg border px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-colors ${
            rightSlot ? "pr-10" : ""
          } ${error ? "border-red-400" : "border-stone-200"} ${className}`}
          {...rest}
        />
        {rightSlot && (
          <div className="absolute inset-y-0 right-0 flex items-center px-3">
            {rightSlot}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}