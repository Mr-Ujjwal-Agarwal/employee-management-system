import { useState } from "react";
import { User, Bell, Palette, Info, Code2 } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";

function Settings() {

    return (
        <MainLayout>
            <div>
                <h1 className="text-3xl font-bold font-display text-ink">Settings</h1>
                <p className="text-ink-muted mt-1.5 text-sm">Manage your application preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                <SettingsCard icon={User} title="Profile">
                    <div className="flex items-center gap-4 mb-5">
                        <img
                            src="https://ui-avatars.com/api/?name=Admin+User&background=5B6EF5&color=fff"
                            alt="Admin User"
                            className="h-14 w-14 rounded-full"
                        />
                        <div>
                            <p className="font-medium text-ink">Ujjwal Agarwal</p>
                            <p className="text-sm text-ink-faint">System Administrator</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <SettingRow label="Application" value="Employee Management System" />
                        <SettingRow label="Version" value="1.0.0" />
                        <SettingRow label="Developer" value="Ujjwal Agarwal" />
                    </div>
                </SettingsCard>

                <SettingsCard icon={Bell} title="Notifications">
                    <ToggleRow label="Email Notifications" description="Get notified about employee changes" defaultChecked />
                    <ToggleRow label="System Alerts" description="Receive alerts for critical system events" defaultChecked />
                </SettingsCard>

                <SettingsCard icon={Palette} title="Appearance">
                    <ToggleRow label="Dark Mode" description="Nexus HR is optimized for dark mode" defaultChecked disabled />
                </SettingsCard>

                <SettingsCard icon={Info} title="About">
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2.5 text-ink-muted">
                            <Code2 size={15} className="text-ink-faint shrink-0" />
                            <span>React + FastAPI + MySQL</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-ink-muted">
                            <Info size={15} className="text-ink-faint shrink-0" />
                            <span>Built for AWS DevOps Deployment</span>
                        </div>
                    </div>
                </SettingsCard>
            </div>
        </MainLayout>
    );
}

function SettingsCard({ icon: Icon, title, children }) {
    return (
        <div className="bg-surface border border-line rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-9 w-9 rounded-lg bg-accent-soft text-accent flex items-center justify-center">
                    <Icon size={17} />
                </div>
                <h2 className="text-lg font-semibold font-display text-ink">{title}</h2>
            </div>
            {children}
        </div>
    );
}

function SettingRow({ label, value }) {
    return (
        <div className="flex justify-between border-b border-line-soft pb-3 last:border-0 last:pb-0">
            <span className="text-sm text-ink-muted">{label}</span>
            <span className="text-sm font-medium text-ink">{value}</span>
        </div>
    );
}

function ToggleRow({ label, description, defaultChecked, disabled }) {
    const [checked, setChecked] = useState(!!defaultChecked);

    return (
        <div className="flex items-center justify-between py-3.5 border-b border-line-soft last:border-0">
            <div className="pr-4">
                <p className="text-sm font-medium text-ink">{label}</p>
                {description && <p className="text-xs text-ink-faint mt-0.5">{description}</p>}
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => setChecked((v) => !v)}
                className={`relative shrink-0 h-6 w-11 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    checked ? "bg-accent" : "bg-line"
                }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ${
                        checked ? "translate-x-5" : "translate-x-0"
                    }`}
                />
            </button>
        </div>
    );
}

export default Settings;
