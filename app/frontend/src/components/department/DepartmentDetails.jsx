import { Users, FileText } from "lucide-react";

function DepartmentDetails({ department }) {

    if (!department) return null;

    const count = department.employees ? department.employees.length : 0;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold font-display text-ink">
                    {department.department_name}
                </h2>
                <div className="flex items-start gap-2 mt-3 text-sm text-ink-muted">
                    <FileText size={15} className="mt-0.5 shrink-0 text-ink-faint" />
                    <p>{department.description || "No description provided."}</p>
                </div>
            </div>

            <div className="bg-surface-hover border border-line-soft rounded-xl p-5 flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-accent-soft text-accent flex items-center justify-center shrink-0">
                    <Users size={20} />
                </div>
                <div>
                    <p className="text-xs text-ink-faint">Total Employees</p>
                    <p className="text-2xl font-bold font-mono-data text-ink mt-0.5">{count}</p>
                </div>
            </div>
        </div>
    );
}

export default DepartmentDetails;
