import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

function NotFound() {
    return (
        <div className="min-h-screen bg-canvas flex flex-col justify-center items-center text-ink px-6 relative overflow-hidden">
            <div className="absolute top-1/4 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute bottom-1/4 -right-24 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />

            <svg width="220" height="160" viewBox="0 0 220 160" fill="none" className="relative mb-8">
                <rect x="30" y="24" width="160" height="112" rx="16" fill="#12172a" stroke="#232b45" strokeWidth="2" />
                <line x1="30" y1="56" x2="190" y2="56" stroke="#232b45" strokeWidth="2" />
                <circle cx="48" cy="40" r="4" fill="#fb5b5b" />
                <circle cx="62" cy="40" r="4" fill="#f5a524" />
                <circle cx="76" cy="40" r="4" fill="#2dd4bf" />
                <rect x="48" y="72" width="70" height="8" rx="4" fill="#232b45" />
                <rect x="48" y="88" width="100" height="8" rx="4" fill="#1c2340" />
                <rect x="48" y="104" width="50" height="8" rx="4" fill="#1c2340" />
                <circle cx="160" cy="96" r="26" fill="#5b6ef5" fillOpacity="0.15" stroke="#5b6ef5" strokeWidth="2" />
                <path d="M152 96h16M160 88v16" stroke="#5b6ef5" strokeWidth="2.5" strokeLinecap="round" transform="rotate(45 160 96)" />
            </svg>

            <h1 className="text-7xl sm:text-8xl font-bold font-display text-ink tracking-tight">
                404
            </h1>
            <p className="text-lg text-ink-muted mt-4 text-center max-w-sm">
                This page doesn't exist in the system of record.
            </p>

            <div className="flex items-center gap-3 mt-8">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-3 rounded-xl font-medium transition-colors shadow-[var(--shadow-lift)]"
                >
                    <Home size={17} /> Go to Dashboard
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 bg-surface-hover border border-line hover:bg-line text-ink px-5 py-3 rounded-xl font-medium transition-colors"
                >
                    <ArrowLeft size={17} /> Go back
                </button>
            </div>
        </div>
    );
}

export default NotFound;
