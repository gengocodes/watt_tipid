"use client";

import { Pencil, Trash2, Plug } from "lucide-react";
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
      <div className="overflow-hidden rounded-2xl border border-border shadow-xs bg-card">
        {!hasAppliances ? (
          <div className="px-6 py-12 text-center text-muted-foreground">
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
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-xs uppercase tracking-wider text-muted-foreground/70 bg-muted/30">
                    <th className="px-6 py-3.5 font-semibold">Appliance</th>
                    <th className="px-6 py-3.5 font-semibold">Category</th>
                    <th className="px-6 py-3.5 font-semibold">Status</th>
                    <th className="px-6 py-3.5 text-right font-semibold">
                      Wattage
                    </th>
                    <th className="px-6 py-3.5 text-right font-semibold">
                      Hrs/Day
                    </th>
                    <th className="px-6 py-3.5 text-right font-semibold">
                      Monthly kWh
                    </th>
                    <th className="px-6 py-3.5 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50 text-sm text-foreground">
                  {appliances.map((app) => (
                    <tr
                      key={app.id}
                      className={`transition-colors hover:bg-muted/40 ${
                        !app.is_active ? "opacity-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-foreground">
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
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(app)}
                            className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(app.id)}
                            className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-border/60">
              {appliances.map((app) => (
                <div
                  key={app.id}
                  className={`p-4 space-y-3 transition-colors ${
                    !app.is_active ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <h3 className="font-bold text-base text-foreground truncate leading-snug">
                        {app.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <span
                          className="size-2 rounded-full shrink-0"
                          style={{
                            backgroundColor:
                              CATEGORY_COLORS[app.category] ||
                              CATEGORY_COLORS.Other,
                          }}
                        />
                        <span>{app.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                      <AnalysisStatusBadge status={app.analysis_status} />
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(app)}
                          className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(app.id)}
                          className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-muted/40 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                        Wattage
                      </span>
                      <span className="font-medium text-foreground">
                        {app.wattage_watts} W
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                        Usage
                      </span>
                      <span className="font-medium text-foreground">
                        {app.daily_usage_hours} h/day
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                        Monthly
                      </span>
                      <span className="font-bold text-foreground">
                        {app.monthly_kwh.toFixed(1)} kWh
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-border bg-muted/30 px-5 py-4 text-xs sm:text-sm font-medium">
              <span className="text-muted-foreground">
                Total (
                <span className="text-foreground font-bold">
                  {appliances.length}
                </span>{" "}
                appliances)
              </span>
              <div className="flex items-center gap-6 sm:gap-10 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-muted-foreground">
                  <span className="text-foreground font-bold">
                    {totalKwh.toFixed(1)} kWh
                  </span>
                  /mo
                </span>
                <span className="text-muted-foreground">
                  Est.{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    ₱
                    {estimatedCost.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
