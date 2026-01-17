"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, ShieldAlert, Globe, Bell } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner or similar toast exists, or I'll just use alert for now if not sure. I'll stick to alert/console for "basic".

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    allowRegistrations: true,
    emailNotifications: true,
    publicProfile: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert("Settings saved successfully (Simulation)");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black font-heading text-white tracking-widest uppercase mb-2">
          System Configuration
        </h1>
        <p className="text-muted-foreground">
          Manage global platform settings and feature flags.
        </p>
      </div>

      <div className="grid gap-6">
        {/* System Status Section */}
        <div className="glass p-6 rounded-xl border border-white/10 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">System Status</h2>
              <p className="text-xs text-muted-foreground">
                Critical platform controls
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="space-y-1">
                <div className="font-bold text-white">Maintenance Mode</div>
                <div className="text-sm text-muted-foreground">
                  Disable access for all non-admin users.
                </div>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onChange={() => handleToggle("maintenanceMode")}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="space-y-1">
                <div className="font-bold text-white">Allow Registrations</div>
                <div className="text-sm text-muted-foreground">
                  Open or close new user signups.
                </div>
              </div>
              <Switch
                checked={settings.allowRegistrations}
                onChange={() => handleToggle("allowRegistrations")}
              />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="glass p-6 rounded-xl border border-white/10 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">Notifications</h2>
              <p className="text-xs text-muted-foreground">
                System-wide alerts
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="space-y-1">
                <div className="font-bold text-white">Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Send system emails for tryout updates.
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onChange={() => handleToggle("emailNotifications")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Action */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-black hover:bg-primary/90 font-bold px-8"
        >
          {isSaving ? (
            "SAVING..."
          ) : (
            <span className="flex items-center gap-2">
              <Save className="w-4 h-4" /> SAVE CHANGES
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
