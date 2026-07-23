import { Pencil, Trash2, Plug } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ApplianceResponse } from "../types/types";
import { CATEGORY_STYLES, ICONS_CONFIG } from "../constants/constants";

interface ApplianceTableProps {
  appliances: ApplianceResponse[];
  onEdit: (appliance: ApplianceResponse) => void;
  onDelete: (id: string) => void;
  totalKwh: number;
  estimatedCost: number;
}

export function ApplianceTable({
  appliances,
  onEdit,
  onDelete,
  totalKwh,
  estimatedCost,
}: Readonly<ApplianceTableProps>) {
  const getApplianceIcon = (iconName: string) => {
    const classes = "h-5 w-5 shrink-0";
    const target =
      ICONS_CONFIG.find((i) => i.value === iconName.toLowerCase()) ??
      ICONS_CONFIG.find((i) => i.value === "plug")!;

    const IconComponent = target.icon;
    return <IconComponent className={cn(classes, target.color)} />;
  };

  const hasAppliances = appliances && appliances.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-xs uppercase tracking-wider text-muted-foreground/70">
                <th className="px-6 py-4">Appliance</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Wattage</th>
                <th className="px-6 py-4 text-right">Hrs/Day</th>
                <th className="px-6 py-4 text-right">Monthly kWh</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-sm text-background">
              {!hasAppliances ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Plug className="h-10 w-10 text-foreground/80" />
                      <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        No Appliances Logged
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Use the{" "}
                        <span className="text-primary">+ Add Appliance</span>{" "}
                        button to begin tracking your energy usage.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                appliances.map((app) => (
                  <tr
                    key={app.id}
                    className={`transition-colors hover:bg-muted/50 ${!app.is_active ? "opacity-50" : ""}`}
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center">
                        {getApplianceIcon(app.icon)}
                      </div>
                      <span className="text-foreground">
                        {app.name}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-lg px-2.5 py-1 text-xs",
                          CATEGORY_STYLES[app.category] ??
                            CATEGORY_STYLES.Other,
                        )}
                      >
                        {app.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right text-foreground/80">
                      {app.wattage_watts} W
                    </td>

                    <td className="px-6 py-4 text-right text-foreground/80">
                      {app.daily_usage_hours} hrs
                    </td>

                    <td className="px-6 py-4 text-right text-primary">
                      {app.monthly_kwh.toFixed(1)} kWh
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <Button
                          variant="ghost"
                          onClick={() => onEdit(app)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => onDelete(app.id)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {hasAppliances && (
          <div className="flex items-center justify-between border-t bg-sidebar-primary-foreground/20 px-6 py-4 text-sm font-medium">
            <span>
              Total (<span className="text-primary">{appliances.length}</span>{" "}
              appliances)
            </span>
            <div className="flex items-center gap-14">
              <span className="text-primary">
                {totalKwh.toFixed(1)} kWh<span className="text-foreground">/month</span>
              </span>
              <span>
                Est.{" "}
                <span className="text-primary">
                  ₱
                  {estimatedCost.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
