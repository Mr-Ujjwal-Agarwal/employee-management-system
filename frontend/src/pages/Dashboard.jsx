import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import DashboardCard from "../components/dashboard/DashboardCard";
import EmployeeChart from "../components/dashboard/EmployeeChart";
import RecentEmployees from "../components/dashboard/RecentEmployees";
import { CardSkeleton } from "../components/common/Loader";

import {
    Users,
    Building2,
    UserCheck,
    UserMinus,
    UserPlus,
    FolderPlus,
    ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

import { getDashboardStats } from "../services/dashboardService";

function greeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

function Dashboard() {

    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalDepartments: 0,
        activeEmployees: 0,
        inactiveEmployees: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const data = await getDashboardStats();
            setStats(data);
        } catch (error) {
            console.error("Failed to load dashboard stats:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
                <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-teal/10 blur-3xl" />

                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold font-display text-ink">
                            {greeting()}, Admin 👋
                        </h1>
                        <p className="text-ink-muted mt-2 text-sm sm:text-base">
                            Here's what's happening across your workforce today.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link to="/employees">
                            <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium bg-accent hover:bg-accent-hover text-white transition-colors shadow-[var(--shadow-lift)]">
                                <UserPlus size={16} /> Add Employee
                            </button>
                        </Link>
                        <Link to="/departments">
                            <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium bg-surface-hover border border-line hover:bg-line text-ink transition-colors">
                                <FolderPlus size={16} /> Add Department
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
                ) : (
                    <>
                        <DashboardCard
                            title="Total Employees"
                            value={stats.totalEmployees}
                            growth="+12%"
                            icon={Users}
                            color="#5B6EF5"
                        />
                        <DashboardCard
                            title="Departments"
                            value={stats.totalDepartments}
                            growth="+2"
                            icon={Building2}
                            color="#2DD4BF"
                        />
                        <DashboardCard
                            title="Active Employees"
                            value={stats.activeEmployees}
                            growth="+8%"
                            icon={UserCheck}
                            color="#22C55E"
                        />
                        <DashboardCard
                            title="Inactive Employees"
                            value={stats.inactiveEmployees}
                            growth="-2"
                            icon={UserMinus}
                            color="#FB5B5B"
                        />
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mt-6">
                <div className="xl:col-span-3">
                    <EmployeeChart />
                </div>
                <div className="xl:col-span-2 bg-surface border border-line rounded-2xl p-6">
                    <h2 className="text-lg font-semibold font-display text-ink mb-1">Department Summary</h2>
                    <p className="text-sm text-ink-muted mb-5">Headcount distribution snapshot</p>
                    <div className="space-y-4">
                        <SummaryRow label="Active share" value={stats.totalEmployees ? `${Math.round((stats.activeEmployees / stats.totalEmployees) * 100)}%` : "—"} />
                        <SummaryRow label="Inactive share" value={stats.totalEmployees ? `${Math.round((stats.inactiveEmployees / stats.totalEmployees) * 100)}%` : "—"} />
                        <SummaryRow label="Avg. headcount / department" value={stats.totalDepartments ? Math.round(stats.totalEmployees / stats.totalDepartments) : "—"} />
                    </div>
                    <Link
                        to="/departments"
                        className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover font-medium transition-colors"
                    >
                        Manage departments <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            <div className="mt-6">
                <RecentEmployees />
            </div>
        </MainLayout>
    );
}

function SummaryRow({ label, value }) {
    return (
        <div className="flex items-center justify-between py-2.5 border-b border-line-soft last:border-0">
            <span className="text-sm text-ink-muted">{label}</span>
            <span className="text-sm font-semibold font-mono-data text-ink">{value}</span>
        </div>
    );
}

export default Dashboard;
