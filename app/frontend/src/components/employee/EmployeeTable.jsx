import { Users } from "lucide-react";
import EmployeeRow from "./EmployeeRow";
import EmptyState from "../common/EmptyState";

function EmployeeTable({ employees, onView, onEdit, onDelete }) {

    return (
        <div className="bg-surface border border-line rounded-2xl overflow-hidden">
            {employees.length === 0 ? (
                <EmptyState
                    icon={Users}
                    title="No employees found"
                    message="Try adjusting your search, or add a new employee to get started."
                />
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                        <thead className="sticky top-0 bg-surface-raised z-10">
                            <tr className="border-b border-line">
                                <th className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint p-4">Employee ID</th>
                                <th className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint p-4">Employee</th>
                                <th className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint p-4">Department</th>
                                <th className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint p-4">Designation</th>
                                <th className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint p-4">Salary</th>
                                <th className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint p-4">Status</th>
                                <th className="text-right text-xs font-semibold uppercase tracking-wide text-ink-faint p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <EmployeeRow
                                    key={employee.id}
                                    employee={employee}
                                    onView={onView}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default EmployeeTable;
