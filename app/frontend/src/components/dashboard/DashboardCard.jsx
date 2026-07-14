import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function DashboardCard({ title, value, icon, color, growth }) {

    const Icon = icon;
    const isPositive = typeof growth === "string" ? !growth.trim().startsWith("-") : true;

    return (
        <div className="group relative bg-surface border border-line rounded-2xl p-6 hover:border-accent/40 transition-all duration-300 overflow-hidden">
            <div
                className="absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-[0.12] blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                style={{ background: color }}
            />

            <div className="relative flex justify-between items-start">
                <div>
                    <p className="text-sm text-ink-muted font-medium">{title}</p>
                    <h2 className="text-4xl font-bold font-display font-mono-data mt-3 text-ink">
                        {value}
                    </h2>
                </div>
                <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}1f`, color }}
                >
                    <Icon size={20} />
                </div>
            </div>

            <div className={`relative mt-5 flex items-center gap-1.5 text-sm font-medium ${isPositive ? "text-teal" : "text-danger"}`}>
                {isPositive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                <span>{growth}</span>
                <span className="text-ink-faint font-normal">vs last month</span>
            </div>
        </div>
    );
}

export default DashboardCard;
