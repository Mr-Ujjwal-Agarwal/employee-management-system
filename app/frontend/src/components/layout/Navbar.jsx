import { useEffect, useRef, useState } from "react";
import { Bell, Menu, ChevronRight, LogOut, Settings as SettingsIcon, User, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const titles = {
    "/dashboard": "Dashboard",
    "/employees": "Employees",
    "/departments": "Departments",
    "/settings": "Settings"
};

function Navbar({ setSidebarOpen }) {

    const location = useLocation();
    const pageTitle = titles[location.pathname] || "Overview";

    const [profileOpen, setProfileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const profileRef = useRef(null);
    const notifRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setNotifOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <header className="h-20 sticky top-0 z-30 glass border-b border-line flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-4 min-w-0">
                <button
                    className="lg:hidden h-9 w-9 rounded-lg flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-hover shrink-0"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar"
                >
                    <Menu size={20} />
                </button>

                <div className="min-w-0">
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-ink-faint mb-0.5">
                        <span>Nexus HR</span>
                        <ChevronRight size={12} />
                        <span className="text-ink-muted">{pageTitle}</span>
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold font-display text-ink truncate">
                        {pageTitle}
                    </h2>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <div className="relative hidden md:block">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                    <input
                        type="text"
                        placeholder="Quick search..."
                        className="bg-surface border border-line rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none w-52 lg:w-64 transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent-soft placeholder:text-ink-faint"
                    />
                </div>

                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setNotifOpen((v) => !v)}
                        aria-label="Notifications"
                        className="relative h-10 w-10 rounded-xl flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
                    >
                        <Bell size={19} />
                        <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-danger ring-2 ring-surface" />
                    </button>

                    {notifOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-surface-raised border border-line rounded-2xl shadow-[var(--shadow-soft)] p-2 animate-scale-in origin-top-right">
                            <p className="px-3 py-2 text-xs font-semibold tracking-wide text-ink-faint uppercase">
                                Notifications
                            </p>
                            <div className="px-3 py-6 text-center text-sm text-ink-muted">
                                You're all caught up.
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-px h-8 bg-line hidden md:block" />

                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setProfileOpen((v) => !v)}
                        className="flex items-center gap-2.5 rounded-xl pl-1 pr-2 py-1 hover:bg-surface-hover transition-colors"
                    >
                        <img
                            src="https://ui-avatars.com/api/?name=Admin+User&background=5B6EF5&color=fff"
                            alt="Admin User"
                            className="h-9 w-9 rounded-full"
                        />
                        <span className="hidden md:block text-sm font-medium text-ink">Admin</span>
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-surface-raised border border-line rounded-2xl shadow-[var(--shadow-soft)] p-2 animate-scale-in origin-top-right">
                            <div className="px-3 py-2.5 border-b border-line-soft mb-1">
                                <p className="text-sm font-medium text-ink">Admin User</p>
                                <p className="text-xs text-ink-faint">admin@nexushr.com</p>
                            </div>
                            <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors">
                                <User size={16} /> Profile
                            </button>
                            <Link
                                to="/settings"
                                onClick={() => setProfileOpen(false)}
                                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
                            >
                                <SettingsIcon size={16} /> Settings
                            </Link>
                            <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-danger hover:bg-danger-soft transition-colors">
                                <LogOut size={16} /> Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
