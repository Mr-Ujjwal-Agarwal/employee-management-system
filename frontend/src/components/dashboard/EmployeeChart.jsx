import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

const data = [
    { month: "Jan", employees: 12 },
    { month: "Feb", employees: 18 },
    { month: "Mar", employees: 28 },
    { month: "Apr", employees: 36 },
    { month: "May", employees: 52 },
    { month: "Jun", employees: 64 }
];

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-surface-raised border border-line rounded-xl px-4 py-3 shadow-[var(--shadow-soft)]">
            <p className="text-xs text-ink-faint mb-1">{label}</p>
            <p className="text-sm font-semibold font-mono-data text-ink">
                {payload[0].value} employees
            </p>
        </div>
    );
}

function EmployeeChart() {
    return (
        <div className="bg-surface border border-line rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold font-display text-ink">Employee Growth</h2>
                    <p className="text-sm text-ink-muted mt-0.5">Headcount trend over the last 6 months</p>
                </div>
            </div>

            <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 10, left: -18, bottom: 0 }}>
                        <defs>
                            <linearGradient id="employeeGrowth" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#5B6EF5" stopOpacity={0.45} />
                                <stop offset="100%" stopColor="#5B6EF5" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 6" stroke="#232B45" vertical={false} />
                        <XAxis
                            dataKey="month"
                            stroke="#5b6480"
                            tick={{ fill: "#8992ac", fontSize: 12 }}
                            axisLine={{ stroke: "#232B45" }}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#5b6480"
                            tick={{ fill: "#8992ac", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#5B6EF5", strokeWidth: 1, strokeDasharray: "4 4" }} />
                        <Area
                            type="monotone"
                            dataKey="employees"
                            stroke="#5B6EF5"
                            strokeWidth={2.5}
                            fill="url(#employeeGrowth)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default EmployeeChart;
