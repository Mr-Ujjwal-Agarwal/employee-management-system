function EmptyState({ icon: Icon, title, message, action }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6">
            {Icon && (
                <div className="h-14 w-14 rounded-2xl bg-surface-hover border border-line flex items-center justify-center mb-4">
                    <Icon size={24} className="text-ink-faint" />
                </div>
            )}
            <h3 className="text-base font-semibold text-ink">{title}</h3>
            {message && (
                <p className="text-sm text-ink-muted mt-1.5 max-w-xs">{message}</p>
            )}
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}

export default EmptyState;
