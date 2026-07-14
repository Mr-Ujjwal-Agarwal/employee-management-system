import { Building2 } from "lucide-react";
import DepartmentRow from "./DepartmentRow";
import EmptyState from "../common/EmptyState";

function DepartmentTable({ departments, onView, onEdit, onDelete }) {

    return (
        <div className="bg-surface border border-line rounded-2xl overflow-hidden">
            {departments.length === 0 ? (
                <EmptyState
                    icon={Building2}
                    title="No departments found"
                    message="Try adjusting your search, or add a new department to get started."
                />
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead className="sticky top-0 bg-surface-raised z-10">
                            <tr className="border-b border-line">
                                <th className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint p-4">Department</th>
                                <th className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint p-4">Description</th>
                                <th className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint p-4">Employees</th>
                                <th className="text-right text-xs font-semibold uppercase tracking-wide text-ink-faint p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department) => (
                                <DepartmentRow
                                    key={department.id}
                                    department={department}
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

export default DepartmentTable;
