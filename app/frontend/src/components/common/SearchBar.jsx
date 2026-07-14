import { Search, X } from "lucide-react";

function SearchBar({ value, onChange, placeholder = "Search employee..." }) {
    return (
        <div className="relative w-full sm:w-80">
            <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="
                    w-full bg-surface border border-line rounded-xl
                    pl-10 pr-9 py-2.5 text-sm
                    outline-none transition-all duration-200
                    focus:border-accent focus:ring-4 focus:ring-accent-soft
                    placeholder:text-ink-faint
                "
            />
            {value && (
                <button
                    onClick={() => onChange({ target: { value: "" } })}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition-colors"
                >
                    <X size={15} />
                </button>
            )}
        </div>
    );
}

export default SearchBar;
