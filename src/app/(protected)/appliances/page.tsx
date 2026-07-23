"use client";

import { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppliances, useUserSettings } from "@/features/energy";
import { ApplianceTable } from "@/features/energy/components/ApplianceTable";
import { AddApplianceCard } from "@/features/energy/components/AddApplianceCard";
import { EditApplianceCard } from "@/features/energy/components/EditApplianceCard";
import { LoadingScreen } from "@/shared/ui/LoadingScreen";
import { ConfirmationDialog } from "@/shared/ui/ConfirmationDialog";
import { ErrorScreen } from "@/shared/ui/ErrorScreen";
import {
  ApplianceCreate,
  ApplianceResponse,
  ApplianceUpdate,
} from "@/features/energy/types/types";

export default function AppliancesPage() {
  const {
    appliances,
    isLoading: appliancesLoading,
    createAppliance,
    updateAppliance,
    deleteAppliance,
    error: appliancesError,
  } = useAppliances();
  const { settings, isLoading: settingsLoading } = useUserSettings();

  const [isAdding, setIsAdding] = useState(false);
  const [editingAppliance, setEditingAppliance] =
    useState<ApplianceResponse | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const isLoading = appliancesLoading || settingsLoading;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (appliancesError || !settings) {
    return <ErrorScreen title="Error loading appliances manager" />;
  }

  // Calculate totals
  const activeAppliances = appliances.filter((app) => app.is_active);
  const totalKwh = activeAppliances.reduce(
    (acc, app) => acc + app.monthly_kwh,
    0,
  );
  const estimatedCost = totalKwh * settings.electricity_rate_php_kwh;

  const handleAddSubmit = (data: ApplianceCreate) => {
    createAppliance(data, {
      onSuccess: () => {
        setIsAdding(false);
      },
    });
  };

  const handleEditSubmit = (data: ApplianceUpdate) => {
    if (editingAppliance) {
      updateAppliance(
        { id: editingAppliance.id, data },
        {
          onSuccess: () => {
            setEditingAppliance(null);
          },
        },
      );
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTargetId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      deleteAppliance(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Appliance Manager
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your appliances to estimate energy usage accurately.
          </p>
        </div>

        {!isAdding && !editingAppliance && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4" />
            Add Appliance
          </Button>
        )}
      </div>

      {isAdding && (
        <AddApplianceCard
          onSubmit={handleAddSubmit}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {editingAppliance && (
        <EditApplianceCard
          appliance={editingAppliance}
          electricityRate={settings.electricity_rate_php_kwh}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingAppliance(null)}
        />
      )}

      <ApplianceTable
        appliances={appliances}
        onEdit={(app) => {
          setIsAdding(false);
          setEditingAppliance(app);
        }}
        onDelete={handleDeleteClick}
        totalKwh={totalKwh}
        estimatedCost={estimatedCost}
      />

      <ConfirmationDialog
        open={deleteTargetId !== null}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
        title="Delete Appliance"
        description="Are you sure you want to delete this appliance? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
      />
    </div>
  );
}
