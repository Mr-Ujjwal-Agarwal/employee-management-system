function StatusBadge({ status }) {

    const active = status === "Active";

    return (
        <span
            className={`
                inline-flex items-center gap-1.5
                px-2.5 py-1 rounded-full
                text-xs font-medium
                border
                ${
                    active
                        ? "bg-teal-soft text-teal border-teal/20"
                        : "bg-danger-soft text-danger border-danger/20"
                }
            `}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${active ? "bg-teal" : "bg-danger"}`}
            />
            {status}
        </span>
    );
}

export default StatusBadge;
