import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";

const employees = [
    { id: "EMP001", name: "Ujjwal Agarwal", department: "DevOps", status: "Active" },
    { id: "EMP002", name: "Rahul Sharma", department: "HR", status: "Active" },
    { id: "EMP003", name: "Aman Gupta", department: "Finance", status: "Inactive" }
];

function RecentEmployees() {
    return (
        <div className="bg-surface border border-line rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold font-display text-ink">Recent Employees</h2>
                <Link
                    to="/employees"
                    className="text-sm text-accent hover:text-accent-hover flex items-center gap-1 font-medium transition-colors"
                >
                    View all <ArrowRight size={14} />
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[480px]">
                    <thead>
                        <tr className="text-ink-faint border-b border-line-soft text-xs uppercase tracking-wide">
                            <th className="text-left pb-3 font-medium">Employee ID</th>
                            <th className="text-left pb-3 font-medium">Name</th>
                            <th className="text-left pb-3 font-medium">Department</th>
                            <th className="text-left pb-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr
                                key={employee.id}
                                className="border-b border-line-soft last:border-0 hover:bg-surface-hover transition-colors"
                            >
                                <td className="py-3.5 font-mono-data text-sm text-ink-muted">{employee.id}</td>
                                <td className="text-sm font-medium text-ink">{employee.name}</td>
                                <td className="text-sm text-ink-muted">{employee.department}</td>
                                <td>
                                    <StatusBadge status={employee.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentEmployees;
