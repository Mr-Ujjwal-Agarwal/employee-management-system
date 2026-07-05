import { Mail, Phone, Building2, Wallet, CalendarDays, Hash } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

function EmployeeDetails({ employee }) {

    if (!employee) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-5">
                <img
                    src={`https://ui-avatars.com/api/?name=${employee.first_name}+${employee.last_name}&background=5B6EF5&color=fff&size=128`}
                    alt="Employee"
                    className="w-20 h-20 rounded-2xl ring-1 ring-line"
                />

                <div>
                    <h2 className="text-xl font-semibold font-display text-ink">
                        {employee.first_name} {employee.last_name}
                    </h2>
                    <p className="text-ink-muted text-sm mt-0.5">{employee.designation}</p>
                    <div className="mt-2">
                        <StatusBadge status={employee.status} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Info icon={Hash} title="Employee Code" value={employee.employee_code} mono />
                <Info icon={Mail} title="Email" value={employee.email} />
                <Info icon={Phone} title="Phone" value={employee.phone} />
                <Info icon={Building2} title="Department" value={employee.department?.department_name || employee.department} />
                <Info icon={Wallet} title="Salary" value={`₹ ${Number(employee.salary).toLocaleString()}`} mono />
                <Info icon={CalendarDays} title="Joining Date" value={employee.joining_date} />
            </div>
        </div>
    );
}

function Info({ icon: Icon, title, value, mono }) {
    return (
        <div className="flex items-start gap-3 bg-surface-hover border border-line-soft rounded-xl p-4">
            <div className="h-9 w-9 rounded-lg bg-accent-soft text-accent flex items-center justify-center shrink-0">
                <Icon size={16} />
            </div>
            <div className="min-w-0">
                <p className="text-xs text-ink-faint">{title}</p>
                <h3 className={`text-sm font-medium mt-0.5 text-ink truncate ${mono ? "font-mono-data" : ""}`}>
                    {value}
                </h3>
            </div>
        </div>
    );
}

export default EmployeeDetails;
