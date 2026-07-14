import { useEffect, useRef, useState } from "react";
import { Eye, Pencil, Trash2, MoreVertical } from "lucide-react";

import StatusBadge from "../common/StatusBadge";

function EmployeeRow({ employee, onView, onEdit, onDelete }) {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!menuOpen) return;
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [menuOpen]);

    return (
        <tr className="border-b border-line-soft last:border-0 hover:bg-surface-hover transition-colors duration-150">
            <td className="py-4 px-4 font-mono-data text-sm text-ink-muted">
                {employee.employee_code}
            </td>

            <td className="px-4">
                <div className="flex items-center gap-3">
                    <img
                        src={`https://ui-avatars.com/api/?name=${employee.first_name}+${employee.last_name}&background=5B6EF5&color=fff`}
                        alt={`${employee.first_name} ${employee.last_name}`}
                        className="w-9 h-9 rounded-full ring-1 ring-line"
                    />
                    <div>
                        <h3 className="font-medium text-sm text-ink">
                            {employee.first_name} {employee.last_name}
                        </h3>
                        <p className="text-xs text-ink-faint">{employee.email}</p>
                    </div>
                </div>
            </td>

            <td className="px-4">
                <span className="text-sm text-ink-muted">{employee.department}</span>
            </td>

            <td className="px-4 text-sm text-ink-muted">{employee.designation}</td>

            <td className="px-4 text-sm font-mono-data text-ink">
                ₹ {employee.salary.toLocaleString()}
            </td>

            <td className="px-4">
                <StatusBadge status={employee.status} />
            </td>

            <td className="px-4">
                <div className="flex justify-end">
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label="Row actions"
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-ink-faint hover:text-ink hover:bg-surface-hover transition-colors"
                        >
                            <MoreVertical size={17} />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-1 w-40 bg-surface-raised border border-line rounded-xl shadow-[var(--shadow-soft)] p-1.5 z-20 animate-scale-in origin-top-right">
                                <button
                                    onClick={() => { onView(employee); setMenuOpen(false); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
                                >
                                    <Eye size={15} /> View
                                </button>
                                <button
                                    onClick={() => { onEdit(employee); setMenuOpen(false); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
                                >
                                    <Pencil size={15} /> Edit
                                </button>
                                <button
                                    onClick={() => { onDelete(employee); setMenuOpen(false); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-danger hover:bg-danger-soft transition-colors"
                                >
                                    <Trash2 size={15} /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default EmployeeRow;
