import { Loader2 } from "lucide-react";

export function Spinner({ label = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-muted">
            <Loader2 size={26} className="animate-spin text-accent" />
            <span className="text-sm">{label}</span>
        </div>
    );
}

export function TableSkeleton({ rows = 6, cols = 6 }) {
    return (
        <div className="divide-y divide-line-soft">
            {Array.from({ length: rows }).map((_, r) => (
                <div key={r} className="flex items-center gap-6 px-6 py-4">
                    {Array.from({ length: cols }).map((_, c) => (
                        <div
                            key={c}
                            className="h-3.5 rounded-full bg-surface-hover animate-pulse"
                            style={{ width: c === 0 ? "60px" : `${80 + ((r + c) % 3) * 30}px` }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-surface border border-line rounded-2xl p-6 animate-pulse">
            <div className="h-3 w-24 rounded-full bg-surface-hover" />
            <div className="h-8 w-16 rounded-lg bg-surface-hover mt-4" />
            <div className="h-3 w-20 rounded-full bg-surface-hover mt-5" />
        </div>
    );
}

function Loader({ label }) {
    return <Spinner label={label} />;
}

export default Loader;
