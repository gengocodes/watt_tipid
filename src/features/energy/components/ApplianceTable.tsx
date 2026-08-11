import { Pencil, Trash2, Plug } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ApplianceResponse } from "../types/types";
import { CATEGORY_COLORS } from "../constants/constants";
import { AnalysisStatusBadge } from "./AnalysisStatusBadge";

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
  const hasAppliances = appliances && appliances.length > 0;

  return (
    <div data-tour="appliances-table" className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl border shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-xs uppercase tracking-wider text-muted-foreground/70">
                <th className="px-6 py-4 font-semibold">Appliance</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Analysis Status</th>
                <th className="px-6 py-4 text-right font-semibold">Wattage</th>
                <th className="px-6 py-4 text-right font-semibold">Hrs/Day</th>
                <th className="px-6 py-4 text-right font-semibold">
                  Monthly kWh
                </th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-sm text-foreground">
              {!hasAppliances ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Plug className="h-10 w-10 text-muted-foreground/50" />
                      <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        No Appliances Logged
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Use the{" "}
                        <span className="text-primary font-semibold">
                          + Add Appliance
                        </span>{" "}
                        button to begin tracking your energy usage.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                appliances.map((app) => (
                  <tr
                    key={app.id}
                    className={`transition-colors hover:bg-muted/50 ${
                      !app.is_active ? "opacity-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      {app.name}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <span
                          className="size-2 rounded-full shrink-0"
                          style={{
                            backgroundColor:
                              CATEGORY_COLORS[app.category] ||
                              CATEGORY_COLORS.Other,
                          }}
                        />
                        {app.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <AnalysisStatusBadge status={app.analysis_status} />
                    </td>

                    <td className="px-6 py-4 text-right text-muted-foreground">
                      {app.wattage_watts} W
                    </td>

                    <td className="px-6 py-4 text-right text-muted-foreground">
                      {app.daily_usage_hours} hrs
                    </td>

                    <td className="px-6 py-4 text-right font-medium text-foreground">
                      {app.monthly_kwh.toFixed(1)} kWh
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <Button
                          variant="ghost"
                          onClick={() => onEdit(app)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => onDelete(app.id)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
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
              Total (
              <span className="text-primary font-semibold">
                {appliances.length}
              </span>{" "}
              appliances)
            </span>
            <div className="flex items-center gap-14">
              <span className="text-primary font-medium">
                {totalKwh.toFixed(1)} kWh
                <span className="text-foreground font-normal">/month</span>
              </span>
              <span>
                Est.{" "}
                <span className="text-primary font-medium">
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
