import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => {
            if (e.key === "Escape") onCancel();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onCancel();
            }}
        >
            <div className="w-full max-w-sm bg-surface border border-line rounded-2xl p-6 shadow-[var(--shadow-soft)] animate-scale-in">
                <div className="h-12 w-12 rounded-xl bg-danger-soft flex items-center justify-center mb-4">
                    <AlertTriangle size={22} className="text-danger" />
                </div>

                <h2 className="text-lg font-semibold font-display text-ink">
                    {title}
                </h2>

                <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                    {message}
                </p>

                <div className="flex justify-end gap-3 mt-7">
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onConfirm}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;
