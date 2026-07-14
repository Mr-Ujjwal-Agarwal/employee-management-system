import { forwardRef } from "react";

const Input = forwardRef(({ label, error, icon: Icon, className = "", ...props }, ref) => {

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-ink-muted">
                    {label}
                </label>
            )}

            <div className="relative">
                {Icon && (
                    <Icon
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none"
                    />
                )}
                <input
                    ref={ref}
                    {...props}
                    className={`
                        w-full bg-surface border rounded-xl
                        ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5
                        text-ink placeholder:text-ink-faint
                        outline-none transition-all duration-200
                        focus:border-accent focus:ring-4 focus:ring-accent-soft
                        ${error ? "border-danger" : "border-line"}
                        ${className}
                    `}
                />
            </div>

            {error && (
                <span className="text-xs text-danger">{error}</span>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
