import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ApplianceForm } from "./ApplianceForm";
import { ApplianceInput } from "../schemas/appliance.schema";

interface AddApplianceCardProps {
  onSubmit: (data: ApplianceInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function AddApplianceCard({
  onSubmit,
  onCancel,
  isLoading = false,
}: Readonly<AddApplianceCardProps>) {
  return (
    <Card className="border-border rounded-2xl mb-6 shadow-sm">
      <CardHeader className="p-5 sm:p-6 pb-0 sm:pb-0 space-y-1">
        <CardTitle className="text-base sm:text-lg font-bold tracking-tight">
          Add New Appliance
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Input details to estimate this appliance&apos;s energy consumption.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 sm:p-6 pt-4 sm:pt-4">
        <ApplianceForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          submitLabel="Add Appliance"
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
