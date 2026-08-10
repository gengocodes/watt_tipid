"use client";

import { ElectricityRateCard, ProfileSettingsCard } from "@/features/settings";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences and electricity rate settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div data-tour="settings-profile">
          <ElectricityRateCard />
        </div>
        <div data-tour="settings-security">
          <ProfileSettingsCard />
        </div>
      </div>
    </div>
  );
}
