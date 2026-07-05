import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(({ label, children, className = "", ...props }, ref) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-ink-muted">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    ref={ref}
                    {...props}
                    className={`
                        w-full appearance-none bg-surface border border-line rounded-xl
                        pl-4 pr-10 py-2.5 text-ink
                        outline-none transition-all duration-200
                        focus:border-accent focus:ring-4 focus:ring-accent-soft
                        ${className}
                    `}
                >
                    {children}
                </select>
                <ChevronDown
                    size={16}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none"
                />
            </div>
        </div>
    );
});

Select.displayName = "Select";

export default Select;
