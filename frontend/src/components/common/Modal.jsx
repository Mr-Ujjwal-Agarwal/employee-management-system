import { useEffect } from "react";
import { X } from "lucide-react";

function Modal({ title, description, children, isOpen, onClose, size = "md" }) {

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizes = {
        sm: "max-w-md",
        md: "max-w-xl",
        lg: "max-w-2xl"
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className={`
                    w-full ${sizes[size]}
                    bg-surface border border-line rounded-2xl
                    shadow-[var(--shadow-soft)]
                    max-h-[88vh] overflow-y-auto
                    animate-scale-in
                `}
            >
                <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-line-soft sticky top-0 bg-surface/95 backdrop-blur z-10">
                    <div>
                        <h2 className="text-xl font-semibold font-display text-ink">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-sm text-ink-muted mt-1">{description}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
