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
}

export function AddApplianceCard({
  onSubmit,
  onCancel,
}: Readonly<AddApplianceCardProps>) {
  return (
    <Card className="border-border rounded-2xl mb-6 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold tracking-tight">
          Add New Appliance
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Input details to estimate this appliance&apos;s energy consumption.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ApplianceForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          submitLabel="Add Appliance"
        />
      </CardContent>
    </Card>
  );
}
