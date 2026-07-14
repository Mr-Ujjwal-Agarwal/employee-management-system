import { Loader2 } from "lucide-react";

function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    icon: Icon,
    loading = false,
    disabled = false,
    onClick,
    className = ""
}) {

    const variants = {
        primary:
            "bg-accent hover:bg-accent-hover text-white shadow-[var(--shadow-lift)] focus-visible:ring-accent/50",
        danger:
            "bg-danger hover:bg-danger/90 text-white shadow-[0_8px_24px_-8px_rgba(251,91,91,0.4)] focus-visible:ring-danger/50",
        success:
            "bg-teal hover:bg-teal/90 text-canvas font-semibold focus-visible:ring-teal/50",
        secondary:
            "bg-surface-hover hover:bg-line text-ink border border-line focus-visible:ring-ink-faint/50",
        ghost:
            "bg-transparent hover:bg-surface-hover text-ink-muted hover:text-ink focus-visible:ring-ink-faint/50"
    };

    const sizes = {
        sm: "px-3.5 py-2 text-sm gap-1.5",
        md: "px-5 py-2.5 text-sm gap-2",
        lg: "px-6 py-3.5 text-base gap-2.5"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                inline-flex items-center justify-center
                rounded-xl font-medium
                transition-all duration-200
                active:scale-[0.97]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
        >
            {loading ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                Icon && <Icon size={16} />
            )}
            {children}
        </button>
    );
}

export default Button;
