import {
    LayoutDashboard,
    Users,
    Building2,
    Settings,
    ChevronsLeft,
    X
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Employees", icon: Users, path: "/employees" },
    { title: "Departments", icon: Building2, path: "/departments" },
    { title: "Settings", icon: Settings, path: "/settings" }
];

function Sidebar({ sidebarOpen, setSidebarOpen, collapsed, setCollapsed }) {

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed lg:sticky top-0 z-50 lg:z-auto
                    h-screen shrink-0
                    bg-surface border-r border-line
                    flex flex-col
                    transition-all duration-300 ease-out
                    ${collapsed ? "lg:w-[84px]" : "lg:w-72"}
                    w-72
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <div className="h-20 flex items-center justify-between px-6 border-b border-line-soft shrink-0">
                    <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? "lg:w-0 lg:opacity-0" : ""} transition-all duration-200`}>
                        <div className="relative shrink-0 h-9 w-9 rounded-xl bg-accent flex items-center justify-center font-display font-bold text-white text-sm">
                            EM
                            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-teal ring-2 ring-surface" />
                        </div>
                        <div className="whitespace-nowrap">
                            <p className="font-display font-semibold text-ink leading-tight">Nexus HR</p>
                            <p className="text-[11px] text-ink-faint leading-tight">Workforce OS</p>
                        </div>
                    </div>

                    <button
                        className="hidden lg:flex h-8 w-8 rounded-lg items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors shrink-0"
                        onClick={() => setCollapsed(!collapsed)}
                        aria-label="Toggle sidebar"
                    >
                        <ChevronsLeft size={17} className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
                    </button>

                    <button
                        className="lg:hidden h-8 w-8 rounded-lg flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-hover"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <X size={18} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {!collapsed && (
                        <p className="px-3 pt-2 pb-3 text-[11px] font-semibold tracking-wider text-ink-faint uppercase">
                            Workspace
                        </p>
                    )}

                    {menu.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                onClick={() => setSidebarOpen(false)}
                                key={item.title}
                                to={item.path}
                                title={collapsed ? item.title : undefined}
                                className={({ isActive }) =>
                                    `group relative flex items-center gap-3.5 rounded-xl px-3.5 py-3 transition-all duration-200 ${
                                        isActive
                                            ? "bg-accent text-white shadow-[var(--shadow-lift)]"
                                            : "text-ink-muted hover:bg-surface-hover hover:text-ink"
                                    } ${collapsed ? "lg:justify-center" : ""}`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-white/90 lg:hidden" />
                                        )}
                                        <Icon size={19} className="shrink-0" />
                                        <span className={`text-sm font-medium whitespace-nowrap ${collapsed ? "lg:hidden" : ""}`}>
                                            {item.title}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className={`p-4 border-t border-line-soft shrink-0`}>
                    <div className={`flex items-center gap-3 rounded-xl p-2.5 hover:bg-surface-hover transition-colors ${collapsed ? "lg:justify-center" : ""}`}>
                        <img
                            src="https://ui-avatars.com/api/?name=Admin+User&background=5B6EF5&color=fff"
                            alt="User avatar"
                            className="h-9 w-9 rounded-full shrink-0"
                        />
                        <div className={`overflow-hidden whitespace-nowrap ${collapsed ? "lg:hidden" : ""}`}>
                            <p className="text-sm font-medium text-ink leading-tight">Admin User</p>
                            <p className="text-xs text-ink-faint leading-tight">admin@nexushr.com</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
