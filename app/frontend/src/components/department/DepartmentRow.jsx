import { useEffect, useRef, useState } from "react";
import { Eye, Pencil, Trash2, MoreVertical, Building2, Users } from "lucide-react";

function DepartmentRow({ department, onView, onEdit, onDelete }) {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const count = department.employees ? department.employees.length : 0;

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
            <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-accent-soft text-accent flex items-center justify-center shrink-0">
                        <Building2 size={16} />
                    </div>
                    <span className="font-medium text-sm text-ink">{department.department_name}</span>
                </div>
            </td>

            <td className="px-4 text-sm text-ink-muted max-w-xs truncate">
                {department.description || "—"}
            </td>

            <td className="px-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-mono-data text-ink-muted">
                    <Users size={14} className="text-ink-faint" />
                    {count}
                </span>
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
                                    onClick={() => { onView(department); setMenuOpen(false); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
                                >
                                    <Eye size={15} /> View
                                </button>
                                <button
                                    onClick={() => { onEdit(department); setMenuOpen(false); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
                                >
                                    <Pencil size={15} /> Edit
                                </button>
                                <button
                                    onClick={() => { onDelete(department); setMenuOpen(false); }}
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

export default DepartmentRow;
